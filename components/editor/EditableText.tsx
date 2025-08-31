'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import FloatingToolbar from './FloatingToolbar';

interface EditableTextProps {
  htmlContent: string;
  onContentChange: (newHtml: string) => void;
  className?: string;
}

interface EditableElement {
  element: HTMLElement;
  originalText: string;
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

interface SavedSelection {
  startContainer: Node;
  startOffset: number;
  endContainer: Node;
  endOffset: number;
}

export default function EditableText({ 
  htmlContent, 
  onContentChange, 
  className = '' 
}: EditableTextProps) {
  const [editingElement, setEditingElement] = useState<EditableElement | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [selection, setSelection] = useState<{text: string, element: HTMLElement} | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState({x: 0, y: 0, visible: false});
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontSize: '14px',
    fontFamily: 'Arial',
    textColor: '#000000',
    highlightColor: '#ffffff',
    alignment: 'left' as 'left' | 'center' | 'right'
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const savedSelectionRef = useRef<SavedSelection | null>(null);
  const isUpdatingRef = useRef(false);

  // Save current selection
  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      savedSelectionRef.current = {
        startContainer: range.startContainer,
        startOffset: range.startOffset,
        endContainer: range.endContainer,
        endOffset: range.endOffset
      };
    }
  }, []);

  // Restore saved selection
  const restoreSelection = useCallback(() => {
    if (savedSelectionRef.current && contentEditableRef.current) {
      try {
        const selection = window.getSelection();
        if (selection) {
          const range = document.createRange();
          range.setStart(savedSelectionRef.current.startContainer, savedSelectionRef.current.startOffset);
          range.setEnd(savedSelectionRef.current.endContainer, savedSelectionRef.current.endOffset);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } catch (error) {
        console.warn('Could not restore selection:', error);
      }
    }
  }, []);

  // Handle text selection for toolbar
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setToolbarPosition(prev => ({ ...prev, visible: false }));
      setSelection(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const text = range.toString().trim();
    
    if (!text) {
      setToolbarPosition(prev => ({ ...prev, visible: false }));
      setSelection(null);
      return;
    }

    // Find the common ancestor element
    const element = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE 
      ? range.commonAncestorContainer as HTMLElement
      : range.commonAncestorContainer.parentElement;

    if (!element) return;

    setSelection({ text, element });
    
    // Position toolbar above the selected text
    const elementRect = element.getBoundingClientRect();
    const x = elementRect.left + (elementRect.width / 2) - 150; // Center toolbar
    const y = elementRect.top - 60; // Above the text
    
    setToolbarPosition({
      x: Math.max(10, x), // Ensure toolbar doesn't go off-screen
      y: Math.max(10, y),
      visible: true
    });
  }, []);

  // Apply formatting to selected text
  const applyFormatting = useCallback((format: Partial<typeof formatting>) => {
    if (!selection) return;

    const { element } = selection;
    
    // Create a new range
    const range = document.createRange();
    const textNode = element.firstChild;
    
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
    
    // Apply formatting based on the format type
    if (format.bold !== undefined) {
      const strong = document.createElement('strong');
      range.surroundContents(strong);
    }
    
    if (format.italic !== undefined) {
      const em = document.createElement('em');
      range.surroundContents(em);
    }
    
    if (format.underline !== undefined) {
      const u = document.createElement('u');
      range.surroundContents(u);
    }

    // Update formatting state
    setFormatting(prev => ({ ...prev, ...format }));
    
    // Clear selection
    window.getSelection()?.removeAllRanges();
    setSelection(null);
    setToolbarPosition(prev => ({ ...prev, visible: false }));
  }, [selection]);

  // Handle content changes from contentEditable with debouncing
  const handleContentChange = useCallback(() => {
    if (contentEditableRef.current && !isUpdatingRef.current) {
      // Save selection before updating state
      saveSelection();
      
      const newHtml = contentEditableRef.current.innerHTML;
      
      // Only update if content actually changed
      if (newHtml !== htmlContent) {
        isUpdatingRef.current = true;
        onContentChange(newHtml);
        
        // Restore selection after a brief delay to allow React to update
        setTimeout(() => {
          restoreSelection();
          isUpdatingRef.current = false;
        }, 0);
      }
    }
  }, [htmlContent, onContentChange, saveSelection, restoreSelection]);

  // Handle key events in contentEditable
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Insert a line break instead of creating a new paragraph
      document.execCommand('insertLineBreak', false);
      handleContentChange();
    } else if (event.key === 'Escape') {
      // Cancel any active editing
      if (editingElement) {
        setEditingElement(null);
        setEditValue('');
      }
    }
  }, [editingElement, handleContentChange]);

  // Handle paste events to clean HTML
  const handlePaste = useCallback((event: React.ClipboardEvent) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    handleContentChange();
  }, [handleContentChange]);

  // Focus input when editing starts
  useEffect(() => {
    console.log('Editing element changed:', editingElement); // Debug log
    if (editingElement && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingElement]);

  // Add selection change listener for toolbar
  useEffect(() => {
    document.addEventListener('selectionchange', handleTextSelection);
    return () => document.removeEventListener('selectionchange', handleTextSelection);
  }, [handleTextSelection]);

  // Handle formatting changes from toolbar
  const handleFormattingChange = useCallback((format: Partial<typeof formatting>) => {
    setFormatting(prev => ({ ...prev, ...format }));
    
    // Apply formatting to selected text if there's a selection
    if (selection) {
      applyFormatting(format);
    }
  }, [selection, applyFormatting]);

  // Update contentEditable when htmlContent changes externally (but not during user editing)
  useEffect(() => {
    if (contentEditableRef.current && contentEditableRef.current.innerHTML !== htmlContent && !isUpdatingRef.current) {
      contentEditableRef.current.innerHTML = htmlContent;
    }
  }, [htmlContent]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Instructions */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 px-4 pt-4 flex items-center justify-between">
        <div>
          💡 <strong>Click any text to edit it inline</strong> - Press Enter to save or click outside to cancel
        </div>
        <div className="text-xs text-gray-500">
          ⌨️ Keyboard: Enter = Save, Esc = Cancel | Ctrl+B/I/U for formatting
        </div>
      </div>
      
      {/* Test button for debugging */}
      <div className="px-4 mb-2">
        <button 
          onClick={() => console.log('Test button clicked - component is working')}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Test Click (Check Console)
        </button>
        <button 
          onClick={() => {
            console.log('Current state:', { editingElement, selection, toolbarPosition });
            console.log('Container ref:', containerRef.current);
            console.log('ContentEditable ref:', contentEditableRef.current);
            console.log('Saved selection:', savedSelectionRef.current);
          }}
          className="ml-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          Debug State
        </button>
        <button 
          onClick={() => {
            // Test inline editing manually
            const testElement = document.createElement('div');
            testElement.textContent = 'Test Text';
            testElement.style.position = 'fixed';
            testElement.style.top = '100px';
            testElement.style.left = '100px';
            testElement.style.zIndex = '9999';
            testElement.style.background = 'white';
            testElement.style.border = '1px solid red';
            testElement.style.padding = '10px';
            testElement.style.cursor = 'pointer';
            testElement.onclick = () => {
              console.log('Test element clicked!');
              setEditingElement({
                element: testElement,
                originalText: 'Test Text',
                rect: { top: 100, left: 100, width: 100, height: 30 }
              });
              setEditValue('Test Text');
            };
            document.body.appendChild(testElement);
            console.log('Test element added, click it to test inline editing');
          }}
          className="ml-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          Test Inline Edit
        </button>
      </div>
      
      {/* ContentEditable HTML Content */}
      <div 
        ref={contentEditableRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={handleContentChange}
        className="min-h-[600px] p-4 overflow-auto [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:cursor-text [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:hover:bg-blue-50 [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:hover:rounded [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:hover:px-1 [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:hover:py-0.5 [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:transition-all [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        style={{ position: 'relative' }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      
      {/* Inline Edit Input (for backward compatibility) */}
      {editingElement && (
        <div 
          className="fixed z-50 animate-in fade-in-0 zoom-in-95 duration-200"
          style={{
            top: editingElement.rect.top,
            left: editingElement.rect.left,
            zIndex: 9999
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => {
              if (editingElement) {
                // Update the contentEditable area
                if (contentEditableRef.current) {
                  contentEditableRef.current.innerHTML = contentEditableRef.current.innerHTML.replace(
                    editingElement.originalText,
                    editValue
                  );
                  handleContentChange();
                }
                setEditingElement(null);
                setEditValue('');
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                if (contentEditableRef.current) {
                  contentEditableRef.current.innerHTML = contentEditableRef.current.innerHTML.replace(
                    editingElement.originalText,
                    editValue
                  );
                  handleContentChange();
                }
                setEditingElement(null);
                setEditValue('');
              } else if (event.key === 'Escape') {
                setEditingElement(null);
                setEditValue('');
              }
            }}
            className="px-2 py-1 border-2 border-blue-500 rounded shadow-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
            style={{
              width: Math.max(editingElement.rect.width, 120),
              height: editingElement.rect.height,
              fontSize: 'inherit',
              fontFamily: 'inherit',
              fontWeight: 'inherit',
              color: 'inherit',
              backgroundColor: 'white',
              border: '2px solid #3b82f6',
              borderRadius: '4px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}
          />
          {/* Edit indicator */}
          <div 
            className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-md animate-pulse"
            style={{
              top: -8,
              right: -8
            }}
          >
            ✏️ Editing
          </div>
        </div>
      )}
      
      {/* Floating Toolbar - Only show when there's a text selection, not when editing */}
      {!editingElement && toolbarPosition.visible && (
        <FloatingToolbar
          position={toolbarPosition}
          formatting={formatting}
          onFormattingChange={handleFormattingChange}
          onClose={() => {
            setToolbarPosition(prev => ({ ...prev, visible: false }));
            setSelection(null);
          }}
        />
      )}
      
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-right-5 duration-300">
          ✅ Text updated successfully!
        </div>
      )}
    </div>
  );
}
