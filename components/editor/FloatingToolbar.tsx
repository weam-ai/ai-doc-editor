'use client';

import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Type, 
  Palette, 
  Highlighter, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  X
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { ToolbarPosition, FormattingState } from '@/hooks/useEditorState';

interface FloatingToolbarProps {
  position: ToolbarPosition;
  formatting: FormattingState;
  onFormattingChange: (format: Partial<FormattingState>) => void;
  onClose: () => void;
}

const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
const fontFamilies = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Courier New'];
const colors = [
  '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
  '#ff00ff', '#00ffff', '#ffa500', '#800080', '#008000', '#800000'
];

export default function FloatingToolbar({ 
  position, 
  formatting, 
  onFormattingChange, 
  onClose 
}: FloatingToolbarProps) {
  const [showColorPicker, setShowColorPicker] = useState<'text' | 'highlight' | null>(null);

  if (!position.visible) return null;

  const handleFormatToggle = (format: keyof Pick<FormattingState, 'bold' | 'italic' | 'underline'>) => {
    onFormattingChange({ [format]: !formatting[format] });
  };

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    onFormattingChange({ alignment });
  };

  const handleFontSizeChange = (fontSize: string) => {
    onFormattingChange({ fontSize });
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    onFormattingChange({ fontFamily });
  };

  const handleColorChange = (color: string, type: 'text' | 'highlight') => {
    onFormattingChange({ [type === 'text' ? 'textColor' : 'highlightColor']: color });
    setShowColorPicker(null);
  };

  return (
    <div
      className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center gap-1 animate-in fade-in-0 zoom-in-95 duration-200"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translateX(-50%)'
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
        title="Close toolbar"
      >
        <X size={14} className="text-gray-500" />
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Text formatting */}
      <button
        onClick={() => handleFormatToggle('bold')}
        className={`p-2 rounded transition-colors ${
          formatting.bold ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
        }`}
        title="Bold (Ctrl+B)"
      >
        <Bold size={16} />
      </button>

      <button
        onClick={() => handleFormatToggle('italic')}
        className={`p-2 rounded transition-colors ${
          formatting.italic ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
        }`}
        title="Italic (Ctrl+I)"
      >
        <Italic size={16} />
      </button>

      <button
        onClick={() => handleFormatToggle('underline')}
        className={`p-2 rounded transition-colors ${
          formatting.underline ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
        }`}
        title="Underline (Ctrl+U)"
      >
        <Underline size={16} />
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Font size */}
      <div className="relative">
        <Select value={formatting.fontSize} onValueChange={handleFontSizeChange}>
          <SelectTrigger className="w-20 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font family */}
      <div className="relative">
        <Select value={formatting.fontFamily} onValueChange={handleFontFamilyChange}>
          <SelectTrigger className="w-24 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Text color */}
      <div className="relative">
        <button
          onClick={() => setShowColorPicker(showColorPicker === 'text' ? null : 'text')}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Text color"
        >
          <Palette size={16} />
        </button>
        {showColorPicker === 'text' && (
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="grid grid-cols-4 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color, 'text')}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Highlight color */}
      <div className="relative">
        <button
          onClick={() => setShowColorPicker(showColorPicker === 'highlight' ? null : 'highlight')}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Highlight color"
        >
          <Highlighter size={16} />
        </button>
        {showColorPicker === 'highlight' && (
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="grid grid-cols-4 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color, 'highlight')}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Text alignment */}
      <button
        onClick={() => handleAlignmentChange('left')}
        className={`p-2 rounded transition-colors ${
          formatting.alignment === 'left' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
        }`}
        title="Align left"
      >
        <AlignLeft size={16} />
      </button>

      <button
        onClick={() => handleAlignmentChange('center')}
        className={`p-2 rounded transition-colors ${
          formatting.alignment === 'center' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
        }`}
        title="Align center"
      >
        <AlignCenter size={16} />
      </button>

      <button
        onClick={() => handleAlignmentChange('right')}
        className={`p-2 rounded transition-colors ${
          formatting.alignment === 'right' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
        }`}
        title="Align right"
      >
        <AlignRight size={16} />
      </button>
    </div>
  );
}
