export interface IScriptRequest {
    prompt: string;
    category?: 'vendas' | 'suporte' | 'financeiro' | 'outros';
    tone?: 'formal' | 'informal' | 'amigável' | 'profissional';
    variables?: Record<string, string>;
  }