export const openAIConfig = {
  apiKey: process.env.OPENAI_API_KEY,
  assistantId: process.env.OPENAI_ASSISTANT_ID, // Assistant ID를 환경 변수에서 가져옴
  baseUrl: 'https://api.openai.com/v1/chat/completions', // OpenAI API 엔드포인트
};
