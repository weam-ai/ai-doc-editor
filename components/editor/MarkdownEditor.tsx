'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Image as ImageIcon,
} from 'lucide-react';

interface MarkdownEditorProps {
  content: string;
  onChange: (markdown: string, html: string) => void;
}

const MarkdownEditor = ({ content, onChange }: MarkdownEditorProps) => {
  const [markdown, setMarkdown] = useState(content);
  const [activeTab, setActiveTab] = useState('edit');

  useEffect(() => {
    setMarkdown(content);
  }, [content]);

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    // Convert markdown to HTML for the onChange callback
    // This is a simple conversion, in production you might want to use a more robust library
    const html = value
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br>');
    
    onChange(value, html);
  };

  const insertMarkdown = (prefix: string, suffix: string = '', placeholder: string = '') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    
    const newText = markdown.substring(0, start) + 
                   prefix + 
                   (selectedText || placeholder) + 
                   suffix + 
                   markdown.substring(end);
    
    setMarkdown(newText);
    
    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText || placeholder).length
      );
    }, 0);
  };

  const markdownButtons = [
    { icon: Heading1, action: () => insertMarkdown('# ', '', 'Heading 1') },
    { icon: Heading2, action: () => insertMarkdown('## ', '', 'Heading 2') },
    { icon: Heading3, action: () => insertMarkdown('### ', '', 'Heading 3') },
    { icon: Bold, action: () => insertMarkdown('**', '**', 'Bold text') },
    { icon: Italic, action: () => insertMarkdown('*', '*', 'Italic text') },
    { icon: List, action: () => insertMarkdown('- ', '', 'List item') },
    { icon: ListOrdered, action: () => insertMarkdown('1. ', '', 'List item') },
    { icon: Quote, action: () => insertMarkdown('> ', '', 'Quote') },
    { icon: Code, action: () => insertMarkdown('`', '`', 'Code') },
    { icon: Link, action: () => insertMarkdown('[', '](url)', 'Link text') },
    { icon: ImageIcon, action: () => insertMarkdown('![', '](url)', 'Alt text') },
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 dark:bg-gray-800 p-2 flex flex-wrap gap-1">
        {markdownButtons.map((button, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={button.action}
            title={button.icon.name}
          >
            <button.icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      {/* Editor Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-0">
          <Textarea
            value={markdown}
            onChange={(e) => handleMarkdownChange(e.target.value)}
            placeholder="Start writing your markdown here..."
            className="min-h-[500px] border-0 rounded-none resize-none font-mono text-sm"
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div className="min-h-[500px] p-4 prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ node, inline, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-300">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-3 pl-6 text-gray-700 dark:text-gray-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-3 pl-6 text-gray-700 dark:text-gray-300">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-1 text-gray-700 dark:text-gray-300">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 dark:text-gray-400 my-4">
                    {children}
                  </blockquote>
                ),

                pre: ({ children }) => (
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                    {children}
                  </pre>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarkdownEditor;
