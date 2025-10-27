import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI } from '@/app/config/config';

const genAI = new GoogleGenerativeAI(GEMINI.API_KEY!);

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: string;
}

export interface GeminiCompletionOptions {
  maxTokens?: number;
  temperature?: number;
}

export async function createGeminiCompletion(
  messages: GeminiMessage[],
  options: GeminiCompletionOptions = {}
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  // Convert messages to the format expected by Gemini
  const chat = model.startChat({
    history: [],
  });

  // Get the last user message (since we're doing stateless completions)
  const lastMessage = messages[messages.length - 1];
  
  if (lastMessage.role !== 'user') {
    throw new Error('Last message must be from user');
  }

  // Combine system prompt and user message
  const systemMessage = messages.find(m => m.role === 'user' && m.parts.includes('system'));
  const userMessage = messages[messages.length - 1];
  
  let prompt = '';
  if (systemMessage) {
    prompt = systemMessage.parts + '\n\n' + userMessage.parts;
  } else {
    prompt = userMessage.parts;
  }

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function createGeminiChatCompletion(
  systemPrompt: string,
  userPrompt: string,
  options: GeminiCompletionOptions = {}
): Promise<string> {
  // Try different model names in order of preference
  const modelNames = ["gemini-2.5-flash", "gemini-pro", "gemini-1.5-flash", "gemini-1.5-pro"];
  let lastError: Error | null = null;

  for (const modelName of modelNames) {
    try {
      console.log(`Trying Gemini model: ${modelName}`);
      
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          maxOutputTokens: options.maxTokens || 12000,
          temperature: options.temperature || 0.7,
        }
      });

      const prompt = `${systemPrompt}\n\n${userPrompt}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      console.log(`Successfully used Gemini model: ${modelName}`);
      return response.text();
    } catch (error) {
      console.warn(`Failed to use Gemini model ${modelName}:`, error);
      lastError = error as Error;
      continue;
    }
  }

  // If all models failed, throw the last error
  throw new Error(`All Gemini models failed. Last error: ${lastError?.message}`);
}
