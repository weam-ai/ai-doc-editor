'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/hooks/useToast';
import Editor from '@/components/editor/gdocs/Editor';
import { exportToPDF, exportToWord, exportToHTML } from '@/lib/export';
import { 
  ArrowLeft, 
  Menu, 
  FileText, 
  ChevronDown, 
  Star, 
  Save, 
  Download, 
  Share2
} from 'lucide-react';

interface Document {
  _id: string;
  title: string;
  content: string;
  contentHtml: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  templateName?: string;
  isTemplate?: boolean; // Added for template preview
  editor?: string; // Specifies which editor to use
}

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const [document, setDocument] = useState<Document | null>(null);
  const [title, setTitle] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [docRequest, setDocRequest] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedDoc = localStorage.getItem(`document_${params.id}`);
    
    if (storedDoc) {
      try {
        const doc = JSON.parse(storedDoc);
        setDocument(doc);
        setTitle(doc.title);
        setContentHtml(doc.contentHtml);
        setHasUnsavedChanges(!doc._id.startsWith('temp_') && doc._id.length < 24);
      } catch (error) {
        console.error('Error parsing stored document:', error);
        createDefaultDocument();
      }
    } else {
      createDefaultDocument();
    }
  }, [params.id]);

  const createDefaultDocument = () => {
    const defaultDoc = {
      _id: `temp_${Date.now()}`,
      title: 'New Document',
      content: '',
      contentHtml: '<h1>New Document</h1><p>Start writing your content here...</p>',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      templateName: 'Blank Document'
    };
    setDocument(defaultDoc);
    setTitle(defaultDoc.title);
    setContentHtml(defaultDoc.contentHtml);
    setHasUnsavedChanges(true);
  };

  const checkForChanges = useCallback(() => {
    if (!document) return false;
    if (title !== document.title) return true;
    if (contentHtml !== document.contentHtml) return true;
    return false;
  }, [document, title, contentHtml]);

  useEffect(() => {
    setHasUnsavedChanges(checkForChanges());
  }, [checkForChanges]);

  const handleContentChange = (html: string) => {
    if (isSaving) return;
    setContentHtml(html);
    setHasUnsavedChanges(true);
  };

  const memoizedContentHtml = useMemo(() => contentHtml, [contentHtml]);

  const handleSave = async () => {
    if (!document) return;

    setIsSaving(true);
    try {
      const updatedDoc = {
        ...document,
        title,
        content: contentHtml.replace(/<[^>]*>/g, ''), // generate plain text content
        contentHtml,
        updatedAt: new Date().toISOString()
      };

      let response;
      let savedDoc;

      if (document._id.startsWith('template_') || document._id.startsWith('temp_')) {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/documents`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: updatedDoc.title,
            content: updatedDoc.content,
            contentHtml: updatedDoc.contentHtml,
            tags: updatedDoc.tags || [],
            templateName: document.templateName,
            editor: 'gdocs'
          }),
        });

        if (!response.ok) throw new Error('Failed to create document');
        savedDoc = await response.json();
        router.replace(`/editor/${savedDoc._id}`);
        toast({ title: 'Document saved', description: 'New document created and saved successfully!' });
      } else {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/documents/${document._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: updatedDoc.title,
            content: updatedDoc.content,
            contentHtml: updatedDoc.contentHtml,
            tags: updatedDoc.tags || [],
            editor: 'gdocs'
          }),
        });

        if (!response.ok) throw new Error('Failed to save document');
        savedDoc = await response.json();
        toast({ title: 'Document saved', description: 'Your changes have been saved successfully.' });
      }
      
      setDocument(savedDoc);
      setHasUnsavedChanges(false);
      localStorage.setItem(`document_${savedDoc._id}`, JSON.stringify(savedDoc));
      
    } catch (error) {
      console.error('Error saving document:', error);
      toast({ title: 'Save failed', description: 'Failed to save document. Please try again.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDocRequest = async () => {
    if (!docRequest.trim()) return;

    const userMessage = docRequest;
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    setDocRequest('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage, contentHtml);
      setContentHtml(aiResponse);
      setHasUnsavedChanges(true);
      setChatHistory(prev => [...prev, { type: 'ai', message: `I've updated your document based on your request: "${userMessage}"` }]);
      toast({ title: 'Document updated', description: 'Your document has been modified based on your request.' });
    } catch (error) {
      console.error('Error processing AI request:', error);
      toast({ title: 'Error', description: 'Failed to process your request. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (request: string, currentContent: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: request,
          template: null,
          isModification: true,
          currentContent: currentContent
        }),
      });

      if (!response.ok) throw new Error(`API request failed: ${response.status}`);
      const data = await response.json();
      return data.contentHtml && data.contentHtml.trim().startsWith('<') ? data.contentHtml : currentContent;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return currentContent;
    }
  };

  const handleDownload = async (format: string) => {
    if (!document) return;
    try {
      switch (format) {
        case 'pdf': await exportToPDF(document.title, contentHtml); break;
        case 'word': await exportToWord(document.title, contentHtml); break;
        case 'html': exportToHTML(document.title, contentHtml); break;
        default: toast({ title: 'Error', description: 'Unsupported download format', variant: 'destructive' }); return;
      }
      toast({ title: 'Download started', description: `Your document is being downloaded as ${format.toUpperCase()}` });
    } catch (error) {
      console.error('Download error:', error);
      toast({ title: 'Download failed', description: 'Failed to download document. Please try again.', variant: 'destructive' });
    }
  };

  if (!document) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => router.push('/')} className="mr-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-none text-lg font-semibold bg-transparent focus-visible:ring-0 px-0"
                  onBlur={() => setIsEditing(false)}
                  onFocus={() => setIsEditing(true)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={handleSave} disabled={!hasUnsavedChanges || isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Select onValueChange={(value) => handleDownload(value)}>
                <SelectTrigger className="w-32">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="word">Word</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-1">
            <Card className="h-full">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">AI Assistant</h3>
              </div>
              <div className="p-4 flex flex-col">
                <div className="space-y-3 overflow-y-auto mb-4 max-h-[300px] min-h-[200px]">
                  {chatHistory.map((message, index) => (
                    <div key={index} className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8'}`}>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 border-t pt-4 mt-auto">
                  <Textarea
                    placeholder="Describe your desired changes..."
                    value={docRequest}
                    onChange={(e) => setDocRequest(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button onClick={handleDocRequest} disabled={!docRequest.trim() || isLoading} className="w-full">
                    {isLoading ? 'Processing...' : 'Send Request'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Editor
              content={memoizedContentHtml}
              onChange={handleContentChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
