"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateScript = void 0;
const chatbase_config_1 = require("../../config/chatbase.config");
const generateScript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Função helper para construir o prompt
    const buildChatbasePrompt = (prompt, category, tone, variables) => {
        return `Por favor, gere um script para WhatsApp com:
            Tema: ${prompt}
            Categoria: ${category}
            Tom: ${tone}
            Variáveis: ${JSON.stringify(variables)}
            Formato: Título\n\nConteúdo`;
    };
    // Função helper para processar a resposta
    const parseChatbaseResponse = (data, originalPrompt, category, tone) => {
        if (!(data === null || data === void 0 ? void 0 : data.text)) { // Alterado para verificar 'text' que é o campo padrão de resposta
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
        const { prompt, category = 'outros', tone = 'profissional', variables = {} } = req.body;
        // Validação robusta
        if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 10) {
            res.status(400).json({
                error: "O campo 'prompt' é obrigatório e deve ter pelo menos 10 caracteres",
                received: prompt
            });
            return;
        }
        // Verificação da configuração
        if (!chatbase_config_1.chatbaseConfig.apiKey || !chatbase_config_1.chatbaseConfig.chatbotId || !chatbase_config_1.chatbaseConfig.baseUrl) {
            throw new Error('Configuração do Chatbase incompleta');
        }
        // Construção do payload CORRIGIDO
        const payload = {
            messages: [
                {
                    role: "user",
                    content: buildChatbasePrompt(prompt, category, tone, variables)
                }
            ],
            chatbotId: chatbase_config_1.chatbaseConfig.chatbotId,
            stream: false
        };
        // Headers ajustados
        const headers = {
            'Authorization': `Bearer ${chatbase_config_1.chatbaseConfig.apiKey}`,
            'Content-Type': 'application/json',
            // Removido o Chatbot-ID duplicado dos headers (já está no payload)
        };
        // Chamada à API com timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const response = yield fetch(`${chatbase_config_1.chatbaseConfig.baseUrl}/chat`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
            signal: controller.signal
        });
        clearTimeout(timeout);
        if (!response.ok) {
            const errorData = yield response.json().catch(() => ({}));
            throw new Error(`Chatbase API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }
        const responseData = yield response.json();
        const generatedScript = parseChatbaseResponse(responseData, prompt, category, tone);
        res.status(200).json({
            success: true,
            data: generatedScript,
            meta: {
                generatedAt: new Date().toISOString(),
                tokensUsed: Math.ceil(generatedScript.content.length / 4) // Estimativa
            }
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        const isTimeout = error instanceof Error && error.name === 'AbortError';
        console.error('Erro na geração de script:', error);
        res.status(isTimeout ? 504 : 500).json({
            success: false,
            error: isTimeout ? 'Timeout na conexão com a API' : errorMessage
        });
    }
});
exports.generateScript = generateScript;
