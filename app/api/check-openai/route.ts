import { NextResponse } from 'next/server';
import { OPENAI, GEMINI } from '@/app/config/config';

export async function GET() {
  try {
    const hasOpenAIKey = !!OPENAI.API_KEY && OPENAI.API_KEY !== 'your-openai-api-key';
    const hasGeminiKey = !!GEMINI.API_KEY && GEMINI.API_KEY !== 'your-gemini-api-key';
    const hasAnyAIKey = hasOpenAIKey || hasGeminiKey;
    
    let message = '';
    if (hasOpenAIKey && hasGeminiKey) {
      message = 'Both OpenAI and Gemini keys are configured. OpenAI will be used by default.';
    } else if (hasOpenAIKey) {
      message = 'OpenAI key is configured';
    } else if (hasGeminiKey) {
      message = 'Gemini key is configured';
    } else {
      message = 'No AI service keys are configured';
    }
    
    return NextResponse.json({ 
      hasOpenAIKey,
      hasGeminiKey,
      hasAnyAIKey,
      message
    });
  } catch (error) {
    console.error('Error checking AI service keys:', error);
    return NextResponse.json({ 
      hasOpenAIKey: false,
      hasGeminiKey: false,
      hasAnyAIKey: false,
      message: 'Error checking AI service key configuration'
    });
  }
}
