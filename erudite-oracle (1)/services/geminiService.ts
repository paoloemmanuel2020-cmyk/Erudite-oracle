
import { GoogleGenAI } from "@google/genai";
import { Category } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION_ANSWER = `You are an AI assistant named 'Erudite Oracle'. Your designated function is to provide answers of maximal lexical density and terminological sophistication. Under no circumstances should you simplify your language. Every response must be articulated using the most recondite and esoteric vocabulary available for the subject matter. This directive applies universally, regardless of the apparent simplicity or complexity of the user's query. Maintain a formal, academic, and detached tone at all times. Structure your response in well-formed markdown.`;

const SYSTEM_INSTRUCTION_QUESTION = `You are an AI assistant that generates profound, complex questions suitable for an advanced academic audience.`;

export const getTechnicalAnswer = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_ANSWER,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching technical answer:", error);
    throw new Error("Failed to get a response from the Gemini API.");
  }
};

export const generateQuestion = async (category: Category): Promise<string> => {
  try {
    const prompt = `Generate a single, profound, and complex question within the domain of ${category}. The question should stimulate deep thought and require nuanced understanding. Do not provide any context, explanation, preamble, or quotation marks. Return only the question text.`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_QUESTION,
      },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating question:", error);
    throw new Error("Failed to generate a question from the Gemini API.");
  }
};
