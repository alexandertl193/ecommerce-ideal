
import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY directly as required by guidelines
export const generateResponse = async (prompt: string): Promise<string> => {
  // Always initialize GoogleGenAI with a named parameter
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are Lumina, a minimalist and helpful AI assistant embedded in a high-end web application. Keep your responses concise, elegant, and insightful.",
        temperature: 0.7,
      },
    });

    // Access the .text property directly (do not call as a method)
    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
