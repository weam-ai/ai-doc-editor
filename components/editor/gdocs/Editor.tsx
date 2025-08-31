'use client';

import React from 'react';
import { EditorContent } from '@tiptap/react';
import { useEditorInstance } from '@/hooks/useEditor';
import Toolbar from './Toolbar';
import FloatingToolbar from './FloatingToolbar';

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  const { editor, editorState } = useEditorInstance(content, onChange);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-wrapper bg-gray-100 dark:bg-gray-800 p-4 sm:p-8 rounded-lg">
        <div className="editor-container relative flex flex-col min-h-[700px] bg-white dark:bg-gray-900 shadow-lg border rounded-md">
            <Toolbar editor={editor} editorState={editorState} />
            <FloatingToolbar editor={editor} editorState={editorState} />
            <div className="flex-grow overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    </div>
  );
};

export default Editor;
