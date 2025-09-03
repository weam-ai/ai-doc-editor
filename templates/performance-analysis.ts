export const performanceanalysis = {
    _id: 'performance-analysis',
    name: 'Perfromance Analysis',
    description: 'Create and edit HTML documents with inline styles',
    category: 'reports-analysis',
    prompt: 'Create an HTML document with inline styles',
    preview: '📈',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Performance Analysis Report</title>
</head>
<body style="max-width:880px; margin:0 auto; padding:32px 80px; box-sizing:border-box; background:#fff; color:#333; font-family:Arial, Helvetica, sans-serif; line-height:1.55;">

  <!-- HEADER -->
  <header style="display:flex; justify-content:space-between; align-items:center; margin:0 0 28px 0; padding:0 0 18px 0; border-bottom:3px solid #ffd700;">
    <div style="display:flex; align-items:center; gap:12px;">
      <div style="font-size:18px; font-weight:700; letter-spacing:1px; color:#333;">[COMPANY NAME]</div>
    </div>
    <div style="font-size:14px; color:#666;">December 2024</div>
  </header>

  <!-- MAIN -->
  <main style="position:relative; margin:38px 0 0 0;">

    <!-- IMAGE + TITLE BANNER -->
    <section style="position:relative; margin:0 0 24px 0; min-height:260px;">
      <img
        src="https://page1.genspark.site/v1/base64_upload/50285f390cba9849c94a486c45ce7aa2"
        alt="Professional Business Meeting"
        style="display:block; width:70%; height:267px; object-fit:cover; margin:0 0 0 auto; border-radius:2px;"
      />

      <!-- Gold banner over the image -->
      <div style="position:absolute; left:0; top:40px; background:#ffd700; padding:18px 26px; max-width:320px; box-shadow:0 4px 10px rgba(0,0,0,0.08);">
        <h1 style="margin:0; font-size:32px; line-height:1.2; font-weight:800; color:#000;">PERFORMANCE<br>ANALYSIS</h1>
      </div>
    </section>

    <!-- SUBTITLE / SUMMARY -->
    <section style="background:#fff; padding:16px 26px; border-left:4px solid #ffd700; margin:6px 0 0 0;">
      <h2 style="margin:0 0 12px 0; font-size:20px; font-weight:700; color:#333;">Executive Summary</h2>

      <p style="margin:0 0 12px 0; font-size:14px; color:#444; text-align:justify;">
        Our comprehensive performance analysis reveals significant operational improvements across key business metrics
        during the assessment period. Strategic initiatives implemented over the past quarter have demonstrated
        measurable impact on organizational efficiency and market positioning.
      </p>

      <p style="margin:0 0 12px 0; font-size:14px; color:#444; text-align:justify;">
        The evaluation encompasses financial performance indicators, operational benchmarks, and strategic milestone
        achievements. Data-driven insights highlight areas of exceptional growth while identifying opportunities for
        continued optimization and market expansion.
      </p>

      <p style="margin:0 0 12px 0; font-size:14px; color:#444; text-align:justify;">
        Recommendation frameworks focus on sustainable growth strategies, resource allocation optimization, and
        competitive advantage enhancement. Implementation timelines and success metrics have been established to ensure
        measurable progress toward organizational objectives.
      </p>

      <p style="margin:0; font-size:14px; color:#444; text-align:justify;">
        This analysis provides actionable intelligence for executive decision-making and strategic planning initiatives.
        Detailed findings support evidence-based recommendations for continued market leadership and operational
        excellence.
      </p>
    </section>
  </main>

  <!-- FOOTER -->
  <footer style="margin:46px 0 0 0; padding:22px 0 0 0; border-top:2px solid #f0f0f0; position:relative;">
    <div style="position:absolute; right:0; top:0; width:60px; height:60px; background:#ffd700;"></div>

    <div style="font-size:16px; font-weight:600; color:#333; margin:0 0 12px 0;">Prepared for:</div>

    <div style="display:flex; flex-wrap:wrap; gap:22px; align-items:center; font-size:12px; color:#666;">
      <span><strong>[CLIENT NAME]</strong></span>
      <span>client@email.com</span>
      <span>www.clientwebsite.com</span>
      <span>+123-456-7890</span>
    </div>

    <div style="margin-top:12px; font-size:11px; color:#888;">
      Report Reference: PA-2024-001&nbsp; | &nbsp;Date: [CURRENT DATE]&nbsp; | &nbsp;Confidential Business Analysis
    </div>
  </footer>

</body>
</html>

  `
  };
  