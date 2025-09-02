'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useState, useEffect } from 'react';

interface HtmlEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function HtmlEditor({ content, onChange }: HtmlEditorProps) {
  const [htmlContent, setHtmlContent] = useState(content);
  const [activeTab, setActiveTab] = useState('preview');

  // Initialize htmlContent when content prop changes
  useEffect(() => {
    console.log('HtmlEditor - useEffect triggered with content:', content?.substring(0, 100) + '...');
    if (content && content !== htmlContent) {
      console.log('HtmlEditor - Setting htmlContent');
      setHtmlContent(content);
    }
  }, [content]);

  const handleHtmlChange = (newHtml: string) => {
    setHtmlContent(newHtml);
    onChange(newHtml);
  };

  const extractBodyContent = (html: string) => {
    console.log('HtmlEditor - extractBodyContent called with:', html?.substring(0, 100) + '...');
    
    if (!html || html.trim() === '') {
      console.log('HtmlEditor - Empty HTML content');
      return '<p>No content available</p>';
    }
    
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      console.log('HtmlEditor - Found body content');
      return bodyMatch[1];
    }
    
    const htmlMatch = html.match(/<html[^>]*>([\s\S]*)<\/html>/i);
    if (htmlMatch) {
      const headRemoved = htmlMatch[1].replace(/<head[^>]*>[\s\S]*?<\/head>/i, '');
      console.log('HtmlEditor - Found HTML content, removed head');
      return headRemoved.trim();
    }
    
    if (html.trim().startsWith('<') && !html.includes('<!DOCTYPE')) {
      console.log('HtmlEditor - Using HTML as-is');
      return html;
    }
    
    console.log('HtmlEditor - Returning HTML as fallback');
    return html;
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
          <TabsTrigger value="html">HTML Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card className="p-6">
            <div className="bg-white min-h-[500px] p-6 overflow-auto">
              {(() => {
                console.log('HtmlEditor - Rendering preview with htmlContent:', htmlContent?.substring(0, 100) + '...');
                const extractedContent = extractBodyContent(htmlContent);
                console.log('HtmlEditor - Extracted content:', extractedContent?.substring(0, 100) + '...');
                return (
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: extractedContent 
                    }}
                    className="html-preview"
                  />
                );
              })()}
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
                  onChange={(e) => handleHtmlChange(e.target.value)}
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
