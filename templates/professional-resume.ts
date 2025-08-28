export const professionalResumeTemplate = {
    _id: 'professional-resume',
    name: 'Professional Resume',
    description: 'Create and edit HTML documents with inline styles',
    category: 'job-applications',
    prompt: 'Create an HTML document with inline styles',
    preview: '📄',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Professional Resume</title>
</head>
<body style="margin: 0; font-family: 'Segoe UI', sans-serif; background: #f4f6f8; color: #333;">

  <div style="max-width: 960px; margin: 40px auto; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.08); display: flex;">

    <!-- Sidebar -->
    <div style="background: #1a237e; color: white; width: 35%; padding: 40px;">
      <h1 style="font-size: 28px; margin-bottom: 10px;">Jane Doe</h1>
      <p style="font-size: 16px; margin-bottom: 30px;">Marketing Specialist</p>

      <h3 style="border-bottom: 1px solid #4b5bea; padding-bottom: 8px;">Contact</h3>
      <p>Email: jane.doe@email.com</p>
      <p>Phone: +1 (555) 123-4567</p>
      <p>Location: New York, USA</p>
      <p>LinkedIn: linkedin.com/in/janedoe</p>

      <h3 style="margin-top: 30px; border-bottom: 1px solid #4b5bea; padding-bottom: 8px;">Skills</h3>
      <ul style="list-style: none; padding-left: 0; line-height: 1.8;">
        <li>✔ Digital Marketing</li>
        <li>✔ SEO / SEM</li>
        <li>✔ Google Analytics</li>
        <li>✔ Social Media Strategy</li>
        <li>✔ Adobe Creative Suite</li>
      </ul>

      <h3 style="margin-top: 30px; border-bottom: 1px solid #4b5bea; padding-bottom: 8px;">Education</h3>
      <p><strong>B.Sc. Marketing</strong><br>NYU, 2016–2020</p>
    </div>

    <!-- Main Content -->
    <div style="width: 65%; padding: 40px;">
      <h2 style="color: #1a237e;">Profile</h2>
      <p>
        Results-driven marketing specialist with over 4 years of experience in developing and executing campaigns across digital platforms. Proven ability to increase web traffic and customer engagement. Adept at data analysis, branding, and content strategy.
      </p>

      <h2 style="color: #1a237e; margin-top: 30px;">Experience</h2>

      <div style="margin-bottom: 20px;">
        <h3 style="margin-bottom: 4px;">Senior Marketing Analyst <span style="color: #555;">| BrightWave Media</span></h3>
        <p style="font-size: 14px; color: #777;">2022 – Present</p>
        <ul style="padding-left: 20px; line-height: 1.7;">
          <li>Led performance marketing strategy resulting in 40% increase in leads YoY.</li>
          <li>Managed a $100k quarterly ad budget across Google and Meta platforms.</li>
          <li>Created data dashboards to track KPIs for 12+ campaigns.</li>
        </ul>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="margin-bottom: 4px;">Digital Marketing Coordinator <span style="color: #555;">| Acme Corp</span></h3>
        <p style="font-size: 14px; color: #777;">2020 – 2022</p>
        <ul style="padding-left: 20px; line-height: 1.7;">
          <li>Grew Instagram engagement by 120% and email list by 35% in 8 months.</li>
          <li>Executed product launch campaigns that increased Q1 revenue by $150k.</li>
        </ul>
      </div>

      <h2 style="color: #1a237e; margin-top: 30px;">Certifications</h2>
      <ul style="padding-left: 20px; line-height: 1.8;">
        <li>Google Ads Certified (2023)</li>
        <li>HubSpot Inbound Marketing (2022)</li>
      </ul>
    </div>

  </div>

</body>
</html>
  `
  };
  