import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ChatHistory from '@/models/ChatHistory';
import { getSession } from '@/app/config/withSession';
import { GEMINI } from '@/app/config/config';
import { createGeminiChatCompletionStream } from '@/lib/gemini';

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
                                  (prompt.toLowerCase().includes('create') && (
                                    prompt.toLowerCase().includes('timeline') ||
                                    prompt.toLowerCase().includes('dashboard')
                                  ));
    
    
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

    } else if (isInfographicRequest) {
      // For infographic creation requests - create visual, data-driven infographics
      systemPrompt = `YOU ARE AN EXPERT HTML INFOGRAPHIC DESIGNER. Your ONLY job is to create BEAUTIFUL, VISUAL, PROFESSIONAL infographics with colors, gradients, cards, and proper styling.

CRITICAL: YOU MUST CREATE VISUAL HTML - NOT PLAIN TEXT!

CREATIVE FREEDOM - VARIETY IS KEY!
- **VARY YOUR LAYOUTS**: Don't use the same layout every time!
- For social media infographics: Use vertical/portrait layouts with bold headlines
- For dashboards: Use grid layouts with multiple metric cards
- For timelines: Use horizontal or vertical timeline layouts
- For comparisons: Use side-by-side or split layouts
- For Facebook ads: Create compact, eye-catching designs with clear CTAs
- For presentations: Use clean, hierarchical layouts with sections
- **BE CREATIVE**: Each infographic should have a UNIQUE layout based on the user's specific request!

ESSENTIAL VISUAL ELEMENTS:
1. **Backgrounds**: Use gradients (linear-gradient, radial-gradient), colorful backgrounds, or light greys (#f5f5f5, #ffffff, #f0f0f0)
2. **Gradients**: Create varied gradients - #A8C5FF-to-#C6B8FF, #FFD3A5-to-#FFAAA6, #B2F0E3-to-#A8D8FF, rainbow colors(#FFD3A5,#FFAAA6,#D4A5FF,#A5D8FF,#A5FFD6)
3. **Cards & Boxes**: White cards with shadows, colorful bordered sections, gradient boxes
4. **Typography**: Large numbers (36px-72px, bold), colored text, varied font sizes
5. **Icons**: Use emoji (📈, 🌐, 🎯, 💬, 🚀, ✨, ⭐, etc.) or create icon-like elements
6. **Colors**: Use vibrant colors - blues (#2196F3, #4A90E2), purples (#9B59B6), oranges (#FF9800), greens (#4CAF50), pinks (#E91E63)
7. **Spacing**: Professional padding (20px-40px) and margins
8. **Borders**: Rounded corners (border-radius: 8px-16px)
9. **Shadows**: box-shadow: 0 2px 8px rgba(0,0,0,0.1) or 0 4px 12px rgba(0,0,0,0.08)

LAYOUT INSPIRATIONS:

For Social Media Infographics:
- Vertical layout (portrait orientation)
- Bold headline section at top
- Icon + stat combinations
- Call-to-action section at bottom
- Compact design fitting mobile screens

For Dashboards:
- Grid of metric cards
- Header section with title
- Multiple rows/columns of data
- Charts representation with colored bars
- Filter or category sections

For Timelines:
- Horizontal or vertical flow
- Milestone markers
- Connecting lines
- Date labels
- Event descriptions

For Comparisons:
- Split-screen layouts
- Side-by-side sections
- Before/after sections
- Venn diagrams (CSS-based)
- Pros/cons lists with icons

OUTPUT REQUIREMENTS:
1. ALWAYS start with <!DOCTYPE html>
2. ALWAYS include <html>, <head>, and <body> tags
3. ALWAYS use inline styles (style="...") on EVERY element - NO external CSS
4. VARY your gradients and color schemes - don't use the same colors every time!
5. VARY your layout structures - be creative based on user's request
6. ALWAYS use large, colored numbers/text (36px+, bold, colored)
7. ALWAYS add icons/emoji to make it visual
8. ALWAYS use proper colors for readability (#333 for dark, #FFF for light, vibrant colors for highlights)
9. NEVER return plain text - EVERYTHING must have inline styling
10. NEVER wrap in markdown code blocks - return RAW HTML
11. **IMPORTANT**: Analyze the user's request and create an appropriate layout - for Facebook ads, make it compact; for dashboards, make it grid-based; for timelines, make it chronological; etc.

CRITICAL: Create a UNIQUE, VISUAL infographic with varied layouts, colors, gradients, and styling - NOT the same template every time!`;

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

