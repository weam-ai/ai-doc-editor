'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/hooks/useToast';
import RichTextEditor from '@/components/editor/RichTextEditor';
import MarkdownEditor from '@/components/editor/MarkdownEditor';
import TwoColumnEditor from '@/components/editor/TwoColumnEditor';
import AnnualReportEditor from '@/components/editor/AnnualReportEditor';
import HtmlEditor from '@/components/editor/HtmlEditor';
import { exportToPDF, exportToWord, exportToHTML } from '@/lib/export';
import { 
  ArrowLeft, 
  Menu, 
  FileText, 
  ChevronDown, 
  Star, 
  Save, 
  Download, 
  Share2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Image,
  Table,
  Palette,
  Highlighter,
  Type,
  Heading1,
  Heading2
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
  const [content, setContent] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [activeTab, setActiveTab] = useState('rich-text');
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);
  const [contentVersion, setContentVersion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [docRequest, setDocRequest] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<string>('');
  
  // Use refs to preserve content during save operations
  const contentRef = useRef(content);
  const contentHtmlRef = useRef(contentHtml);
  
  // Store a complete snapshot of content before save
  const contentSnapshotRef = useRef<{content: string, contentHtml: string} | null>(null);
  
  // Block ALL content changes for a period after save
  const contentChangeBlockedRef = useRef(false);

  useEffect(() => {
    // Try to get document from localStorage first (from template selection)
    const storedDoc = localStorage.getItem(`document_${params.id}`);
    
    if (storedDoc) {
      try {
        const doc = JSON.parse(storedDoc);
        setDocument(doc);
        setTitle(doc.title);
        setContent(doc.content);
        setContentHtml(doc.contentHtml);
        // Check if this is a new document that needs saving
        setHasUnsavedChanges(!doc._id.startsWith('temp_') && doc._id.length < 24);
      } catch (error) {
        console.error('Error parsing stored document:', error);
        createDefaultDocument();
      }
    } else {
      createDefaultDocument();
    }
  }, [params.id]); // Only reload when params.id changes, not when document state changes

  const createDefaultDocument = () => {
    // Create a default document if none exists
    const defaultDoc = {
      _id: `temp_${Date.now()}`, // Temporary ID for new documents
      title: 'New Document',
      content: '# New Document\n\nStart writing your content here...',
      contentHtml: '<h1>New Document</h1><p>Start writing your content here...</p>',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      templateName: 'Blank Document',
      editor: 'rich-text' // Set default editor to valid enum value
    };
    setDocument(defaultDoc);
    setTitle(defaultDoc.title);
    setContent(defaultDoc.content);
    setContentHtml(defaultDoc.contentHtml);
    setHasUnsavedChanges(true); // New documents should show as unsaved
  };

  // Function to check if document has unsaved changes
  const checkForChanges = () => {
    if (!document) return false;
    
    // Check if title changed
    if (title !== document.title) return true;
    
    // Check if content changed
    if (content !== document.content) return true;
    
    // Check if contentHtml changed
    if (contentHtml !== document.contentHtml) return true;
    
    return false;
  };

  // Update hasUnsavedChanges whenever title, content, or contentHtml changes
  useEffect(() => {
    setHasUnsavedChanges(checkForChanges());
  }, [title, content, contentHtml, document]);

  // Debug content changes and update refs
  useEffect(() => {
    if (!isReloading && !contentChangeBlockedRef.current) {
      contentRef.current = content;
    }
  }, [content, isReloading]);

  useEffect(() => {
    if (!isReloading && !contentChangeBlockedRef.current) {
      contentHtmlRef.current = contentHtml;
    }
  }, [contentHtml, isReloading]);

  const handleContentChange = (markdown: string, html: string) => {
    // Prevent content changes during save operations
    if (isSaving || isReloading) {
      return;
    }
    
    // Prevent content changes if we have a snapshot (means save just happened)
    if (contentSnapshotRef.current) {
      return;
    }
    
    // Prevent content changes if content change is blocked
    if (contentChangeBlockedRef.current) {
      return;
    }
    
    // Only update if content actually changed to prevent unnecessary re-renders
    setContent(prevContent => {
      if (prevContent !== markdown) {
        setHasUnsavedChanges(true);
        return markdown;
      }
      return prevContent;
    });
    
    setContentHtml(prevHtml => {
      if (prevHtml !== html) {
        setHasUnsavedChanges(true);
        return html;
      }
      return prevHtml;
    });
  };

  // Prevent unnecessary re-renders by memoizing content
  const memoizedContent = useMemo(() => content, [content]);
  const memoizedContentHtml = useMemo(() => contentHtml, [contentHtml]);

  const handleSave = async () => {
    if (!document) return;

    // Take a complete snapshot of current content BEFORE any save operations
    const contentSnapshot = {
      content: content,
      contentHtml: contentHtml
    };
    contentSnapshotRef.current = contentSnapshot;
    
    // BLOCK ALL CONTENT CHANGES IMMEDIATELY
    contentChangeBlockedRef.current = true;
    
    setIsSaving(true);
    setIsReloading(true); // Prevent content reloading during save
    try {
      const updatedDoc = {
        ...document,
        title,
        content,
        contentHtml,
        updatedAt: new Date().toISOString()
      };

      let response;
      let savedDoc;

      // Check if this is a template document or new document (temporary ID)
      if (document._id.startsWith('template_') || document._id.startsWith('temp_')) {
        // Create new document in database from template or new document
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/documents`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: updatedDoc.title,
            content: updatedDoc.content,
            contentHtml: updatedDoc.contentHtml,
            tags: updatedDoc.tags || [],
            templateName: document.templateName, // Preserve template name if it exists
            editor: document.editor // Preserve editor type
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create document');
        }

        savedDoc = await response.json();
        
        // Update the URL to reflect the new document ID
        router.replace(`/editor/${savedDoc._id}`);
        
        toast({
          title: 'Document saved',
          description: document._id.startsWith('template_') 
            ? 'Template saved as new document!' 
            : 'New document created and saved successfully!',
        });
      } else {
        // Update existing document
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/documents/${document._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: updatedDoc.title,
            content: updatedDoc.content,
            contentHtml: updatedDoc.contentHtml,
            tags: updatedDoc.tags || [],
            editor: document.editor // Preserve editor type
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save document');
        }

        savedDoc = await response.json();
        
        toast({
          title: 'Document saved',
          description: 'Your changes have been saved successfully to the database.',
        });
      }
      
      // Update local state but preserve current editor content
      setDocument({
        ...savedDoc,
        content: contentSnapshot.content, // Use snapshot content
        contentHtml: contentSnapshot.contentHtml // Use snapshot HTML content
      });
      setHasUnsavedChanges(false);
      
      // Also update localStorage as backup with snapshot content
      localStorage.setItem(`document_${savedDoc._id}`, JSON.stringify({
        ...savedDoc,
        content: contentSnapshot.content,
        contentHtml: contentSnapshot.contentHtml
      }));
      
    } catch (error) {
      console.error('Error saving document:', error);
      toast({
        title: 'Save failed',
        description: 'Failed to save document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
      setIsReloading(false); // Allow content reloading after save
      
      // FORCE RESTORE the content from snapshot IMMEDIATELY
      setContent(contentSnapshot.content);
      setContentHtml(contentSnapshot.contentHtml);
      
      // Also force update the document state to match
      setDocument(prev => prev ? {
        ...prev,
        content: contentSnapshot.content,
        contentHtml: contentSnapshot.contentHtml
      } : prev);
      
      // Clear the snapshot after restore to allow normal editing
      setTimeout(() => {
        contentSnapshotRef.current = null;
      }, 500);
      
      // Unblock content changes after a longer delay to ensure all effects have run
      setTimeout(() => {
        contentChangeBlockedRef.current = false;
      }, 2000); // Wait 2 seconds to ensure all effects have completed
    }
  };
  


  const handleDocRequest = async () => {
    if (!docRequest.trim()) return;

    const userMessage = docRequest;
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    setDocRequest('');
    
    // Show loading immediately after button click
    setIsLoading(true);

    try {
      // Call OpenAI API to handle the request intelligently
      const aiResponse = await generateAIResponse(userMessage, contentHtml);
      
      setContentHtml(aiResponse);
      setContent(aiResponse.replace(/<[^>]*>/g, '')); // Strip HTML for markdown
      setHasUnsavedChanges(true);
      setContentVersion(prev => prev + 1); // Force editor re-render
      
      // Add AI response to chat history
      setChatHistory(prev => [...prev, { type: 'ai', message: `I've updated your document based on your request: "${userMessage}"` }]);
      
      toast({
        title: 'Document updated',
        description: 'Your document has been modified based on your request.',
      });
    } catch (error) {
      console.error('Error processing AI request:', error);
      toast({
        title: 'Error',
        description: 'Failed to process your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (request: string, currentContent: string) => {
    // console.log('AI Request:', request);
    // console.log('Current content length:', currentContent.length);
    
    // Detect if this is a new/template document or an existing document with real content
    const isNewOrTemplateDocument = (content: string) => {
      // Check for default blank document content
      if (content.includes('Start writing your content here...') || 
          content.includes('New Document')) {
        return true;
      }
      
      // Check for template placeholder patterns
      if (content.includes('[Your Name]') || 
          content.includes('[Write a compelling') ||
          content.includes('[Key achievement') ||
          content.includes('[Company Name]') ||
          content.includes('[your.email@example.com]') ||
          content.includes('Start writing your business proposal content here...')) {
        return true;
      }
      
      // If content is very short (less than 100 chars), likely new
      if (content.trim().length < 100) {
        return true;
      }
      
      return false;
    };
    
    const isModification = !isNewOrTemplateDocument(currentContent);
    
    try {
      // Call OpenAI API to handle the request intelligently
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: request,
          template: null,
          isModification: isModification,
          currentContent: currentContent
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      // console.log('OpenAI response received:', data);
      // console.log('Response contentHtml length:', data.contentHtml?.length);
      // console.log('Response contentHtml starts with:', data.contentHtml?.substring(0, 200));
      
      if (data.contentHtml && data.contentHtml.trim().startsWith('<')) {
        // console.log('Returning HTML content');
        return data.contentHtml;
      } else if (!isModification && data.content) {
        // For new document creation, if no HTML is provided, return the raw content
        // This allows ChatGPT-like responses to be displayed as-is
        console.log('New document creation - returning raw content');
        return data.content;
      } else {
        // Fallback if no valid content
        console.warn('AI response has no valid content, falling back to original content');
        return currentContent;
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      // Fallback to original content if API fails
      return currentContent;
    }
  };

  const handleTopToolbarAction = (action: string, value?: string) => {
    // Allow toolbar actions for rich-text tab or HTML editor
    const isRichTextMode = activeTab === 'rich-text';
    const isHtmlEditor = document?.editor === 'html';
    
    if (!isRichTextMode && !isHtmlEditor) {
      toast({
        title: 'Switch to Rich Text or HTML Editor',
        description: 'Please switch to Rich Text mode or use HTML Editor to use formatting tools.',
      });
      return;
    }

    // Send the action to the appropriate editor via a custom event
    const event = new CustomEvent('toolbar-action', { 
      detail: { action, value, content, contentHtml } 
    });
    window.dispatchEvent(event);
  };

  const handleDownload = async (format: string) => {
    if (!document) return;

    try {
      switch (format) {
        case 'pdf':
          await exportToPDF(document.title, contentHtml);
          break;
        case 'word':
          await exportToWord(document.title, contentHtml);
          break;
        case 'html':
          exportToHTML(document.title, contentHtml);
          break;
        default:
          toast({
            title: 'Error',
            description: 'Unsupported download format',
            variant: 'destructive',
          });
          return;
      }

      toast({
        title: 'Download started',
        description: `Your document is being downloaded as ${format.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: 'Download failed',
        description: 'Failed to download document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      // Reset the download format to allow the same option to be selected again
      setTimeout(() => setDownloadFormat(''), 100);
    }
  };

  // Remove the full-page loading state - we'll show inline loading instead

  if (!document) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/')}
                className="mr-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Templates
              </Button>
              <Button variant="ghost" size="icon">
                <Menu className="w-4 h-4" />
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
                {isEditing && (
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                )}
                {/* {document?.isTemplate && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Template Preview
                  </span>
                )} */}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* <Button variant="ghost" size="icon">
                <Star className="w-4 h-4" />
              </Button> */}
              <Button onClick={handleSave} disabled={!hasUnsavedChanges || isSaving}>
                {isSaving ? (
                  <div className="flex items-center">
                    <svg className="animate-spin h-4 w-4 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {document?.isTemplate ? 'Save as New Document' : 'Save'}
                  </>
                )}
              </Button>
              <Select 
                value={downloadFormat} 
                onValueChange={(value) => {
                  setDownloadFormat(value);
                  handleDownload(value);
                }}
              >
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



      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Panel - Chat & AI */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">AI Assistant</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ask me to modify your document in any way
                </p>
              </div>
              
                            <div className="p-4 flex flex-col">
                {/* Chat History - Fixed height, scrollable */}
                <div className="space-y-3 overflow-y-auto mb-4 max-h-[300px] min-h-[200px]">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      <p className="text-sm">No conversations yet. Start by asking me to modify your document!</p>
                    </div>
                  ) : (
                    chatHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 ml-8'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mr-8'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Chat Input - Always visible at bottom */}
                <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">
                  <Textarea
                    placeholder="Describe what you want me to change, add, or remove from your document..."
                    value={docRequest}
                    onChange={(e) => setDocRequest(e.target.value)}
                    className="min-h-[80px] resize-none"
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleDocRequest()}
                    disabled={isLoading}
                  />
                  
                  {/* Loading indicator - shows above Send Request button */}
                  {isLoading && (
                    <div className="flex items-center justify-center py-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#6336e8' }}></div>
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#6336e8', animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#6336e8', animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleDocRequest} 
                    disabled={!docRequest.trim() || isLoading}
                    className="w-full"
                  >
                    {isLoading ? 'Processing...' : 'Send Request'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel - Editor */}
          <div className="lg:col-span-4">
            <Card className="h-full">
              {/* <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </Button>
                  </div>
                </div>
              </div> */}

              {/* Formatting Toolbar */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('bold')}
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('italic')}
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('underline')}
                    >
                      <Underline className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('strikethrough')}
                    >
                      <Strikethrough className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('align-left')}
                    >
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('align-center')}
                    >
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('align-right')}
                    >
                      <AlignRight className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('align-justify')}
                    >
                      <AlignJustify className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('bullet-list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('ordered-list')}
                    >
                      <ListOrdered className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('link')}
                    >
                      <Link className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('unlink')}
                      title="Remove link"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-.758l1.102-1.101a4 4 0 00-5.656-5.656l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                      </svg>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('image')}
                    >
                      <Image className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('table')}
                    >
                      <Table className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('color')}
                    >
                      <Palette className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleTopToolbarAction('highlight')}
                    >
                      <Highlighter className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

                  <div className="flex items-center space-x-2">
                    <Select value="normal" onValueChange={(value) => {
                      if (value === 'normal') {
                        handleTopToolbarAction('paragraph');
                      } else if (value === 'heading1') {
                        handleTopToolbarAction('heading', '1');
                      } else if (value === 'heading2') {
                        handleTopToolbarAction('heading', '2');
                      }
                    }}>
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal Text</SelectItem>
                        <SelectItem value="heading1">Heading 1</SelectItem>
                        <SelectItem value="heading2">Heading 2</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value="arial" onValueChange={(value) => {
                      const fontMap: { [key: string]: string } = {
                        'arial': 'Arial, sans-serif',
                        'times': 'Times New Roman, serif',
                        'helvetica': 'Helvetica, Arial, sans-serif',
                        'georgia': 'Georgia, serif',
                        'courier': 'Courier New, monospace'
                      };
                      handleTopToolbarAction('font-family', fontMap[value] || value);
                    }}>
                      <SelectTrigger className="w-24 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="times">Times New Roman</SelectItem>
                        <SelectItem value="helvetica">Helvetica</SelectItem>
                        <SelectItem value="georgia">Georgia</SelectItem>
                        <SelectItem value="courier">Courier New</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input
                      type="number"
                      defaultValue="14"
                      className="w-16 h-8 text-center"
                      onBlur={(e) => handleTopToolbarAction('font-size', e.target.value + 'px')}
                      onKeyDown={(e) => e.key === 'Enter' && handleTopToolbarAction('font-size', e.currentTarget.value + 'px')}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4">
                {document?.editor === 'html' ? (
                  // HTML Editor - show directly without tabs
                  <HtmlEditor
                    content={contentHtml}
                    onChange={(newContent: string) => {
                      // Prevent content changes during save operations
                      if (isSaving || isReloading) {
                        return;
                      }
                      
                      // Prevent content changes if content change is blocked
                      if (contentChangeBlockedRef.current) {
                        return;
                      }
                      
                      // For HTML editor, only update contentHtml
                      // Keep content as plain text for markdown editor compatibility
                      setContentHtml(newContent);
                      
                      // Extract plain text from HTML for content
                      // Remove DOCTYPE, html, head, style tags and their content
                      let plainText = newContent
                        .replace(/<!DOCTYPE[^>]*>/gi, '')
                        .replace(/<html[^>]*>[\s\S]*?<\/html>/gi, (match) => {
                          // Extract only the body content
                          const bodyMatch = match.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                          return bodyMatch ? bodyMatch[1] : match;
                        })
                        .replace(/<head[\s\S]*?<\/head>/gi, '')
                        .replace(/<style[\s\S]*?<\/style>/gi, '')
                        .replace(/<script[\s\S]*?<\/script>/gi, '')
                        .replace(/<[^>]*>/g, '') // Remove remaining HTML tags
                        .replace(/\s+/g, ' ') // Normalize whitespace
                        .trim();
                      
                      // If we still have HTML entities or CSS, clean them up
                      plainText = plainText
                        .replace(/&[a-zA-Z0-9#]+;/g, '') // Remove HTML entities
                        .replace(/\{[^}]*\}/g, '') // Remove CSS rules
                        .replace(/[a-zA-Z-]+\s*:\s*[^;]+;?/g, '') // Remove CSS properties
                        .replace(/\s+/g, ' ') // Normalize whitespace again
                        .trim();
                      
                      setContent(plainText);
                      setHasUnsavedChanges(true);
                    }}
                  />
                ) : (
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="rich-text">Rich Text</TabsTrigger>
                      <TabsTrigger value="markdown">Markdown</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="rich-text" className="mt-0">
                      {showPreview ? (
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[600px] p-4 overflow-auto">
                          <div dangerouslySetInnerHTML={{ __html: memoizedContentHtml }} />
                        </div>
                      ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[600px]">
                          {/* 
                            Editor Selection Logic:
                            - 'annual-report' → AnnualReportEditor
                            - 'two-column' → TwoColumnEditor  
                            - anything else → RichTextEditor (default)
                          */}
                          {document?.editor === 'annual-report' ? (
                            <AnnualReportEditor
                              content={content}
                              onChange={(newContent) => handleContentChange(newContent, contentHtml)}
                            />
                          ) : document?.editor === 'two-column' ? (
                            <TwoColumnEditor
                              content={content}
                              onChange={(newContent) => handleContentChange(newContent, contentHtml)}
                            />
                          ) : (
                            <RichTextEditor
                              key={`rich-text-${contentVersion}`}
                              content={memoizedContentHtml}
                              onChange={(html) => handleContentChange(content, html)}
                            />
                          )}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="markdown" className="mt-0">
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[600px]">
                        <MarkdownEditor
                          content={memoizedContent}
                          onChange={(markdown) => handleContentChange(markdown, contentHtml)}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
