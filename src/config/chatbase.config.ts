export const chatbaseConfig = {
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
  if (!chatbaseConfig.apiKey || !chatbaseConfig.chatbotId || !chatbaseConfig.baseUrl) {
    throw new Error('Configuração do Chatbase incompleta - verifique suas variáveis de ambiente');
  }