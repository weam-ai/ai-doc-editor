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
import { FontSizeSelector } from '@/components/editor/FontSizeSelector';
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
  Heading2,
  EditIcon
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
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user', message: string, response: string}>>([]);
  const [contentVersion, setContentVersion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [docRequest, setDocRequest] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<string>('');
  const [currentFontFamily, setCurrentFontFamily] = useState<string | null>(null);
  const [hasOpenAIKey, setHasOpenAIKey] = useState<boolean>(true);
  
  // Debug font family changes
  const handleFontFamilyChange = (fontFamily: string | null) => {
    console.log('Font family changed to:', fontFamily);
    setCurrentFontFamily(fontFamily);
  };
  
  // Ref for the HTML editor
  const htmlEditorRef = useRef<HTMLDivElement>(null);
  
  // Use refs to preserve content during save operations
  const contentRef = useRef(content);
  const contentHtmlRef = useRef(contentHtml);
  
  // Font family mapping
  const fontMap: { [key: string]: string } = {
    'arial': 'Arial, sans-serif',
    'times': 'Times New Roman, serif',
    'helvetica': 'Helvetica, Arial, sans-serif',
    'georgia': 'Georgia, serif',
    'courier': 'Courier New, monospace'
  };
  
  // Reverse font family mapping
  const reverseFontMap: { [key: string]: string } = {
    'Arial, sans-serif': 'arial',
    '"Arial", sans-serif': 'arial',
    'Times New Roman, serif': 'times',
    '"Times New Roman", serif': 'times',
    'Helvetica, Arial, sans-serif': 'helvetica',
    '"Helvetica", Arial, sans-serif': 'helvetica',
    'Georgia, serif': 'georgia',
    '"Georgia", serif': 'georgia',
    'Courier New, monospace': 'courier',
    '"Courier New", monospace': 'courier'
  };
  
  // Get current font family selector value
  const getCurrentFontFamilyValue = (): string => {
    if (!currentFontFamily) {
      console.log('No current font family set');
      return '';
    }
    
    console.log('Current font family:', currentFontFamily);
    
    // First try exact match
    let mappedValue = reverseFontMap[currentFontFamily];
    if (mappedValue) {
      console.log('Exact match found:', mappedValue);
      return mappedValue;
    }
    
    // Try to match by extracting the first font name
    const fontFamily = currentFontFamily.replace(/['"]/g, ''); // Remove quotes
    const firstFont = fontFamily.split(',')[0].trim();
    console.log('First font name:', firstFont);
    
    // Map based on first font name
    const fontNameMap: { [key: string]: string } = {
      'Arial': 'arial',
      'Times New Roman': 'times',
      'Helvetica': 'helvetica',
      'Georgia': 'georgia',
      'Courier New': 'courier'
    };
    
    mappedValue = fontNameMap[firstFont] || '';
    console.log('Mapped value:', mappedValue);
    return mappedValue;
  };
  
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
        
        // Load chat history for this document (only for saved documents)
        if (doc._id && !doc._id.startsWith('temp_') && doc._id.length >= 24) {
          console.log('Frontend - Loading chat history for saved document:', doc._id);
          loadChatHistory(doc._id);
        } else {
          console.log('Frontend - Skipping chat history load for temporary document:', doc._id);
        }
      } catch (error) {
        console.error('Error parsing stored document:', error);
        createDefaultDocument();
      }
    } else {
      createDefaultDocument();
    }
  }, [params.id]); // Only reload when params.id changes, not when document state changes

  // Check if OpenAI key is available
  useEffect(() => {
    const checkOpenAIKey = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/check-openai`);
        
        if (response.ok) {
          const data = await response.json();
          setHasOpenAIKey(data.hasOpenAIKey);
        } else {
          setHasOpenAIKey(false);
        }
      } catch (error) {
        console.error('Error checking OpenAI key:', error);
        setHasOpenAIKey(false);
      }
    };

    checkOpenAIKey();
  }, []);

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
      
      // Load chat history for the newly saved document
      if (savedDoc._id) {
        console.log('Frontend - Document saved with ID:', savedDoc._id);
        console.log('Frontend - Now loading chat history for saved document...');
        await loadChatHistory(savedDoc._id);
      }
      
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

  // Load chat history for a document
  const loadChatHistory = async (documentId: string) => {
    try {
      console.log('Frontend - Loading chat history for document:', documentId);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/chat-history?documentId=${documentId}`);
      
      if (response.ok) {
        const chatData = await response.json();
        console.log('Frontend - Chat history response:', chatData);
        
        if (chatData.messages && Array.isArray(chatData.messages)) {
          // Ensure proper typing for messages
          const typedMessages = chatData.messages.map((msg: any) => ({
            type: msg.type as 'user',
            message: msg.message,
            response: msg.response || ''
          }));
          console.log('Frontend - Setting chat history:', typedMessages);
          setChatHistory(typedMessages);          
        } else {
          console.log('Frontend - No messages found in chat data');
        }
      } else {
        console.log('Frontend - Chat history API response not ok:', response.status);
      }
    } catch (error) {
      console.error('Frontend - Error loading chat history:', error);
      // Don't show error to user as this is not critical
    }
  };

  // Save chat history for a document
  const saveChatHistory = async (documentId: string, messages: Array<{type: 'user', message: string, response: string}>) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/chat-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId: documentId,
          messages: messages,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Frontend - Failed to save chat history:', response.status, errorText);
      } else {
        console.log('Frontend - Chat history saved successfully');
      }
    } catch (error) {
      console.error('Frontend - Error saving chat history:', error);
      // Don't show error to user as this is not critical
    }
  };

  const handleDocRequest = async () => {
    if (!docRequest.trim()) return;

    const userMessage = docRequest;
    const aiResponseMessage = `I've updated your document based on your request: "${userMessage}"`;
    
    // Create new message with both user question and AI response
    // Add user message to chat history immediately
    const newMessage: {type: 'user', message: string, response: string} = {
      type: 'user',
      message: userMessage,
      response: '' // Will be updated after AI response
    };
    
    const newChatHistory: Array<{type: 'user', message: string, response: string}> = [...chatHistory, newMessage];
    setChatHistory(newChatHistory);
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
      
      // Update the last message with AI response
      const finalChatHistory: Array<{type: 'user', message: string, response: string}> = [
        ...chatHistory,
        {
          type: 'user',
          message: userMessage,
          response: aiResponseMessage
        }
      ];
      setChatHistory(finalChatHistory);
      
      // Save chat history to database
      if (document && document._id) {
        await saveChatHistory(document._id, finalChatHistory);
      }
      
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
      
      // Remove the user message from chat history if there was an error
      setChatHistory(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (request: string, currentContent: string) => {
    console.log('AI Request:', request);
    console.log('Current content length:', currentContent.length);
    
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
      
      // Check for form input placeholders
      if (content.includes('placeholder=') && (
          content.includes('Insert name here') ||
          content.includes('Insert role here') ||
          content.includes('placeholder="Insert') ||
          content.includes('placeholder="Enter') ||
          content.includes('placeholder="Type') ||
          content.includes('placeholder="Add') ||
          content.includes('placeholder="Write') ||
          content.includes('placeholder="Fill') ||
          content.includes('placeholder="Select') ||
          content.includes('placeholder="Choose')
        )) {
        return true;
      }
      
      // Check for table content placeholders
      if (content.includes('HH:MM:SS AM/PM') ||
          content.includes('This is what the text looks like when it\'s inside a table') ||
          content.includes('You can even make checklists') ||
          content.includes('Now you can check on your list') ||
          content.includes('Have another box to tick')) {
        return true;
      }
      
      // Check for Weekly Progress Report template
      if (content.includes('GOLDEN WING HOTEL') ||
          content.includes('Weekly Progress Report') ||
          (content.includes('TIME') && content.includes('TASK') && content.includes('REPORT')) ||
          content.includes('Insert name here') ||
          content.includes('Insert role here')) {
        return true;
      }
      
      // Check for common template patterns
      if (content.includes('placeholder=') && content.includes('input')) {
        return true;
      }
      
      // Check for any form elements that might need filling
      if (content.includes('<input') || content.includes('<textarea') || content.includes('<select')) {
        return true;
      }
      
      // If content is very short (less than 100 chars), likely new
      if (content.trim().length < 100) {
        return true;
      }
      
      return false;
    };
    
    // Check if this is a content generation request (like "Generate a wordpress blog")
    const isContentGenerationRequest = (request: string) => {
      const lowerRequest = request.toLowerCase();
      return lowerRequest.includes('generate') || 
             lowerRequest.includes('create') || 
             lowerRequest.includes('write') || 
             lowerRequest.includes('make') ||
             lowerRequest.includes('build') ||
             lowerRequest.includes('design') ||
             lowerRequest.includes('develop');
    };
    
    const isTemplate = isNewOrTemplateDocument(currentContent);
    
    // Force modification mode for form filling requests
    const isFormFillingRequest = request.toLowerCase().includes('tick') || 
                                request.toLowerCase().includes('checkbox') || 
                                request.toLowerCase().includes('fill') || 
                                request.toLowerCase().includes('add john') ||
                                request.toLowerCase().includes('insert name') ||
                                request.toLowerCase().includes('insert role') ||
                                request.toLowerCase().includes('random data') ||
                                request.toLowerCase().includes('dummy');
    
    // Also check if content has form elements that need filling
    const hasFormElements = currentContent.includes('<input') || 
                           currentContent.includes('placeholder=') ||
                           currentContent.includes('Insert name here') ||
                           currentContent.includes('Insert role here') ||
                           currentContent.includes('GOLDEN WING HOTEL') ||
                           currentContent.includes('Weekly Progress Report');
    
    // ALWAYS force modification if we have form elements and a form filling request
    // Also force modification for any request containing "fill" and "form"
    const isFillFormRequest = request.toLowerCase().includes('fill') && request.toLowerCase().includes('form');
    
    // For blank documents with content generation requests, treat as new document creation
    // For blank documents with modification requests, treat as modification
    const isBlankDocument = isTemplate && (currentContent.includes('Start writing your content here...') || 
                                          currentContent.includes('New Document'));
    
    const isModification = hasFormElements && isFormFillingRequest ? true : 
                          isFillFormRequest ? true :
                          (isBlankDocument && isContentGenerationRequest(request)) ? false :
                          (!isTemplate || isFormFillingRequest || hasFormElements);
    console.log('Is template:', isTemplate);
    console.log('Is form filling request:', isFormFillingRequest);
    console.log('Is fill form request:', isFillFormRequest);
    console.log('Has form elements:', hasFormElements);
    console.log('Is blank document:', isBlankDocument);
    console.log('Is content generation request:', isContentGenerationRequest(request));
    console.log('Is modification:', isModification);
    console.log('Current content preview:', currentContent.substring(0, 500));
    console.log('Contains GOLDEN WING HOTEL:', currentContent.includes('GOLDEN WING HOTEL'));
    console.log('Contains Weekly Progress Report:', currentContent.includes('Weekly Progress Report'));
    console.log('Contains Insert name here:', currentContent.includes('Insert name here'));
    console.log('Contains Insert role here:', currentContent.includes('Insert role here'));
    console.log('Contains input elements:', currentContent.includes('<input'));
    console.log('Contains placeholder:', currentContent.includes('placeholder='));
    
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
      console.log('OpenAI response received:', data);
      console.log('Response contentHtml length:', data.contentHtml?.length);
      console.log('Response contentHtml starts with:', data.contentHtml?.substring(0, 200));
      
      if (data.contentHtml && data.contentHtml.trim().startsWith('<')) {
        // console.log('Returning HTML content');
        return data.contentHtml;
      } else if (!isModification && data.content) {
        // For new document creation, if no HTML is provided, return the raw content
        // This allows ChatGPT-like responses to be displayed as-is
        console.log('New document creation - returning raw content');
        return data.content;
      } else if (isBlankDocument && isContentGenerationRequest(request) && data.content) {
        // Special case: for blank documents with content generation requests,
        // if we get content but no HTML, wrap it in basic HTML structure
        console.log('Blank document content generation - wrapping content in HTML');
        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Document</title>
</head>
<body>
    <div>${data.content}</div>
</body>
</html>`;
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
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between md:h-16 flex-col md:flex-row p-1 md:p-0">
            <div className="flex items-center space-x-4 md:flex-row flex-col">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/')}
                className="mr-6 border px-4 py-2 rounded-md hover:bg-gray-900 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Templates
              </Button>
              
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-black" />
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-none text-lg font-semibold bg-transparent px-0"
                  onBlur={() => setIsEditing(false)}
                  onFocus={() => setIsEditing(true)}
                />
                {isEditing && (
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <EditIcon className="w-4 h-4" />
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
                {/* Warning message when OpenAI key is not available */}
                {!hasOpenAIKey && (
                  <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          OpenAI Key Required
                        </h3>
                        <div className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                          <p>To use chat functionality, please add your OpenAI API key in the environment variables.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat History - Fixed height, scrollable */}
                <div className="space-y-3 overflow-y-auto mb-4 max-h-[300px] min-h-[200px]">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      <p className="text-sm">
                        {hasOpenAIKey 
                          ? "No conversations yet. Start by asking me to modify your document!" 
                          : "Chat functionality is disabled. Please add OpenAI key to enable AI features."
                        }
                      </p>
                    </div>
                  ) : (
                    chatHistory.map((message, index) => (
                      <div key={index} className="space-y-2">
                        {/* User Message */}
                        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 ml-8">
                          <p className="text-sm font-medium">You:</p>
                          <p className="text-sm">{message.message}</p>
                        </div>
                        
                        {/* AI Response */}
                        {message.response && (
                          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mr-8">
                            <p className="text-sm font-medium">AI Assistant:</p>
                            <p className="text-sm">{message.response}</p>
                          </div>
                        )}
                        
                        {/* Loading indicator for current message */}
                        {!message.response && index === chatHistory.length - 1 && (
                          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mr-8">
                            <p className="text-sm font-medium">AI Assistant:</p>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 rounded-full animate-bounce bg-gray-500"></div>
                              <div className="w-2 h-2 rounded-full animate-bounce bg-gray-500" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 rounded-full animate-bounce bg-gray-500" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Chat Input - Always visible at bottom */}
                <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">
                  <Textarea
                    placeholder={hasOpenAIKey 
                      ? "Describe what you want me to change, add, or remove from your document..."
                      : "Chat functionality is disabled. Please add OpenAI key to enable AI features."
                    }
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
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#000000' }}></div>
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#000000', animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#000000', animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleDocRequest} 
                    disabled={!docRequest.trim() || isLoading || !hasOpenAIKey}
                    className="w-full"
                  >
                    {isLoading ? 'Processing...' : hasOpenAIKey ? 'Send' : 'Disabled'}
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
                <div className="flex items-center space-x-2 max-xl:flex-wrap space-y-2">
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
                      } else if (value === 'heading3') {
                        handleTopToolbarAction('heading', '3');
                      } else if (value === 'heading4') {
                        handleTopToolbarAction('heading', '4');
                      } else if (value === 'heading5') {
                        handleTopToolbarAction('heading', '5');
                      } else if (value === 'heading6') {
                        handleTopToolbarAction('heading', '6');
                      }
                    }}>
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal Text</SelectItem>
                        <SelectItem value="heading1">Heading 1</SelectItem>
                        <SelectItem value="heading2">Heading 2</SelectItem>
                        <SelectItem value="heading3">Heading 3</SelectItem>
                        <SelectItem value="heading4">Heading 4</SelectItem>
                        <SelectItem value="heading5">Heading 5</SelectItem>
                        <SelectItem value="heading6">Heading 6</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={getCurrentFontFamilyValue()} onValueChange={(value) => {
                      handleTopToolbarAction('font-family', fontMap[value] || value);
                    }}>
                      <SelectTrigger className="w-24 h-8">
                        <SelectValue placeholder="Font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="times">Times New Roman</SelectItem>
                        <SelectItem value="helvetica">Helvetica</SelectItem>
                        <SelectItem value="georgia">Georgia</SelectItem>
                        <SelectItem value="courier">Courier New</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <FontSizeSelector
                      editorRef={htmlEditorRef}
                      placeholder="14"
                      className="w-20 h-8"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4">
                {document?.editor === 'html' ? (
                  // HTML Editor - show directly without tabs
                  <HtmlEditor
                    content={contentHtml}
                    editorRef={htmlEditorRef}
                    onFontFamilyChange={handleFontFamilyChange}
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
