'use client';

import React from 'react';
import { Editor } from '@tiptap/react';
import { EditorState } from '@/hooks/useEditor';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link,
  Code,
  WrapText,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Highlighter,
  RemoveFormatting,
  ListTodo,
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/Select"
import { Button } from '@/components/ui/Button';

interface ToolbarProps {
  editor: Editor;
  editorState: EditorState;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor, editorState }) => {
    const fontFamilies = [
        { name: 'Inter', value: 'Inter, sans-serif' },
        { name: 'Arial', value: 'Arial, sans-serif' },
        { name: 'Georgia', value: 'Georgia, serif' },
        { name: 'Impact', value: 'Impact, sans-serif' },
        { name: 'Tahoma', value: 'Tahoma, sans-serif' },
        { name: 'Times New Roman', value: 'Times New Roman, serif' },
        { name: 'Verdana', value: 'Verdana, sans-serif' },
    ]

    const fontSizes = [
        '12', '14', '16', '18', '20', '24', '30', '36', '48',
    ]

  return (
    <div className="toolbar-container bg-gray-50 border-b border-gray-200 p-2 flex items-center flex-wrap gap-1 sticky top-0 z-10">
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <Redo className="h-4 w-4" />
      </Button>
      <div className="h-6 w-px bg-gray-300" />
      <Select
        onValueChange={(value) => {
          if (value === 'paragraph') {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: parseInt(value, 10) as any }).run();
          }
        }}
        value={
            editor.isActive('paragraph') ? 'paragraph' :
            editor.isActive('heading', { level: 1 }) ? '1' :
            editor.isActive('heading', { level: 2 }) ? '2' :
            editor.isActive('heading', { level: 3 }) ? '3' :
            editor.isActive('heading', { level: 4 }) ? '4' :
            editor.isActive('heading', { level: 5 }) ? '5' :
            editor.isActive('heading', { level: 6 }) ? '6' : 'paragraph'
        }
        >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Text style" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="1">Heading 1</SelectItem>
            <SelectItem value="2">Heading 2</SelectItem>
            <SelectItem value="3">Heading 3</SelectItem>
            <SelectItem value="4">Heading 4</SelectItem>
            <SelectItem value="5">Heading 5</SelectItem>
            <SelectItem value="6">Heading 6</SelectItem>
        </SelectContent>
      </Select>
      <div className="h-6 w-px bg-gray-300" />
      <Select
        onValueChange={(value) => editor.chain().focus().setFontFamily(value).run()}
        value={editor.getAttributes('textStyle').fontFamily || 'Inter, sans-serif'}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Font family" />
        </SelectTrigger>
        <SelectContent>
            {fontFamilies.map(font => (
                <SelectItem key={font.value} value={font.value} style={{fontFamily: font.value}}>
                    {font.name}
                </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => editor.chain().focus().setFontSize(`${value}px`).run()}
        value={editor.getAttributes('textStyle').fontSize?.replace('px', '') || '16'}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Font size" />
        </SelectTrigger>
        <SelectContent>
            {fontSizes.map(size => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      <div className="h-6 w-px bg-gray-300" />
      <Toggle
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <div className="h-6 w-px bg-gray-300" />
      <Button variant="ghost" size="icon" asChild>
        <label htmlFor="text-color" className="cursor-pointer">
            <Palette className="h-4 w-4" />
            <input
                id="text-color"
                type="color"
                className="sr-only"
                onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
                value={editor.getAttributes('textStyle').color || '#000000'}
            />
        </label>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <label htmlFor="bg-color" className="cursor-pointer">
            <Highlighter className="h-4 w-4" />
            <input
                id="bg-color"
                type="color"
                className="sr-only"
                onInput={(e) => editor.chain().focus().setHighlight({ color: (e.target as HTMLInputElement).value }).run()}
                value={editor.getAttributes('highlight').color || '#ffffff'}
            />
        </label>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().unsetHighlight().run()} disabled={!editor.isActive('highlight')}>
        <RemoveFormatting className="h-4 w-4" />
      </Button>
      <div className="h-6 w-px bg-gray-300" />
      <Select
        onValueChange={(value) => editor.chain().focus().setTextAlign(value).run()}
        value={
            editor.isActive({ textAlign: 'left' }) ? 'left' :
            editor.isActive({ textAlign: 'center' }) ? 'center' :
            editor.isActive({ textAlign: 'right' }) ? 'right' :
            editor.isActive({ textAlign: 'justify' }) ? 'justify' : 'left'
        }
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Alignment" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="left"><AlignLeft className="h-4 w-4" /></SelectItem>
            <SelectItem value="center"><AlignCenter className="h-4 w-4" /></SelectItem>
            <SelectItem value="right"><AlignRight className="h-4 w-4" /></SelectItem>
            <SelectItem value="justify"><AlignJustify className="h-4 w-4" /></SelectItem>
        </SelectContent>
      </Select>
      <div className="h-6 w-px bg-gray-300" />
      <Toggle
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive('taskList')}
        onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
      >
        <ListTodo className="h-4 w-4" />
      </Toggle>
      <div className="h-6 w-px bg-gray-300" />
      <Toggle
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive('codeBlock')}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Button variant="ghost" size="icon" onClick={() => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
      }}>
        <Link className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Toolbar;
