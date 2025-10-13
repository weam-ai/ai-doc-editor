'use client';

import React, { useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

interface FontSizeSelectorProps {
  editorRef: React.RefObject<HTMLDivElement>;
  className?: string;
  placeholder?: string;
}

const FONT_SIZES = [
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px' },
  { value: '18px', label: '18px' },
  { value: '20px', label: '20px' },
  { value: '24px', label: '24px' },
  { value: '28px', label: '28px' },
  { value: '32px', label: '32px' },
  { value: '36px', label: '36px' },
  { value: '48px', label: '48px' },
  { value: '60px', label: '60px' },
  { value: '72px', label: '72px' },
];

export const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({
  editorRef,
  className = '',
  placeholder = 'Font Size',
}) => {

  // Handle font size selection
  const handleFontSizeChange = useCallback((value: string) => {
    // Dispatch a toolbar action event that the HtmlEditor will handle
    const toolbarAction = new CustomEvent('toolbar-action', {
      detail: {
        action: 'font-size',
        value: value
      }
    });
    
    window.dispatchEvent(toolbarAction);
  }, []);

  return (
    <Select onValueChange={handleFontSizeChange}>
      <SelectTrigger 
        className={`w-24 ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {FONT_SIZES.map((size) => (
          <SelectItem key={size.value} value={size.value}>
            {size.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FontSizeSelector;
