export const q2BusinessReportTemplate = {
    _id: 'q2-business-report',
    name: 'Q2 Business KPI Report',
    description: 'Create and edit HTML documents with inline styles',
    category: 'reports-analysis',
    prompt: 'Create an HTML document with inline styles',
    preview: '📈',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Q2 Business KPI Report</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f3f5f8; margin: 0; padding: 40px; color: #333;">

  <div style="max-width: 1000px; margin: auto; background: white; padding: 50px; box-shadow: 0 0 10px rgba(0,0,0,0.08);">
    <h1 style="text-align: center; color: #003366; margin-bottom: 15px;">Q2 KPI Performance Report</h1>
    <p style="text-align: center;">Company: Catalyst Dynamics | Period: April–June 2025</p>

    <h2 style="color: #003366; margin-top: 15px;">1. Revenue & Profit Snapshot</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr style="background-color: #003366; color: #fff;">
        <th style="padding: 10px;">Metric</th>
        <th style="padding: 10px;">Q1</th>
        <th style="padding: 10px;">Q2</th>
        <th style="padding: 10px;">% Change</th>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 10px;">Revenue</td>
        <td style="padding: 10px;">$18.2M</td>
        <td style="padding: 10px;">$21.7M</td>
        <td style="padding: 10px; color: green;">+19.2%</td>
      </tr>
      <tr>
        <td style="padding: 10px;">Gross Margin</td>
        <td style="padding: 10px;">64%</td>
        <td style="padding: 10px;">68%</td>
        <td style="padding: 10px; color: green;">+4%</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 10px;">Net Income</td>
        <td style="padding: 10px;">$3.8M</td>
        <td style="padding: 10px;">$5.2M</td>
        <td style="padding: 10px; color: green;">+37%</td>
      </tr>
    </table>

    <h2 style="color: #003366; margin: 15px 0;">2. Customer Metrics</h2>
    <ul style="line-height: 1.8;">
      <li>Customer Retention: 92%</li>
      <li>New Customer Growth: +15%</li>
      <li>NPS Score: 64 (↑ from 58)</li>
    </ul>

    <h2 style="color: #003366; margin: 15px 0;">3. Operational KPIs</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr style="background: #e0e0e0;">
        <th style="padding: 10px;">Department</th>
        <th style="padding: 10px;">KPI</th>
        <th style="padding: 10px;">Status</th>
      </tr>
      <tr>
        <td style="padding: 10px;">Support</td>
        <td style="padding: 10px;">Avg. Response Time: 6 min</td>
        <td style="padding: 10px; color: green;">On Track</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 10px;">Engineering</td>
        <td style="padding: 10px;">Sprint Velocity: 92 pts</td>
        <td style="padding: 10px; color: green;">Ahead</td>
      </tr>
      <tr>
        <td style="padding: 10px;">Sales</td>
        <td style="padding: 10px;">Lead-to-close: 17%</td>
        <td style="padding: 10px; color: orange;">Watch</td>
      </tr>
    </table>

    <h2 style="color: #003366; margin: 15px 0;">4. Notable Wins</h2>
    <ul>
      <li>Closed 3 enterprise deals in healthcare sector</li>
      <li>Reduced churn to under 4%</li>
      <li>APAC team opened new regional office in Singapore</li>
    </ul>

    <h2 style="color: #003366; margin: 15px 0;">5. Priorities for Q3</h2>
    <ol>
      <li>Expand AI product beta rollout</li>
      <li>Launch marketing campaign for SMB tier</li>
      <li>Hire 8 engineers and 2 PMs in R&D</li>
    </ol>

    <hr style="margin-top: 50px; border: none; border-top: 2px solid #ddd;">
    <p style="text-align: center; color: #888;">Prepared by: Strategy & Performance Team</p>
  </div>

</body>
</html>
  `
  };
  