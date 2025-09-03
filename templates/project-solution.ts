export const projectsolution = {
    _id: 'projectsolution',
    name: 'Project Report',
    description: 'Create and edit HTML documents with inline styles',
    category: 'business-communications',
    prompt: 'Create an HTML document with inline styles',
    preview: '📋',
    editor: 'html',
  
    contentHtml: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Project Report - TechFlow Solutions</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; color:#333; background:#fff;">

  <!-- PAGE WRAPPER -->
  <div style="max-width:960px; margin:0 auto;">

    <!-- TOP BRAND STRIP -->
    <div style="background:#2c5a5a; color:#fff; padding:14px 24px; display:flex; justify-content:space-between; align-items:center;">
      <div style="font-weight:700; letter-spacing:.5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
        TechFlow Solutions
      </div>
      <div style="font-size:14px; opacity:.95; white-space:nowrap;">December 2024</div>
    </div>

    <!-- BIG TITLE STRIP (no breaking) -->
    <div style="background:#275b5b; color:#fff; text-align:center; padding:26px 16px;">
      <h1 style="margin:0; font-size:38px; line-height:1.15; letter-spacing:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
        PROJECT REPORT
      </h1>
    </div>

    <!-- INFO BAR (3 columns, responsive, no awkward wrapping) -->
    <div style="background:#4a4a4a; color:#fff; padding:16px 24px; display:flex; flex-wrap:wrap; gap:16px;">
      <!-- Each item gets a flexible third, but won’t break mid-label/value -->
      <div style="flex:1 1 280px; min-width:240px;">
        <div style="font-weight:700; margin:0 0 4px;">Project Name:</div>
        <div style="opacity:.95;">Project Alpha</div>
      </div>
      <div style="flex:1 1 280px; min-width:240px;">
        <div style="font-weight:700; margin:0 0 4px;">Project Manager:</div>
        <div style="opacity:.95;">Maria Rodriguez</div>
      </div>
      <div style="flex:1 1 180px; min-width:200px; text-align:right;">
        <div style="font-weight:700; margin:0 0 4px;">Complete Date:</div>
        <div style="opacity:.95;">15/12/24</div>
      </div>
    </div>

    <!-- CONTENT WRAPPER -->
    <div style="padding:28px 24px 60px 24px;">

      <!-- SECTION: Objective -->
      <h2 style="margin:22px 0 10px; font-size:22px; color:#1a3b5c; letter-spacing:.5px;">PROJECT OBJECTIVE:</h2>
      <p style="margin:0 0 16px; line-height:1.7; font-size:14px;">
        Create a comprehensive digital transformation platform to streamline workflow processes and enhance team
        collaboration efficiency.
      </p>

      <div style="height:1px; background:#e5e7eb; margin:22px 0;"></div>

      <!-- SECTION: Scope & Key Activities -->
      <h2 style="margin:22px 0 10px; font-size:22px; color:#1a3b5c; letter-spacing:.5px;">SCOPE &amp; KEY ACTIVITIES:</h2>

      <div style="display:flex; flex-wrap:wrap; gap:20px; align-items:flex-start; margin-top:8px;">
        <div style="flex:0 0 320px; width:320px; max-width:100%; height:200px; border-radius:6px; overflow:hidden; background:#ddd;">
          <img src="https://cdn.pixabay.com/photo/2020/07/11/22/57/meeting-5395567_1280.jpg"
               alt="Business collaboration meeting"
               style="width:100%; height:100%; object-fit:cover; display:block;">
        </div>

        <div style="flex:1 1 320px; min-width:280px;">
          <ul style="margin:0; padding-left:18px; line-height:1.7; font-size:14px;">
            <li style="margin:6px 0;">Market analysis and user research</li>
            <li style="margin:6px 0;">Platform architecture design</li>
            <li style="margin:6px 0;">Development and integration phases</li>
            <li style="margin:6px 0;">Quality assurance and testing</li>
            <li style="margin:6px 0;">User training and system deployment</li>
          </ul>
        </div>
      </div>

      <div style="height:1px; background:#e5e7eb; margin:22px 0;"></div>

      <!-- SECTION: Achievements -->
      <h2 style="margin:22px 0 10px; font-size:22px; color:#1a3b5c; letter-spacing:.5px;">ACHIEVEMENTS TO DATE</h2>
      <ul style="margin:0; padding-left:18px; line-height:1.7; font-size:14px;">
        <li style="margin:6px 0;">Strategic roadmap finalized with milestones, resources, and timelines aligned to objectives.</li>
        <li style="margin:6px 0;">Core platform features developed including UI components, backend, and integrations.</li>
        <li style="margin:6px 0;">Stakeholder approval secured through reviews and collaborative sessions.</li>
        <li style="margin:6px 0;">Beta testing for phase 1 completed, confirming stability and readiness.</li>
      </ul>

      <div style="height:1px; background:#e5e7eb; margin:22px 0;"></div>

      <!-- SECTION: Constraints & Solutions -->
      <h2 style="margin:22px 0 10px; font-size:22px; color:#1a3b5c; letter-spacing:.5px;">CONSTRAINTS &amp; SOLUTIONS</h2>
      <div style="display:flex; flex-wrap:wrap; gap:16px;">
        <div style="flex:1 1 300px; min-width:260px; border:1px solid #e5e7eb; border-radius:8px; padding:16px; background:#f9fafb;">
          <div style="font-weight:700; color:#1a3b5c; margin:0 0 6px; font-size:14px;">Constraints</div>
          <div style="font-size:14px;">Resource allocation challenges affecting timeline milestones.</div>
        </div>
        <div style="flex:1 1 300px; min-width:260px; border:1px solid #e5e7eb; border-radius:8px; padding:16px; background:#f5f9ff;">
          <div style="font-weight:700; color:#1a3b5c; margin:0 0 6px; font-size:14px;">Solutions</div>
          <div style="font-size:14px;">Enhanced coordination and added staffing for critical paths.</div>
        </div>
      </div>

    </div>
  </div>
</body>
</html>

  `
  };
  