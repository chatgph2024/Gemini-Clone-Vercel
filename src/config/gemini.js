// node --version # Should be >= 18
// npm install @google/generative-ai

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  }  from "@google/generative-ai";
  
  const MODEL_NAME = "gemini-2.0-flash-exp";
  const API_KEY = "AIzaSyBOD52IZK3cbQfyOQB0gKFr_BJ2PhiTTLA";
  
  async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 8192,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
  
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text()
  }
  
  export default runChat;
