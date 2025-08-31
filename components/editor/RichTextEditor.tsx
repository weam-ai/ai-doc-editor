'use client';

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { useState, useEffect } from 'react';
import { Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);

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
      }),
    ],
    content: content,
    editable: isEditing,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onBlur: () => {
      setIsEditing(false);
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setOptions({
        editable: isEditing,
      });
    }
  }, [isEditing, editor]);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
        editor.commands.setContent(content, false);
    }
  }, [content, editor]);

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
            const linkUrl = window.prompt('URL');
            if (linkUrl) {
                editor.chain().focus().setLink({ href: linkUrl }).run();
            }
          break;
        case 'unlink':
            editor.chain().focus().unsetLink().run();
          break;
        case 'image':
          const imageUrl = prompt('Enter image URL:');
          if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
          }
          break;
        case 'color':
            const color = window.prompt('Enter color hex code:', '#000000');
            if(color) editor.chain().focus().setColor(color).run();
            break;
        case 'highlight':
            const highlightColor = window.prompt('Enter highlight color hex code:', '#ffff00');
            if(highlightColor) editor.chain().focus().setHighlight({ color: highlightColor }).run();
            break;
        case 'heading':
            if (value && /^[1-6]$/.test(value)) {
                const level = parseInt(value, 10) as 1 | 2 | 3 | 4 | 5 | 6;
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
    return null;
  }

  return (
    <div className="relative">
      {editor && isEditing && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bg-white shadow-lg border border-gray-200 rounded-md p-1 flex items-center space-x-1"
        >
          <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleBold().run()} pressed={editor.isActive('bold')}>
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleItalic().run()} pressed={editor.isActive('italic')}>
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" onPressedChange={() => editor.chain().focus().toggleUnderline().run()} pressed={editor.isActive('underline')}>
            <UnderlineIcon className="h-4 w-4" />
          </Toggle>
          <Toggle size="sm" onPressedChange={() => {
              const url = window.prompt('URL');
              if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
              }
          }} pressed={editor.isActive('link')}>
            <LinkIcon className="h-4 w-4" />
          </Toggle>
        </BubbleMenu>
      )}

      <div onClick={() => !isEditing && setIsEditing(true)}>
        <EditorContent
          editor={editor}
          className={`prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4 rounded-lg ${!isEditing ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}`}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
