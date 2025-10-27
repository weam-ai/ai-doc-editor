import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import dbConnect from '@/lib/db';
import ChatHistory from '@/models/ChatHistory';
import { getSession } from '@/app/config/withSession';
import { OPENAI, GEMINI } from '@/app/config/config';
import { createGeminiChatCompletion } from '@/lib/gemini';

// Initialize OpenAI client only when API key is available
const openai = OPENAI.API_KEY ? new OpenAI({
  apiKey: OPENAI.API_KEY,
}) : null;

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
    
    console.log('Template Detection:', {
      prompt: prompt,
      isTemplateRequest: isTemplateRequest,
      isModification: isModification,
      hasCurrentContent: !!currentContent
    });
    
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
    16. For job title/role changes, intelligently update all relevant information:
        - Job title/position name
        - Job description and responsibilities to match the new role
        - Skills section to include relevant technical and soft skills for the new role
        - Experience descriptions to reflect the new role's typical tasks and achievements
        - Education/certifications if relevant to the new field
        - Any other role-specific information (projects, tools, methodologies)
    17. ALWAYS make the actual changes requested - do not just acknowledge the request
    
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

    SPECIFIC INSTRUCTIONS FOR ROLE/JOB TITLE CHANGES:
    - When changing job titles, be intelligent about understanding the role transformation:
      * Research and understand what the new role typically involves
      * Update skills to include relevant technical and soft skills for the new role
      * Modify job descriptions to reflect typical responsibilities of the new role
      * Update experience bullet points to match the new role's common tasks and achievements
      * Adjust education/certifications to be relevant to the new field
      * Update any role-specific sections (portfolio items, project descriptions, tools, methodologies)
      * Ensure all content is coherent and relevant to the new position
    - Be thorough in your transformation - don't just change the title, update everything that should change

    DO NOT create a new document. MODIFY the existing one. Return the SAME document structure with filled form fields.`;
    } else if (isTemplateRequest) {
      // For template creation requests - create visual templates
      systemPrompt = `You are a creative AI assistant that creates colorful, visual HTML templates. 

CRITICAL: You must create a VISUAL, COLORFUL HTML TEMPLATE - NOT text descriptions or instructions!

TEMPLATE REQUIREMENTS:
1. **VISUAL HTML TEMPLATE**: Create an actual HTML page with embedded CSS styling
2. **COLORFUL DESIGN**: Use bright colors, gradients, shadows, and modern styling
3. **STRUCTURED LAYOUT**: Create a real template layout with visual sections
4. **PLACEHOLDER CONTENT**: Use placeholder text that looks like a real template

FOR FACEBOOK ADS TEMPLATE:
Create a visual Facebook ad mockup with:
- Colorful header section (use gradients: blue-to-purple, or rainbow colors)
- SMALL image placeholder (max 300px height, not too big)
- Colorful text areas with vibrant fonts (use CSS gradients, rainbow colors, bright text colors)
- Multiple background colors (gradients, bright sections)
- Character count indicators with colorful styling
- Vibrant, eye-catching design with lots of colors
- Use colorful fonts (rainbow text, gradient text, bright colors)
- Make backgrounds colorful with gradients and bright colors

FOR OTHER TEMPLATES:
- Create actual visual layouts, not text descriptions
- Use CSS styling to make them colorful and attractive
- Include proper HTML structure with divs, sections, etc.
- Make it look like a real template, not instructions

CRITICAL RULES:
- NEVER return text descriptions of templates
- NEVER return instructions or rules
- ALWAYS return a complete HTML page with CSS styling
- ALWAYS make it colorful and visual
- ALWAYS create an actual template layout

COLOR REQUIREMENTS:
- Use bright, vibrant colors throughout (red, blue, green, purple, orange, yellow, pink)
- Apply CSS gradients for backgrounds (linear-gradient, radial-gradient)
- Use colorful text (rainbow gradients, bright colors, not black/gray)
- Make image placeholders SMALL (max 300px height, reasonable width)
- Use multiple background colors in different sections
- Apply colorful borders, shadows, and effects

SIZING REQUIREMENTS:
- Image placeholders should be SMALL and reasonable (not huge)
- Text areas should be appropriately sized
- Use responsive design with proper proportions

EXAMPLE OF WRONG OUTPUT: "Sponsored · Facebook Ad Template [Your Brand Name Here] 15-25 characters recommended"

EXAMPLE OF CORRECT OUTPUT: A complete HTML page with:
- Colorful gradient header (blue-to-purple)
- SMALL image placeholder (300px height max) with colorful border
- Rainbow gradient text for headlines
- Colorful backgrounds for each section
- Bright, vibrant colors throughout
- No black/gray text - use colorful fonts

Return ONLY a complete HTML document with embedded CSS styling. Start with <!DOCTYPE html> and include all necessary styling to make it visually appealing and colorful.`;

    } else {
      // For regular document creation requests - return comprehensive content
      systemPrompt = `You are a helpful AI assistant that creates high-quality, professional HTML documents. When a user requests a document, you should:

1. **Be conversational and natural**: Write in a friendly, helpful tone similar to ChatGPT
2. **Ask clarifying questions when needed**: If the request is vague, suggest improvements or ask for more details
3. **Provide comprehensive content**: Create detailed, well-structured documents that exceed expectations - aim for 1000+ words of meaningful content
4. **Use proper HTML formatting**: Format documents with semantic HTML tags, clear headings, bullet points, and logical structure
5. **Be creative and thoughtful**: Add relevant sections, suggestions, and best practices that enhance the document
6. **Show expertise**: Demonstrate knowledge of the document type and industry best practices
7. **Be helpful beyond the request**: Suggest additional sections or considerations that might be valuable
8. **Create substantial content**: Don't just create a basic template - fill it with realistic, detailed content that would be useful in real-world scenarios
9. **Add multiple sections**: Include various relevant sections, examples, and comprehensive information
10. **Use realistic data**: Include realistic names, dates, examples, and content that makes the document feel authentic

Your goal is to create documents that are not just functional, but impressive and professional. Think like an experienced consultant or professional writer who cares about delivering exceptional quality.

For blog posts, websites, or content-heavy documents:
- Include multiple detailed sections
- Add realistic sample content
- Include multiple examples or case studies
- Add navigation, headers, footers
- Include call-to-action sections
- Add contact information, about sections, etc.
- Make it look like a real, professional website or document

IMPORTANT: Return ONLY clean, well-formatted HTML. Do not use markdown formatting. Use proper HTML tags like:
- <h1>, <h2>, <h3> for headings
- <p> for paragraphs
- <ul>, <ol>, <li> for lists
- <strong>, <em> for emphasis
- <div> with appropriate classes for structure
- <style> tags for basic styling if needed
- <header>, <nav>, <main>, <section>, <article>, <footer> for semantic structure

CRITICAL: Return ONLY the raw HTML content. Do not wrap in markdown code blocks or add explanations. Start directly with <!DOCTYPE html> or <html>.

Remember: You're not just generating content, you're being a helpful assistant who creates outstanding HTML documents with substantial, useful content.`;

      if (template) {
        systemPrompt += `\n\n**Template Reference**: Use this template structure as inspiration, but feel free to enhance and improve upon it:\n${template}`;
      }
    }

    let generatedContent = '';
    
    // Determine which AI service to use based on available API keys
    // Priority: OpenAI > Gemini > Error (if neither is configured)
    const useOpenAI = OPENAI.API_KEY && !GEMINI.API_KEY;
    const useGemini = GEMINI.API_KEY && !OPENAI.API_KEY;
    
    // Default to OpenAI if both keys are available, or if neither is available (fallback)
    const shouldUseOpenAI = useOpenAI || (OPENAI.API_KEY && GEMINI.API_KEY) || (!OPENAI.API_KEY && !GEMINI.API_KEY);
    
    console.log('AI Service Selection:', {
      hasOpenAI: !!OPENAI.API_KEY,
      hasGemini: !!GEMINI.API_KEY,
      useOpenAI,
      useGemini,
      shouldUseOpenAI,
      openaiClient: !!openai
    });
    
    if (shouldUseOpenAI && openai) {
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
        max_tokens: 12000, // Increased from 8000 to allow for longer, more comprehensive content
        temperature: isModification ? 0.1 : 0.7, // Lower temperature for modifications, higher for creative document generation
      });

      generatedContent = completion.choices[0]?.message?.content || '';
    } else if (useGemini) {
      console.log('Using Gemini');
      // Use Gemini for completion
      generatedContent = await createGeminiChatCompletion(
        systemPrompt,
        prompt,
        {
          maxTokens: 12000,
          temperature: isModification ? 0.1 : 0.7
        }
      );
    } else if (!openai && !GEMINI.API_KEY) {
      throw new Error('No AI service configured. Please set either OPENAI_API_KEY or GEMINI_API_KEY environment variable.');
    } else if (shouldUseOpenAI && !openai) {
      throw new Error('OpenAI API key is missing or invalid. Please check your OPENAI_API_KEY environment variable.');
    } else {
      throw new Error('Unable to determine AI service. Please check your API key configuration.');
    }
    
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

        // Additional validation for role changes
        if (prompt.toLowerCase().includes('change') && (prompt.toLowerCase().includes('to') || prompt.toLowerCase().includes('into'))) {
          // Check if it's a job title change by looking for common patterns
          const roleChangePatterns = [
            /change\s+(\w+\s*\w*)\s+to\s+(\w+\s*\w*)/i,
            /change\s+(\w+\s*\w*)\s+into\s+(\w+\s*\w*)/i,
            /update\s+(\w+\s*\w*)\s+to\s+(\w+\s*\w*)/i,
            /convert\s+(\w+\s*\w*)\s+to\s+(\w+\s*\w*)/i
          ];
          
          for (const pattern of roleChangePatterns) {
            const match = prompt.match(pattern);
            if (match) {
              const fromRole = match[1].trim();
              const toRole = match[2].trim();
              break;
            }
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

