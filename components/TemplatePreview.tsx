'use client';

import { useMemo } from 'react';

interface TemplatePreviewProps {
  contentHtml: string;
  className?: string;
}

export function TemplatePreview({ contentHtml, className = '' }: TemplatePreviewProps) {
  const extractedContent = useMemo(() => {
    // Extract body content from HTML if it exists
    const bodyMatch = contentHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      return bodyMatch[1];
    }
    
    const htmlMatch = contentHtml.match(/<html[^>]*>([\s\S]*)<\/html>/i);
    if (htmlMatch) {
      const headRemoved = htmlMatch[1].replace(/<head[^>]*>[\s\S]*?<\/head>/i, '');
      return headRemoved.trim();
    }
    
    if (contentHtml.trim().startsWith('<') && !contentHtml.includes('<!DOCTYPE')) {
      return contentHtml;
    }
    
    return contentHtml;
  }, [contentHtml]);

  // Process content to handle images better
  const processedContent = useMemo(() => {
    return extractedContent
      // Replace placeholder images with a simple colored div
      .replace(/<img[^>]*src="[^"]*your-image\.png[^"]*"[^>]*>/gi, 
        '<div style="width: 100px; height: 100px; background: linear-gradient(45deg, #e3f2fd, #bbdefb); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1976d2; font-size: 12px; font-weight: bold;">👤</div>')
      // Replace external placeholder images
      .replace(/<img[^>]*src="https:\/\/via\.placeholder\.com[^"]*"[^>]*>/gi,
        '<div style="width: 200px; height: 80px; background: linear-gradient(45deg, #f3e5f5, #e1bee7); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #7b1fa2; font-size: 12px; font-weight: bold;">📊</div>')
      // Add fallback for any other images
      .replace(/<img([^>]*)>/gi, (match, attrs) => {
        // Check if it's already been processed
        if (match.includes('style=') && match.includes('background:')) {
          return match;
        }
        return `<div style="width: 80px; height: 60px; background: #f5f5f5; border: 1px solid #ddd; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 10px;">📷</div>`;
      });
  }, [extractedContent]);

  return (
    <div 
      className={`template-preview ${className}`}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: 'white',
        position: 'relative'
      }}
    >
      <div 
        style={{
          transform: 'scale(0.2)',
          transformOrigin: 'top left',
          width: '500%', // 1/0.2 to compensate for scale
          height: '500%', // 1/0.2 to compensate for scale
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        <div 
          dangerouslySetInnerHTML={{ __html: processedContent }}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            fontSize: '16px', // Base font size
            lineHeight: '1.4'
          }}
        />
      </div>
    </div>
  );
}
