'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useState, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';

interface HtmlEditorProps {
  content: string;
  onChange: (content: string) => void;
}

interface PreserveStyleEditorProps {
  content: string;
  onChange: (content: string) => void;
}

// Simple contentEditable editor that preserves all inline styles perfectly
function PreserveStyleEditor({ content, onChange }: PreserveStyleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Set initial content when component mounts or content prop changes from external source
  useEffect(() => {
    if (editorRef.current) {
      if (content && !isEditing) {
        editorRef.current.innerHTML = content;
      } else if (!content) {
        editorRef.current.innerHTML = '<p>Click here to start editing...</p>';
      }
    }
  }, [content, isEditing]);
  
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    
    // Debounce the onChange call to prevent excessive updates
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      onChange(newContent);
    }, 150); // 150ms debounce
  };
  
  const handleFocus = () => {
    setIsEditing(true);
  };
  
  const handleBlur = () => {
    setIsEditing(false);
    
    // Make sure final content is saved when losing focus
    if (editorRef.current) {
      const finalContent = editorRef.current.innerHTML;
      onChange(finalContent);
    }
  };
  
  return (
    <div className="preserve-styles-editor">
      <style>
        {`
          .preserve-styles-editor {
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            overflow: hidden;
          }
          
          .editable-content {
            min-height: 500px;
            padding: 16px !important;
            outline: none;
            background: white;
            overflow: auto;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: #333;
          }
          
          /* Focus outline */
          .editable-content:focus {
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
          }
          
          /* Let inline styles override everything */
          .editable-content *[style] {
            /* Inline styles automatically have higher specificity */
          }
        `}
      </style>
      
      <div
        ref={editorRef}
        className="editable-content"
        contentEditable
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        suppressContentEditableWarning={true}
      />
    </div>
  );
}

export default function HtmlEditor({ content, onChange }: HtmlEditorProps) {
  const [htmlContent, setHtmlContent] = useState(content || '');
  const [activeTab, setActiveTab] = useState('preview');
  const isUpdatingFromPreview = useRef(false);
  const isUpdatingFromHtmlCode = useRef(false);

  // Initialize htmlContent when content prop changes
  useEffect(() => {
    if (content !== undefined && content !== htmlContent) {
      setHtmlContent(content);
    }
  }, [content]);

  const handlePreviewChange = (newBodyHtml: string) => {
    if (isUpdatingFromHtmlCode.current) {
      return;
    }
    
    isUpdatingFromPreview.current = true;
    
    // Preserve the original structure but update the body content
    let updatedHtml = htmlContent;
    
    // If the original content has a full HTML structure, preserve it
    if (htmlContent.includes('<html') || htmlContent.includes('<!DOCTYPE')) {
      // Replace the body content while preserving the HTML structure
      const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (bodyMatch) {
        updatedHtml = htmlContent.replace(
          /<body[^>]*>([\s\S]*)<\/body>/i,
          `<body>${newBodyHtml}</body>`
        );
      } else {
        // If no body tag found but HTML structure exists, wrap in body
        const htmlMatch = htmlContent.match(/<html[^>]*>([\s\S]*)<\/html>/i);
        if (htmlMatch) {
          const headMatch = htmlContent.match(/<head[^>]*>[\s\S]*?<\/head>/i);
          const head = headMatch ? headMatch[0] : '<head></head>';
          updatedHtml = htmlContent.replace(
            /<html[^>]*>([\s\S]*)<\/html>/i,
            `<html>${head}<body>${newBodyHtml}</body></html>`
          );
        }
      }
    } else {
      // If it's just body content, use the new content directly
      updatedHtml = newBodyHtml;
    }
    
    if (updatedHtml !== htmlContent) {
      setHtmlContent(updatedHtml);
      onChange(updatedHtml);
    }
    
    setTimeout(() => {
      isUpdatingFromPreview.current = false;
    }, 100);
  };
  
  const handleHtmlCodeChange = (newHtml: string) => {
    if (isUpdatingFromPreview.current) {
      return;
    }
    
    isUpdatingFromHtmlCode.current = true;
    console.log('HtmlEditor - handleHtmlCodeChange called:', {
      contentLength: newHtml?.length || 0,
      preview: newHtml?.substring(0, 100) + '...'
    });
    
    if (newHtml !== htmlContent) {
      setHtmlContent(newHtml);
      onChange(newHtml);
    }
    
    setTimeout(() => {
      isUpdatingFromHtmlCode.current = false;
    }, 100);
  };
  
  const handleTabChange = (newTab: string) => {
    console.log('HtmlEditor - Tab switching to:', newTab);
    setActiveTab(newTab);
    
    // Force content synchronization when switching tabs
    if (newTab === 'html') {
    } else if (newTab === 'preview') {
    }
  };

  const extractBodyContent = (html: string) => {
    
    if (!html || html.trim() === '') {
      console.log('HtmlEditor - Empty HTML content');
      return '<p>No content available</p>';
    }
    
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      return bodyMatch[1];
    }
    
    const htmlMatch = html.match(/<html[^>]*>([\s\S]*)<\/html>/i);
    if (htmlMatch) {
      const headRemoved = htmlMatch[1].replace(/<head[^>]*>[\s\S]*?<\/head>/i, '');
      return headRemoved.trim();
    }
    
    if (html.trim().startsWith('<') && !html.includes('<!DOCTYPE')) {
      return html;
    }
    
    return html;
  };

  const extractStyles = (html: string) => {
    if (!html || html.trim() === '') {
      return '';
    }
    
    // Extract styles from <style> tags in the head
    const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    if (styleMatches) {
      return styleMatches.join('\n');
    }
    
    return '';
  };

  const getStyledBodyContent = (html: string) => {
    const bodyContent = extractBodyContent(html);
    const styles = extractStyles(html);
    
    if (styles) {
      // Wrap the body content with the extracted styles
      return `<div class="html-content-wrapper">${styles}${bodyContent}</div>`;
    }
    
    return bodyContent;
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
          <TabsTrigger value="html">HTML Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card className="p-6">
            <div className="bg-white min-h-[500px] overflow-auto">
              <PreserveStyleEditor
                content={extractBodyContent(htmlContent)}
                onChange={handlePreviewChange}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="html" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">HTML Source Code</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Edit HTML Content
                </label>
                <Textarea
                  value={htmlContent}
                  onChange={(e) => handleHtmlCodeChange(e.target.value)}
                  placeholder="Enter your HTML content here..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>

            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
