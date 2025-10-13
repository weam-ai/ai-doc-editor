import { NextResponse } from 'next/server';
import { OPENAI } from '@/app/config/config';

export async function GET() {
  try {
    const hasOpenAIKey = !!OPENAI.API_KEY && OPENAI.API_KEY !== 'your-openai-api-key';
    
    return NextResponse.json({ 
      hasOpenAIKey,
      message: hasOpenAIKey 
        ? 'OpenAI key is configured' 
        : 'OpenAI key is not configured or is using default value'
    });
  } catch (error) {
    console.error('Error checking OpenAI key:', error);
    return NextResponse.json({ 
      hasOpenAIKey: false,
      message: 'Error checking OpenAI key configuration'
    });
  }
}
