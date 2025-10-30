import { NextResponse } from 'next/server';
import { GEMINI } from '@/app/config/config';

export async function GET() {
  try {
    const hasGeminiKey = !!GEMINI.API_KEY && GEMINI.API_KEY !== 'your-gemini-api-key';
    const hasAnyAIKey = hasGeminiKey;
    
    let message = '';
    if (hasGeminiKey) {
      message = 'Gemini key is configured';
    } else {
      message = 'No AI service keys are configured';
    }
    
    return NextResponse.json({ 
      hasGeminiKey,
      hasAnyAIKey,
      message
    });
  } catch (error) {
    console.error('Error checking AI service keys:', error);
    return NextResponse.json({ 
      hasGeminiKey: false,
      hasAnyAIKey: false,
      message: 'Error checking AI service key configuration'
    });
  }
}
