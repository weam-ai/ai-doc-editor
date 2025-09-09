import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF(title: string, contentHtml: string): Promise<void> {
  try {
    // Check if content is HTML with inline styles
    const isHtmlContent = contentHtml.includes('<') && contentHtml.includes('style=');
    
    if (isHtmlContent) {
      // For HTML content, preserve the exact styling
      await exportHtmlToPDF(title, contentHtml);
    } else {
      // For markdown content, use the existing logic
      await exportMarkdownToPDF(title, contentHtml);
    }
  } catch (error) {
    console.error('PDF export error:', error);
    // Fallback to basic PDF export with margins and compression
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      precision: 2
    });
    
    const margin = 15; // 15mm margin on all sides
    const contentWidth = 210 - (margin * 2); // 180mm content width
    
    pdf.setFontSize(20);
    pdf.text(title, margin, margin + 10);
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentHtml;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    pdf.setFontSize(12);
    const splitText = pdf.splitTextToSize(textContent, contentWidth);
    pdf.text(splitText, margin, margin + 30);
    
    pdf.save(`${title}.pdf`);
  }
}

async function exportHtmlToPDF(title: string, contentHtml: string): Promise<void> {
  // Extract width from HTML content
  const widthMatch = contentHtml.match(/max-width:\s*(\d+)px|width:\s*(\d+)px/);
  const templateWidth = widthMatch ? parseInt(widthMatch[1] || widthMatch[2]) : 800; // Default to 800px if not found
  
  // Create a temporary container with the exact HTML content
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = `${templateWidth}px`; // Use dynamic width from template
  tempContainer.style.backgroundColor = 'white';
  
  // Extract the body content from HTML if it exists
  let htmlContent = contentHtml;
  if (contentHtml.includes('<body')) {
    const bodyMatch = contentHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      htmlContent = bodyMatch[1];
    }
  }
  
  // Create the complete HTML document with preserved styles, page break handling, and CSS
  tempContainer.innerHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { 
          margin: 0; 
          font-family: 'Segoe UI', sans-serif; 
        }
        * { 
          box-sizing: border-box; 
        }
        
        /* Include the HTML preview styles from globals.css */
        .html-preview {
          width: 100%;
        }
        
        .html-preview h1,
        .html-preview h2,
        .html-preview h3,
        .html-preview h4,
        .html-preview h5,
        .html-preview h6 {
          font-weight: 600;
        }
        
        .html-preview h1 {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        
        .html-preview h2 {
          font-size: 1.5rem;
          line-height: 2rem;
        }
        
        /* Page break handling */
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
          page-break-inside: avoid;
          margin-top: 20px;
          margin-bottom: 15px;
        }
        
        p {
          page-break-inside: avoid;
          margin-bottom: 12px;
        }
        
        ul, ol {
          page-break-inside: avoid;
          margin-bottom: 15px;
        }
        
        li {
          page-break-inside: avoid;
          margin-bottom: 6px;
        }
        
        table {
          page-break-inside: avoid;
          margin: 20px 0;
        }
        
        tr {
          page-break-inside: avoid;
        }
        
        /* Add spacing before page breaks */
        .page-break-before {
          page-break-before: always;
          margin-top: 30px;
          padding-top: 20px;
        }
        
        /* Ensure proper spacing around content */
        div {
          margin-bottom: 15px;
        }
        
        /* Add bottom margin to prevent content from touching page edges */
        .content-section {
          margin-bottom: 25px;
          padding-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="html-preview">
        ${htmlContent}
      </div>
    </body>
    </html>
  `;
  
  // Add to DOM temporarily
  document.body.appendChild(tempContainer);
  
  // Convert to canvas with optimized settings for compression
  const canvas = await html2canvas(tempContainer, {
    scale: 1.5, // Reduced scale for smaller file size while maintaining quality
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    width: templateWidth, // Use dynamic width from template
    height: tempContainer.scrollHeight,
    scrollX: 0,
    scrollY: 0,
    logging: false
  });
  
  // Remove temporary container
  document.body.removeChild(tempContainer);
  
  // PDF dimensions with margins
  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const margin = 15; // 15mm margin on all sides
  const contentWidth = pageWidth - (margin * 2); // 180mm content width
  const contentHeight = pageHeight - (margin * 2); // 267mm content height
  
  // Calculate image dimensions to fit within margins
  const imgWidth = contentWidth;
  const imgHeight = (canvas.height * contentWidth) / canvas.width;
  let heightLeft = imgHeight;
  
  // Create PDF with compression
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true, // Enable compression
    precision: 2 // Reduce precision for smaller file size
  });
  
  let position = 0;
  
  // Add first page with margins
  pdf.addImage(canvas, 'JPEG', margin, margin + position, imgWidth, imgHeight, undefined, 'FAST');
  heightLeft -= contentHeight;
  
  // Add additional pages if content is longer than one page
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    
    // Add content with proper margins
    pdf.addImage(canvas, 'JPEG', margin, margin + position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= contentHeight;
  }
  
  pdf.save(`${title}.pdf`);
}

async function exportMarkdownToPDF(title: string, contentHtml: string): Promise<void> {
  // Extract width from HTML content if it exists
  const widthMatch = contentHtml.match(/max-width:\s*(\d+)px|width:\s*(\d+)px/);
  const templateWidth = widthMatch ? parseInt(widthMatch[1] || widthMatch[2]) : 800; // Default to 800px if not found
  
  // Create a temporary container with proper styling
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = `${templateWidth}px`; // Use dynamic width from template
  tempContainer.style.padding = '40px';
  tempContainer.style.backgroundColor = 'white';
  tempContainer.style.fontFamily = 'Arial, sans-serif';
  tempContainer.style.lineHeight = '1.6';
  tempContainer.style.color = '#333';
  
  // Enhanced styling for better PDF formatting preservation with page break handling
  const enhancedStyles = `
    <style>
      .pdf-content h1, .pdf-content h2, .pdf-content h3, .pdf-content h4, .pdf-content h5, .pdf-content h6 {
        color: #333 !important;
        font-weight: bold !important;
        margin-top: 20px !important;
        margin-bottom: 10px !important;
        page-break-after: avoid !important;
        page-break-inside: avoid !important;
      }
      .pdf-content h1 { font-size: 24px !important; border-bottom: 2px solid #6737ec !important; padding-bottom: 8px !important; }
      .pdf-content h2 { font-size: 20px !important; color: #4b5563 !important; }
      .pdf-content h3 { font-size: 18px !important; color: #6b7280 !important; }
      .pdf-content p { 
        margin-bottom: 12px !important; 
        text-align: justify !important; 
        page-break-inside: avoid !important;
      }
      .pdf-content ul, .pdf-content ol { 
        margin-bottom: 15px !important; 
        padding-left: 25px !important; 
        page-break-inside: avoid !important;
      }
      .pdf-content li { 
        margin-bottom: 6px !important; 
        page-break-inside: avoid !important;
      }
      .pdf-content blockquote { 
        border-left: 4px solid #6737ec !important; 
        padding: 15px 20px !important; 
        margin: 20px 0 !important; 
        background-color: #f9fafb !important; 
        font-style: italic !important;
        page-break-inside: avoid !important;
      }
      .pdf-content code { 
        background-color: #f3f4f6 !important; 
        padding: 3px 6px !important; 
        border-radius: 4px !important; 
        font-family: 'Courier New', monospace !important;
      }
      .pdf-content pre { 
        background-color: #f3f4f6 !important; 
        padding: 15px !important; 
        border-radius: 6px !important; 
        border: 1px solid #e5e7eb !important;
        page-break-inside: avoid !important;
      }
      .pdf-content table { 
        width: 100% !important; 
        border-collapse: collapse !important; 
        margin: 15px 0 !important;
        page-break-inside: avoid !important;
      }
      .pdf-content th, .pdf-content td { 
        padding: 10px !important; 
        border: 1px solid #e5e7eb !important; 
        text-align: left !important;
      }
      .pdf-content th { 
        background-color: #6737ec !important; 
        color: white !important; 
        font-weight: bold !important;
      }
      .pdf-content tr {
        page-break-inside: avoid !important;
      }
      .pdf-content strong, .pdf-content b { font-weight: bold !important; color: #1f2937 !important; }
      .pdf-content em, .pdf-content i { font-style: italic !important; color: #6b7280 !important; }
      .pdf-content hr { 
        border: none !important; 
        height: 2px !important; 
        background: #6737ec !important; 
        margin: 20px 0 !important;
        page-break-inside: avoid !important;
      }
      
      /* Add spacing before page breaks */
      .page-break-before {
        page-break-before: always !important;
        margin-top: 30px !important;
        padding-top: 20px !important;
      }
      
      /* Ensure proper spacing around content */
      .pdf-content div {
        margin-bottom: 15px !important;
      }
      
      /* Add bottom margin to prevent content from touching page edges */
      .content-section {
        margin-bottom: 25px !important;
        padding-bottom: 10px !important;
      }
    </style>
  `;
  
  // Add the styled content with enhanced formatting
  tempContainer.innerHTML = `
    ${enhancedStyles}
    <div style="margin-bottom: 30px; border-bottom: 2px solid #6737ec; padding-bottom: 20px;">
      <h1 style="font-size: 28px; font-weight: bold; color: #333; margin: 0; text-align: center;">${title}</h1>
    </div>
    <div class="pdf-content" style="font-size: 14px;">
      ${contentHtml}
    </div>
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
      Generated by AI Docs - ${new Date().toLocaleDateString()}
    </div>
  `;
  
  // Add to DOM temporarily
  document.body.appendChild(tempContainer);
  
  // Convert to canvas with optimized settings for compression
  const canvas = await html2canvas(tempContainer, {
    scale: 1.5, // Reduced scale for smaller file size while maintaining quality
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    width: templateWidth, // Use dynamic width from template
    height: tempContainer.scrollHeight,
    scrollX: 0,
    scrollY: 0
  });
  
  // Remove temporary container
  document.body.removeChild(tempContainer);
  
  // PDF dimensions with margins
  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const margin = 15; // 15mm margin on all sides
  const contentWidth = pageWidth - (margin * 2); // 180mm content width
  const contentHeight = pageHeight - (margin * 2); // 267mm content height
  
  // Calculate image dimensions to fit within margins
  const imgWidth = contentWidth;
  const imgHeight = (canvas.height * contentWidth) / canvas.width;
  let heightLeft = imgHeight;
  
  // Create PDF with compression
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true, // Enable compression
    precision: 2 // Reduce precision for smaller file size
  });
  
  let position = 0;
  
  // Add first page with margins
  pdf.addImage(canvas, 'JPEG', margin, margin + position, imgWidth, imgHeight, undefined, 'FAST');
  heightLeft -= contentHeight;
  
  // Add additional pages if content is longer than one page
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    
    // Add content with proper margins
    pdf.addImage(canvas, 'JPEG', margin, margin + position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= contentHeight;
  }
  
  pdf.save(`${title}.pdf`);
}

export async function exportToWord(title: string, contentHtml: string): Promise<void> {
  try {
    // Check if content is HTML with inline styles
    const isHtmlContent = contentHtml.includes('<') && contentHtml.includes('style=');
    
    if (isHtmlContent) {
      // For HTML content, preserve the exact styling
      exportHtmlToWord(title, contentHtml);
    } else {
      // For markdown content, use the existing logic
      exportMarkdownToWord(title, contentHtml);
    }
  } catch (error) {
    console.error('Error exporting to Word:', error);
    throw new Error('Failed to export to Word format');
  }
}

function exportHtmlToWord(title: string, contentHtml: string): void {
  // Extract width from HTML content
  const widthMatch = contentHtml.match(/max-width:\s*(\d+)px|width:\s*(\d+)px/);
  const templateWidth = widthMatch ? parseInt(widthMatch[1] || widthMatch[2]) : 800; // Default to 800px if not found
  
  // Extract the body content from HTML if it exists
  let htmlContent = contentHtml;
  if (contentHtml.includes('<body')) {
    const bodyMatch = contentHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      htmlContent = bodyMatch[1];
    }
  }
  
  // Create a Word-compatible HTML file with preserved inline styles and CSS
  const wordHtmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body { 
          font-family: 'Times New Roman', serif; 
          line-height: 1.6; 
          margin: 40px; 
          color: #333;
          background-color: #ffffff;
        }
        
        /* Include the HTML preview styles from globals.css */
        .html-preview {
          width: 100%;
        }
        
        .html-preview h1,
        .html-preview h2,
        .html-preview h3,
        .html-preview h4,
        .html-preview h5,
        .html-preview h6 {
          font-weight: 600;
        }
        
        .html-preview h1 {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        
        .html-preview h2 {
          font-size: 1.5rem;
          line-height: 2rem;
        }
        
        /* Word-specific optimizations */
        @page {
          margin: 1in;
          size: A4;
        }
        
        /* Ensure proper page breaks */
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
        }
        
        p, li, blockquote {
          page-break-inside: avoid;
        }
      </style>
    </head>
    <body>
      <div class="html-preview">
        ${htmlContent}
      </div>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 14px;">
        <p>Generated by AI Docs</p>
        <p>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
      </div>
    </body>
    </html>
  `;
  
  const blob = new Blob([wordHtmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.html`;
  link.click();
  URL.revokeObjectURL(url);
  
  // Show instruction to user
  alert('HTML file downloaded. You can open this file in Microsoft Word to convert it to DOCX format.');
}

function exportMarkdownToWord(title: string, contentHtml: string): void {
  // Create a Word-compatible HTML file with enhanced formatting
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body { 
          font-family: 'Times New Roman', serif; 
          line-height: 1.6; 
          margin: 40px; 
          color: #333;
          background-color: #ffffff;
        }
        
        .header { 
          text-align: center; 
          margin-bottom: 40px; 
          padding-bottom: 20px;
          border-bottom: 3px solid #6737ec;
        }
        
        .header h1 { 
          color: #333; 
          font-size: 28px;
          font-weight: bold;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: -0.5px;
        }
        
        h1, h2, h3, h4, h5, h6 { 
          color: #333; 
          margin-top: 25px; 
          margin-bottom: 15px;
          font-weight: bold;
        }
        
        h1 { 
          font-size: 24px; 
          border-bottom: 2px solid #e5e7eb; 
          padding-bottom: 8px;
        }
        
        h2 { 
          font-size: 20px; 
          color: #4b5563;
        }
        
        h3 { 
          font-size: 18px; 
          color: #6b7280;
        }
        
        p { 
          margin-bottom: 15px; 
          text-align: justify;
          text-indent: 20px;
        }
        
        ul, ol { 
          margin-bottom: 20px; 
          padding-left: 30px;
        }
        
        li { 
          margin-bottom: 8px; 
          line-height: 1.6;
        }
        
        ul li::marker {
          color: #6737ec;
          font-weight: bold;
        }
        
        ol li::marker {
          color: #6737ec;
          font-weight: bold;
        }
        
        blockquote {
          border-left: 4px solid #6737ec;
          padding: 15px 20px;
          margin: 25px 0;
          font-style: italic;
          color: #6b7280;
          background-color: #f9fafb;
          border-radius: 0 8px 8px 0;
        }
        
        code {
          background-color: #f3f4f6;
          padding: 3px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: #dc2626;
          border: 1px solid #e5e7eb;
        }
        
        pre {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          border: 1px solid #e5e7eb;
          margin: 20px 0;
          font-family: 'Courier New', monospace;
          font-size: 14px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        th, td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
        }
        
        th {
          background-color: #6737ec;
          color: #ffffff;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 14px;
          letter-spacing: 0.5px;
        }
        
        tr:nth-child(even) {
          background-color: #f9fafb;
        }
        
        strong, b {
          color: #1f2937;
          font-weight: bold;
        }
        
        em, i {
          color: #6b7280;
          font-style: italic;
        }
        
        hr {
          border: none;
          height: 2px;
          background: linear-gradient(90deg, #6737ec, #8b5cf6, #6737ec);
          margin: 25px 0;
          border-radius: 1px;
        }
        
        .footer { 
          text-align: center; 
          margin-top: 40px; 
          padding-top: 20px; 
          border-top: 1px solid #eee; 
          color: #999;
          font-size: 14px;
        }
        
        /* Word-specific optimizations */
        @page {
          margin: 1in;
          size: A4;
        }
        
        /* Ensure proper page breaks */
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
        }
        
        p, li, blockquote {
          page-break-inside: avoid;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${title}</h1>
      </div>
      <div class="content">
        ${contentHtml}
      </div>
      <div class="footer">
        <p>Generated by AI Docs</p>
        <p>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
      </div>
    </body>
    </html>
  `;
  
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.html`;
  link.click();
  URL.revokeObjectURL(url);
  
  // Show instruction to user
  alert('HTML file downloaded. You can open this file in Microsoft Word to convert it to DOCX format.');
}

export function exportToHTML(title: string, contentHtml: string): void {
  // Check if content is HTML with inline styles
  const isHtmlContent = contentHtml.includes('<') && contentHtml.includes('style=');
  
  if (isHtmlContent) {
    // For HTML content, preserve the exact styling
    exportHtmlToHTML(title, contentHtml);
  } else {
    // For markdown content, use the existing logic
    exportMarkdownToHTML(title, contentHtml);
  }
}

function exportHtmlToHTML(title: string, contentHtml: string): void {
  // Extract width from HTML content
  const widthMatch = contentHtml.match(/max-width:\s*(\d+)px|width:\s*(\d+)px/);
  const templateWidth = widthMatch ? parseInt(widthMatch[1] || widthMatch[2]) : 800; // Default to 800px if not found
  
  // Extract the body content from HTML if it exists
  let htmlContent = contentHtml;
  if (contentHtml.includes('<body')) {
    const bodyMatch = contentHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      htmlContent = bodyMatch[1];
    }
  }
  
  // Create a standalone HTML file with preserved inline styles and CSS
  const standaloneHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          color: #333;
          background-color: #ffffff;
        }
        
        .html-preview {
          max-width: ${templateWidth}px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .html-preview h1,
        .html-preview h2,
        .html-preview h3,
        .html-preview h4,
        .html-preview h5,
        .html-preview h6 {
          font-weight: 600;
        }
        
        .html-preview h1 {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        
        .html-preview h2 {
          font-size: 1.5rem;
          line-height: 2rem;
        }
        
        /* Print-specific styles */
        @media print {
          body {
            margin: 1in;
          }
          
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
          }
          
          p, li {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="html-preview">
        ${htmlContent}
      </div>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 14px;">
        <p>Generated by AI Docs</p>
        <p>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([standaloneHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.html`;
  link.click();
  URL.revokeObjectURL(url);
}

function exportMarkdownToHTML(title: string, contentHtml: string): void {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          color: #333;
          background-color: #ffffff;
        }
        
        /* Enhanced header styling */
        .document-header {
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 3px solid #6737ec;
        }
        
        .document-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: -0.5px;
        }
        
        /* Enhanced heading styles */
        h1, h2, h3, h4, h5, h6 {
          color: #6737ec;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
          line-height: 1.3;
        }
        
        h1 { 
          font-size: 2.2rem; 
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        h2 { 
          font-size: 1.8rem; 
          color: #4b5563;
        }
        h3 { 
          font-size: 1.5rem; 
          color: #6b7280;
        }
        h4 { 
          font-size: 1.3rem; 
          color: #9ca3af;
        }
        
        /* Enhanced paragraph and text styling */
        p { 
          margin-bottom: 1.2rem; 
          text-align: justify;
          hyphens: auto;
        }
        
        /* Enhanced list styling */
        ul, ol { 
          margin-bottom: 1.5rem; 
          padding-left: 2.5rem; 
        }
        
        li { 
          margin-bottom: 0.5rem; 
          line-height: 1.6;
        }
        
        ul li::marker {
          color: #6737ec;
          font-weight: bold;
        }
        
        ol li::marker {
          color: #6737ec;
          font-weight: 600;
        }
        
        /* Enhanced blockquote styling */
        blockquote {
          border-left: 4px solid #6737ec;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6b7280;
          background-color: #f9fafb;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        
        /* Enhanced code styling */
        code {
          background-color: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.9em;
          color: #dc2626;
          border: 1px solid #e5e7eb;
        }
        
        pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          border: 1px solid #374151;
          margin: 1.5rem 0;
        }
        
        pre code {
          background: none;
          color: inherit;
          padding: 0;
          border: none;
        }
        
        /* Enhanced image styling */
        img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin: 1rem 0;
          display: block;
        }
        
        /* Enhanced table styling */
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          background-color: #ffffff;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        th, td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        
        th {
          background-color: #6737ec;
          color: #ffffff;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.875rem;
          letter-spacing: 0.5px;
        }
        
        tr:nth-child(even) {
          background-color: #f9fafb;
        }
        
        tr:hover {
          background-color: #f3f4f6;
        }
        
        /* Enhanced link styling */
        a {
          color: #6737ec;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-bottom-color 0.2s ease;
        }
        
        a:hover {
          border-bottom-color: #6737ec;
        }
        
        /* Enhanced emphasis styling */
        strong, b {
          color: #1f2937;
          font-weight: 700;
        }
        
        em, i {
          color: #6b7280;
          font-style: italic;
        }
        
        /* Enhanced horizontal rule */
        hr {
          border: none;
          height: 2px;
          background: linear-gradient(90deg, #6737ec, #8b5cf6, #6737ec);
          margin: 2rem 0;
          border-radius: 1px;
        }
        
        /* Footer styling */
        .document-footer {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #9ca3af;
          font-size: 0.875rem;
        }
        
        /* Print-specific styles */
        @media print {
          body {
            max-width: none;
            margin: 0;
            padding: 1rem;
          }
          
          .document-header {
            margin-bottom: 2rem;
          }
          
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
          }
          
          p, li {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="document-header">
        <h1>${title}</h1>
      </div>
      
      <div class="document-content">
        ${contentHtml}
      </div>
      
      <div class="document-footer">
        <p>Generated by AI Docs</p>
        <p>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.html`;
  link.click();
  URL.revokeObjectURL(url);
}
