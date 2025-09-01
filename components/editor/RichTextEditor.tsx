'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useState, useEffect, useRef, useCallback } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedBgColor, setSelectedBgColor] = useState('#ffffff');
  const [isInitialized, setIsInitialized] = useState(false);
  const lastContentRef = useRef<string>('');
  const cursorPositionRef = useRef<{ from: number; to: number } | null>(null);
  const isUserTypingRef = useRef<boolean>(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced onChange handler
  const debouncedOnChange = useCallback((html: string) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    updateTimeoutRef.current = setTimeout(() => {
      if (html !== lastContentRef.current) {
        lastContentRef.current = html;
        onChange(html);
      }
    }, 100); // 100ms debounce
  }, [onChange]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      Color,
      Highlight,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800 cursor-pointer',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        validate: (href) => /^https?:\/\//.test(href),
        protocols: ['http', 'https', 'mailto', 'tel'],
      }),
    ],
    content: content || '<p>Start typing here... Use the toolbar above to change fonts, sizes, and formatting!</p>',
    onUpdate: ({ editor }) => {
      // Store cursor position
      const { from, to } = editor.state.selection;
      cursorPositionRef.current = { from, to };
      
      // Mark that user is typing
      isUserTypingRef.current = true;
      
      // Debounce the onChange to prevent excessive updates
      const html = editor.getHTML();
      debouncedOnChange(html);
      
      // Reset user typing flag after a short delay
      setTimeout(() => {
        isUserTypingRef.current = false;
      }, 200);
    },
    onSelectionUpdate: ({ editor }) => {
      // Continuously track cursor position changes
      const { from, to } = editor.state.selection;
      cursorPositionRef.current = { from, to };
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
      handleDOMEvents: {
        focus: (view, event) => {
          // Store cursor position when editor gains focus
          const { from, to } = view.state.selection;
          cursorPositionRef.current = { from, to };
          return false;
        },
        blur: (view, event) => {
          // Store cursor position when editor loses focus
          const { from, to } = view.state.selection;
          cursorPositionRef.current = { from, to };
          return false;
        },
        click: (view, event) => {
          // Handle link clicks
          const target = event.target as HTMLElement;
          if (target.tagName === 'A' && target.getAttribute('href')) {
            const href = target.getAttribute('href');
            if (href) {
              window.open(href, '_blank', 'noopener,noreferrer');
              return true; // Prevent default behavior
            }
          }
          return false;
        },
      },
    },
  });

  // Initialize editor content only once
  useEffect(() => {
    if (editor && content && !isInitialized) {
      lastContentRef.current = content;
      editor.commands.setContent(content);
      setIsInitialized(true);
    }
  }, [editor, content, isInitialized]);

  // Handle external content updates (like AI responses) without affecting user typing
  useEffect(() => {
    if (editor && content && isInitialized && !isUserTypingRef.current) {
      const currentContent = editor.getHTML();
      if (currentContent !== content) {
        // Store current cursor position
        const cursorPos = cursorPositionRef.current;
        
        // Update content
        editor.commands.setContent(content);
        lastContentRef.current = content;
        
        // Restore cursor position if available and valid
        if (cursorPos && cursorPos.from <= editor.state.doc.content.size && cursorPos.to <= editor.state.doc.content.size) {
          // Use setTimeout to ensure the content is fully rendered
          setTimeout(() => {
            if (!editor.isDestroyed) {
              editor.commands.setTextSelection({ from: cursorPos.from, to: cursorPos.to });
            }
          }, 10);
        }
      }
    }
  }, [editor, content, isInitialized]);

  // Add a more robust cursor position tracking
  useEffect(() => {
    if (editor) {
      const handleKeyDown = () => {
        isUserTypingRef.current = true;
        // Reset the flag after a delay
        setTimeout(() => {
          isUserTypingRef.current = false;
        }, 500);
      };

      const handleMouseDown = () => {
        isUserTypingRef.current = true;
        setTimeout(() => {
          isUserTypingRef.current = false;
        }, 500);
      };

      // Add event listeners to track user interaction
      editor.view.dom.addEventListener('keydown', handleKeyDown);
      editor.view.dom.addEventListener('mousedown', handleMouseDown);

      return () => {
        editor.view.dom.removeEventListener('keydown', handleKeyDown);
        editor.view.dom.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, [editor]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  // Listen for toolbar actions from parent component
  useEffect(() => {
    const handleToolbarAction = (event: CustomEvent) => {
      if (!editor) return;
      
      const { action, value } = event.detail;
      
      switch (action) {
        case 'bold':
          editor.chain().focus().toggleBold().run();
          break;
        case 'italic':
          editor.chain().focus().toggleItalic().run();
          break;
        case 'underline':
          editor.chain().focus().toggleUnderline().run();
          break;
        case 'strikethrough':
          editor.chain().focus().toggleStrike().run();
          break;
        case 'align-left':
          editor.chain().focus().setTextAlign('left').run();
          break;
        case 'align-center':
          editor.chain().focus().setTextAlign('center').run();
          break;
        case 'align-right':
          editor.chain().focus().setTextAlign('right').run();
          break;
        case 'align-justify':
          editor.chain().focus().setTextAlign('justify').run();
          break;
        case 'bullet-list':
          editor.chain().focus().toggleBulletList().run();
          break;
        case 'ordered-list':
          editor.chain().focus().toggleOrderedList().run();
          break;
        case 'link':
          setShowLinkInput(true);
          break;
        case 'unlink':
          removeLink();
          break;
        case 'image':
          const imageUrl = prompt('Enter image URL or use placeholder (e.g., https://picsum.photos/400/300):');
          if (imageUrl) {
            // If user enters "placeholder", use a random image
            const finalUrl = imageUrl === 'placeholder' ? 'https://picsum.photos/400/300' : imageUrl;
            editor.chain().focus().setImage({ 
              src: finalUrl,
              alt: 'Inserted image',
              title: 'Image'
            }).run();
          }
          break;
        case 'table':
          // Create a simple table using HTML insertion
          const tableHTML = `
            <table style="border-collapse: collapse; width: 100%; margin: 1rem 0; border: 1px solid #ddd;">
              <thead>
                <tr>
                  <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f8f9fa; font-weight: 600;">Header 1</th>
                  <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f8f9fa; font-weight: 600;">Header 2</th>
                  <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f8f9fa; font-weight: 600;">Header 3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 12px;">Cell 1</td>
                  <td style="border: 1px solid #ddd; padding: 12px;">Cell 2</td>
                  <td style="border: 1px solid #ddd; padding: 12px;">Cell 3</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 12px;">Cell 4</td>
                  <td style="border: 1px solid #ddd; padding: 12px;">Cell 5</td>
                  <td style="border: 1px solid #ddd; padding: 12px;">Cell 6</td>
                </tr>
              </tbody>
            </table>
          `;
          editor.chain().focus().insertContent(tableHTML).run();
          break;
        case 'color':
          setSelectedColor('#000000');
          setShowColorPicker(true);
          break;
        case 'highlight':
          setSelectedBgColor('#ffff00');
          setShowBgColorPicker(true);
          break;
        case 'remove-highlight':
          removeBackgroundColor();
          break;
        case 'font-family':
          let fontFamily = value || '';
          if (!fontFamily) {
            fontFamily = prompt('Enter font family (e.g., Arial, Times New Roman, Georgia):');
          }
          if (fontFamily) {
            const selection = editor.state.selection;
            if (selection.empty) {
              // If no text is selected, create a new paragraph with the font
              editor.chain().focus().insertContent(
                `<p style="font-family: ${fontFamily}">Text with ${fontFamily} font</p>`
              ).run();
            } else {
              // If text is selected, apply font to the existing text without breaking it
              const selectedText = editor.state.doc.textBetween(selection.from, selection.to);
              // Use Tiptap's setMark to apply styling without breaking content
              editor.chain().focus().setMark('textStyle', { 
                style: `font-family: ${fontFamily}` 
              }).run();
            }
          }
          break;
        case 'font-size':
          let fontSize = value || '';
          if (!fontSize) {
            fontSize = prompt('Enter font size (e.g., 12px, 16px, 20px):');
          }
          if (fontSize) {
            const selection = editor.state.selection;
            if (selection.empty) {
              // If no text is selected, create a new paragraph with the font size
              editor.chain().focus().insertContent(
                `<p style="font-size: ${fontSize}">Text with ${fontSize} font size</p>`
              ).run();
            } else {
              // If text is selected, apply font size to the existing text without breaking it
              const selectedText = editor.state.doc.textBetween(selection.from, selection.to);
              // Use Tiptap's setMark to apply styling without breaking content
              editor.chain().focus().setMark('textStyle', { 
                style: `font-size: ${fontSize}` 
              }).run();
            }
          }
          break;
        case 'heading':
          let headingLevel = value || '';
          if (!headingLevel) {
            headingLevel = prompt('Enter heading level (1-6):');
          }
          if (headingLevel && /^[1-6]$/.test(headingLevel)) {
            const level = parseInt(headingLevel) as 1 | 2 | 3 | 4 | 5 | 6;
            editor.chain().focus().toggleHeading({ level }).run();
          }
          break;
        case 'paragraph':
          editor.chain().focus().setParagraph().run();
          break;
      }
    };

    window.addEventListener('toolbar-action', handleToolbarAction as EventListener);
    
    return () => {
      window.removeEventListener('toolbar-action', handleToolbarAction as EventListener);
    };
  }, [editor]);

  if (!editor) {
    return <div className="p-4 text-gray-500">Loading editor...</div>;
  }

  const addLink = () => {
    if (linkUrl && linkUrl.trim()) {
      // Add http:// if no protocol is specified
      let finalUrl = linkUrl.trim();
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://') && !finalUrl.startsWith('mailto:') && !finalUrl.startsWith('tel:')) {
        finalUrl = 'https://' + finalUrl;
      }
      
      // Check if text is selected
      const { from, to } = editor.state.selection;
      if (from === to) {
        // No text selected, insert a link with placeholder text
        editor.chain().focus().insertContent(`<a href="${finalUrl}">${finalUrl}</a>`).run();
      } else {
        // Text is selected, convert it to a link
        editor.chain().focus().setLink({ href: finalUrl }).run();
      }
      
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const applyTextColor = (color: string) => {
    if (editor) {
      const { from, to } = editor.state.selection;
      if (from === to) {
        // No text selected, insert colored text
        editor.chain().focus().insertContent(`<span style="color: ${color}">Colored text</span>`).run();
      } else {
        // Text is selected, apply color to it
        editor.chain().focus().setColor(color).run();
      }
      setSelectedColor(color);
      setShowColorPicker(false);
    }
  };

  const applyBackgroundColor = (color: string) => {
    if (editor) {
      const { from, to } = editor.state.selection;
      if (from === to) {
        // No text selected, insert text with background color
        editor.chain().focus().insertContent(`<span style="background-color: ${color}">Highlighted text</span>`).run();
      } else {
        // Text is selected, apply background color to it using inline styles
        const selectedText = editor.state.doc.textBetween(from, to);
        // Remove any existing background color first
        editor.chain().focus().deleteRange({ from, to }).run();
        // Insert the text with the new background color
        editor.chain().focus().insertContent(`<span style="background-color: ${color}">${selectedText}</span>`).run();
      }
      setSelectedBgColor(color);
      setShowBgColorPicker(false);
    }
  };

  const removeBackgroundColor = () => {
    if (editor) {
      const { from, to } = editor.state.selection;
      if (from !== to) {
        // Get the selected text and remove any styling
        const selectedText = editor.state.doc.textBetween(from, to);
        editor.chain().focus().deleteRange({ from, to }).run();
        editor.chain().focus().insertContent(selectedText).run();
      }
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Custom CSS for font styling */}
      <style jsx>{`
        .ProseMirror {
          font-family: inherit;
          min-height: 200px;
          padding: 1rem;
          line-height: 1.6;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        .ProseMirror th,
        .ProseMirror td {
          border: 1px solid #ddd;
          padding: 8px 12px;
          text-align: left;
        }
        .ProseMirror th {
          background-color: #f8f9fa;
          font-weight: 600;
        }
        /* Make font changes clearly visible */
        .ProseMirror p[style*="font-family"],
        .ProseMirror span[style*="font-family"] {
          border-left: 3px solid #3b82f6;
          padding-left: 1rem;
          margin: 0.5rem 0;
          background-color: #f0f9ff;
        }
        .ProseMirror p[style*="font-size"],
        .ProseMirror span[style*="font-size"] {
          border-left: 3px solid #10b981;
          padding-left: 1rem;
          margin: 0.5rem 0;
          background-color: #f0fdf4;
        }
        /* Style spans specifically */
        .ProseMirror span[style*="font-family"] {
          display: inline-block;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          margin: 0 0.125rem;
        }
        .ProseMirror span[style*="font-size"] {
          display: inline-block;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          margin: 0 0.125rem;
        }
        .tiptap h1,
        .tiptap h2,
        .tiptap h3,
        .tiptap h4,
        .tiptap h5,
        .tiptap h6 {
          background-color: #f0f9ff;
          padding: 0.5rem;
          border-radius: 0.5rem;
          margin: 0.5rem 0;
        }
        
        /* Link styling */
        .ProseMirror a {
          color: #2563eb !important;
          text-decoration: underline !important;
          cursor: pointer !important;
        }
        .ProseMirror a:hover {
          color: #1d4ed8 !important;
          text-decoration: underline !important;
        }
        
        /* Override any conflicting styles */
        .ProseMirror a[href] {
          color: #2563eb !important;
          text-decoration: underline !important;
          cursor: pointer !important;
          pointer-events: auto !important;
        }
        
        /* Ensure links are clickable and styled correctly */
        .ProseMirror a {
          pointer-events: auto !important;
          user-select: text !important;
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
        }
        
        /* Override any Tailwind or global styles that might interfere */
        .ProseMirror a,
        .ProseMirror a:visited,
        .ProseMirror a:active,
        .ProseMirror a:hover {
          color: #2563eb !important;
          text-decoration: underline !important;
          cursor: pointer !important;
          pointer-events: auto !important;
          text-decoration-color: #2563eb !important;
        }
        
        /* Color and highlight styling */
        .ProseMirror span[style*="color"] {
          border-radius: 0.25rem;
          padding: 0.125rem 0.25rem;
          margin: 0 0.125rem;
        }
        
        .ProseMirror span[style*="background-color"] {
          border-radius: 0.25rem;
          padding: 0.125rem 0.25rem;
          margin: 0 0.125rem;
          display: inline-block;
        }
        
        .ProseMirror mark {
          border-radius: 0.25rem;
          padding: 0.125rem 0.25rem;
          margin: 0 0.125rem;
        }
        
        /* Override any Highlight extension styles */
        .ProseMirror mark[style*="background-color"] {
          background-color: inherit !important;
        }
      `}</style>

      {/* Link Input */}
      {showLinkInput && (
        <div className="border-b bg-gray-50 dark:bg-gray-800 p-3 flex flex-col gap-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {editor?.state.selection.empty 
              ? "Enter a URL to create a new link:" 
              : "Enter a URL to convert selected text to a link:"}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com or just example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addLink()}
              className="flex-1"
            />
            <Button size="sm" onClick={addLink} disabled={!linkUrl.trim()}>
              Add Link
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowLinkInput(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Color Picker */}
      {showColorPicker && (
        <div className="border-b bg-gray-50 dark:bg-gray-800 p-3 flex flex-col gap-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {editor?.state.selection.empty 
              ? "Select a color for new text:" 
              : "Select a color for selected text:"}
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col items-center gap-1">
              <input
                type="color"
                key={selectedColor}
                defaultValue={selectedColor}
                onChange={(e) => {
                  const newColor = e.target.value;
                  setSelectedColor(newColor);
                }}
                className="w-12 h-10 border rounded cursor-pointer"
              />
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Selected:</span>
                <div 
                  className="w-4 h-4 rounded border border-gray-300" 
                  style={{ backgroundColor: selectedColor }}
                />
                <span className="text-xs text-gray-500">{selectedColor}</span>
              </div>
            </div>
            <Button size="sm" onClick={() => applyTextColor(selectedColor)}>
              Apply Color
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowColorPicker(false)}>
              Cancel
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff', '#ff0080'].map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                }}
                className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500 transition-colors"
                style={{ backgroundColor: color }}
                title={`Apply ${color}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Background Color Picker */}
      {showBgColorPicker && (
        <div className="border-b bg-gray-50 dark:bg-gray-800 p-3 flex flex-col gap-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {editor?.state.selection.empty 
              ? "Select a background color for new text:" 
              : "Select a background color for selected text:"}
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col items-center gap-1">
              <input
                type="color"
                key={selectedBgColor}
                defaultValue={selectedBgColor}
                onChange={(e) => {
                  const newColor = e.target.value;
                  setSelectedBgColor(newColor);
                }}
                className="w-12 h-10 border rounded cursor-pointer"
              />
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Selected:</span>
                <div 
                  className="w-4 h-4 rounded border border-gray-300" 
                  style={{ backgroundColor: selectedBgColor }}
                />
                <span className="text-xs text-gray-500">{selectedBgColor}</span>
              </div>
            </div>
            <Button size="sm" onClick={() => applyBackgroundColor(selectedBgColor)}>
              Apply Background
            </Button>
            <Button size="sm" variant="outline" onClick={() => removeBackgroundColor()}>
              Remove Background
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowBgColorPicker(false)}>
              Cancel
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['#ffffff', '#ffff00', '#ff0000', '#00ff00', '#0000ff', '#ff8000', '#8000ff', '#ff0080', '#00ffff', '#808080'].map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedBgColor(color);
                }}
                className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500 transition-colors"
                style={{ backgroundColor: color }}
                title={`Apply ${color} background`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="min-h-[500px] p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
