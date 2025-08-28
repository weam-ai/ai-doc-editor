export const clientOnboardingTemplate = {
    _id: 'client-onboarding',
    name: 'Client Onboarding',
    description: 'Create and edit HTML documents with inline styles',
    category: 'customer-success',
    prompt: 'Create an HTML document with inline styles',
    preview: '🤝',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Client Onboarding</title>
  </head>
  <body style="margin: 0; font-family: 'Segoe UI', sans-serif; background: #f4f6f8; color: #333;">
  
    <!-- Header Banner -->
    <div style="background: #004080; color: white; padding: 50px 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 36px;">Welcome Aboard!</h1>
      <p style="font-size: 18px; margin-top: 10px;">We're excited to work with you at <strong>Alpha Solutions</strong></p>
    </div>
  
    
  
    <!-- Info Grid -->
    <div style="max-width: 900px; margin: 40px auto; padding: 0 30px; display: flex; flex-wrap: wrap; gap: 20px;">
  
      <!-- Project Overview -->
      <div style="flex: 1 1 100%; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <h2 style="color: #004080;">Project Overview</h2>
        <p>We'll be building a custom CRM system for your sales team with full integration into your existing tools, dashboards, and mobile capabilities.</p>
      </div>
  
      <!-- Timeline -->
      <div style="flex: 1 1 45%; background: #e8f1ff; padding: 25px; border-radius: 10px;">
        <h2 style="color: #004080;">Timeline</h2>
        <ul style="line-height: 1.6;">
          <li><strong>Kickoff:</strong> Aug 28</li>
          <li><strong>Design:</strong> Aug 29 – Sep 12</li>
          <li><strong>Development:</strong> Sep 13 – Oct 24</li>
          <li><strong>Launch:</strong> Oct 30</li>
        </ul>
      </div>
  
      <!-- Contact -->
      <div style="flex: 1 1 45%; background: #f1f1f1; padding: 25px; border-radius: 10px;">
        <h2 style="color: #004080;">Your Contact</h2>
        <p><strong>Sarah Tran</strong><br>Account Manager</p>
        <p>Email: sarah.tran@alphasolutions.com</p>
        <p>Phone: (555) 123-7890</p>
      </div>
  
      <!-- Expectations -->
      <div style="flex: 1 1 100%; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <h2 style="color: #004080;">What We Need From You</h2>
        <ul style="line-height: 1.8;">
          <li>Weekly check-in availability (every Friday at 10 AM)</li>
          <li>Timely feedback within 48 hours</li>
          <li>Share required documents to the provided drive folder</li>
        </ul>
      </div>
    </div>
  
    <!-- Footer -->
    <div style="background: #004080; color: white; text-align: center; padding: 20px; margin-top: 40px;">
      <p style="margin: 0;">© 2025 Alpha Solutions • All rights reserved</p>
    </div>
  
  </body>
  </html>
  `
  };
  