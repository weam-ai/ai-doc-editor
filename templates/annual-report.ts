export const annualreport = {
    _id: 'annual-report',
    name: 'Annual Report',
    description: 'Create and edit HTML documents with inline styles',
    category: 'reports-analysis',
    prompt: 'Create an HTML document with inline styles',
    preview: '📈',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>2035 Annual Report - INNOVARCH GROUP</title>
</head>
<body style="margin:0; padding:0; font-family:Georgia, serif; background-color:#ffffff;
             background-image:
               linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)),
               url('https://partner.gira.de/abbildungen/g-pulse-open-workspace-monovolume_26851_1658209017.jpg');
             background-size:cover; background-position:center; background-attachment:fixed;">

  <!-- COVER -->
  <div style="position:relative; width:100%; height:100vh; min-height:800px; overflow:hidden;">

    <!-- Top image band -->
    <div style="position:relative; width:100%; height:calc(50vh - 75px);
                background-image:url('https://blog.architizer.com/wp-content/uploads/Feature-Image-2-1.jpg');
                background-size:cover; background-position:center; background-repeat:no-repeat;">
      <!-- Diagonal accent -->
      <div style="position:absolute; top:0; right:0; width:200px; height:200px; background:#000;
                  clip-path:polygon(100% 0, 100% 100%, 0 0);"></div>
    </div>

    <!-- Separator line -->
    <div style="position:absolute; top:calc(50vh - 75px); left:0; width:100%; height:2px; background:#e0e0e0;"></div>

    <!-- Bottom white panel -->
    <div style="position:absolute; bottom:0; left:0; right:0; height:calc(50vh + 75px); background:#fff;
                display:flex; flex-direction:column; justify-content:center; align-items:center;
                padding:60px 40px; box-sizing:border-box;">

      <!-- Logo + company -->
      <div style="display:flex; align-items:center; margin-bottom:40px;">
        <div style="width:40px; height:40px; margin-right:15px; background:#2d5a5a;
                    clip-path:polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);"></div>
        <div style="font-size:14px; font-weight:bold; letter-spacing:1px; color:#333; text-transform:uppercase;">
          INNOVARCH GROUP
        </div>
      </div>

      <!-- Title -->
      <h1 style="margin:0 0 50px; font-size:48px; font-weight:bold; color:#000; text-align:center; line-height:1.2;">
        2035 Annual<br>Report
      </h1>

      <!-- Credits -->
      <div style="display:flex; justify-content:space-between; width:100%; max-width:500px;">
        <div style="flex:1; text-align:left;">
          <div style="font-style:italic; font-size:14px; color:#666; margin-bottom:8px;">Prepared by</div>
          <div style="font-size:14px; color:#333; line-height:1.4;">Alex Rivera<br>Dana Zhang</div>
        </div>
        <div style="flex:1; text-align:right;">
          <div style="font-style:italic; font-size:14px; color:#666; margin-bottom:8px;">Presented by</div>
          <div style="font-size:14px; color:#333; line-height:1.4;">Melani Brooks<br>Keisuke Yamato</div>
        </div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div style="width:100%; height:150px; display:flex; align-items:center; justify-content:center; margin-top:0;
              background-image:
                linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
                url('https://www.shutterstock.com/shutterstock/photos/1929364490/display_1500/stock-vector-black-abstract-background-design-modern-wavy-line-pattern-guilloche-curves-in-monochrome-colors-1929364490.jpg');
              background-size:cover; background-position:center top; background-repeat:no-repeat;">
    <div style="color:#fff; font-size:12px; text-align:center; opacity:0.9;
                text-shadow:1px 1px 2px rgba(0,0,0,0.5);">
      INNOVARCH GROUP • Architectural Excellence • 2035
    </div>
  </div>

</body>
</html>

  `
  };
  