'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Grid, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useToast } from '@/hooks/useToast';
import { formatDate, truncateText } from '@/lib/utils';
import { allTemplates } from '@/templates';
import { getSession } from './config/withSession';
import { TemplatePreview } from '@/components/TemplatePreview';

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
            {/* <Grid className="w-6 h-6 text-primary" /> */}
            <svg
              width={32}
              height={32}
              className={'fill-white'}
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
              <circle cx="25" cy="25" r="25" fill="#6336e8" />
              <path
                  d="M34.6609 25.3958C34.9992 25.3958 35.242 25.4693 35.3891 25.6163C35.5509 25.7633 35.6318 25.9544 35.6318 26.1897C35.6318 26.5719 35.5141 26.91 35.2787 27.2041C35.0581 27.4981 34.705 27.6525 34.2195 27.6672C33.0574 27.6819 32.0129 27.5937 31.0861 27.4025C30.0563 29.5931 28.8132 31.4161 27.3568 32.8715C25.9151 34.3123 24.4881 35.0327 23.0759 35.0327C21.7813 35.0327 20.8104 34.349 20.1631 32.9818C19.5158 31.5998 19.148 29.7548 19.0597 27.4466C18.1771 30.0047 17.1767 31.9086 16.0587 33.1582C14.9553 34.4078 13.7784 35.0327 12.528 35.0327C11.1157 35.0327 10.0492 34.1579 9.32834 32.4084C8.60749 30.6442 8.24707 28.2773 8.24707 25.3076C8.24707 23.1464 8.43831 20.7721 8.8208 18.1846C8.92378 17.4496 9.10767 16.9424 9.37247 16.663C9.65198 16.369 10.086 16.222 10.6744 16.222C11.1157 16.222 11.4541 16.3175 11.6895 16.5087C11.9396 16.6998 12.0646 17.0526 12.0646 17.5672C12.0646 17.6701 12.0499 17.8686 12.0205 18.1626C11.5791 21.1764 11.3585 23.7418 11.3585 25.8589C11.3585 27.8289 11.5276 29.3505 11.866 30.4237C12.2044 31.4969 12.6604 32.0335 13.2341 32.0335C13.749 32.0335 14.3669 31.4969 15.0877 30.4237C15.8233 29.3358 16.5515 27.7333 17.2723 25.6163C17.9932 23.4846 18.6037 20.9485 19.1039 18.0082C19.2216 17.3319 19.4349 16.8688 19.7438 16.6189C20.0674 16.3543 20.5014 16.222 21.0457 16.222C21.5018 16.222 21.8328 16.3249 22.0387 16.5307C22.2594 16.7218 22.3697 17.0159 22.3697 17.4128C22.3697 17.648 22.355 17.8318 22.3256 17.9641C21.9137 20.3605 21.7077 22.7568 21.7077 25.1532C21.7077 26.7851 21.7592 28.0862 21.8622 29.0565C21.9799 30.0268 22.1932 30.7692 22.5021 31.2838C22.8258 31.7836 23.2892 32.0335 23.8923 32.0335C24.5985 32.0335 25.3855 31.5043 26.2535 30.4458C27.1214 29.3725 27.9158 28.0421 28.6367 26.4543C27.7393 25.8956 27.0626 25.1752 26.6065 24.2932C26.1505 23.3964 25.9225 22.3672 25.9225 21.2058C25.9225 20.0444 26.099 19.0667 26.4521 18.2728C26.8198 17.4643 27.3127 16.8615 27.9305 16.4646C28.5631 16.0676 29.2619 15.8691 30.0269 15.8691C30.9684 15.8691 31.7113 16.2073 32.2556 16.8836C32.8146 17.5598 33.0941 18.486 33.0941 19.6621C33.0941 21.3234 32.7337 23.1685 32.0129 25.1973C32.7631 25.3296 33.6458 25.3958 34.6609 25.3958ZM28.1512 21.0515C28.1512 22.4922 28.6146 23.5581 29.5414 24.249C30.1151 22.6025 30.402 21.2426 30.402 20.1694C30.402 19.5519 30.3211 19.1035 30.1593 18.8242C29.9974 18.5301 29.7768 18.3831 29.4973 18.3831C29.1001 18.3831 28.7764 18.6183 28.5263 19.0888C28.2762 19.5445 28.1512 20.1988 28.1512 21.0515Z"
                  className={'fill-white'}
              />
              <path
                  d="M42.0001 26.7819C42.0001 27.981 41.041 28.953 39.858 28.953C38.6749 28.953 37.7158 27.981 37.7158 26.7819C37.7158 25.5829 38.6749 24.6108 39.858 24.6108C41.041 24.6108 42.0001 25.5829 42.0001 26.7819Z"
                  className={'fill-white'}
              
              />
          </svg>
            <span className="font-semibold text-gray-900 dark:text-white">Weam AI</span>
          </div>
          

          
          {/* Your Saved Documents Section */}
          <div className="space-y-3">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => {
                const currentUrl = window.location.href;
                const url = new URL(currentUrl);
                const mainDomain = `${url.protocol}//${url.hostname}${url.port ? ':' + url.port : ''}`;
                window.location.href = mainDomain;
              }}
              className="w-full text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </Button>
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
                      <CardContent className="p-4">
                        <div className="h-48 mb-3 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                          {template.contentHtml ? (
                            <TemplatePreview 
                              contentHtml={template.contentHtml} 
                              className="w-full h-full"
                            />
                          ) : template._id === '1' ? (
                            // Special case for blank document - show plus icon
                            <div className="flex items-center justify-center text-gray-400">
                              <div className="w-16 h-16 border-2 border-gray-400 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </div>
                            </div>
                          ) : (
                            <div className="text-4xl text-gray-400">{template.preview}</div>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-center group-hover:text-primary transition-colors">
                          {template.name}
                        </h3>
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
