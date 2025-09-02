export const sarahMitchellResumeTemplate = {
    _id: 'sarah-mitchell-resume',
    name: 'Sarah Mitchell Resume',
    description: 'Create and edit HTML documents with inline styles',
    category: 'job-applications',
    prompt: 'Create an HTML document with inline styles',
    preview: '📋',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sarah Mitchell — Senior Brand Designer</title>
</head>
<body style="margin:0;padding:0;background:#f8f9fa;font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111;">
  <!-- Outer container -->
  <div style="max-width:900px;margin:24px auto;padding:24px;">
    <!-- Card -->
    <div style="background:#fff;border:1px solid #E5E7EB;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.06);padding:32px;">
      <!-- Header -->
      <div style="margin:0 0 8px 0;">
        <h1 style="margin:0;font-size:42px;line-height:1.1;font-weight:800;letter-spacing:.3px;color:#6b9bd6;">
          Sarah Mitchell
        </h1>
        <p style="margin:6px 0 0 0;font-size:18px;font-style:italic;color:#666;">
          Senior Brand Designer
        </p>
      </div>
      <!-- Contact / Skills -->
      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin:16px 0 10px;">
        <div>
          <h4 style="margin:0 0 6px 0;font-size:16px;font-weight:700;color:#6b9bd6;">Phone</h4>
          <p style="margin:0 0 4px 0;font-size:13px;color:#444;">(415) 768-2591</p>
          <p style="margin:0;font-size:13px;color:#444;">(650) 342-7896</p>
        </div>
        <div>
          <h4 style="margin:0 0 6px 0;font-size:16px;font-weight:700;color:#6b9bd6;">Address</h4>
          <p style="margin:0 0 4px 0;font-size:13px;color:#444;">3847 Market Street</p>
          <p style="margin:0;font-size:13px;color:#444;">San Francisco, CA</p>
        </div>
        <div>
          <h4 style="margin:0 0 6px 0;font-size:16px;font-weight:700;color:#6b9bd6;">Skills</h4>
          <p style="margin:0;font-size:13px;color:#444;">
            Brand Strategy, Visual Identity, Creative Direction, Team Leadership, Design Systems, Typography
          </p>
        </div>
      </div>
      <hr style="border:none;height:1px;margin:18px 0;background:linear-gradient(to right,#B8B8B8,#9966CC);" />
      <!-- Two-column layout -->
      <div style="display:grid;grid-template-columns:60% 40%;gap:28px;align-items:start;">
        <!-- Left column -->
        <div>
          <h2 style="margin:0 0 12px 0;font-size:24px;font-weight:700;color:#6b9bd6;">Work Experience</h2>
          <div style="margin:18px 0;">
            <h3 style="margin:0 0 6px 0;font-size:18px;font-weight:700;color:#333;">
              Creative Director <span style="font-size:14px;color:#666;font-style:italic;">(2019 – Present)</span>
            </h3>
            <p style="margin:8px 0 0;font-size:13px;color:#555;text-align:justify;">
              Lead brand development for enterprise clients; manage cross-functional teams of designers and strategists.
              Delivered systemized rebrands improving recognition by ~35% and reducing delivery timelines by ~40%
              through modular design libraries and clear governance.
            </p>
          </div>
          <div style="margin:18px 0;">
            <h3 style="margin:0 0 6px 0;font-size:18px;font-weight:700;color:#333;">
              Senior Brand Designer <span style="font-size:14px;color:#666;font-style:italic;">(2016 – 2019)</span>
            </h3>
            <p style="margin:8px 0 0;font-size:13px;color:#555;text-align:justify;">
              Drove integrated brand campaigns across digital and print; partnered with marketing leadership to
              scale cohesive visual systems. Launched 25+ campaigns that exceeded performance benchmarks by ~28%.
            </p>
          </div>
          <div style="margin:18px 0;">
            <h3 style="margin:0 0 6px 0;font-size:18px;font-weight:700;color:#333;">
              Brand Designer <span style="font-size:14px;color:#666;font-style:italic;">(2013 – 2016)</span>
            </h3>
            <p style="margin:8px 0 0;font-size:13px;color:#555;text-align:justify;">
              Built end-to-end identities for startups and mid-market clients across tech, healthcare, and retail.
              Strengthened client retention by ~50% with consistent, flexible design systems.
            </p>
          </div>
          <h2 style="margin:20px 0 10px;font-size:24px;font-weight:700;color:#6b9bd6;">Awards</h2>
          <ul style="list-style:none;padding:0;margin:10px 0 0;">
            <li style="display:flex;gap:12px;margin:8px 0;font-size:13px;color:#555;">
              <span style="min-width:28px;font-weight:700;color:#6b9bd6;">#1</span>
              <span>Creative Excellence Award — American Design Association (2022)</span>
            </li>
            <li style="display:flex;gap:12px;margin:8px 0;font-size:13px;color:#555;">
              <span style="min-width:28px;font-weight:700;color:#6b9bd6;">#2</span>
              <span>Gold Medal, Visual Identity — International Brand Conference (2021)</span>
            </li>
            <li style="display:flex;gap:12px;margin:8px 0;font-size:13px;color:#555;">
              <span style="min-width:28px;font-weight:700;color:#6b9bd6;">#3</span>
              <span>Best Rebrand, Tech Category — Pacific Design Awards (2020)</span>
            </li>
          </ul>
        </div>
        <!-- Right column -->
        <div>
          <!-- Professional photo from Unsplash -->
          <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=720&q=80"
               alt="Professional headshot"
               style="width:100%;height:180px;object-fit:cover;border-radius:6px;border:2px solid #E5E7EB;margin:0 0 14px;" />
          <div style="font-size:12px;color:#6b9bd6;margin:0 0 16px;">
            <a href="mailto:sarah.mitchell@example.com" style="color:#6b9bd6;text-decoration:none;">sarah.mitchell@example.com</a> •
            <a href="https://www.linkedin.com/" style="color:#6b9bd6;text-decoration:none;" target="_blank" rel="noopener">LinkedIn</a> •
            <a href="https://www.behance.net/" style="color:#6b9bd6;text-decoration:none;" target="_blank" rel="noopener">Behance</a>
          </div>
          <h2 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#6b9bd6;">About</h2>
          <p style="margin:0 0 16px;font-size:13px;color:#555;text-align:justify;line-height:1.6;">
            Brand designer with 10+ years of experience building recognizable identities and scalable systems.
            Passionate about strategy-led design, typography, and collaborative leadership that lifts outcomes
            across product, marketing, and sales.
          </p>
          <h2 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#6b9bd6;">Education</h2>
          <div style="margin:0 0 12px;">
            <span style="display:block;margin:0 0 4px;font-size:16px;font-weight:700;color:#333;">
              BFA, Visual Communication
            </span>
            <span style="font-size:14px;color:#666;font-style:italic;">2010 – 2013</span>
            <p style="margin:6px 0 0;font-size:12px;color:#555;text-align:justify;">
              Concentration in brand identity and design systems; coursework in typography, color, and interactive media.
            </p>
          </div>
          <div style="margin:0 0 12px;">
            <span style="display:block;margin:0 0 4px;font-size:16px;font-weight:700;color:#333;">
              Certificate, Design Leadership
            </span>
            <span style="font-size:14px;color:#666;font-style:italic;">2019</span>
            <p style="margin:6px 0 0;font-size:12px;color:#555;text-align:justify;">
              Executive program focused on scaling creative orgs, stakeholder communication, and decision frameworks.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `
  };
  