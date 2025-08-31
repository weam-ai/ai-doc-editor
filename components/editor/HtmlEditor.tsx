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
    if (content && content !== htmlContent) {
      setHtmlContent(content);
    }
  }, [content]);

  const handleHtmlChange = (newHtml: string) => {
    setHtmlContent(newHtml);
    onChange(newHtml);
  };

  const extractBodyContent = (html: string) => {
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

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
          <TabsTrigger value="html">HTML Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Document Preview</h3>
            <div className="bg-white border border-gray-200 rounded-lg min-h-[500px] p-6 overflow-auto">
              {(() => {
                const extractedContent = extractBodyContent(htmlContent);
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
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleHtmlChange(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New HTML Document</title>
</head>
<body>
    <h1>New Document</h1>
    <p>Start building your HTML document here.</p>
</body>
</html>`)}
                  variant="outline"
                >
                  Reset to Default
                </Button>
                <Button
                  onClick={() => handleHtmlChange(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Styled Document</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 40px; background-color: #f5f5f5;">
    <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #333; text-align: center; margin-bottom: 30px;">Welcome to Your Document</h1>
        <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">This is a beautifully styled HTML document with inline CSS. You can customize the styles and content to match your needs.</p>
        <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h2 style="color: #007bff; margin-top: 0;">Key Features</h2>
            <ul style="color: #555;">
                <li>Inline CSS styling</li>
                <li>Responsive design</li>
                <li>Easy to customize</li>
                <li>Professional appearance</li>
            </ul>
        </div>
        <p style="color: #666; text-align: center; font-style: italic;">Edit the HTML above to see your changes in real-time!</p>
    </div>
</body>
</html>`)}
                  variant="outline"
                >
                  Load Styled Template
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
