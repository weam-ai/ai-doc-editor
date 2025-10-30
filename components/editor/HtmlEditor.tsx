'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
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
  editorRef?: React.RefObject<HTMLDivElement>;
  onFontFamilyChange?: (fontFamily: string | null) => void;
}

interface PreserveStyleEditorProps {
  content: string;
  onChange: (content: string) => void;
  editorRef?: React.RefObject<HTMLDivElement>;
  onFontFamilyChange?: (fontFamily: string | null) => void;
}

interface ColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => void;
  type: 'text' | 'background';
}

// Color picker component
function ColorPicker({ isOpen, onClose, onSelectColor, type }: ColorPickerProps) {
  const colors = [
    '#000000', '#404040', '#808080', '#C0C0C0', '#E0E0E0', '#FFFFFF',
    '#FFFFE0', '#FFE4E1', '#FFB6C1', '#E6E6FA', '#E0F6FF', '#F0FFF0',
    '#FFFF00', '#FFA500', '#FF0000', '#800080', '#0000FF', '#008000',
    '#808000', '#8B4513', '#8B0000', '#4B0082', '#000080', '#006400'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {type === 'text' ? 'Text Color' : 'Background Color'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-6 gap-2 mb-4">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                onSelectColor(color);
                onClose();
              }}
              className="w-10 h-10 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="color"
            onChange={(e) => {
              onSelectColor(e.target.value);
              onClose();
            }}
            className="flex-1 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple contentEditable editor that preserves all inline styles perfectly
function PreserveStyleEditor({ content, onChange, editorRef: externalEditorRef, onFontFamilyChange }: PreserveStyleEditorProps) {
  const internalEditorRef = useRef<HTMLDivElement>(null);
  const editorRef = externalEditorRef || internalEditorRef;
  const [isEditing, setIsEditing] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [colorPickerType, setColorPickerType] = useState<'text' | 'background'>('text');
  const [pendingRange, setPendingRange] = useState<Range | null>(null);
  
  // Set initial content when component mounts or content prop changes from external source
  useEffect(() => {
    if (editorRef.current) {
      // Only update if we're not currently editing AND the content has actually changed
      const currentContent = editorRef.current.innerHTML;
      
      if (content && !isEditing && currentContent !== content) {
        // Before updating, check if there are any focused interactive elements
        const activeElement = document.activeElement as HTMLElement;
        const isInteractiveElementFocused = activeElement && 
                                           editorRef.current.contains(activeElement) &&
                                           (activeElement.tagName === 'INPUT' || 
                                            activeElement.tagName === 'TEXTAREA' || 
                                            activeElement.tagName === 'SELECT');
        
        // Don't update if an interactive element is focused
        if (isInteractiveElementFocused) {
          return;
        }
        
        editorRef.current.innerHTML = content;
      } else if (!content && !currentContent) {
        editorRef.current.innerHTML = '<p>Click here to start editing...</p>';
      }
    }
  }, [content, isEditing]);

  // Function to apply formatting using modern DOM manipulation
  const applyFormatting = (format: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    
    // If range is collapsed (no selection), don't apply formatting
    if (range.collapsed) {
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
  // const applyFormattingWithRange = (format: string, savedRange: Range | null) => {
  //   if (!savedRange) {
  //     return;
  //   }
    
  //   if (savedRange.collapsed) {
  //     return;
  //   }
    
  //   // Validate that the range is still valid
  //   try {
  //     const testRange = savedRange.cloneRange();
  //     const testText = testRange.toString();
  //     if (!testText || testText.trim() === '') {
  //       return;
  //     }
  //   } catch (error) {
  //     return;
  //   }
    
  //   // Ensure the editor is focused
  //   if (editorRef.current) {
  //     editorRef.current.focus();
  //   }
    
  //   // Create a new range from the saved range to avoid issues
  //   const newRange = document.createRange();
  //   newRange.setStart(savedRange.startContainer, savedRange.startOffset);
  //   newRange.setEnd(savedRange.endContainer, savedRange.endOffset);
    
  //   // Restore the selection
  //   const selection = window.getSelection();
  //   if (selection) {
  //     selection.removeAllRanges();
  //     selection.addRange(newRange);
  //   }
    
  //   // Determine the tag name for the format
  //   let tagName: string;
  //   switch (format) {
  //     case 'bold':
  //       tagName = 'strong';
  //       break;
  //     case 'italic':
  //       tagName = 'em';
  //       break;
  //     case 'underline':
  //       tagName = 'u';
  //       break;
  //     case 'strikethrough':
  //       tagName = 's';
  //       break;
  //     default:
  //       return;
  //   }

  //   // Check if the text is already formatted with this tag
  //   if (isTextFormatted(newRange, tagName)) {
  //     // Remove the formatting
  //     if (removeFormatting(newRange, tagName)) {
  //       // Trigger input event to update content
  //       const inputEvent = new Event('input', { bubbles: true });
  //       if (editorRef.current) {
  //         editorRef.current.dispatchEvent(inputEvent);
  //       }
  //       return;
  //     }
  //   }

  //   // Create the appropriate element based on format
  //   let element: HTMLElement;
  //   switch (format) {
  //     case 'bold':
  //       element = document.createElement('strong');
  //       break;
  //     case 'italic':
  //       element = document.createElement('em');
  //       break;
  //     case 'underline':
  //       element = document.createElement('u');
  //       break;
  //     case 'strikethrough':
  //       element = document.createElement('s');
  //       break;
  //     default:
  //       return;
  //   }

  //   // Extract the selected content and wrap it
  //   const contents = newRange.extractContents();
  //   element.appendChild(contents);
  //   newRange.insertNode(element);

  //   // Clear selection and set cursor after the element
  //   if (selection) {
  //     selection.removeAllRanges();
  //     const cursorRange = document.createRange();
  //     cursorRange.setStartAfter(element);
  //     cursorRange.setEndAfter(element);
  //     selection.addRange(cursorRange);
  //   }

  //   // Trigger input event to update content
  //   const inputEvent = new Event('input', { bubbles: true });
  //   if (editorRef.current) {
  //     editorRef.current.dispatchEvent(inputEvent);
  //   }
  // };

  const applyFormattingWithRange = (format: string, savedRange: Range | null) => {
    if (!savedRange || savedRange.collapsed) return;
    if (!editorRef.current) return;
  
    const selection = window.getSelection();
    if (!selection) return;
  
    let tagName: keyof HTMLElementTagNameMap;
    switch (format) {
      case "bold": tagName = "strong"; break;
      case "italic": tagName = "em"; break;
      case "underline": tagName = "u"; break;
      case "strikethrough": tagName = "s"; break;
      default: return;
    }
  
    const range = savedRange.cloneRange();
    const walker = document.createTreeWalker(editorRef.current, NodeFilter.SHOW_TEXT, null);
    const textNodes: Text[] = [];
  
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      
      // Skip empty text nodes (whitespace only)
      if (!node.textContent || node.textContent.trim() === '') {
        continue;
      }
  
      const nodeRange = document.createRange();
      nodeRange.selectNodeContents(node);
  
      // Check if node actually intersects with the selection
      // A node intersects if it's not completely before or after the selection
      const startComparison = range.compareBoundaryPoints(Range.START_TO_END, nodeRange);
      const endComparison = range.compareBoundaryPoints(Range.END_TO_START, nodeRange);
      
      if (startComparison > 0 && endComparison < 0) {
        textNodes.push(node);
      }
    }
  
    // Check if all selected text is already wrapped with the same tag
    let allTextAlreadyWrapped = true;
    for (const textNode of textNodes) {
      const parent = textNode.parentNode as HTMLElement;
      if (parent.nodeName.toLowerCase() !== tagName) {
        allTextAlreadyWrapped = false;
        break;
      }
    }

    if (allTextAlreadyWrapped && textNodes.length > 0) {
      // Remove formatting - unwrap all the selected text
      textNodes.forEach((textNode) => {
        const parent = textNode.parentNode as HTMLElement;
        if (parent.nodeName.toLowerCase() === tagName) {
          const grandParent = parent.parentNode;
          if (grandParent) {
            // Move all children of the wrapper to its parent
            while (parent.firstChild) {
              grandParent.insertBefore(parent.firstChild, parent);
            }
            // Remove the empty wrapper
            grandParent.removeChild(parent);
          }
        }
      });
    } else {
      // Apply formatting - wrap the selected text
      textNodes.forEach((textNode) => {
        const parent = textNode.parentNode as HTMLElement;
        if (parent.nodeName.toLowerCase() === tagName) return;
  
        const startOffset = textNode === range.startContainer ? range.startOffset : 0;
        const endOffset = textNode === range.endContainer ? range.endOffset : textNode.textContent!.length;
  
        if (startOffset === 0 && endOffset === textNode.textContent!.length) {
          const wrapper = document.createElement(tagName);
          parent.replaceChild(wrapper, textNode);
          wrapper.appendChild(textNode);
        } else {
          const before = textNode.textContent!.slice(0, startOffset);
          const selected = textNode.textContent!.slice(startOffset, endOffset);
          const after = textNode.textContent!.slice(endOffset);
  
          if (before) parent.insertBefore(document.createTextNode(before), textNode);
  
          const wrapper = document.createElement(tagName);
          wrapper.appendChild(document.createTextNode(selected));
          parent.insertBefore(wrapper, textNode);
  
          if (after) parent.insertBefore(document.createTextNode(after), textNode);
  
          parent.removeChild(textNode);
        }
      });
    }
  
    // Restore cursor - find the last created wrapper element
    if (textNodes.length > 0) {
      const cursorRange = document.createRange();
      
      // Find the last wrapper element that was created
      const lastWrapper = editorRef.current.querySelector(`${tagName}:last-of-type`);
      
      if (lastWrapper) {
        cursorRange.setStartAfter(lastWrapper);
        cursorRange.setEndAfter(lastWrapper);
      } else {
        // Fallback: set cursor at the end of the range
        cursorRange.setStart(range.endContainer, range.endOffset);
        cursorRange.setEnd(range.endContainer, range.endOffset);
      }
      
      // selection.removeAllRanges();
      selection.addRange(cursorRange);
    }
  
    editorRef.current.dispatchEvent(new Event("input", { bubbles: true }));
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
        // Store both collapsed and non-collapsed selections, but prioritize non-collapsed
        if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
          lastSelectionRef.current = range.cloneRange();
          lastSelectedTextRef.current = range.toString();
          
          // Check for font family changes and notify parent
          if (onFontFamilyChange) {
            if (!range.collapsed) {
              const currentFontFamily = getCurrentFontFamily();
              onFontFamilyChange(currentFontFamily);
            } else {
              // No text selected, reset font family
              onFontFamilyChange(null);
            }
          }
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [onFontFamilyChange]);

  // Function to sync input values to HTML attributes for persistence
  const syncInputValuesToAttributes = () => {
    if (!editorRef.current) return;
    
    // Update all input elements to have their current value in the value attribute
    const inputs = editorRef.current.querySelectorAll('input');
    inputs.forEach(input => {
      const inputElement = input as HTMLInputElement;
      if (inputElement.type === 'checkbox') {
        // For checkboxes, sync the checked state
        if (inputElement.checked) {
          inputElement.setAttribute('checked', 'checked');
        } else {
          inputElement.removeAttribute('checked');
        }
      } else if (inputElement.type === 'radio') {
        // For radio buttons, sync the checked state
        if (inputElement.checked) {
          inputElement.setAttribute('checked', 'checked');
        } else {
          inputElement.removeAttribute('checked');
        }
      } else {
        // For text inputs, sync the value
        inputElement.setAttribute('value', inputElement.value);
      }
    });
    
    // Update all textarea elements
    const textareas = editorRef.current.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      const textareaElement = textarea as HTMLTextAreaElement;
      textareaElement.textContent = textareaElement.value;
    });
    
    // Update all select elements
    const selects = editorRef.current.querySelectorAll('select');
    selects.forEach(select => {
      const selectElement = select as HTMLSelectElement;
      const options = selectElement.querySelectorAll('option');
      options.forEach((option, index) => {
        if (index === selectElement.selectedIndex) {
          option.setAttribute('selected', 'selected');
        } else {
          option.removeAttribute('selected');
        }
      });
    });
  };

  // Listen for changes in input fields and save them
  useEffect(() => {
    if (!editorRef.current) return;
    
    const handleInputChange = (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      
      // Sync the value to the attribute immediately
      if (target.tagName === 'INPUT') {
        const inputElement = target as HTMLInputElement;
        if (inputElement.type === 'checkbox' || inputElement.type === 'radio') {
          if (inputElement.checked) {
            inputElement.setAttribute('checked', 'checked');
          } else {
            inputElement.removeAttribute('checked');
          }
        } else {
          inputElement.setAttribute('value', inputElement.value);
        }
      } else if (target.tagName === 'TEXTAREA') {
        target.textContent = target.value;
      }
      
      // Trigger a delayed save to persist the input value
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      debounceTimeoutRef.current = setTimeout(() => {
        // Sync all values before saving
        syncInputValuesToAttributes();
        
        if (editorRef.current) {
          const currentContent = editorRef.current.innerHTML;
          onChange(currentContent);
        }
      }, 500); // Longer debounce for input fields
    };
    
    // Attach change listeners to all input/textarea/select elements
    const attachListeners = () => {
      if (!editorRef.current) return;
      
      const inputs = editorRef.current.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
        input.addEventListener('change', handleInputChange);
        input.addEventListener('blur', handleInputChange);
      });
    };
    
    // Attach listeners initially
    attachListeners();
    
    // Use MutationObserver to detect when new input elements are added
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    
    observer.observe(editorRef.current, {
      childList: true,
      subtree: true
    });
    
    return () => {
      observer.disconnect();
      if (editorRef.current) {
        const inputs = editorRef.current.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.removeEventListener('input', handleInputChange);
          input.removeEventListener('change', handleInputChange);
          input.removeEventListener('blur', handleInputChange);
        });
      }
    };
  }, [onChange]);

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
    
    // Find the most specific element that contains the selected text
    let targetElement: HTMLElement | null = null;
    
    // Get all elements in the editor
    const allElements = editorRef.current?.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span, li') || [];
    const elementsArray = Array.from(allElements);
    
    // Find the element that contains the selection and has the highest specificity
    for (const element of elementsArray) {
      const htmlElement = element as HTMLElement;
      
      // Check if this element contains the selected text
      if (newRange.intersectsNode(htmlElement)) {
        // Check if this element is more specific than the current target
        if (!targetElement || isMoreSpecific(htmlElement, targetElement)) {
          targetElement = htmlElement;
        }
      }
    }
    
    // If no specific element found, fall back to the direct parent of the text node
    if (!targetElement) {
      if (newRange.startContainer.nodeType === Node.TEXT_NODE) {
        targetElement = newRange.startContainer.parentElement;
      }
    }
    
    // Apply text-align style to the target element
    if (targetElement) {
      targetElement.style.textAlign = alignment;
    }
  };
  
  // Helper function to determine if one element is more specific than another
  const isMoreSpecific = (element1: HTMLElement, element2: HTMLElement): boolean => {
    const tagPriority: { [key: string]: number } = {
      'H1': 10, 'H2': 10, 'H3': 10, 'H4': 10, 'H5': 10, 'H6': 10,
      'P': 8, 'SPAN': 6, 'LI': 7, 'DIV': 1
    };
    
    const priority1 = tagPriority[element1.tagName] || 0;
    const priority2 = tagPriority[element2.tagName] || 0;
    
    // Higher priority is more specific
    if (priority1 !== priority2) {
      return priority1 > priority2;
    }
    
    // If same priority, prefer the one that's deeper in the DOM tree
    return element1.contains(element2);
  };

  // Function to apply lists
  const applyList = (listType: string, savedRange: Range | null) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  
    let hasSelectedText = false;
    if (savedRange && !savedRange.collapsed) {
      hasSelectedText = true;
    }
  
    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
  
      if (hasSelectedText) {
        // Case 1: Text is selected - convert each line to separate list item
        const selectedText = savedRange.toString();
        const lines = selectedText.split('\n').filter(line => line.trim() !== '');
  
        const list = document.createElement(listType);
  
        // Inline styles for ordered/unordered list
        if (listType === 'ul') {
          list.style.listStyleType = 'disc';
        } else if (listType === 'ol') {
          list.style.listStyleType = 'decimal';
        }
        list.style.margin = '10px 0';
        list.style.paddingLeft = '20px';
  
        // Create a list item for each non-empty line
        lines.forEach(line => {
          const listItem = document.createElement('li');
          listItem.textContent = line.trim();
          listItem.style.marginBottom = '5px';
          listItem.style.lineHeight = '1.5';
          list.appendChild(listItem);
        });
  
        savedRange.deleteContents();
        savedRange.insertNode(list);
      } else {
        // Case 2: No text selected - insert empty list at cursor position
        const list = document.createElement(listType);
  
        // Inline styles for ordered/unordered list
        if (listType === 'ul') {
          list.style.listStyleType = 'disc';
        } else if (listType === 'ol') {
          list.style.listStyleType = 'decimal';
        }
        list.style.margin = '10px 0';
        list.style.paddingLeft = '20px';
  
        const listItem = document.createElement('li');
        listItem.textContent = 'List item';
        listItem.style.marginBottom = '5px';
        listItem.style.lineHeight = '1.5';
        list.appendChild(listItem);
  
        savedRange.insertNode(list);
      }
    } else if (editorRef.current) {
      // Fallback: append at end
      const list = document.createElement(listType);
  
      // Inline styles for ordered/unordered list
      if (listType === 'ul') {
        list.style.listStyleType = 'disc';
      } else if (listType === 'ol') {
        list.style.listStyleType = 'decimal';
      }
      list.style.margin = '10px 0';
      list.style.paddingLeft = '20px';
  
      const listItem = document.createElement('li');
      listItem.textContent = 'List item';
      listItem.style.marginBottom = '5px';
      listItem.style.lineHeight = '1.5';
      list.appendChild(listItem);
  
      editorRef.current.appendChild(list);
    }
  };
  

  // Function to apply links
  const applyLink = (savedRange: Range | null) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  
    let selectedText = '';
    let hasSelectedText = false;
  
    // Check if there's selected text
    if (savedRange && !savedRange.collapsed) {
      selectedText = savedRange.toString();
      hasSelectedText = true;
    }
  
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;
  
    // Modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      min-width: 400px;
    `;
  
    const title = document.createElement('h3');
    title.textContent = 'Add Link';
    title.style.cssText = 'margin: 0 0 15px 0; font-size: 18px;';
  
    const linkTextLabel = document.createElement('label');
    linkTextLabel.textContent = 'Link Text:';
    linkTextLabel.style.cssText = 'display: block; margin-bottom: 5px; font-weight: bold;';
  
    const linkTextInput = document.createElement('input');
    linkTextInput.type = 'text';
    linkTextInput.value = selectedText;
    linkTextInput.placeholder = 'Enter link text';
    linkTextInput.style.cssText = `
      width: 100%;
      padding: 8px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    `;
  
    const urlLabel = document.createElement('label');
    urlLabel.textContent = 'URL:';
    urlLabel.style.cssText = 'display: block; margin-bottom: 5px; font-weight: bold;';
  
    const urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.placeholder = 'https://example.com';
    urlInput.style.cssText = `
      width: 100%;
      padding: 8px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    `;
  
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; gap: 10px; justify-content: flex-end;';
  
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.cssText = `
      padding: 8px 16px;
      border: 1px solid #ccc;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    `;
  
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Link';
    addButton.style.cssText = `
      padding: 8px 16px;
      border: none;
      background: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    `;
  
    modalContent.appendChild(title);
    modalContent.appendChild(linkTextLabel);
    modalContent.appendChild(linkTextInput);
    modalContent.appendChild(urlLabel);
    modalContent.appendChild(urlInput);
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(addButton);
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  
    // Focus logic
    if (selectedText) {
      urlInput.focus();
    } else {
      linkTextInput.focus();
    }
  
    const cleanup = () => {
      document.body.removeChild(modal);
    };
  
    // Cancel button
    cancelButton.onclick = cleanup;
  
    // Add link button
    addButton.onclick = () => {
      const linkText = linkTextInput.value || urlInput.value;
      const linkUrl = urlInput.value.trim();
  
      if (!linkUrl) {
        alert("Please enter a valid URL");
        return;
      }
  
      const a = document.createElement("a");
      a.href = linkUrl;
      a.target = "_blank";
      a.textContent = linkText;
  
      // --- INLINE STYLES TO OVERRIDE GLOBAL CSS ---
      a.style.color = "#007bff";
      a.style.textDecoration = "underline";
      a.style.cursor = "pointer";
  
      if (savedRange) {
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(savedRange);
  
        if (hasSelectedText) {
          // Replace selected text
          savedRange.deleteContents();
          savedRange.insertNode(a);
        } else {
          // Insert at cursor
          savedRange.insertNode(a);
        }
      } else if (editorRef.current) {
        // Fallback: append at end
        editorRef.current.appendChild(a);
      }
  
      cleanup();
    };
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
    if (editorRef.current) {
      editorRef.current.focus();
    }

    let hasSelectedText = false;
    if (savedRange && !savedRange.collapsed) {
      hasSelectedText = true;
    }
  
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;
  
    // Modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      min-width: 400px;
    `;
  
    const title = document.createElement('h3');
    title.textContent = 'Insert Image';
    title.style.cssText = 'margin: 0 0 15px 0; font-size: 18px;';
  
    const urlLabel = document.createElement('label');
    urlLabel.textContent = 'Image URL:';
    urlLabel.style.cssText = 'display: block; margin-bottom: 5px; font-weight: bold;';
  
    const urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.placeholder = 'https://example.com/image.jpg';
    urlInput.style.cssText = `
      width: 100%;
      padding: 8px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    `;
  
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; gap: 10px; justify-content: flex-end;';
  
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.cssText = `
      padding: 8px 16px;
      border: 1px solid #ccc;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    `;
  
    const insertButton = document.createElement('button');
    insertButton.textContent = 'Insert Image';
    insertButton.style.cssText = `
      padding: 8px 16px;
      border: none;
      background: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    `;
  
    modalContent.appendChild(title);
    modalContent.appendChild(urlLabel);
    modalContent.appendChild(urlInput);
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(insertButton);
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  
    // Focus input
    urlInput.focus();
  
    const cleanup = () => {
      document.body.removeChild(modal);
    };
  
    cancelButton.onclick = cleanup;
  
    insertButton.onclick = () => {
      const imageUrl = urlInput.value.trim();
      if (!imageUrl) {
        alert("Please enter a valid image URL");
        return;
      }

      // Validate URL
      try {
        new URL(imageUrl);
      } catch {
        alert('Please enter a valid image URL');
        return;
      }

      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = 'Image';
      img.style.maxWidth = '100%';
      img.style.height = 'auto';

      if (savedRange) {
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(savedRange);

        if (hasSelectedText) {
          // Replace selected text with image
          savedRange.deleteContents();
          savedRange.insertNode(img);
        } else {
          // Insert at cursor
          savedRange.insertNode(img);
        }
      } else if (editorRef.current) {
        // Fallback: append at end
        editorRef.current.appendChild(img);
      }

      cleanup();
    };
  };  
  

  // Function to insert tables
  const insertTable = (savedRange: Range | null) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }

    let hasSelectedText = false;
    if (savedRange && !savedRange.collapsed) {
      hasSelectedText = true;
    }

    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;

    // Modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      min-width: 400px;
    `;

    const title = document.createElement('h3');
    title.textContent = 'Insert Table';
    title.style.cssText = 'margin: 0 0 15px 0; font-size: 18px;';

    const rowsLabel = document.createElement('label');
    rowsLabel.textContent = 'Number of Rows:';
    rowsLabel.style.cssText = 'display: block; margin-bottom: 5px; font-weight: bold;';

    const rowsInput = document.createElement('input');
    rowsInput.type = 'number';
    rowsInput.value = '3';
    rowsInput.min = '1';
    rowsInput.max = '20';
    rowsInput.style.cssText = `
      width: 100%;
      padding: 8px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    `;

    const colsLabel = document.createElement('label');
    colsLabel.textContent = 'Number of Columns:';
    colsLabel.style.cssText = 'display: block; margin-bottom: 5px; font-weight: bold;';

    const colsInput = document.createElement('input');
    colsInput.type = 'number';
    colsInput.value = '3';
    colsInput.min = '1';
    colsInput.max = '20';
    colsInput.style.cssText = `
      width: 100%;
      padding: 8px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    `;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; gap: 10px; justify-content: flex-end;';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.cssText = `
      padding: 8px 16px;
      border: 1px solid #ccc;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    `;

    const insertButton = document.createElement('button');
    insertButton.textContent = 'Insert Table';
    insertButton.style.cssText = `
      padding: 8px 16px;
      border: none;
      background: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    `;

    modalContent.appendChild(title);
    modalContent.appendChild(rowsLabel);
    modalContent.appendChild(rowsInput);
    modalContent.appendChild(colsLabel);
    modalContent.appendChild(colsInput);
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(insertButton);
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Focus on first input
    rowsInput.focus();

    const cleanup = () => {
      document.body.removeChild(modal);
    };

    const insertTableElement = () => {
      const rows = parseInt(rowsInput.value);
      const cols = parseInt(colsInput.value);
      
      if (!rows || !cols || rows < 1 || cols < 1) {
        alert('Please enter valid numbers for rows and columns');
        return;
      }

      const table = document.createElement('table');
      table.style.borderCollapse = 'collapse';
      table.style.width = '100%';
      table.style.border = '1px solid #ccc';
      
      for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
          const cell = document.createElement(i === 0 ? 'th' : 'td');
          cell.textContent = i === 0 ? `Header ${j + 1}` : `Cell ${i}-${j + 1}`;
          cell.style.border = '1px solid #ccc';
          cell.style.padding = '8px';
          row.appendChild(cell);
        }
        table.appendChild(row);
      }

      if (savedRange) {
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(savedRange);

        if (hasSelectedText) {
          // Replace selected text with table
          savedRange.deleteContents();
          savedRange.insertNode(table);
        } else {
          // Insert at cursor
          savedRange.insertNode(table);
        }
      } else if (editorRef.current) {
        // Fallback: append at end
        editorRef.current.appendChild(table);
      }

      cleanup();
    };

    cancelButton.onclick = cleanup;
    insertButton.onclick = insertTableElement;

    // Handle Enter key
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        insertTableElement();
      } else if (e.key === 'Escape') {
        cleanup();
      }
    };

    rowsInput.addEventListener('keydown', handleKeyPress);
    colsInput.addEventListener('keydown', handleKeyPress);

    // Close on backdrop click
    modal.onclick = (e) => {
      if (e.target === modal) {
        cleanup();
      }
    };
  };

  // Function to apply text color
  const applyColor = (savedRange: Range | null) => {
    if (!savedRange || savedRange.collapsed) return;
    
    setPendingRange(savedRange);
    setColorPickerType('text');
    setColorPickerOpen(true);
  };

  // Function to handle color selection
  const handleColorSelection = (color: string) => {
    if (!pendingRange) {
      console.warn('No pending range for color selection');
      return;
    }
    
    if (!color || typeof color !== 'string') {
      console.warn('Invalid color value:', color);
      return;
    }
    
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    try {
      // First, let's try to get a better range by using the current selection
      const currentSelection = window.getSelection();
      let workingRange = null;
      
      if (currentSelection && currentSelection.rangeCount > 0) {
        const currentRange = currentSelection.getRangeAt(0);
        if (!currentRange.collapsed && editorRef.current && editorRef.current.contains(currentRange.commonAncestorContainer)) {
          workingRange = currentRange.cloneRange();
        }
      }
      
      // If no current selection, use the pending range
      if (!workingRange) {
        workingRange = document.createRange();
        workingRange.setStart(pendingRange.startContainer, pendingRange.startOffset);
        workingRange.setEnd(pendingRange.endContainer, pendingRange.endOffset);
      }
      
      // If range is collapsed or empty, try to find the text in the editor
      if (workingRange.collapsed || !workingRange.toString().trim()) {
        const editorText = editorRef.current?.textContent || '';
        const selectedText = lastSelectedTextRef.current;
        
        if (selectedText && editorText.includes(selectedText)) {
          // Try to find and select the text
          const foundRange = findAndSelectText(selectedText);
          if (foundRange) {
            workingRange = foundRange;
          }
        }
      }
      
      // If still no valid range, return
      if (workingRange.collapsed || !workingRange.toString().trim()) {
        return;
      }
      
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(workingRange);
      }
      
      const span = document.createElement('span');
      if (colorPickerType === 'text') {
        span.style.color = color;
      } else {
        span.style.backgroundColor = color;
      }
      
      // Try using surroundContents which is designed for wrapping selected content
      try {
        workingRange.surroundContents(span);
      } catch (surroundError) {
        // Alternative method: Use execCommand for color
        try {
          // First, ensure the range is selected
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(workingRange);
          }
          
          // Use execCommand to apply color
          if (colorPickerType === 'text') {
            document.execCommand('foreColor', false, color);
          } else {
            document.execCommand('backColor', false, color);
          }
        } catch (execError) {
          // Final fallback to extractContents method
          const contents = workingRange.extractContents();
          
          span.appendChild(contents);
          
          workingRange.insertNode(span);
        }
      }
      
      // Clear the selection after applying color
      if (selection) {
        selection.removeAllRanges();
      }
      
      // Trigger content update to notify parent component
      if (editorRef.current) {
        const newContent = editorRef.current.innerHTML;
        onChange(newContent);
      }
      
    } catch (error) {
      console.error('Error applying color:', error);
    } finally {
      setPendingRange(null);
    }
  };

  // Function to apply text highlight
  const applyHighlight = (savedRange: Range | null) => {
    if (!savedRange || savedRange.collapsed) return;
    
    setPendingRange(savedRange);
    setColorPickerType('background');
    setColorPickerOpen(true);
  };

  // Function to apply font size
  const applyFontSize = (value: string | undefined, savedRange: Range | null) => {
    if (!value) return;
    if (!savedRange || savedRange.collapsed) return;
    if (!editorRef.current) return;
  
    const selection = window.getSelection();
    if (!selection) return;
  
    const range = savedRange.cloneRange();
    const walker = document.createTreeWalker(editorRef.current, NodeFilter.SHOW_TEXT, null);
    const textNodes: Text[] = [];
  
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      
      // Skip empty text nodes (whitespace only)
      if (!node.textContent || node.textContent.trim() === '') {
        continue;
      }
  
      const nodeRange = document.createRange();
      nodeRange.selectNodeContents(node);
  
      // Check if node actually intersects with the selection
      // A node intersects if it's not completely before or after the selection
      const startComparison = range.compareBoundaryPoints(Range.START_TO_END, nodeRange);
      const endComparison = range.compareBoundaryPoints(Range.END_TO_START, nodeRange);
      
      if (startComparison > 0 && endComparison < 0) {
        textNodes.push(node);
      }
    }
  
    // Check if all selected text is already wrapped with a span that has the same font size
    let allTextAlreadyWrapped = true;
    for (const textNode of textNodes) {
      const parent = textNode.parentNode as HTMLElement;
      if (parent.nodeName.toLowerCase() !== 'span' || parent.style.fontSize !== value) {
        allTextAlreadyWrapped = false;
        break;
      }
    }

    if (allTextAlreadyWrapped && textNodes.length > 0) {
      // Remove font size formatting - unwrap all the selected text
      textNodes.forEach((textNode) => {
        const parent = textNode.parentNode as HTMLElement;
        if (parent.nodeName.toLowerCase() === 'span' && parent.style.fontSize === value) {
          const grandParent = parent.parentNode;
          if (grandParent) {
            // Move all children of the wrapper to its parent
            while (parent.firstChild) {
              grandParent.insertBefore(parent.firstChild, parent);
            }
            // Remove the empty wrapper
            grandParent.removeChild(parent);
          }
        }
      });
    } else {
      // Apply font size formatting - wrap the selected text
      textNodes.forEach((textNode) => {
        const parent = textNode.parentNode as HTMLElement;
        
        // Check if already wrapped with span with same font size
        if (parent.nodeName.toLowerCase() === 'span' && parent.style.fontSize === value) return;
  
        const startOffset = textNode === range.startContainer ? range.startOffset : 0;
        const endOffset = textNode === range.endContainer ? range.endOffset : textNode.textContent!.length;
  
        if (startOffset === 0 && endOffset === textNode.textContent!.length) {
          const wrapper = document.createElement('span');
          wrapper.style.fontSize = value;
          parent.replaceChild(wrapper, textNode);
          wrapper.appendChild(textNode);
        } else {
          const before = textNode.textContent!.slice(0, startOffset);
          const selected = textNode.textContent!.slice(startOffset, endOffset);
          const after = textNode.textContent!.slice(endOffset);
  
          if (before) parent.insertBefore(document.createTextNode(before), textNode);
  
          const wrapper = document.createElement('span');
          wrapper.style.fontSize = value;
          wrapper.appendChild(document.createTextNode(selected));
          parent.insertBefore(wrapper, textNode);
  
          if (after) parent.insertBefore(document.createTextNode(after), textNode);
  
          parent.removeChild(textNode);
        }
      });
    }
  
    // Restore cursor - find the last created wrapper element
    if (textNodes.length > 0) {
      const cursorRange = document.createRange();
      
      // Find the last wrapper element that was created
      const lastWrapper = editorRef.current.querySelector(`span[style*="font-size: ${value}"]:last-of-type`);
      
      if (lastWrapper) {
        cursorRange.setStartAfter(lastWrapper);
        cursorRange.setEndAfter(lastWrapper);
      } else {
        // Fallback: set cursor at the end of the range
        cursorRange.setStart(range.endContainer, range.endOffset);
        cursorRange.setEnd(range.endContainer, range.endOffset);
      }
      
      selection.removeAllRanges();
      selection.addRange(cursorRange);
    }
  
    editorRef.current.dispatchEvent(new Event("input", { bubbles: true }));
  };

  // Function to get current font family of selected text
  const getCurrentFontFamily = (): string | null => {
    if (!editorRef.current) return null;
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    
    const range = selection.getRangeAt(0);
    if (range.collapsed) return null;
    
    // Find the first text node in the selection
    const walker = document.createTreeWalker(editorRef.current, NodeFilter.SHOW_TEXT, null);
    const textNodes: Text[] = [];
    
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      if (!node.textContent || node.textContent.trim() === '') continue;
      
      const nodeRange = document.createRange();
      nodeRange.selectNodeContents(node);
      
      const startComparison = range.compareBoundaryPoints(Range.START_TO_END, nodeRange);
      const endComparison = range.compareBoundaryPoints(Range.END_TO_START, nodeRange);
      
      if (startComparison > 0 && endComparison < 0) {
        textNodes.push(node);
        break; // Get the first text node
      }
    }
    
    if (textNodes.length === 0) return null;
    
    // Check the parent elements for font-family style
    let element = textNodes[0].parentElement;
    while (element && element !== editorRef.current) {
      if (element.style.fontFamily) {
        const fontFamily = element.style.fontFamily;
        return fontFamily;
      }
      element = element.parentElement;
    }
    
    return null;
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
      
      // Notify parent of font family change
      if (onFontFamilyChange) {
        onFontFamilyChange(value);
      }
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
  // const findAndSelectText = (text: string) => {
  //   if (!editorRef.current || !text || text.trim() === '') return null;
    
  //   const walker = document.createTreeWalker(
  //     editorRef.current,
  //     NodeFilter.SHOW_TEXT,
  //     null
  //   );
    
  //   let node;
  //   while (node = walker.nextNode()) {
  //     const textContent = node.textContent || '';
  //     const index = textContent.indexOf(text);
  //     if (index !== -1) {
  //       const range = document.createRange();
  //       range.setStart(node, index);
  //       range.setEnd(node, index + text.length);
        
  //       // Validate the range
  //       try {
  //         const testText = range.toString();
  //         if (testText === text) {
  //           return range;
  //         }
  //       } catch (error) {
  //         continue;
  //       }
  //     }
  //   }
  //   return null;
  // };

  const findAndSelectText = (text: string): Range | null => {
    if (!editorRef.current || !text.trim()) return null;
  
    const walker = document.createTreeWalker(
      editorRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );
  
    let fullText = '';
    const nodeMap: { node: Node; start: number; end: number }[] = [];
  
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const nodeText = node.textContent ?? '';
      const start = fullText.length;
      const end = start + nodeText.length;
      nodeMap.push({ node, start, end });
      fullText += nodeText;
    }
  
    // Search in combined text
    const index = fullText.indexOf(text);
    if (index === -1) return null;
  
    // Find start node + offset
    let startNode: Node | null = null;
    let startOffset = 0;
    let endNode: Node | null = null;
    let endOffset = 0;
  
    for (const entry of nodeMap) {
      if (!startNode && index >= entry.start && index < entry.end) {
        startNode = entry.node;
        startOffset = index - entry.start;
      }
      if (index + text.length > entry.start && index + text.length <= entry.end) {
        endNode = entry.node;
        endOffset = index + text.length - entry.start;
        break;
      }
    }
  
    if (startNode && endNode) {
      const range = document.createRange();
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);
  
      // Optional: select it
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
  
      return range;
    }
  
    return null;
  };
  
  

  // Listen for toolbar actions
  useEffect(() => {
    const handleToolbarAction = (event: CustomEvent) => {
      if (!editorRef.current) return;
      
      const { action, value } = event.detail;
      
      // Force focus to the editor to ensure we can capture selection
      editorRef.current.focus();
      
      // Use a small delay to ensure focus is set and selection is available
      setTimeout(() => {
        // Immediately capture the current selection before any async operations
        const currentSelection = window.getSelection();
        let savedRange: Range | null = null;
        
        // Check if there's a current valid selection
        if (currentSelection && currentSelection.rangeCount > 0) {
          const currentRange = currentSelection.getRangeAt(0);
          if (!currentRange.collapsed && editorRef.current && editorRef.current.contains(currentRange.commonAncestorContainer)) {
            savedRange = currentRange.cloneRange();
          }
        }
        
        // If no current selection, try the stored selection
        if (!savedRange) {
          savedRange = lastSelectionRef.current;
        }
        
        // If still no valid range, try to find the last selected text
        if (!savedRange || savedRange.collapsed) {
          savedRange = findAndSelectText(lastSelectedTextRef.current);
        }
        
        // If we still don't have a range, try to get any selection within the editor
        if (!savedRange || savedRange.collapsed) {
          if (currentSelection && currentSelection.rangeCount > 0) {
            const currentRange = currentSelection.getRangeAt(0);
            if (editorRef.current && editorRef.current.contains(currentRange.commonAncestorContainer)) {
              savedRange = currentRange.cloneRange();
            }
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
        if (editorRef.current) {
          editorRef.current.dispatchEvent(inputEvent);
        }
      }, 50); // Small delay to ensure focus and selection are properly set
    };

    window.addEventListener('toolbar-action', handleToolbarAction as EventListener);
    
    return () => {
      window.removeEventListener('toolbar-action', handleToolbarAction as EventListener);
    };
  }, []);
  
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    // Check if the input event originated from an interactive element
    const target = e.target as HTMLElement;
    const isInteractive = target.tagName === 'INPUT' || 
                          target.tagName === 'TEXTAREA' || 
                          target.tagName === 'SELECT' || 
                          target.tagName === 'BUTTON';
    
    // If input is from an interactive element, don't update the whole content
    // This prevents input values from being lost
    if (isInteractive) {
      return;
    }
    
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
    
    // Capture any existing selection when focusing
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (!range.collapsed && editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
        lastSelectionRef.current = range.cloneRange();
        lastSelectedTextRef.current = range.toString();
      }
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Check if we're focusing into an interactive element within the editor
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget && editorRef.current?.contains(relatedTarget)) {
      const isInteractive = relatedTarget.tagName === 'INPUT' || 
                           relatedTarget.tagName === 'TEXTAREA' || 
                           relatedTarget.tagName === 'SELECT' || 
                           relatedTarget.tagName === 'BUTTON';
      
      // If moving to an interactive element within the editor, keep editing state
      if (isInteractive) {
        return;
      }
    }
    
    setIsEditing(false);
    
    // Sync all input values to their HTML attributes before saving
    syncInputValuesToAttributes();
    
    // Make sure final content is saved when losing focus
    if (editorRef.current) {
      const finalContent = editorRef.current.innerHTML;
      onChange(finalContent);
    }
  };
  
  return (
    <div className="preserve-styles-editor">
      <ColorPicker
        isOpen={colorPickerOpen}
        onClose={() => {
          setColorPickerOpen(false);
          setPendingRange(null);
        }}
        onSelectColor={handleColorSelection}
        type={colorPickerType}
      />
      <style>
        {`
          .preserve-styles-editor {
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            overflow: auto;
            max-height: 600px;
          }
          
          .editable-content {
            min-height: 500px;
            padding: 16px !important;
            outline: none;
            background: white;
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
          
          /* Ensure color styles are not overridden - inline styles should take precedence */
          .editable-content span[style*="color"] {
            /* Let inline color styles take precedence */
          }
          
          .editable-content span[style*="background-color"] {
            /* Let inline background-color styles take precedence */
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
          
          .editable-content h1, .editable-content h2, .editable-content h3, .editable-content h4, .editable-content h5, .editable-content h6 {
            font-weight: bold;
            margin: 1em 0 0.5em 0;
          }
          
          .editable-content h1 { font-size: 2em; }
          .editable-content h2 { font-size: 1.5em; }
          .editable-content h3 { font-size: 1.2em; }
          .editable-content h4 { font-size: 1.1em; }
          .editable-content h5 { font-size: 1em; }
          .editable-content h6 { font-size: 0.9em; }
          
          .editable-content ul, .editable-content ol {
            margin: 1em 0;
            padding-left: 2em;
          }
          
          .editable-content li {
            margin: 0.25em 0;
          }
          
          /* Make interactive elements work properly within contentEditable */
          .editable-content input,
          .editable-content textarea,
          .editable-content select,
          .editable-content button {
            pointer-events: auto;
            user-select: text;
            -webkit-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
          }
          
          .editable-content input:focus,
          .editable-content textarea:focus,
          .editable-content select:focus {
            outline: 2px solid rgba(59, 130, 246, 0.5);
            outline-offset: 2px;
          }
          
          /* Ensure checkboxes are clickable */
          .editable-content input[type="checkbox"] {
            cursor: pointer;
            pointer-events: auto;
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
        onClick={(e) => {
          // Check if the clicked element is an interactive element (input, textarea, select, button, etc.)
          const target = e.target as HTMLElement;
          const isInteractive = target.tagName === 'INPUT' || 
                                target.tagName === 'TEXTAREA' || 
                                target.tagName === 'SELECT' || 
                                target.tagName === 'BUTTON' ||
                                target.tagName === 'A';
          
          // If clicking on interactive element, don't interfere with it
          if (isInteractive) {
            return;
          }
          
          // Ensure focus is maintained when clicking
          if (editorRef.current) {
            editorRef.current.focus();
          }
          
          // Capture any existing selection when clicking in the editor
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (!range.collapsed && editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
              lastSelectionRef.current = range.cloneRange();
              lastSelectedTextRef.current = range.toString();
            }
          }
        }}
        onMouseUp={(e) => {
          // Check if the target is an interactive element
          const target = e.target as HTMLElement;
          const isInteractive = target.tagName === 'INPUT' || 
                                target.tagName === 'TEXTAREA' || 
                                target.tagName === 'SELECT' || 
                                target.tagName === 'BUTTON' ||
                                target.tagName === 'A';
          
          // If interacting with interactive element, don't capture selection
          if (isInteractive) {
            return;
          }
          
          // Capture selection when user finishes selecting text
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (!range.collapsed && editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
              lastSelectionRef.current = range.cloneRange();
              lastSelectedTextRef.current = range.toString();
            }
          }
        }}
        onMouseDown={(e) => {
          // Check if the target is an interactive element
          const target = e.target as HTMLElement;
          const isInteractive = target.tagName === 'INPUT' || 
                                target.tagName === 'TEXTAREA' || 
                                target.tagName === 'SELECT' || 
                                target.tagName === 'BUTTON' ||
                                target.tagName === 'A';
          
          // If interacting with interactive element, don't capture selection
          if (isInteractive) {
            return;
          }
          
          // Capture selection before it might be lost
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (!range.collapsed && editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
              lastSelectionRef.current = range.cloneRange();
              lastSelectedTextRef.current = range.toString();
            }
          }
        }}
        suppressContentEditableWarning={true}
      />
    </div>
  );
}

export default function HtmlEditor({ content, onChange, editorRef, onFontFamilyChange }: HtmlEditorProps) {
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
    
    if (newHtml !== htmlContent) {
      setHtmlContent(newHtml);
      onChange(newHtml);
    }
    
    setTimeout(() => {
      isUpdatingFromHtmlCode.current = false;
    }, 100);
  };
  
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    
    // Force content synchronization when switching tabs
    if (newTab === 'html') {
    } else if (newTab === 'preview') {
    }
  };

  const extractBodyContent = (html: string) => {
    
    if (!html || html.trim() === '') {
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
        <TabsList className="w-full flex">
          <TabsTrigger value="preview" className="flex-1">Live Preview</TabsTrigger>
          <div className="w-px mx-2 self-stretch bg-gray-200 dark:bg-gray-700" />
          <TabsTrigger value="html" className="flex-1">HTML Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <div className="bg-white min-h-[500px]">
            <PreserveStyleEditor
              content={extractBodyContent(htmlContent)}
              onChange={handlePreviewChange}
              editorRef={editorRef}
              onFontFamilyChange={onFontFamilyChange}
            />
          </div>
        </TabsContent>

        <TabsContent value="html" className="space-y-4">
          {/* <h3 className="text-lg font-semibold mb-4">HTML Source Code</h3> */}
          <div className="space-y-4">
            <div>
              {/* <label className="block text-sm font-medium mb-2">
                Edit HTML Content
              </label> */}
              <Textarea
                value={htmlContent}
                onChange={(e) => handleHtmlCodeChange(e.target.value)}
                placeholder="Enter your HTML content here..."
                rows={20}
                className="font-mono text-sm"
              />
            </div>

          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
