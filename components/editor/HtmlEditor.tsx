'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useState, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';

interface HtmlEditorProps {
  content: string;
  onChange: (content: string) => void;
}

interface PreserveStyleEditorProps {
  content: string;
  onChange: (content: string) => void;
}

// Simple contentEditable editor that preserves all inline styles perfectly
function PreserveStyleEditor({ content, onChange }: PreserveStyleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Set initial content when component mounts or content prop changes from external source
  useEffect(() => {
    if (editorRef.current) {
      if (content && !isEditing) {
        editorRef.current.innerHTML = content;
      } else if (!content) {
        editorRef.current.innerHTML = '<p>Click here to start editing...</p>';
      }
    }
  }, [content, isEditing]);

  // Function to apply formatting using modern DOM manipulation
  const applyFormatting = (format: string) => {
    console.log('Applying formatting:', format);
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      console.log('No selection found');
      return;
    }

    const range = selection.getRangeAt(0);
    console.log('Range collapsed:', range.collapsed, 'Range text:', range.toString());
    
    // If range is collapsed (no selection), don't apply formatting
    if (range.collapsed) {
      console.log('No text selected, skipping formatting');
      return;
    }

    // Create the appropriate element based on format
    let element: HTMLElement;
    switch (format) {
      case 'bold':
        element = document.createElement('strong');
        break;
      case 'italic':
        element = document.createElement('em');
        break;
      case 'underline':
        element = document.createElement('u');
        break;
      case 'strikethrough':
        element = document.createElement('s');
        break;
      default:
        return;
    }

    if (range.collapsed) {
      // No text selected - insert placeholder text
      element.textContent = 'formatted text';
      range.insertNode(element);
      
      // Select the inserted text
      const newRange = document.createRange();
      newRange.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // Text is selected - wrap it
      const contents = range.extractContents();
      element.appendChild(contents);
      range.insertNode(element);

      // Clear selection and set cursor after the element
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.setStartAfter(element);
      newRange.setEndAfter(element);
      selection.addRange(newRange);
    }

    // Trigger input event to update content
    const inputEvent = new Event('input', { bubbles: true });
    if (editorRef.current) {
      editorRef.current.dispatchEvent(inputEvent);
    }
  };

  // Function to check if text is already formatted with a specific tag
  const isTextFormatted = (range: Range, tagName: string): boolean => {
    const container = range.commonAncestorContainer;
    
    // If the container is a text node, check its parent
    let element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as Element;
    
    // Walk up the DOM tree to find if we're inside the target tag
    while (element && element !== editorRef.current) {
      if (element.tagName && element.tagName.toLowerCase() === tagName.toLowerCase()) {
        return true;
      }
      element = element.parentElement;
    }
    
    return false;
  };

  // Function to remove formatting from a range
  const removeFormatting = (range: Range, tagName: string) => {
    const container = range.commonAncestorContainer;
    let element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as Element;
    
    // Find the formatting element
    while (element && element !== editorRef.current) {
      if (element.tagName && element.tagName.toLowerCase() === tagName.toLowerCase()) {
        // Unwrap the element by moving its children to its parent
        const parent = element.parentNode;
        if (parent) {
          // Move all children before the element
          while (element.firstChild) {
            parent.insertBefore(element.firstChild, element);
          }
          // Remove the empty element
          parent.removeChild(element);
        }
        return true;
      }
      element = element.parentElement;
    }
    
    return false;
  };

  // Function to apply formatting using a saved range
  const applyFormattingWithRange = (format: string, savedRange: Range | null) => {
    console.log('Applying formatting with range:', format, savedRange);
    
    if (!savedRange) {
      console.log('No saved range available');
      return;
    }
    
    if (savedRange.collapsed) {
      console.log('Saved range is collapsed, no text selected');
      return;
    }
    
    // Ensure the editor is focused
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    // Create a new range from the saved range to avoid issues
    const newRange = document.createRange();
    newRange.setStart(savedRange.startContainer, savedRange.startOffset);
    newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
    
    // Restore the selection
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    
    // Determine the tag name for the format
    let tagName: string;
    switch (format) {
      case 'bold':
        tagName = 'strong';
        break;
      case 'italic':
        tagName = 'em';
        break;
      case 'underline':
        tagName = 'u';
        break;
      case 'strikethrough':
        tagName = 's';
        break;
      default:
        return;
    }

    // Check if the text is already formatted with this tag
    if (isTextFormatted(newRange, tagName)) {
      console.log('Text is already formatted, removing formatting');
      // Remove the formatting
      if (removeFormatting(newRange, tagName)) {
        // Trigger input event to update content
        const inputEvent = new Event('input', { bubbles: true });
        if (editorRef.current) {
          editorRef.current.dispatchEvent(inputEvent);
        }
        return;
      }
    }

    // Create the appropriate element based on format
    let element: HTMLElement;
    switch (format) {
      case 'bold':
        element = document.createElement('strong');
        break;
      case 'italic':
        element = document.createElement('em');
        break;
      case 'underline':
        element = document.createElement('u');
        break;
      case 'strikethrough':
        element = document.createElement('s');
        break;
      default:
        return;
    }

    // Extract the selected content and wrap it
    const contents = newRange.extractContents();
    element.appendChild(contents);
    newRange.insertNode(element);

    // Clear selection and set cursor after the element
    if (selection) {
      selection.removeAllRanges();
      const cursorRange = document.createRange();
      cursorRange.setStartAfter(element);
      cursorRange.setEndAfter(element);
      selection.addRange(cursorRange);
    }

    // Trigger input event to update content
    const inputEvent = new Event('input', { bubbles: true });
    if (editorRef.current) {
      editorRef.current.dispatchEvent(inputEvent);
    }
  };

  // Store the last selection globally
  const lastSelectionRef = useRef<Range | null>(null);
  const lastSelectedTextRef = useRef<string>('');

  // Listen for selection changes to store the last valid selection
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        // Only store non-collapsed selections
        if (!range.collapsed && editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
          lastSelectionRef.current = range.cloneRange();
          lastSelectedTextRef.current = range.toString();
          console.log('Stored selection:', range.toString());
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  // Function to apply text alignment
  const applyAlignment = (alignment: string, savedRange: Range | null) => {
    if (!savedRange || savedRange.collapsed) return;
    
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    const newRange = document.createRange();
    newRange.setStart(savedRange.startContainer, savedRange.startOffset);
    newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
    
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    
    // Find the containing block element
    let blockElement: Node | null = newRange.commonAncestorContainer;
    while (blockElement && blockElement.nodeType !== Node.ELEMENT_NODE) {
      blockElement = blockElement.parentNode;
    }
    
    if (blockElement) {
      // Find the nearest block-level element
      while (blockElement && !['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'].includes(blockElement.nodeName)) {
        blockElement = blockElement.parentNode;
      }
      
      if (blockElement) {
        (blockElement as HTMLElement).style.textAlign = alignment;
      }
    }
  };

  // Function to apply lists
  const applyList = (listType: string, savedRange: Range | null) => {
    if (!savedRange || savedRange.collapsed) return;
    
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    const newRange = document.createRange();
    newRange.setStart(savedRange.startContainer, savedRange.startOffset);
    newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
    
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    
    const selectedText = newRange.toString();
    if (selectedText) {
      const list = document.createElement(listType);
      const listItem = document.createElement('li');
      listItem.textContent = selectedText;
      list.appendChild(listItem);
      
      newRange.deleteContents();
      newRange.insertNode(list);
    }
  };

  // Function to apply links
  const applyLink = (savedRange: Range | null) => {
    if (!savedRange || savedRange.collapsed) return;
    
    const url = prompt('Enter URL:');
    if (!url) return;
    
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    const newRange = document.createRange();
    newRange.setStart(savedRange.startContainer, savedRange.startOffset);
    newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
    
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    
    const link = document.createElement('a');
    link.href = url;
    link.textContent = newRange.toString();
    
    newRange.deleteContents();
    newRange.insertNode(link);
  };

  // Function to remove links
  const removeLink = (savedRange: Range | null) => {
    if (!savedRange || savedRange.collapsed) return;
    
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    const newRange = document.createRange();
    newRange.setStart(savedRange.startContainer, savedRange.startOffset);
    newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
    
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    
    // Find and unwrap link elements
    const linkElements = newRange.commonAncestorContainer.parentElement?.querySelectorAll('a') || [];
    linkElements.forEach(link => {
      if (newRange.intersectsNode(link)) {
        const parent = link.parentNode;
        while (link.firstChild) {
          parent?.insertBefore(link.firstChild, link);
        }
        parent?.removeChild(link);
      }
    });
  };

  // Function to insert images
  const insertImage = (savedRange: Range | null) => {
    const imageUrl = prompt('Enter image URL:');
    if (!imageUrl) return;
    
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Image';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    
    if (savedRange && !savedRange.collapsed) {
      const newRange = document.createRange();
      newRange.setStart(savedRange.startContainer, savedRange.startOffset);
      newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
      newRange.deleteContents();
      newRange.insertNode(img);
    } else {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.insertNode(img);
        range.setStartAfter(img);
        range.setEndAfter(img);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // Function to insert tables
  const insertTable = (savedRange: Range | null) => {
    const rows = prompt('Number of rows:', '3');
    const cols = prompt('Number of columns:', '3');
    
    if (!rows || !cols) return;
    
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    table.style.border = '1px solid #ccc';
    
    for (let i = 0; i < parseInt(rows); i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < parseInt(cols); j++) {
        const cell = document.createElement(i === 0 ? 'th' : 'td');
        cell.textContent = i === 0 ? `Header ${j + 1}` : `Cell ${i}-${j + 1}`;
        cell.style.border = '1px solid #ccc';
        cell.style.padding = '8px';
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    
    if (savedRange && !savedRange.collapsed) {
      const newRange = document.createRange();
      newRange.setStart(savedRange.startContainer, savedRange.startOffset);
      newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
      newRange.deleteContents();
      newRange.insertNode(table);
    } else {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.insertNode(table);
        range.setStartAfter(table);
        range.setEndAfter(table);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // Function to apply text color
  const applyColor = (savedRange: Range | null) => {
    if (!savedRange || savedRange.collapsed) return;
    
    const color = prompt('Enter color (e.g., #ff0000 or red):');
    if (!color) return;
    
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    const newRange = document.createRange();
    newRange.setStart(savedRange.startContainer, savedRange.startOffset);
    newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
    
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    
    const span = document.createElement('span');
    span.style.color = color;
    span.appendChild(newRange.extractContents());
    newRange.insertNode(span);
  };

  // Function to apply text highlight
  const applyHighlight = (savedRange: Range | null) => {
    if (!savedRange || savedRange.collapsed) return;
    
    const highlightColor = prompt('Enter highlight color (e.g., #ffff00 or yellow):');
    if (!highlightColor) return;
    
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    const newRange = document.createRange();
    newRange.setStart(savedRange.startContainer, savedRange.startOffset);
    newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
    
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    
    const span = document.createElement('span');
    span.style.backgroundColor = highlightColor;
    span.appendChild(newRange.extractContents());
    newRange.insertNode(span);
  };

  // Function to apply font size
  const applyFontSize = (value: string | undefined, savedRange: Range | null) => {
    if (!value) return;
    
    if (savedRange && !savedRange.collapsed) {
      if (editorRef.current) {
        editorRef.current.focus();
      }
      
      const newRange = document.createRange();
      newRange.setStart(savedRange.startContainer, savedRange.startOffset);
      newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
      
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
      
      const span = document.createElement('span');
      span.style.fontSize = value;
      span.appendChild(newRange.extractContents());
      newRange.insertNode(span);
    }
  };

  // Function to apply font family
  const applyFontFamily = (value: string | undefined, savedRange: Range | null) => {
    if (!value) return;
    
    if (savedRange && !savedRange.collapsed) {
      if (editorRef.current) {
        editorRef.current.focus();
      }
      
      const newRange = document.createRange();
      newRange.setStart(savedRange.startContainer, savedRange.startOffset);
      newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
      
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
      
      const span = document.createElement('span');
      span.style.fontFamily = value;
      span.appendChild(newRange.extractContents());
      newRange.insertNode(span);
    }
  };

  // Function to apply headings
  const applyHeading = (value: string | undefined, savedRange: Range | null) => {
    if (!value) return;
    
    if (savedRange && !savedRange.collapsed) {
      if (editorRef.current) {
        editorRef.current.focus();
      }
      
      const newRange = document.createRange();
      newRange.setStart(savedRange.startContainer, savedRange.startOffset);
      newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
      
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
      
      const heading = document.createElement(`h${value}`);
      heading.textContent = newRange.toString();
      newRange.deleteContents();
      newRange.insertNode(heading);
    }
  };

  // Function to apply paragraph
  const applyParagraph = (savedRange: Range | null) => {
    if (savedRange && !savedRange.collapsed) {
      if (editorRef.current) {
        editorRef.current.focus();
      }
      
      const newRange = document.createRange();
      newRange.setStart(savedRange.startContainer, savedRange.startOffset);
      newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
      
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
      
      const paragraph = document.createElement('p');
      paragraph.textContent = newRange.toString();
      newRange.deleteContents();
      newRange.insertNode(paragraph);
    }
  };

  // Fallback function to find and select text
  const findAndSelectText = (text: string) => {
    if (!editorRef.current || !text) return null;
    
    const walker = document.createTreeWalker(
      editorRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    let node;
    while (node = walker.nextNode()) {
      const textContent = node.textContent || '';
      const index = textContent.indexOf(text);
      if (index !== -1) {
        const range = document.createRange();
        range.setStart(node, index);
        range.setEnd(node, index + text.length);
        return range;
      }
    }
    return null;
  };

  // Listen for toolbar actions
  useEffect(() => {
    const handleToolbarAction = (event: CustomEvent) => {
      console.log('Toolbar action received:', event.detail);
      if (!editorRef.current) return;
      
      const { action, value } = event.detail;
      
      // Use the last stored selection
      let savedRange = lastSelectionRef.current;
      console.log('Using stored range:', savedRange ? savedRange.toString() : 'none', 'Collapsed:', savedRange ? savedRange.collapsed : 'N/A');
      
      // If no valid range, try to find the last selected text
      if (!savedRange || savedRange.collapsed) {
        console.log('Trying fallback - finding text:', lastSelectedTextRef.current);
        savedRange = findAndSelectText(lastSelectedTextRef.current);
        if (savedRange) {
          console.log('Found text with fallback:', savedRange.toString());
        }
      }
      
      // Apply formatting with saved selection
      switch (action) {
        case 'bold':
          applyFormattingWithRange('bold', savedRange);
          break;
        case 'italic':
          applyFormattingWithRange('italic', savedRange);
          break;
        case 'underline':
          applyFormattingWithRange('underline', savedRange);
          break;
        case 'strikethrough':
          applyFormattingWithRange('strikethrough', savedRange);
          break;
        case 'align-left':
          applyAlignment('left', savedRange);
          break;
        case 'align-center':
          applyAlignment('center', savedRange);
          break;
        case 'align-right':
          applyAlignment('right', savedRange);
          break;
        case 'align-justify':
          applyAlignment('justify', savedRange);
          break;
        case 'bullet-list':
          applyList('ul', savedRange);
          break;
        case 'ordered-list':
          applyList('ol', savedRange);
          break;
        case 'link':
          applyLink(savedRange);
          break;
        case 'unlink':
          removeLink(savedRange);
          break;
        case 'image':
          insertImage(savedRange);
          break;
        case 'table':
          insertTable(savedRange);
          break;
        case 'color':
          applyColor(savedRange);
          break;
        case 'highlight':
          applyHighlight(savedRange);
          break;
        case 'font-size':
          applyFontSize(value, savedRange);
          break;
        case 'font-family':
          applyFontFamily(value, savedRange);
          break;
        case 'heading':
          applyHeading(value, savedRange);
          break;
        case 'paragraph':
          applyParagraph(savedRange);
          break;
      }
      
      // Trigger input event to update content
      const inputEvent = new Event('input', { bubbles: true });
      editorRef.current.dispatchEvent(inputEvent);
    };

    window.addEventListener('toolbar-action', handleToolbarAction as EventListener);
    
    return () => {
      window.removeEventListener('toolbar-action', handleToolbarAction as EventListener);
    };
  }, []);
  
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    
    // Debounce the onChange call to prevent excessive updates
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      onChange(newContent);
    }, 150); // 150ms debounce
  };
  
  const handleFocus = () => {
    setIsEditing(true);
  };
  
  const handleBlur = () => {
    setIsEditing(false);
    
    // Make sure final content is saved when losing focus
    if (editorRef.current) {
      const finalContent = editorRef.current.innerHTML;
      onChange(finalContent);
    }
  };
  
  return (
    <div className="preserve-styles-editor">
      <style>
        {`
          .preserve-styles-editor {
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            overflow: hidden;
          }
          
          .editable-content {
            min-height: 500px;
            padding: 16px !important;
            outline: none;
            background: white;
            overflow: auto;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: #333;
          }
          
          /* Focus outline */
          .editable-content:focus {
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
          }
          
          /* Let inline styles override everything */
          .editable-content *[style] {
            /* Inline styles automatically have higher specificity */
          }
          
          /* Ensure formatting commands work properly */
          .editable-content strong, .editable-content b {
            font-weight: bold;
          }
          
          .editable-content em, .editable-content i {
            font-style: italic;
          }
          
          .editable-content u {
            text-decoration: underline;
          }
          
          .editable-content s, .editable-content strike {
            text-decoration: line-through;
          }
          
          .editable-content h1, .editable-content h2, .editable-content h3 {
            font-weight: bold;
            margin: 1em 0 0.5em 0;
          }
          
          .editable-content h1 { font-size: 2em; }
          .editable-content h2 { font-size: 1.5em; }
          .editable-content h3 { font-size: 1.2em; }
          
          .editable-content ul, .editable-content ol {
            margin: 1em 0;
            padding-left: 2em;
          }
          
          .editable-content li {
            margin: 0.25em 0;
          }
        `}
      </style>
      
      <div
        ref={editorRef}
        className="editable-content"
        contentEditable
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={() => {
          // Ensure focus is maintained when clicking
          if (editorRef.current) {
            editorRef.current.focus();
          }
        }}
        suppressContentEditableWarning={true}
      />
    </div>
  );
}

export default function HtmlEditor({ content, onChange }: HtmlEditorProps) {
  const [htmlContent, setHtmlContent] = useState(content || '');
  const [activeTab, setActiveTab] = useState('preview');
  const isUpdatingFromPreview = useRef(false);
  const isUpdatingFromHtmlCode = useRef(false);

  // Initialize htmlContent when content prop changes
  useEffect(() => {
    if (content !== undefined && content !== htmlContent) {
      setHtmlContent(content);
    }
  }, [content]);

  const handlePreviewChange = (newBodyHtml: string) => {
    if (isUpdatingFromHtmlCode.current) {
      return;
    }
    
    isUpdatingFromPreview.current = true;
    
    // Preserve the original structure but update the body content
    let updatedHtml = htmlContent;
    
    // If the original content has a full HTML structure, preserve it
    if (htmlContent.includes('<html') || htmlContent.includes('<!DOCTYPE')) {
      // Replace the body content while preserving the HTML structure
      const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (bodyMatch) {
        updatedHtml = htmlContent.replace(
          /<body[^>]*>([\s\S]*)<\/body>/i,
          `<body>${newBodyHtml}</body>`
        );
      } else {
        // If no body tag found but HTML structure exists, wrap in body
        const htmlMatch = htmlContent.match(/<html[^>]*>([\s\S]*)<\/html>/i);
        if (htmlMatch) {
          const headMatch = htmlContent.match(/<head[^>]*>[\s\S]*?<\/head>/i);
          const head = headMatch ? headMatch[0] : '<head></head>';
          updatedHtml = htmlContent.replace(
            /<html[^>]*>([\s\S]*)<\/html>/i,
            `<html>${head}<body>${newBodyHtml}</body></html>`
          );
        }
      }
    } else {
      // If it's just body content, use the new content directly
      updatedHtml = newBodyHtml;
    }
    
    if (updatedHtml !== htmlContent) {
      setHtmlContent(updatedHtml);
      onChange(updatedHtml);
    }
    
    setTimeout(() => {
      isUpdatingFromPreview.current = false;
    }, 100);
  };
  
  const handleHtmlCodeChange = (newHtml: string) => {
    if (isUpdatingFromPreview.current) {
      return;
    }
    
    isUpdatingFromHtmlCode.current = true;
    console.log('HtmlEditor - handleHtmlCodeChange called:', {
      contentLength: newHtml?.length || 0,
      preview: newHtml?.substring(0, 100) + '...'
    });
    
    if (newHtml !== htmlContent) {
      setHtmlContent(newHtml);
      onChange(newHtml);
    }
    
    setTimeout(() => {
      isUpdatingFromHtmlCode.current = false;
    }, 100);
  };
  
  const handleTabChange = (newTab: string) => {
    console.log('HtmlEditor - Tab switching to:', newTab);
    setActiveTab(newTab);
    
    // Force content synchronization when switching tabs
    if (newTab === 'html') {
    } else if (newTab === 'preview') {
    }
  };

  const extractBodyContent = (html: string) => {
    
    if (!html || html.trim() === '') {
      console.log('HtmlEditor - Empty HTML content');
      return '<p>No content available</p>';
    }
    
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

  const extractStyles = (html: string) => {
    if (!html || html.trim() === '') {
      return '';
    }
    
    // Extract styles from <style> tags in the head
    const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    if (styleMatches) {
      return styleMatches.join('\n');
    }
    
    return '';
  };

  const getStyledBodyContent = (html: string) => {
    const bodyContent = extractBodyContent(html);
    const styles = extractStyles(html);
    
    if (styles) {
      // Wrap the body content with the extracted styles
      return `<div class="html-content-wrapper">${styles}${bodyContent}</div>`;
    }
    
    return bodyContent;
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
          <TabsTrigger value="html">HTML Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card className="p-6">
            <div className="bg-white min-h-[500px] overflow-auto">
              <PreserveStyleEditor
                content={extractBodyContent(htmlContent)}
                onChange={handlePreviewChange}
              />
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
                  onChange={(e) => handleHtmlCodeChange(e.target.value)}
                  placeholder="Enter your HTML content here..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>

            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
