export const digitalConference2024Template = {
    _id: 'digital-conference-2024',
    name: 'Digital Conference 2024',
    description: 'Create and edit HTML documents with inline styles',
    category: 'business-communications',
    prompt: 'Create an HTML document with inline styles',
    preview: '📋',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Digital Conference 2024</title>
</head>
<body style="margin:0; padding:0; box-sizing:border-box; color:#333;
             background:
               linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3)),
               url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23888%22/%3E%3C/svg%3E');
             background-size:cover; background-position:center;
             font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
  <!-- page frame -->
  <div style="max-width:880px; margin:0 auto; padding:32px 80px;">
    <!-- two-column shell -->
    <div style="display:flex; min-height:800px; background:#fff;">
      <!-- left sidebar -->
      <div style="width:35%; background:#c8a882; padding:40px 30px; display:flex; flex-direction:column; gap:30px;">
        <div>
          <div style="font-weight:700; font-size:36px; color:#2c3e50; line-height:1.2; margin:0 0 5px;">
            Digital<br>Conference
          </div>
          <div style="font-weight:700; font-size:48px; color:#2c3e50; margin:0;">2024</div>
        </div>
        <div style="font-size:16px; color:#2c3e50; line-height:1.6;">
          <div><strong>2:00–10:00 pm</strong></div>
          <div><strong>1st December,<br>2023</strong></div>
          <h3 style="margin:20px 0 10px; font-size:18px; font-weight:600;">Location</h3>
          <div>123 Anywhere St.,<br>Any City,<br>ST 12345</div>
          <h3 style="margin:20px 0 10px; font-size:18px; font-weight:600;">Contact</h3>
          <div>
            123-456-7890<br>
            <span>[email&nbsp;protected]</span><br>
            reallygreatsite.com
          </div>
        </div>
      </div>
      <!-- right main -->
      <div style="width:65%;
                  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3)), #888;
                  background-size:cover; background-position:center;
                  position:relative; padding:40px; display:flex; flex-direction:column;">
        <!-- headline -->
        <div>
          <h1 style="margin:0 0 10px; font-weight:900; font-size:42px; color:#fff; letter-spacing:3px; line-height:1.1;">
            TALK<br>ABOUT<br>BUSINESS
          </h1>
          <div style="margin:0 0 40px; font-weight:500; font-size:18px; color:#fff; letter-spacing:2px;">
            INSIGHTFUL DISCUSSION
          </div>
        </div>
        <!-- speakers -->
        <div style="margin:0 0 40px;">
          <h2 style="margin:0 0 20px; font-size:28px; color:#fff; font-weight:700;">Our speaker</h2>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
            <!-- speaker card -->
            <div style="display:flex; align-items:center; gap:15px;">
              <div style="position:relative; width:60px; height:60px; border-radius:50%; overflow:hidden;">
                <img src="https://thumbs.dreamstime.com/b/confident-happy-african-american-business-coach-corporate-leader-posing-diverse-team-background-smiling-black-ceo-manager-146302498.jpg"
                     alt="Chad Gibbons"
                     style="width:100%; height:100%; object-fit:cover; display:block; border-radius:50%;"/>
                <div style="position:absolute; bottom:-5px; right:-5px; width:20px; height:20px; border-radius:50%;
                            display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; background:#4caf50;">
                  :microphone:
                </div>
              </div>
              <div style="color:#fff;">
                <div style="font-weight:700; font-size:14px; margin:0 0 2px;">CHAD GIBBONS</div>
                <div style="font-size:12px; opacity:.9; line-height:1.3;">CEO &amp; Founder of<br>Lierne &amp; Co.</div>
              </div>
            </div>
            <!-- speaker card -->
            <div style="display:flex; align-items:center; gap:15px;">
              <div style="position:relative; width:60px; height:60px; border-radius:50%; overflow:hidden;">
                <img src="https://www.shutterstock.com/image-photo/happy-smiling-bearded-indian-business-600nw-2066562635.jpg"
                     alt="Ketut Susilo"
                     style="width:100%; height:100%; object-fit:cover; display:block; border-radius:50%;"/>
                <div style="position:absolute; bottom:-5px; right:-5px; width:20px; height:20px; border-radius:50%;
                            display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; background:#ff6b35;">
                  :microphone:
                </div>
              </div>
              <div style="color:#fff;">
                <div style="font-weight:700; font-size:14px; margin:0 0 2px;">KETUT SUSILO</div>
                <div style="font-size:12px; opacity:.9; line-height:1.3;">COO &amp; Co-Founder of<br>Areawat Industries</div>
              </div>
            </div>
            <!-- speaker card -->
            <div style="display:flex; align-items:center; gap:15px;">
              <div style="position:relative; width:60px; height:60px; border-radius:50%; overflow:hidden;">
                <img src="https://as2.ftcdn.net/jpg/06/05/01/89/1000_F_605018943_tbCXQysSlbq9bz7CWxKTI4tSGTZ1k1aU.jpg"
                     alt="Shawn Garcia"
                     style="width:100%; height:100%; object-fit:cover; display:block; border-radius:50%;"/>
                <div style="position:absolute; bottom:-5px; right:-5px; width:20px; height:20px; border-radius:50%;
                            display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; background:#ff6b35;">
                  :microphone:
                </div>
              </div>
              <div style="color:#fff;">
                <div style="font-weight:700; font-size:14px; margin:0 0 2px;">SHAWN GARCIA</div>
                <div style="font-size:12px; opacity:.9; line-height:1.3;">CEO &amp; Founder of<br>Salgore &amp; Co.</div>
              </div>
            </div>
            <!-- speaker card -->
            <div style="display:flex; align-items:center; gap:15px;">
              <div style="position:relative; width:60px; height:60px; border-radius:50%; overflow:hidden;">
                <img src="https://amelieclements.com/wp-content/uploads/2021/05/business_woman-portrait_zurich_photographer_corporate_headshot_modern_executive_portrait_Amelie_Clements-portfolio_36-scaled.jpg"
                     alt="Murad Naser"
                     style="width:100%; height:100%; object-fit:cover; display:block; border-radius:50%;"/>
                <div style="position:absolute; bottom:-5px; right:-5px; width:20px; height:20px; border-radius:50%;
                            display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; background:#4caf50;">
                  :microphone:
                </div>
              </div>
              <div style="color:#fff;">
                <div style="font-weight:700; font-size:14px; margin:0 0 2px;">MURAD NASER</div>
                <div style="font-size:12px; opacity:.9; line-height:1.3;">COO &amp; Co-Founder of<br>Salgore &amp; Co.</div>
              </div>
            </div>
          </div>
        </div>
        <!-- about the program -->
        <div style="background-color:rgba(200,168,130,0.9); padding:30px; margin-top:auto; color:#2c3e50;">
          <h3 style="margin:0 0 15px; font-size:24px; font-weight:700;">About the program</h3>
          <p style="margin:0; font-size:14px; line-height:1.6; font-style:italic;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `
  };
  