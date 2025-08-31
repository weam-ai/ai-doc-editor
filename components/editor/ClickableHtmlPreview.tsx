'use client';

import EditableText from './EditableText';

interface ClickableHtmlPreviewProps {
  htmlContent: string;
  onContentChange: (newHtml: string) => void;
  className?: string;
}

export default function ClickableHtmlPreview({ 
  htmlContent, 
  onContentChange, 
  className = '' 
}: ClickableHtmlPreviewProps) {
  return (
    <EditableText
      htmlContent={htmlContent}
      onContentChange={onContentChange}
      className={className}
    />
  );
}
