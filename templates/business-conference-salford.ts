export const businessConferenceSalfordTemplate = {
    _id: 'business-conference-salford',
    name: 'Business Conference Salford',
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
  <title>2023 Business Conference - Salford & Co.</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; color:#333; background:#fff; width:8.5in; height:11in; overflow:hidden;">

  <!-- Flyer container -->
  <div style="position:relative; width:100%; height:100%;">

    <!-- HERO (top 50%) -->
    <div
      style="
        position:relative; height:50%;
        background:
          linear-gradient(135deg, rgba(30,58,138,0.8) 0%, rgba(59,130,246,0.6) 100%),
          url('https://static.vecteezy.com/system/resources/previews/010/720/376/non_2x/panorama-image-modern-building-in-business-district-at-bangkok-city-thailand-free-photo.jpg');
        background-size:cover; background-position:center; background-repeat:no-repeat;
        display:flex; align-items:center; justify-content:center; text-align:center; color:#fff;">
      <div style="position:relative; z-index:2; padding:10px;">
        <div style="font-size:14px; font-weight:600; margin:0 0 16px; color:#dbeafe;">Salford &amp; Co. Business Talk</div>

        <h1 style="margin:0 0 6px; font-size:48px; font-weight:800; letter-spacing:1px; color:#fff;">2025</h1>
        <h1 style="margin:0 0 14px; font-size:40px; font-weight:800; letter-spacing:1px; color:#fff;">BUSINESS CONFERENCE</h1>

        <div style="font-size:18px; font-weight:700; color:#dbeafe; margin:0 0 6px;">Sunday, 25 December 2025</div>
        <div style="font-size:18px; font-weight:700; color:#dbeafe; margin:0 0 20px;">From 08:00PM to 12:00PM</div>

        <a href="#"
           style="display:inline-block; background:#3b82f6; color:#fff; padding:12px 30px; border-radius:8px; font-size:18px; font-weight:700; text-decoration:none; cursor:pointer;">
          JOIN NOW
        </a>
      </div>
    </div>

    <!-- CONTENT (bottom 50%) -->
    <div
      style="
        position:relative; height:50%; background:#1e3a8a; padding:30px;
        display:grid; grid-template-columns:1fr 1fr; gap:30px; align-items:start;">

      <!-- LEFT: Discussion & Insight -->
      <div style="color:#fff;">
        <h2 style="margin:0 0 18px; font-size:22px; font-weight:800; color:#fff;">DISCUSSION &amp; INSIGHT</h2>

        <!-- Item -->
        <div style="display:flex; align-items:flex-start; gap:15px; margin:0 0 18px;">
          <div
            style="width:50px; height:50px; border-radius:50%; background:#2563eb; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:22px; color:#fff;">
            :chart_with_upwards_trend:
          </div>
          <div>
            <h3 style="margin:0 0 6px; font-size:16px; font-weight:700; color:#fff;">Marketing Strategy</h3>
            <p style="margin:0; font-size:12px; color:#dbeafe; line-height:1.4;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices sem etelend, sollicitudin
              ligula eget, ultrices nunc. Phasellus dapibus eros auctor magna mollis.
            </p>
          </div>
        </div>

        <!-- Item -->
        <div style="display:flex; align-items:flex-start; gap:15px; margin:0 0 18px;">
          <div
            style="width:50px; height:50px; border-radius:50%; background:#2563eb; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:22px; color:#fff;">
            :rocket:
          </div>
          <div>
            <h3 style="margin:0 0 6px; font-size:16px; font-weight:700; color:#fff;">Tech Startup</h3>
            <p style="margin:0; font-size:12px; color:#dbeafe; line-height:1.4;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices sem etelend, sollicitudin
              ligula eget, ultrices nunc. Phasellus dapibus eros auctor magna mollis.
            </p>
          </div>
        </div>

        <!-- Item -->
        <div style="display:flex; align-items:flex-start; gap:15px;">
          <div
            style="width:50px; height:50px; border-radius:50%; background:#2563eb; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:22px; color:#fff;">
            :umbrella:
          </div>
          <div>
            <h3 style="margin:0 0 6px; font-size:16px; font-weight:700; color:#fff;">Risk Management</h3>
            <p style="margin:0; font-size:12px; color:#dbeafe; line-height:1.4;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices sem etelend, sollicitudin
              ligula eget, ultrices nunc.
            </p>
          </div>
        </div>
      </div>

      <!-- RIGHT: Speakers + Invite -->
      <div style="color:#fff;">
        <h2 style="margin:0 0 18px; font-size:22px; font-weight:800; color:#fff;">EXCLUSIVE SPEAKER</h2>

        <!-- Speaker -->
        <div style="display:flex; align-items:center; gap:15px; margin:0 0 16px;">
          <div style="width:60px; height:60px; border-radius:50%; overflow:hidden; border:3px solid #3b82f6; flex-shrink:0;">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80"
              alt="François Mercer"
              style="width:100%; height:100%; object-fit:cover; object-position:center; display:block; border-radius:50%;"/>
          </div>
          <div>
            <div style="margin:0 0 2px; font-size:14px; font-weight:700; color:#fff;">François Mercer</div>
            <div style="font-size:11px; color:#dbeafe;">CEO &amp; Founder Liceria &amp; Co.</div>
          </div>
        </div>

        <!-- Speaker -->
        <div style="display:flex; align-items:center; gap:15px; margin:0 0 16px;">
          <div style="width:60px; height:60px; border-radius:50%; overflow:hidden; border:3px solid #3b82f6; flex-shrink:0;">
            <img
              src="https://amelieclements.com/wp-content/uploads/2021/05/business_woman-portrait_zurich_photographer_corporate_headshot_modern_executive_portrait_Amelie_Clements-portfolio_36-scaled.jpg"
              alt="Phyllis Schwaiger"
              style="width:100%; height:100%; object-fit:cover; object-position:center; display:block; border-radius:50%;"/>
          </div>
          <div>
            <div style="margin:0 0 2px; font-size:14px; font-weight:700; color:#fff;">Phyllis Schwaiger</div>
            <div style="font-size:11px; color:#dbeafe;">CEO &amp; Founder Salford &amp; Co.</div>
          </div>
        </div>

        <!-- Speaker -->
        <div style="display:flex; align-items:center; gap:15px; margin:0 0 20px;">
          <div style="width:60px; height:60px; border-radius:50%; overflow:hidden; border:3px solid #3b82f6; flex-shrink:0;">
            <img
              src="https://orlandosydney.com/wp-content/uploads/2023/05/Female-Professional-Headshot.-LinkedIn-Business-Profile.-By-Orlandosydney.com-202300752.jpg"
              alt="Brigitte Schwartz"
              style="width:100%; height:100%; object-fit:cover; object-position:center; display:block; border-radius:50%;"/>
          </div>
          <div>
            <div style="margin:0 0 2px; font-size:14px; font-weight:700; color:#fff;">Brigitte Schwartz</div>
            <div style="font-size:11px; color:#dbeafe;">CEO &amp; Founder Laroma, Inc.</div>
          </div>
        </div>

        <!-- Invitation -->
        <div style="margin:0 0 8px;">
          <h3 style="margin:0 0 8px; font-size:16px; font-weight:700; color:#fff;">YOU ARE INVITED TO SHARE YOUR BUSINESS IDEAS</h3>
          <p style="margin:0; font-size:11px; color:#dbeafe; line-height:1.5;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices sem etelend, sollicitudin ligula
            eget, ultrices nunc. Phasellus dapibus eros auctor magna mollis.
          </p>
        </div>
      </div>
    </div>

    <!-- CONTACT BAR (bottom, full width) -->
    <div
      style="
        position:absolute; bottom:0; left:0; right:0; background:#1e40af; color:#fff;
        display:flex; justify-content:space-between; align-items:center; padding:15px 30px;">
      <div style="font-weight:800; font-size:16px;">☎︎ Call For Registration 123-456-7890</div>
      <div style="text-align:right;">
        <div style="font-size:14px; color:#dbeafe;">For More Information</div>
        <div style="font-size:14px; color:#dbeafe;">:globe_with_meridians: reallyreatsite.com</div>
      </div>
    </div>

  </div>
</body>
</html>
  `
  };
  