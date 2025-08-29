'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Grid, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useToast } from '@/hooks/useToast';
import { formatDate, truncateText } from '@/lib/utils';
import { allTemplates } from '@/templates';
import { getSession } from './config/withSession';

interface Document {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

interface Template {
  _id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  preview: string;
  content?: string;
  contentHtml?: string;
  editor?: string;
  useCustomEditor?: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);

  useEffect(() => {
    loadSampleTemplates();
    loadDocuments();    
  }, []);

  const loadDocuments = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/documents`);
      if (response.ok) {
        const docs = await response.json();
        setDocuments(docs);
      } else {
        console.error('Failed to load documents from database');
        setDocuments([]);
      }
    } catch (error) {
      console.error('Error loading documents:', error);
      setDocuments([]);
    }
  };

  const loadSampleTemplates = () => {
    setTemplates(allTemplates);
  };



  const handleTemplateClick = async (template: Template) => {
    try {
      // Instead of creating a new document, pass template data to editor
      // Create a temporary document object for the editor
      const tempDoc = {
        _id: `template_${Date.now()}`, // Temporary ID for template preview
        title: template.name,
        content: template.content || template.prompt,
        contentHtml: template.contentHtml || `<h1>${template.name}</h1><p>${template.prompt}</p>`,
        tags: [],
        templateName: template.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isTemplate: true, // Flag to indicate this is a template preview
        editor: template.editor, // Pass the editor type
        useCustomEditor: template.useCustomEditor || false // Flag to use custom editor
      };

      // Store in localStorage for editor access (this won't create database entries)
      localStorage.setItem(`document_${tempDoc._id}`, JSON.stringify(tempDoc));
      
      toast({
        title: 'Template Selected',
        description: `Opening ${template.name} template in editor`,
      });

      // Navigate to editor with template data
      router.push(`/editor/${tempDoc._id}`);
    } catch (error) {
      console.error('Error opening template:', error);
      toast({
        title: 'Error',
        description: 'Failed to open template',
        variant: 'destructive',
      });
    }
  };

  const handleDocumentClick = async (docId: string) => {
    try {
      // Load document from database
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/documents/${docId}`);
      
      if (response.ok) {
        const doc = await response.json();
        // Store in localStorage for editor access
        localStorage.setItem(`document_${docId}`, JSON.stringify(doc));
        router.push(`/editor/${docId}`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to load document. Status:', response.status, 'Error:', errorData);
        toast({
          title: 'Error',
          description: `Document not found: ${errorData.error || 'Unknown error'}`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error loading document:', error);
      toast({
        title: 'Error',
        description: 'Failed to load document',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, doc: Document) => {
    e.stopPropagation();
    setDocumentToDelete(doc);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!documentToDelete) return;

    try {
      // Delete from database
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/documents/${documentToDelete._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setDocuments(documents.filter(doc => doc._id !== documentToDelete._id));
        
        // Remove from localStorage
        localStorage.removeItem(`document_${documentToDelete._id}`);
        
        toast({
          title: 'Success',
          description: 'Document deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete document from database',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete document',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDocumentToDelete(null);
  };

  const [session, setSession] = useState<{ isAuthenticated: boolean } | null>(null);

  // Fetch session data when component mounts
  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const session = await getSession();
  //   };
  //   fetchSession();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <div className="space-y-6">
          {/* Logo/App Launcher */}
          <div className="flex items-center space-x-2">
            <Grid className="w-6 h-6 text-primary" />
            <span className="font-semibold text-gray-900 dark:text-white">Weam</span>
          </div>
          

          
          {/* Your Saved Documents Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Your Saved Documents
            </h3>
            <div className="space-y-2 max-h-[42rem] overflow-y-auto">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <div 
                    key={doc._id} 
                    className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                  >
                    <div 
                      className="flex items-center space-x-2 flex-1 cursor-pointer min-w-0"
                      onClick={() => handleDocumentClick(doc._id)}
                    >
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{doc.title}</div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(doc.createdAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={(e) => handleDeleteClick(e, doc)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-red-500 hover:text-red-700 dark:hover:text-red-400 flex-shrink-0"
                            title="Delete document"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 dark:text-gray-400 p-2 text-center">
                  No documents yet
                </div>
              )}
            </div>
            {documents.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadDocuments}
                className="w-full text-xs"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </Button>
            )}
          </div>
          

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">


        {/* Template Categories */}
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Document Templates</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Click on any template to start editing. Templates are starting points - you can customize them and save as new documents.
            </p>
          </div>
          
          <Tabs value={selectedCategory} onValueChange={(value: string) => setSelectedCategory(value)} className="w-full">
            <TabsList className="flex w-full flex-wrap gap-2 mb-8 justify-center">
              <TabsTrigger value="all" className="whitespace-nowrap px-4 py-2">All Templates</TabsTrigger>
              <TabsTrigger value="job-applications" className="whitespace-nowrap px-4 py-2">Job Applications</TabsTrigger>
              <TabsTrigger value="business-communications" className="whitespace-nowrap px-4 py-2">Business Communications</TabsTrigger>
              <TabsTrigger value="reports-analysis" className="whitespace-nowrap px-4 py-2">Reports & Analysis</TabsTrigger>
              <TabsTrigger value="creative-marketing" className="whitespace-nowrap px-4 py-2">Creative & Marketing</TabsTrigger>
              <TabsTrigger value="customer-success" className="whitespace-nowrap px-4 py-2">Customer Success</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {templates
                  .filter(template => selectedCategory === 'all' || template.category === selectedCategory)
                  .map((template) => (
                    <Card 
                      key={template._id} 
                      className="hover:shadow-lg transition-shadow cursor-pointer group"
                      onClick={() => handleTemplateClick(template)}
                    >
                      <CardContent className="p-6">
                        <div className="text-4xl mb-4 text-center">{template.preview}</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {template.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{documentToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
