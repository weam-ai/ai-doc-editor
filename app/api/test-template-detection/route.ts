import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Test template detection logic
    const isTemplateRequest = prompt.toLowerCase().includes('template') && 
                             (prompt.toLowerCase().includes('create') || 
                              prompt.toLowerCase().includes('make') || 
                              prompt.toLowerCase().includes('generate'));

    return NextResponse.json({
      prompt: prompt,
      isTemplateRequest: isTemplateRequest,
      detection: {
        hasTemplate: prompt.toLowerCase().includes('template'),
        hasCreate: prompt.toLowerCase().includes('create'),
        hasMake: prompt.toLowerCase().includes('make'),
        hasGenerate: prompt.toLowerCase().includes('generate'),
      }
    });
  } catch (error) {
    console.error('Template detection test failed:', error);
    return NextResponse.json({ 
      error: 'Template detection test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}



