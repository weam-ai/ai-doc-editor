import { NextRequest, NextResponse } from 'next/server';
import { GEMINI } from '@/app/config/config';
import { createGeminiImageGeneration } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (!GEMINI.API_KEY) {
      return NextResponse.json({ 
        error: 'Gemini API key not configured',
      }, { status: 400 });
    }

    console.log('Image generation request:', { prompt });
    
    // Generate image using Gemini
    const result = await createGeminiImageGeneration(prompt, {
      maxTokens: 1000,
      temperature: 0.7
    });

    return NextResponse.json({
      success: true,
      text: result.text,
      imageBase64: result.imageBase64,
      mimeType: result.mimeType,
    });

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}


