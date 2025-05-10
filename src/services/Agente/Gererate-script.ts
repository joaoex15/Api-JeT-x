// src/services/Agente/Generate-script.ts
import { Request, Response } from "express";
import { chatbaseConfig } from "../../config/chatbase.config";
import { IScriptRequest } from "../../models/scriptRequest.model";
import { IScriptResponse } from "../../models/scriptResponse.model";

// Interface estendida para incluir rawResponse opcional
interface IExtendedScriptResponse extends IScriptResponse {
  rawResponse?: any;
}

// Interface para o payload da Chatbase
interface IChatbasePayload {
  messages: Array<{
    role: string;
    content: string;
  }>;
  chatbotId: string;
  stream?: boolean;
}

export const generateScript = async (req: Request, res: Response): Promise<void> => {
  // Função helper para construir o prompt
  const buildChatbasePrompt = (prompt: string, category: string, tone: string, variables: Record<string, string>): string => {
    return `Por favor, gere um script para WhatsApp com:
            Tema: ${prompt}
            Categoria: ${category}
            Tom: ${tone}
            Variáveis: ${JSON.stringify(variables)}
            Formato: Título\n\nConteúdo`;
  };

  // Função helper para processar a resposta
  const parseChatbaseResponse = (data: any, originalPrompt: string, category: string, tone: string): IExtendedScriptResponse => {
    if (!data?.text) { // Alterado para verificar 'text' que é o campo padrão de resposta
      throw new Error('Resposta da API inválida');
    }

    const responseText = data.text.trim();
    const [title, ...contentParts] = responseText.split('\n\n');
    
    return {
      title: title || `Script: ${originalPrompt.substring(0, 30)}...`,
      content: contentParts.join('\n\n').trim(),
      category,
      tone,
      rawResponse: process.env.NODE_ENV === 'development' ? data : undefined
    };
  };

  try {
    const { prompt, category = 'outros', tone = 'profissional', variables = {} }: IScriptRequest = req.body;

    // Validação robusta
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 10) {
      res.status(400).json({ 
        error: "O campo 'prompt' é obrigatório e deve ter pelo menos 10 caracteres",
        received: prompt
      });
      return;
    }

    // Verificação da configuração
    if (!chatbaseConfig.apiKey || !chatbaseConfig.chatbotId || !chatbaseConfig.baseUrl) {
      throw new Error('Configuração do Chatbase incompleta');
    }

    // Construção do payload CORRIGIDO
    const payload: IChatbasePayload = {
      messages: [
        {
          role: "user",
          content: buildChatbasePrompt(prompt, category, tone, variables)
        }
      ],
      chatbotId: chatbaseConfig.chatbotId,
      stream: false
    };

    // Headers ajustados
    const headers = {
      'Authorization': `Bearer ${chatbaseConfig.apiKey}`,
      'Content-Type': 'application/json',
      // Removido o Chatbot-ID duplicado dos headers (já está no payload)
    };

    // Chamada à API com timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(`${chatbaseConfig.baseUrl}/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Chatbase API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const responseData = await response.json();
    const generatedScript = parseChatbaseResponse(responseData, prompt, category, tone);

    res.status(200).json({
      success: true,
      data: generatedScript,
      meta: {
        generatedAt: new Date().toISOString(),
        tokensUsed: Math.ceil(generatedScript.content.length / 4) // Estimativa
      }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    const isTimeout = error instanceof Error && error.name === 'AbortError';
    
    console.error('Erro na geração de script:', error);
    
    res.status(isTimeout ? 504 : 500).json({
      success: false,
      error: isTimeout ? 'Timeout na conexão com a API' : errorMessage
    });
  }
};