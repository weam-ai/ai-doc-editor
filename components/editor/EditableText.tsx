'use client';

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
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

// Store selection as offsets
interface SavedSelection {
  start: number;
  end: number;
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
  const isUpdatingFromProps = useRef(false);

  // Save current selection using offsets
  const saveSelection = useCallback(() => {
    if (!contentEditableRef.current) return;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(contentEditableRef.current);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      const start = preSelectionRange.toString().length;

      savedSelectionRef.current = {
        start: start,
        end: start + range.toString().length
      };
    } else {
      savedSelectionRef.current = null;
    }
  }, []);

  // Restore saved selection using offsets
  const restoreSelection = useCallback(() => {
    if (!contentEditableRef.current || !savedSelectionRef.current) return;

    const { start, end } = savedSelectionRef.current;
    let charIndex = 0;
    const range = document.createRange();
    range.setStart(contentEditableRef.current, 0);
    range.collapse(true);

    const nodeStack: Node[] = [contentEditableRef.current];
    let node: Node | undefined;
    let foundStart = false;
    let stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType === Node.TEXT_NODE) {
        const nextCharIndex = charIndex + node.textContent!.length;
        if (!foundStart && start >= charIndex && start <= nextCharIndex) {
          range.setStart(node, start - charIndex);
          foundStart = true;
        }
        if (foundStart && end >= charIndex && end <= nextCharIndex) {
          range.setEnd(node, end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        let i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  // Handle text selection for toolbar
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !contentEditableRef.current?.contains(selection.anchorNode)) {
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

    const element = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE 
      ? range.commonAncestorContainer as HTMLElement
      : range.commonAncestorContainer.parentElement;

    if (!element) return;

    setSelection({ text, element });
    
    const elementRect = range.getBoundingClientRect();
    const x = elementRect.left + (elementRect.width / 2) - 150;
    const y = elementRect.top - 60;
    
    setToolbarPosition({
      x: Math.max(10, x),
      y: Math.max(10, y),
      visible: true
    });
  }, []);

  // Apply formatting to selected text
  const applyFormatting = useCallback((format: Partial<typeof formatting>) => {
    if (!selection) return;
    
    // This is a simplified example. A real implementation would be more robust.
    if (format.bold) document.execCommand('bold');
    if (format.italic) document.execCommand('italic');
    if (format.underline) document.execCommand('underline');
    
    setFormatting(prev => ({ ...prev, ...format }));
    
    // Refocus and trigger change
    contentEditableRef.current?.focus();
    handleContentChange();
    setToolbarPosition(prev => ({ ...prev, visible: false }));
  }, [selection, handleContentChange]);

  // Handle content changes from contentEditable
  const handleContentChange = useCallback(() => {
    if (contentEditableRef.current && !isUpdatingFromProps.current) {
      const newHtml = contentEditableRef.current.innerHTML;
      saveSelection();
      onContentChange(newHtml);
    }
  }, [onContentChange, saveSelection]);

  // Handle key events in contentEditable
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.execCommand('insertLineBreak', false);
    } else if (event.key === 'Escape' && editingElement) {
      setEditingElement(null);
      setEditValue('');
    }
  }, [editingElement]);

  // Handle paste events to clean HTML
  const handlePaste = useCallback((event: React.ClipboardEvent) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  // Sync content from props
  useEffect(() => {
    if (contentEditableRef.current && htmlContent !== contentEditableRef.current.innerHTML) {
      isUpdatingFromProps.current = true;
      contentEditableRef.current.innerHTML = htmlContent;
      isUpdatingFromProps.current = false;
    }
  }, [htmlContent]);

  // Restore selection after render
  useLayoutEffect(() => {
    restoreSelection();
  });

  // Focus input when editing starts
  useEffect(() => {
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
    if (selection) {
      applyFormatting(format);
    }
  }, [selection, applyFormatting]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Instructions */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 px-4 pt-4 flex items-center justify-between">
        <div>
          💡 <strong>Click any text to edit it inline</strong>
        </div>
        <div className="text-xs text-gray-500">
          ⌨️ Ctrl+B/I/U for formatting
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
      </div>
      
      {/* ContentEditable HTML Content */}
      <div 
        ref={contentEditableRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className="min-h-[600px] p-4 overflow-auto [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:cursor-text [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:hover:bg-blue-50 [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:hover:rounded [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:hover:px-1 [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:hover:py-0.5 [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:transition-all [&_*:not(img):not(input):not(button):not(a):not(table):not(ul):not(ol):not(li):not(form):not(fieldset)]:duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        style={{ position: 'relative' }}
      />
      
      {/* Inline Edit Input (Legacy - could be removed if direct editing is stable) */}
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
                // This logic would need to be updated to work with the new contentEditable model
                setEditingElement(null);
                setEditValue('');
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Escape') {
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
          <div 
            className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-md animate-pulse"
            style={{ top: -8, right: -8 }}
          >
            ✏️ Editing
          </div>
        </div>
      )}
      
      {/* Floating Toolbar */}
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
