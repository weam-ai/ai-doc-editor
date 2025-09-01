import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, template, isModification = false, currentContent } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    let systemPrompt = '';
    
    if (isModification && currentContent) {
      // For modification requests, instruct AI to modify existing HTML
      systemPrompt = `You are an expert HTML document modifier. Your task is to modify an existing HTML document based on the user's request.

CRITICAL INSTRUCTIONS:
1. DO NOT create a new document from scratch
2. ONLY make the specific changes requested by the user
3. PRESERVE the existing HTML structure, styling, and layout EXACTLY as is
4. KEEP all existing CSS styles, classes, and inline styles UNCHANGED
5. MAINTAIN the same visual design, positioning, and dimensions
6. ONLY change the text content or attributes that are specifically requested
7. Return the COMPLETE modified HTML document, not just the changed parts
8. If the user asks to change text like "Your Logo" to "My Logo", ONLY change that specific text, keep everything else identical

EXAMPLE: If user says "change Your Logo to My Logo", you should:
- Find the text "Your Logo" in the HTML
- Replace ONLY "Your Logo" with "My Logo"
- Keep ALL other HTML, CSS, and structure exactly the same
- Return the complete HTML document with just this one text change

IMPORTANT: You MUST actually modify the HTML content. Do not just say you did it - actually return the modified HTML with the text changed.

CRITICAL: The user is asking you to change specific text in the HTML. You must:
1. Find the exact text they want to change
2. Replace it with the new text they want
3. Return the complete HTML document with ONLY that text changed
4. Do NOT return just a message saying you changed it - return the actual modified HTML
5. Do NOT wrap your response in markdown code blocks - return ONLY the raw HTML
6. Do NOT add any explanations, comments, or markdown formatting

WRONG RESPONSE FORMAT (DO NOT DO THIS):
- Do NOT use markdown code blocks
- Do NOT wrap HTML in backticks

CORRECT RESPONSE FORMAT (DO THIS):
- Return ONLY the raw HTML content
- Start directly with <!doctype html>

Current HTML document to modify:
${currentContent}

User request: ${prompt}

Please return the complete modified HTML document with ONLY the requested changes applied. Everything else must remain exactly the same.`;
    } else {
      // For new document creation requests
      systemPrompt = `You are a helpful AI assistant that creates high-quality, professional documents. When a user requests a document, you should:

1. **Be conversational and natural**: Write in a friendly, helpful tone similar to ChatGPT
2. **Ask clarifying questions when needed**: If the request is vague, suggest improvements or ask for more details
3. **Provide comprehensive content**: Create detailed, well-structured documents that exceed expectations
4. **Use proper formatting**: Format documents with clear headings, bullet points, and logical structure using markdown
5. **Be creative and thoughtful**: Add relevant sections, suggestions, and best practices that enhance the document
6. **Show expertise**: Demonstrate knowledge of the document type and industry best practices
7. **Be helpful beyond the request**: Suggest additional sections or considerations that might be valuable

Your goal is to create documents that are not just functional, but impressive and professional. Think like an experienced consultant or professional writer who cares about delivering exceptional quality.

Format your response in well-structured markdown with:
- Clear headings (# ## ###)
- Bullet points and numbered lists where appropriate
- Bold and italic formatting for emphasis
- Proper paragraph spacing
- Professional tone while remaining approachable

Remember: You're not just generating content, you're being a helpful assistant who creates outstanding documents.`;

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
      max_tokens: 4000,
      temperature: isModification ? 0.1 : 0.7, // Lower temperature for modifications, higher for creative document generation
    });

    const generatedContent = completion.choices[0]?.message?.content || '';
    
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
      // For new documents, convert markdown to HTML
      htmlContent = await convertMarkdownToHtml(generatedContent);
    }

    return NextResponse.json({
      content: generatedContent,
      contentHtml: htmlContent,
    });

  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
}

async function convertMarkdownToHtml(markdown: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Convert the following markdown to clean, well-formatted HTML. Use semantic HTML tags, maintain proper structure, and create visually appealing documents with good typography. Only return the HTML, no explanations or markdown code blocks."
        },
        {
          role: "user",
          content: markdown
        }
      ],
      max_tokens: 4000,
      temperature: 0.2,
    });

    return response.choices[0]?.message?.content || markdown;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return markdown; // Fallback to original markdown
  }
}
