import { useState, useCallback, useRef, useEffect } from 'react';

export interface TextSelection {
  start: number;
  end: number;
  text: string;
  element: HTMLElement;
}

export interface ToolbarPosition {
  x: number;
  y: number;
  visible: boolean;
}

export interface FormattingState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  fontSize: string;
  fontFamily: string;
  textColor: string;
  highlightColor: string;
  alignment: 'left' | 'center' | 'right';
}

export const useEditorState = () => {
  const [selection, setSelection] = useState<TextSelection | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState<ToolbarPosition>({
    x: 0,
    y: 0,
    visible: false
  });
  const [formatting, setFormatting] = useState<FormattingState>({
    bold: false,
    italic: false,
    underline: false,
    fontSize: '14px',
    fontFamily: 'Arial',
    textColor: '#000000',
    highlightColor: '#ffffff',
    alignment: 'left'
  });

  const toolbarContainerRef = useRef<HTMLDivElement>(null);

  // Update toolbar position based on selection
  const updateToolbarPosition = useCallback((selection: TextSelection) => {
    if (!toolbarContainerRef.current) return;

    const containerRect = toolbarContainerRef.current.getBoundingClientRect();
    const elementRect = selection.element.getBoundingClientRect();
    
    // Position toolbar above the selected text
    const x = elementRect.left + (elementRect.width / 2) - 150; // Center toolbar
    const y = elementRect.top - 60; // Above the text
    
    setToolbarPosition({
      x: Math.max(10, x), // Ensure toolbar doesn't go off-screen
      y: Math.max(10, y),
      visible: true
    });
  }, []);

  // Handle text selection
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

    const textSelection: TextSelection = {
      start: range.startOffset,
      end: range.endOffset,
      text,
      element
    };

    setSelection(textSelection);
    updateToolbarPosition(textSelection);
  }, [updateToolbarPosition]);

  // Apply formatting to selected text
  const applyFormatting = useCallback((format: Partial<FormattingState>) => {
    if (!selection) return;

    const { element, start, end } = selection;
    
    // Create a new range
    const range = document.createRange();
    const textNode = element.firstChild;
    
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
    
    range.setStart(textNode, start);
    range.setEnd(textNode, end);

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

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case 'b':
          event.preventDefault();
          applyFormatting({ bold: !formatting.bold });
          break;
        case 'i':
          event.preventDefault();
          applyFormatting({ italic: !formatting.italic });
          break;
        case 'u':
          event.preventDefault();
          applyFormatting({ underline: !formatting.underline });
          break;
      }
    }
  }, [formatting, applyFormatting]);

  // Hide toolbar when clicking outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (toolbarContainerRef.current && !toolbarContainerRef.current.contains(event.target as Node)) {
      setToolbarPosition(prev => ({ ...prev, visible: false }));
      setSelection(null);
    }
  }, []);

  // Setup event listeners
  useEffect(() => {
    document.addEventListener('selectionchange', handleTextSelection);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('selectionchange', handleTextSelection);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleTextSelection, handleKeyDown, handleClickOutside]);

  return {
    selection,
    toolbarPosition,
    formatting,
    containerRef: toolbarContainerRef,
    applyFormatting,
    setFormatting
  };
};
