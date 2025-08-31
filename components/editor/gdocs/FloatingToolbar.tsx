'use client';

import React from 'react';
import { Editor, FloatingMenu } from '@tiptap/react';
import { EditorState } from '@/hooks/useEditor';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/Button';

interface FloatingToolbarProps {
  editor: Editor;
  editorState: EditorState;
}

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ editor, editorState }) => {
  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      shouldShow={({ state }) => {
        const { from, to } = state.selection;
        return from !== to;
      }}
      className="bg-white shadow-lg border border-gray-200 rounded-md p-1 flex items-center space-x-1"
    >
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
            const url = window.prompt('URL');
            if (url) {
                editor.chain().focus().setLink({ href: url }).run();
            }
        }}
    >
        <Link className="h-4 w-4" />
      </Button>
    </FloatingMenu>
  );
};

export default FloatingToolbar;
