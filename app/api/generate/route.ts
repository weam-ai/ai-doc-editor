import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import dbConnect from '@/lib/db';
import ChatHistory from '@/models/ChatHistory';
import { getSession } from '@/app/config/withSession';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    'margin', 'padding', 'spacing', 'width', 'height', 'size'
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
    changes.push(`Applied requested changes: "${prompt}"`);
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

    console.log('Generate API - Prompt:', prompt);
    console.log('Generate API - isModification:', isModification);
    console.log('Generate API - currentContent length:', currentContent?.length);
    console.log('Generate API - currentContent preview:', currentContent?.substring(0, 300));

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    let systemPrompt = '';
    
    if (isModification && currentContent) {
      // For modification requests, instruct AI to modify existing HTML
      systemPrompt = `You are an expert HTML document modifier. Your task is to modify an existing HTML document based on ANY user request.
    
    CRITICAL INSTRUCTIONS:
    1. DO NOT create a new document from scratch
    2. UNDERSTAND and fulfill ANY type of user request - text changes, styling, layout, content addition/removal, formatting, form fillup etc.
    3. PRESERVE the existing HTML structure, styling, and layout unless specifically asked to change them
    4. KEEP all existing CSS styles, classes, and inline styles UNCHANGED unless the user specifically requests styling changes
    5. MAINTAIN the same visual design, positioning, and dimensions unless the user asks to modify them
    6. Make ONLY the changes specifically requested by the user
    7. Return the COMPLETE modified HTML document, not just the changed parts
    8. Be intelligent about understanding user intent - if they say "make it more professional", improve the content accordingly
    9. If user asks to "change about content", find and update the about section
    10. If user asks to "add a section", add it in an appropriate location
    11. If user asks to "remove something", find and remove it
    12. If user asks to "make it better", improve the content quality and structure
    13. If user asks for formatting changes, apply them appropriately
    14. If user asks to "fill form with dummy/random details", then:
        - Replace all text inputs with realistic sample text
        - Replace email inputs with realistic sample emails
        - Replace phone number inputs with realistic phone numbers
        - Replace number/date/time inputs with realistic random values
        - Replace textarea content with realistic text
        - Replace select dropdowns with a valid option
        - Add checked="checked" to some checkboxes randomly if requested
        - Select radio buttons appropriately if requested
        - Ensure every form field has a plausible random value according to its type
    15. If user asks to "populate table with example content", fill table cells with relevant realistic sample data
    16. ALWAYS make the actual changes requested - do not just acknowledge the request
    
    IMPORTANT: You MUST actually modify the HTML content. Do not just say you did it - actually return the modified HTML with the changes applied.
    
    CRITICAL: You must:
    1. Understand the user's request completely
    2. Make the appropriate changes to the HTML
    3. Return the complete HTML document with ONLY the requested changes
    4. Do NOT return just a message saying you changed it - return the actual modified HTML
    5. Do NOT wrap your response in markdown code blocks - return ONLY the raw HTML
    6. Do not leave placeholders in forms. Fill all form fields, checkboxes, and radio buttons as instructed
    
    Current HTML document to modify:
    ${currentContent}
    
    User request: ${prompt}
    
    CRITICAL: You MUST actually modify the HTML content. Do not just acknowledge the request - actually fill all form fields, tick checkboxes, select radio buttons, and replace placeholders with realistic sample data. Make the changes visible in the returned HTML.

    SPECIFIC INSTRUCTIONS FOR FORM FILLING:
    - If you see "Insert name here" → replace with "John Smith" or similar
    - If you see "Insert role here" → replace with "Data Engineer" or similar  
    - If you see "HH:MM:SS AM/PM" → replace with "09:30:00 AM" or similar
    - If you see checkboxes → add checked="checked" to some of them
    - If you see generic table content → replace with realistic task descriptions

    DO NOT create a new document. MODIFY the existing one. Return the SAME document structure with filled form fields.`;
} else {
      // For new document creation requests - return direct HTML
      systemPrompt = `You are a helpful AI assistant that creates high-quality, professional HTML documents. When a user requests a document, you should:

1. **Be conversational and natural**: Write in a friendly, helpful tone similar to ChatGPT
2. **Ask clarifying questions when needed**: If the request is vague, suggest improvements or ask for more details
3. **Provide comprehensive content**: Create detailed, well-structured documents that exceed expectations
4. **Use proper HTML formatting**: Format documents with semantic HTML tags, clear headings, bullet points, and logical structure
5. **Be creative and thoughtful**: Add relevant sections, suggestions, and best practices that enhance the document
6. **Show expertise**: Demonstrate knowledge of the document type and industry best practices
7. **Be helpful beyond the request**: Suggest additional sections or considerations that might be valuable

Your goal is to create documents that are not just functional, but impressive and professional. Think like an experienced consultant or professional writer who cares about delivering exceptional quality.

IMPORTANT: Return ONLY clean, well-formatted HTML. Do not use markdown formatting. Use proper HTML tags like:
- <h1>, <h2>, <h3> for headings
- <p> for paragraphs
- <ul>, <ol>, <li> for lists
- <strong>, <em> for emphasis
- <div> with appropriate classes for structure
- <style> tags for basic styling if needed

CRITICAL: Return ONLY the raw HTML content. Do not wrap in markdown code blocks or add explanations. Start directly with <!DOCTYPE html> or <html>.

Remember: You're not just generating content, you're being a helpful assistant who creates outstanding HTML documents.`;

      if (template) {
        systemPrompt += `\n\n**Template Reference**: Use this template structure as inspiration, but feel free to enhance and improve upon it:\n${template}`;
      }
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 8000,
      temperature: isModification ? 0.1 : 0.7, // Lower temperature for modifications, higher for creative document generation
    });

    const generatedContent = completion.choices[0]?.message?.content || '';
    console.log('AI Generated Content:', generatedContent.substring(0, 500));
    
    let htmlContent;
    if (isModification && currentContent) {
      // For modifications, the AI should return HTML directly
      let cleanContent = generatedContent;
      
      // Remove markdown code blocks if AI wrapped the response
      if (cleanContent.includes('```html')) {
        const htmlMatch = cleanContent.match(/```html\s*([\s\S]*?)\s*```/);
        if (htmlMatch) {
          cleanContent = htmlMatch[1];
        } else {
          console.warn('Failed to extract HTML from markdown wrapper');
        }
      }
      
      // Validate that the response is actually HTML
      if (cleanContent.trim().startsWith('<!DOCTYPE') || cleanContent.trim().startsWith('<html') || cleanContent.trim().startsWith('<')) {
        htmlContent = cleanContent;
        
        // Additional validation: check if the AI actually made the requested change
        if (prompt.toLowerCase().includes('logo') && prompt.toLowerCase().includes('change')) {
          const hasOriginalText = htmlContent.includes('Your Logo');
          const hasModifiedText = htmlContent.includes('My Logo');
          
          // If AI didn't make the change, try to make it ourselves
          if (hasOriginalText && !hasModifiedText && prompt.toLowerCase().includes('my logo')) {
            htmlContent = htmlContent.replace(/Your Logo/g, 'My Logo');
          }
        }
      } else {
        // If AI didn't return HTML, fall back to the original content
        console.warn('AI response is not HTML, falling back to original content');
        htmlContent = currentContent;
      }
    } else {
      // For new documents, AI now returns HTML directly
      let cleanContent = generatedContent;
      
      // Remove markdown code blocks if AI wrapped the response
      if (cleanContent.includes('```html')) {
        const htmlMatch = cleanContent.match(/```html\s*([\s\S]*?)\s*```/);
        if (htmlMatch) {
          cleanContent = htmlMatch[1];
        } else {
          console.warn('Failed to extract HTML from markdown wrapper');
        }
      }
      
      // Validate that the response is actually HTML
      if (cleanContent.trim().startsWith('<!DOCTYPE') || cleanContent.trim().startsWith('<html') || cleanContent.trim().startsWith('<')) {
        htmlContent = cleanContent;
      } else {
        // If AI didn't return HTML, create a basic HTML wrapper
        console.warn('AI response is not HTML, creating basic HTML wrapper');
        htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Document</title>
</head>
<body>
    <div>${generatedContent}</div>
</body>
</html>`;
      }
    }

    // Track changes for the response
    const changeResult = trackChanges(currentContent || '', htmlContent, prompt);
    
    // Only return the modified content if actual changes were made
    const responseContent = changeResult.hasChanges ? generatedContent : currentContent || generatedContent;
    const responseHtml = changeResult.hasChanges ? htmlContent : currentContent || htmlContent;

    // Save chat history to database
    try {
      const session = await getSession();
      
      // Only save chat history if documentId exists and is not a template preview
      if (session?.user?._id && documentId && !documentId.startsWith('template_')) {
        const userId = session.user._id;
        const userEmail = session.user.email;
        const companyId = session.user.companyId;
        
        // Find existing chat history or create new one
        let chatHistory = await ChatHistory.findOne({
          documentId: documentId,
          'user.id': userId
        });

        const newMessage = {
          type: 'user',
          message: prompt,
          response: responseContent,
          timestamp: new Date(),
        };

        if (chatHistory) {
          // Update existing chat history by adding new message
          chatHistory.messages.push(newMessage);
          await chatHistory.save();
        } else {
          // Create new chat history
          chatHistory = new ChatHistory({
            documentId,
            user: {
              id: userId,
              email: userEmail,
            },
            companyId: companyId,
            messages: [newMessage],
          });
          await chatHistory.save();
        }
      } else {
        console.log('Generate API - Skipping chat history save for template preview:', documentId);
      }
    } catch (chatError) {
      console.error('Error saving chat history:', chatError);
      // Don't fail the main request if chat history saving fails
    }

    return NextResponse.json({
      content: responseContent,
      contentHtml: responseHtml,
      changeSummary: changeResult.summary,
      hasChanges: changeResult.hasChanges,
    });

  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
}

