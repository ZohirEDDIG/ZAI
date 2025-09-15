import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY

const genAI = new GoogleGenerativeAI(geminiApiKey);

const sendPrompt = async (prompt) => {
  try {

    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;

    return response.text();
    
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

export default sendPrompt;