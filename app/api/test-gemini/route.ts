import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI } from '@/app/config/config';

export async function GET() {
  try {
    if (!GEMINI.API_KEY) {
      return NextResponse.json({ 
        error: 'Gemini API key not configured',
        available: false 
      }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(GEMINI.API_KEY);
    
    // Try to list available models
    try {
      const models = await genAI.listModels();
      console.log('Available Gemini models:', models);
      
      return NextResponse.json({ 
        success: true,
        message: 'Gemini API connection successful',
        available: true,
        models: models
      });
    } catch (listError) {
      console.error('Error listing models:', listError);
      
      // Try a simple generation test instead
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent("Hello, test message");
      const response = await result.response;
      
      return NextResponse.json({ 
        success: true,
        message: 'Gemini API connection successful (test generation worked)',
        available: true,
        testResponse: response.text()
      });
    }
  } catch (error) {
    console.error('Gemini API test failed:', error);
    return NextResponse.json({ 
      error: 'Gemini API test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      available: false 
    }, { status: 500 });
  }
}
