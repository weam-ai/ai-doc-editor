'use client';

import { useState } from 'react';
import EditableText from '@/components/editor/EditableText';

const sampleHtmlContent = `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">Campaign Performance Report</h1>
  
  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
    <h2 style="color: #34495e; margin-bottom: 15px;">Campaign Overview</h2>
    <p style="color: #555; line-height: 1.6; margin-bottom: 10px;">
      <strong>Campaign:</strong> Spring 2025 Awareness
    </p>
    <p style="color: #555; line-height: 1.6; margin-bottom: 10px;">
      <strong>Date:</strong> August 25, 2025
    </p>
    <p style="color: #555; line-height: 1.6;">
      <strong>Status:</strong> Active
    </p>
  </div>
  
  <div style="margin-bottom: 25px;">
    <h2 style="color: #34495e; margin-bottom: 15px;">Objectives</h2>
    <ul style="color: #555; line-height: 1.6; padding-left: 20px;">
      <li style="margin-bottom: 8px;">Increase brand awareness in North America</li>
      <li style="margin-bottom: 8px;">Drive 10K+ visits to product page</li>
      <li style="margin-bottom: 8px;">Boost social engagement by 25%</li>
      <li style="margin-bottom: 8px;">Generate 500+ qualified leads</li>
    </ul>
  </div>
  
  <div style="margin-bottom: 25px;">
    <h2 style="color: #34495e; margin-bottom: 15px;">Key Metrics</h2>
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
      <thead>
        <tr style="background: #f8f9fa;">
          <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #34495e;">Metric</th>
          <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #34495e;">Goal</th>
          <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #34495e;">Actual</th>
          <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #34495e;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">Page Visits</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">15,000</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">17,300</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #27ae60;">✅ Exceeded</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">CTR (Ads)</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">2.5%</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">3.1%</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #27ae60;">✅ Exceeded</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">Social Engagement</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">25%</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">28.5%</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #27ae60;">✅ Exceeded</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">Lead Generation</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">500</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #555;">487</td>
          <td style="padding: 12px; border: 1px solid #ddd; color: #f39c12;">⚠️ In Progress</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div style="margin-bottom: 25px;">
    <h2 style="color: #34495e; margin-bottom: 15px;">Performance Analysis</h2>
    <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
      The campaign has shown strong performance across most key metrics, with page visits, click-through rates, and social engagement all exceeding targets. The lead generation metric is currently at 97.4% of the goal and is expected to reach the target by the end of the campaign period.
    </p>
    <p style="color: #555; line-height: 1.6;">
      <em>Note: All metrics are based on real-time data and may be subject to final verification.</em>
    </p>
  </div>
  
  <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #27ae60;">
    <h3 style="color: #27ae60; margin-bottom: 10px;">🎯 Next Steps</h3>
    <ul style="color: #2d5a2d; line-height: 1.6; padding-left: 20px; margin: 0;">
      <li style="margin-bottom: 5px;">Optimize lead generation campaigns to reach the 500 target</li>
      <li style="margin-bottom: 5px;">Scale successful ad creatives to increase reach</li>
      <li style="margin-bottom: 5px;">Prepare Q4 campaign strategy based on learnings</li>
    </ul>
  </div>
</div>
`;

export default function ToolbarDemoPage() {
  const [htmlContent, setHtmlContent] = useState(sampleHtmlContent);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Floating Toolbar Demo</h1>
          <p className="text-gray-600 mt-2">
            Select any text in the document below to see the floating toolbar appear. 
            Use the toolbar to format text or press Ctrl+B/I/U for keyboard shortcuts.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <EditableText
            htmlContent={htmlContent}
            onContentChange={setHtmlContent}
            className=""
          />
        </div>
        
        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use the Floating Toolbar</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Text Selection</h4>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• Click and drag to select text in the document</li>
                <li>• The floating toolbar will appear above the selected text</li>
                <li>• Click outside or press Esc to hide the toolbar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Formatting Options</h4>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• <strong>Bold, Italic, Underline:</strong> Toggle text formatting</li>
                <li>• <strong>Font Size & Family:</strong> Change text appearance</li>
                <li>• <strong>Text & Highlight Colors:</strong> Customize colors</li>
                <li>• <strong>Alignment:</strong> Left, center, or right align text</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-300">
            <h4 className="font-medium text-blue-800 mb-2">Keyboard Shortcuts</h4>
            <div className="text-blue-700 text-sm space-y-1">
              <p><kbd className="bg-blue-200 px-2 py-1 rounded text-xs">Ctrl+B</kbd> Bold</p>
              <p><kbd className="bg-blue-200 px-2 py-1 rounded text-xs">Ctrl+I</kbd> Italic</p>
              <p><kbd className="bg-blue-200 px-2 py-1 rounded text-xs">Ctrl+U</kbd> Underline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
