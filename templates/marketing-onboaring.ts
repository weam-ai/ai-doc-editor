export const marketingOnboardingTemplate = {
    _id: 'marketing-onboarding',
    name: 'Marketing Onboarding',
    description: 'Create and edit HTML documents with inline styles',
    category: 'creative-marketing',
    prompt: 'Create an HTML document with inline styles',
    preview: '💼',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Marketing Campaign Report</title>
</head>
<body style="margin: 0; font-family: 'Segoe UI', sans-serif; background: #f4f6f8; color: #333;">

  <div style="max-width: 900px; margin: 40px auto; background: white; padding: 40px 50px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

    <h1 style="text-align: center; color: #1a1a1a;">Campaign Performance Report</h1>
    <p style="text-align: center; font-size: 16px;">Campaign: <strong>Spring 2025 Awareness</strong> | Date: <strong>Aug 25, 2025</strong></p>

    <div style="margin: 30px 0;">
      <h2 style="color: #004080;">Objectives</h2>
      <ul>
        <li>Increase brand awareness in North America</li>
        <li>Drive 15K+ visits to product page</li>
        <li>Boost social engagement by 25%</li>
      </ul>
    </div>

    <div style="margin: 30px 0;">
      <h2 style="color: #004080;">Key Metrics</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background: #004080; color: white;">
          <th style="padding: 10px;">Metric</th>
          <th style="padding: 10px;">Goal</th>
          <th style="padding: 10px;">Actual</th>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px;">Page Visits</td>
          <td style="padding: 10px;">15,000</td>
          <td style="padding: 10px;">17,300</td>
        </tr>
        <tr>
          <td style="padding: 10px;">CTR (Ads)</td>
          <td style="padding: 10px;">2.5%</td>
          <td style="padding: 10px;">3.1%</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px;">Social Engagement</td>
          <td style="padding: 10px;">+25%</td>
          <td style="padding: 10px;">+18%</td>
        </tr>
      </table>
    </div>

    <div>
      <h2 style="color: #004080;">Summary</h2>
      <p>The campaign exceeded expectations for traffic and CTR but underperformed slightly on social engagement. Additional influencer outreach is recommended for future boosts.</p>
    </div>

  </div>
</body>
</html>
  `
  };
  