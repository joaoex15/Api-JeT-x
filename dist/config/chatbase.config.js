"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatbaseConfig = void 0;
exports.chatbaseConfig = {
    apiKey: process.env.CHATBASE_API_KEY,
    chatbotId: process.env.CHATBASE_CHATBOT_ID,
    baseUrl: process.env.CHATBASE_BASE_URL,
    endpoints: {
        sendMessage: '/chat',
        generateContent: '/generate-content',
        getHistory: '/chat-history'
    }
};
// Verificação das variáveis obrigatórias
if (!exports.chatbaseConfig.apiKey || !exports.chatbaseConfig.chatbotId || !exports.chatbaseConfig.baseUrl) {
    throw new Error('Configuração do Chatbase incompleta - verifique suas variáveis de ambiente');
}
