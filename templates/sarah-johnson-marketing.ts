export const sarahJohnsonMarketingResumeTemplate = {
    _id: 'sarah-johnson-marketing-resume',
    name: 'Sarah Johnson Marketing',
    description: 'Create and edit HTML documents with inline styles',
    category: 'job-applications',
    prompt: 'Create an HTML document with inline styles',
    preview: '📋',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Professional Resume</title>
</head>
<body style="margin:0; background:#f5f5f5; color:#333; font-family:Arial, Helvetica, sans-serif;">

  <!-- Page container -->
  <div style="max-width:880px; margin:0 auto; padding:32px 80px; box-sizing:border-box;">

    <!-- Top contact rows -->
    <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:14px; color:#666;">
      <span>@PROFESSIONALSITE</span>
      <span>PHONE</span>
      <span>ADDRESS</span>
    </div>

    <div style="display:flex; justify-content:space-between; margin-bottom:30px; font-size:14px; color:#666;">
      <span>[SARAH JOHNSON]</span>
      <span>[+1 555-123-4567]</span>
      <span>[456 PROFESSIONAL AVE, CITY, ST]</span>
    </div>

    <!-- Two-column main content -->
    <div style="
      display:grid;
      grid-template-columns:2fr 1fr;
      gap:40px;
      margin-bottom:30px;
      background:#fff;
      border:1px solid #e5e7eb;
      border-radius:12px;
      box-shadow:0 8px 24px rgba(0,0,0,.06);
      padding:24px;
    ">

      <!-- Left column -->
      <div>
        <!-- Header / Title -->
        <div style="margin-bottom:30px;">
          <h1 style="margin:0; font-size:64px; font-weight:700; color:#333; line-height:1; letter-spacing:-2px;">RESUME</h1>
          <p style="margin:5px 0 0 0; font-size:16px; color:#666;">[MARKETING DIRECTOR]</p>
          <p style="margin:0; font-size:16px; color:#666;">[SARAH JOHNSON]</p>
        </div>

        <!-- Summary -->
        <div style="font-size:14px; line-height:1.5; color:#333; margin-bottom:30px; text-align:justify;">
          Accomplished marketing professional with over 8 years of experience in developing and executing comprehensive
          marketing strategies. Proven track record of increasing brand awareness, driving customer engagement, and
          delivering measurable results. Expert in digital marketing, content creation, and cross-functional team
          leadership. Passionate about leveraging data-driven insights to optimize marketing performance and achieve
          business objectives.
        </div>

        <!-- Work Experience -->
        <h2 style="font-size:20px; font-weight:700; color:#333; margin:30px 0 15px; text-transform:uppercase; letter-spacing:1px;">
          Work Experience
        </h2>

        <!-- Job 1 -->
        <div style="margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:5px;">
            <div>
              <div style="font-weight:700; font-size:16px; color:#333;">INNOVATE MARKETING CO.</div>
              <div style="font-size:14px; color:#666; font-style:italic;">→ Marketing Director</div>
            </div>
            <div style="font-size:14px; color:#666;">2021–2023</div>
          </div>
          <div style="font-size:14px; color:#333; line-height:1.4; margin-top:5px;">
            Led comprehensive marketing strategy development and execution for B2B technology clients, resulting in 45%
            increase in lead generation and 30% improvement in conversion rates.
          </div>
        </div>

        <!-- Job 2 -->
        <div style="margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:5px;">
            <div>
              <div style="font-weight:700; font-size:16px; color:#333;">CREATIVE SOLUTIONS LLC</div>
              <div style="font-size:14px; color:#666; font-style:italic;">→ Senior Marketing Manager</div>
            </div>
            <div style="font-size:14px; color:#666;">2019–2021</div>
          </div>
          <div style="font-size:14px; color:#333; line-height:1.4; margin-top:5px;">
            Managed multi-channel marketing campaigns and collaborated with cross-functional teams to deliver integrated
            marketing solutions for diverse client portfolio.
          </div>
        </div>

        <!-- Job 3 -->
        <div style="margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:5px;">
            <div>
              <div style="font-weight:700; font-size:16px; color:#333;">BRAND BUILDERS AGENCY</div>
              <div style="font-size:14px; color:#666; font-style:italic;">→ Marketing Specialist</div>
            </div>
            <div style="font-size:14px; color:#666;">2017–2019</div>
          </div>
          <div style="font-size:14px; color:#333; line-height:1.4; margin-top:5px;">
            Developed and executed digital marketing strategies, managed social media presence, and created content for
            various marketing channels and campaigns.
          </div>
        </div>

        <!-- Languages -->
        <h2 style="font-size:20px; font-weight:700; color:#333; margin:30px 0 15px; text-transform:uppercase; letter-spacing:1px;">
          Languages
        </h2>

        <!-- Language row -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-size:14px; color:#333;">English</span>
          <div style="display:flex; gap:3px;">
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-size:14px; color:#333;">Spanish</span>
          <div style="display:flex; gap:3px;">
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#ddd; border:1px solid #ccc;"></div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-size:14px; color:#333;">French</span>
          <div style="display:flex; gap:3px;">
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#333;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#ddd; border:1px solid #ccc;"></div>
            <div style="width:8px; height:8px; border-radius:50%; background:#ddd; border:1px solid #ccc;"></div>
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div>
        <!-- Photo -->
        <div style="width:220px; height:280px; border:1px solid #ccc; overflow:hidden; margin-left:auto; margin-top:20px; border-radius:4px;">
          <img src="https://page1.genspark.site/v1/base64_upload/1d2851f8bd9ad8c724a93d973881773b"
               alt="Professional headshot of Sarah Johnson"
               style="width:100%; height:100%; object-fit:cover; object-position:center; display:block;"/>
        </div>

        <!-- Education -->
        <h2 style="font-size:20px; font-weight:700; color:#333; margin:30px 0 15px; text-transform:uppercase; letter-spacing:1px;">
          Education
        </h2>

        <div style="margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:5px;">
            <div>
              <div style="font-weight:700; font-size:16px; color:#333;">BUSINESS UNIVERSITY</div>
              <div style="font-size:14px; color:#666; font-style:italic;">→ Master of Business Administration</div>
            </div>
            <div style="font-size:14px; color:#666; text-align:right;">JUNE 2015<br/>JULY 2017</div>
          </div>
        </div>

        <div style="margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:5px;">
            <div>
              <div style="font-weight:700; font-size:16px; color:#333;">STATE UNIVERSITY</div>
              <div style="font-size:14px; color:#666; font-style:italic;">→ Bachelor of Marketing</div>
            </div>
            <div style="font-size:14px; color:#666; text-align:right;">JUNE 2011<br/>JULY 2015</div>
          </div>
        </div>

        <!-- Skills -->
        <h2 style="font-size:20px; font-weight:700; color:#333; margin:30px 0 15px; text-transform:uppercase; letter-spacing:1px;">
          Skills
        </h2>

        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:10px;">
          <span style="background:#333; color:#fff; padding:6px 12px; border-radius:20px; font-size:12px;">Digital Marketing</span>
          <span style="background:#ccc; color:#333; padding:6px 12px; border-radius:20px; font-size:12px;">SEO/SEM</span>
          <span style="background:#ccc; color:#333; padding:6px 12px; border-radius:20px; font-size:12px;">Content Strategy</span>
          <span style="background:#333; color:#fff; padding:6px 12px; border-radius:20px; font-size:12px;">Social Media</span>
          <span style="background:#ccc; color:#333; padding:6px 12px; border-radius:20px; font-size:12px;">Analytics</span>
          <span style="background:#333; color:#fff; padding:6px 12px; border-radius:20px; font-size:12px;">Brand Management</span>
          <span style="background:#ccc; color:#333; padding:6px 12px; border-radius:20px; font-size:12px;">Project Management</span>
        </div>

        <!-- Reference -->
        <h2 style="font-size:20px; font-weight:700; color:#333; margin:30px 0 15px; text-transform:uppercase; letter-spacing:1px;">
          Reference
        </h2>

        <div style="margin-bottom:15px;">
          <div style="font-weight:700; font-size:14px; color:#333;">MICHAEL RODRIGUEZ</div>
          <div style="font-size:12px; color:#666; font-style:italic;">→ CEO | Innovate Marketing Co.</div>
          <div style="font-size:12px; color:#666;">[email protected]</div>
          <div style="font-size:12px; color:#666;">→ +1 555-987-6543</div>
        </div>
      </div>
    </div>

    <!-- Footer name -->
    <div style="font-size:56px; font-weight:700; color:#333; text-align:center; margin:40px 0 20px; letter-spacing:2px; text-transform:uppercase;">
      SARAH JOHNSON
    </div>
  </div>
</body>
</html>
  `
  };
  