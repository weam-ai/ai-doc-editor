export const q3BusinessPerformanceTemplate = {
    _id: 'q3-business-performance',
    name: 'Q3 Business Report',
    description: 'Create and edit HTML documents with inline styles',
    category: 'reports-analysis',
    prompt: 'Create an HTML document with inline styles',
    preview: '📊',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Business Report</title>
</head>
<body style="margin: 0; font-family: 'Helvetica Neue', sans-serif; background: #f4f4f4; color: #333;">

  <div style="max-width: 900px; margin: 40px auto; background: white; padding: 50px 60px; box-shadow: 0 0 12px rgba(0,0,0,0.08);">

    <!-- Title Page -->
    <div style="text-align: center; margin-bottom: 60px;">
      <h1 style="font-size: 36px; color: #1b1f23;">Q3 Business Performance Report</h1>
      <h3 style="color: #666;">Prepared by: Operations and Strategy Division</h3>
      <p style="font-size: 16px;">Company: Orion Dynamics Ltd.</p>
      <p style="font-size: 16px;">Date: August 25, 2025</p>
    </div>

    <!-- Introduction -->
    <h2 style="border-bottom: 2px solid #ddd; padding-bottom: 8px; color: #1b1f23;">1. Introduction</h2>
    <p style="line-height: 1.6;">
      This quarterly report summarizes the business performance of Orion Dynamics Ltd. for Q3 2025. The purpose is to provide stakeholders with insights into financial performance, departmental efficiency, and ongoing strategic initiatives.
    </p>

    <!-- Financial Overview -->
    <h2 style="border-bottom: 2px solid #ddd; padding-bottom: 8px; margin-top: 40px; color: #1b1f23;">2. Financial Overview</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr style="background: #1b1f23; color: white;">
        <th style="padding: 10px; text-align: left;">Metric</th>
        <th style="padding: 10px; text-align: right;">Q3 2025</th>
        <th style="padding: 10px; text-align: right;">Q2 2025</th>
      </tr>
      <tr>
        <td style="padding: 10px;">Revenue</td>
        <td style="padding: 10px; text-align: right;">$4.6M</td>
        <td style="padding: 10px; text-align: right;">$4.1M</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 10px;">Gross Profit</td>
        <td style="padding: 10px; text-align: right;">$2.9M</td>
        <td style="padding: 10px; text-align: right;">$2.5M</td>
      </tr>
      <tr>
        <td style="padding: 10px;">Operating Expenses</td>
        <td style="padding: 10px; text-align: right;">$1.2M</td>
        <td style="padding: 10px; text-align: right;">$1.3M</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 10px;"><strong>Net Income</strong></td>
        <td style="padding: 10px; text-align: right;"><strong>$1.7M</strong></td>
        <td style="padding: 10px; text-align: right;"><strong>$1.2M</strong></td>
      </tr>
    </table>

    <!-- Departmental Highlights -->
    <h2 style="border-bottom: 2px solid #ddd; padding-bottom: 8px; margin-top: 40px; color: #1b1f23;">3. Departmental Highlights</h2>

    <h3 style="color: #007acc; margin-bottom: 5px;">3.1 Sales & Marketing</h3>
    <p style="line-height: 1.6;">
      The Sales department exceeded Q3 targets by 12%, driven by strong performance in the EMEA and APAC regions. Marketing campaigns achieved a 3.1x ROAS (return on ad spend) with high engagement in digital channels.
    </p>

    <h3 style="color: #007acc; margin-bottom: 5px;">3.2 Product Development</h3>
    <p style="line-height: 1.6;">
      Product teams launched two major features ahead of schedule. The development cycle was shortened by 15% compared to Q2, thanks to improved sprint planning and cross-team collaboration.
    </p>

    <h3 style="color: #007acc; margin-bottom: 5px;">3.3 Customer Support</h3>
    <p style="line-height: 1.6;">
      Resolution time decreased by 22%, and the department maintained a CSAT (Customer Satisfaction) score of 93%. New support chatbots handled 27% of tier-1 queries without human intervention.
    </p>

    <!-- Strategic Initiatives -->
    <h2 style="border-bottom: 2px solid #ddd; padding-bottom: 8px; margin-top: 40px; color: #1b1f23;">4. Strategic Initiatives</h2>
    <ul style="line-height: 1.6; padding-left: 20px;">
      <li>Initiated cloud infrastructure migration (Phase 1 completed)</li>
      <li>Signed MoU with three new channel partners</li>
      <li>Conducted DEI training across all teams (98% participation)</li>
    </ul>

    <!-- Risk & Mitigation -->
    <h2 style="border-bottom: 2px solid #ddd; padding-bottom: 8px; margin-top: 40px; color: #1b1f23;">5. Risks & Mitigation</h2>
    <p style="line-height: 1.6;">
      Despite growth, potential supply chain instability in Q4 is a concern. Mitigation includes secondary vendor onboarding, dynamic safety stock levels, and automated alerts on logistics delays.
    </p>

    <!-- Conclusion -->
    <h2 style="border-bottom: 2px solid #ddd; padding-bottom: 8px; margin-top: 40px; color: #1b1f23;">6. Conclusion</h2>
    <p style="line-height: 1.6;">
      Q3 2025 showcased continued upward momentum and operational maturity across divisions. Orion Dynamics remains committed to sustainable growth, innovation, and excellence as we head into Q4.
    </p>

    <p style="margin-top: 30px; font-size: 14px;">Prepared by:<br><strong>Sarah Mendoza</strong><br>Head of Strategic Planning</p>

  </div>

</body>
</html>
  `
  };
  