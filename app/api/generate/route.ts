import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ChatHistory from '@/models/ChatHistory';
import { getSession } from '@/app/config/withSession';
import { GEMINI } from '@/app/config/config';
import { createGeminiChatCompletionStream } from '@/lib/gemini';
import { 
  getModificationSystemPrompt,
  getTemplateSystemPrompt,
  getInfographicSystemPrompt,
  getDocumentSystemPrompt
} from '@/lib/prompts';

// Function to detect if meaningful changes were made
function hasMeaningfulChanges(oldContent: string, newContent: string): boolean {
  if (!oldContent || !newContent) return false;
  
  // Remove whitespace and normalize for comparison
  const normalize = (str: string) => str.replace(/\s+/g, ' ').trim();
  const oldNormalized = normalize(oldContent);
  const newNormalized = normalize(newContent);
  
  // Check if content actually changed
  if (oldNormalized === newNormalized) return false;
  
  // Check for significant length changes (more than just whitespace)
  const oldLength = oldNormalized.length;
  const newLength = newNormalized.length;
  const lengthDiff = Math.abs(newLength - oldLength);
  
  // If length difference is very small, it might just be whitespace changes
  if (lengthDiff < 10 && oldNormalized.replace(/\s/g, '') === newNormalized.replace(/\s/g, '')) {
    return false;
  }
  
  return true;
}

// Function to check if request is document-related
function isDocumentRelatedRequest(prompt: string): boolean {
  const lowerPrompt = prompt.toLowerCase();
  
  // Keywords that indicate document modification requests
  const documentKeywords = [
    'change', 'modify', 'update', 'edit', 'add', 'remove', 'delete', 'insert',
    'improve', 'better', 'enhance', 'make', 'style', 'color', 'format', 'layout',
    'structure', 'section', 'content', 'text', 'title', 'heading', 'paragraph',
    'image', 'logo', 'footer', 'header', 'about', 'contact', 'professional',
    'modern', 'design', 'position', 'move', 'align', 'center', 'left', 'right',
    'column', 'row', 'table', 'list', 'bullet', 'number', 'font', 'size',
    'bold', 'italic', 'underline', 'highlight', 'background', 'border',
    'margin', 'padding', 'spacing', 'width', 'height', 'size', 'generate',
    'create', 'write', 'build', 'develop', 'design', 'wordpress', 'blog',
    'website', 'page', 'document', 'article', 'post', 'content'
  ];
  
  return documentKeywords.some(keyword => lowerPrompt.includes(keyword));
}

// Function to track changes between old and new content
function trackChanges(oldContent: string, newContent: string, prompt: string): { hasChanges: boolean; summary: string } {
  if (!oldContent) {
    return {
      hasChanges: true,
      summary: `Created new content based on: "${prompt}"`
    };
  }

  // Check if this is a blank document with placeholder content
  const isBlankDocument = oldContent.includes('Start writing your content here...') || 
                         oldContent.includes('New Document') ||
                         oldContent.trim().length < 100;

  // For blank documents with content generation requests, always consider it a change
  if (isBlankDocument && (prompt.toLowerCase().includes('generate') || 
                         prompt.toLowerCase().includes('create') || 
                         prompt.toLowerCase().includes('write') || 
                         prompt.toLowerCase().includes('make'))) {
    return {
      hasChanges: true,
      summary: `Generated new content based on: "${prompt}"`
    };
  }

  // Check if request is document-related
  if (!isDocumentRelatedRequest(prompt)) {
    return {
      hasChanges: false,
      summary: `Request "${prompt}" is not related to document modification. No changes made.`
    };
  }

  // Check if meaningful changes were made
  if (!hasMeaningfulChanges(oldContent, newContent)) {
    return {
      hasChanges: false,
      summary: `No meaningful changes detected for request: "${prompt}". The document appears to already match your requirements.`
    };
  }

  // If we get here, meaningful changes were made
  const changes = [];
  
  // Check for specific elements that might have changed
  const oldLength = oldContent.length;
  const newLength = newContent.length;
  
  if (newLength > oldLength) {
    changes.push(`Added ${newLength - oldLength} characters`);
  } else if (newLength < oldLength) {
    changes.push(`Removed ${oldLength - newLength} characters`);
  }
  
  // Look for specific patterns in the prompt to provide more context
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('change') || lowerPrompt.includes('modify') || lowerPrompt.includes('update')) {
    // Check if it's a role/job title change
    if (lowerPrompt.includes('to') && (lowerPrompt.includes('designer') || lowerPrompt.includes('engineer') || lowerPrompt.includes('manager') || lowerPrompt.includes('developer'))) {
      changes.push(`Updated role and relevant information: "${prompt}"`);
    } else {
      changes.push(`Applied requested changes: "${prompt}"`);
    }
  }
  
  if (lowerPrompt.includes('add') || lowerPrompt.includes('insert')) {
    changes.push(`Added content as requested: "${prompt}"`);
  }
  
  if (lowerPrompt.includes('remove') || lowerPrompt.includes('delete') || lowerPrompt.includes('take out')) {
    changes.push(`Removed content as requested: "${prompt}"`);
  }
  
  if (lowerPrompt.includes('improve') || lowerPrompt.includes('better') || lowerPrompt.includes('enhance')) {
    changes.push(`Improved content as requested: "${prompt}"`);
  }
  
  if (lowerPrompt.includes('make') && (lowerPrompt.includes('professional') || lowerPrompt.includes('modern') || lowerPrompt.includes('better'))) {
    changes.push(`Enhanced document as requested: "${prompt}"`);
  }
  
  if (lowerPrompt.includes('style') || lowerPrompt.includes('color') || lowerPrompt.includes('format')) {
    changes.push(`Updated styling as requested: "${prompt}"`);
  }
  
  if (lowerPrompt.includes('layout') || lowerPrompt.includes('structure') || lowerPrompt.includes('column')) {
    changes.push(`Modified layout as requested: "${prompt}"`);
  }
  
  if (lowerPrompt.includes('about') || lowerPrompt.includes('section')) {
    changes.push(`Updated section as requested: "${prompt}"`);
  }
  
  if (lowerPrompt.includes('position') || lowerPrompt.includes('align') || lowerPrompt.includes('side')) {
    changes.push(`Adjusted positioning as requested: "${prompt}"`);
  }
  
  return {
    hasChanges: true,
    summary: changes.length > 0 ? changes.join('. ') : `Updated document based on: "${prompt}"`
  };
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, template, isModification = false, currentContent, documentId } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    let systemPrompt = '';
    
    // Detect if this is a template creation request
    const isTemplateRequest = prompt.toLowerCase().includes('template') && 
                             (prompt.toLowerCase().includes('create') || 
                              prompt.toLowerCase().includes('make') || 
                              prompt.toLowerCase().includes('generate'));
    
    // Detect if this is an infographic request
    const isInfographicRequest = prompt.toLowerCase().includes('infographic') ||
                                  prompt.toLowerCase().includes('visual report') ||
                                  prompt.toLowerCase().includes('data visualization') ||
                                  prompt.toLowerCase().includes('colorful design') ||
                                  prompt.toLowerCase().includes('dashboard') ||
                                  prompt.toLowerCase().includes('metrics report') ||
                                  prompt.toLowerCase().includes('performance report') ||
                                  prompt.toLowerCase().includes('background colorfull') ||
                                  (prompt.toLowerCase().includes('create') && (
                                    prompt.toLowerCase().includes('timeline') ||
                                    prompt.toLowerCase().includes('dashboard')
                                  ));
    
    
    if (isModification && currentContent) {
      systemPrompt = getModificationSystemPrompt(currentContent, prompt);
    } else if (isTemplateRequest) {
      console.log('isTemplateRequest');
      systemPrompt = getTemplateSystemPrompt();
    } else if (isInfographicRequest) {
      console.log('isInfographicRequest');
      systemPrompt = getInfographicSystemPrompt();
    } else {
      console.log('getDocumentSystemPrompt');
      systemPrompt = getDocumentSystemPrompt(template);
    }

    // Require Gemini API key
    if (!GEMINI.API_KEY) {
      return NextResponse.json(
        { error: 'No AI service configured. Please set GEMINI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of createGeminiChatCompletionStream(
            systemPrompt,
            prompt,
            {
              maxTokens: 12000,
              temperature: isInfographicRequest ? 0.3 : (isModification ? 0.1 : 0.7)
            }
          )) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
}

