export const propertymaxConstructionTemplate = {
    _id: 'propertymax-construction',
    name: 'PropertyMax Construction',
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
  <title>PropertyMax Construction Co. - Professional Brochure</title>
</head>
<body style="margin:0; padding:0; box-sizing:border-box; color:#333; background:#fff; font-family:Arial, Helvetica, sans-serif;">

  <!-- Page frame -->
  <div style="max-width:880px; margin:0 auto; padding:32px 80px; box-sizing:border-box;">

    <!-- Header -->
    <header style="display:flex; justify-content:space-between; align-items:center; margin:0 0 40px 0; padding:20px 0; border-bottom:2px solid #f5f5f5;">
      <div style="display:flex; align-items:center; gap:15px;">
        <div style="width:60px; height:60px; border:2px dashed #1e88e5; border-radius:50%; overflow:hidden;">
          <img src="https://page.gensparksite.com/v1/base64_upload/935e42979abffd316554e0ba744fc2bd"
               alt="Company Logo"
               style="width:100%; height:100%; object-fit:cover; border-radius:50%; display:block;"/>
        </div>
        <h1 style="margin:0; font-size:26px; font-weight:700; color:#0d47a1;">PropertyMax Construction Co.</h1>
      </div>

      <div style="text-align:right; font-size:14px; color:#666;">
        456 Business Ave.<br/>
        Metro City, MC 54321<br/>
        www.propertymax.com
      </div>
    </header>

    <!-- Hero -->
    <section
      style="
        position:relative; height:300px; display:flex; align-items:center; justify-content:center;
        margin:0 0 40px 0; color:#fff; text-align:center;
        background:
          linear-gradient(rgba(30,136,229,0.7), rgba(13,71,161,0.7)),
          url('https://thumbs.dreamstime.com/b/construction-site-cranes-multi-storey-unfinished-buildings-sunrise-sunset-381143313.jpg');
        background-size:cover; background-position:center; background-repeat:no-repeat;">
      <div style="max-width:600px; padding:0 10px;">
        <h1 style="margin:0; font-size:28px; font-weight:700;">
          Leading Construction Company specializing in innovative commercial and residential developments
        </h1>
      </div>
    </section>

    <!-- Services -->
    <section style="margin:0 0 40px 0; padding:20px 0;">
      <h2 style="margin:0 0 10px 0; font-size:24px; font-weight:600; color:#0d47a1;">Our Services</h2>
      <p style="margin:0 0 30px 0; font-size:16px; color:#666;">
        Comprehensive solutions designed to bring your architectural visions to life
      </p>

      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:30px;">
        <!-- Service item -->
        <div style="text-align:center; padding:20px; background:#fff; border-radius:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <div style="width:60px; height:60px; margin:0 auto 15px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:24px; border:2px dashed #29b6f6; background:#29b6f6;">
            <span style="font-size:10px; color:#fff; font-style:italic; opacity:.7;">&nbsp;</span>
          </div>
          <h3 style="margin:0 0 10px 0; font-size:18px; font-weight:600; color:#0d47a1;">Commercial Development</h3>
          <p style="margin:0; font-size:14px; color:#666;">We excel in large-scale commercial construction projects</p>
        </div>

        <!-- Service item -->
        <div style="text-align:center; padding:20px; background:#fff; border-radius:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <div style="width:60px; height:60px; margin:0 auto 15px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:24px; border:2px dashed #29b6f6; background:#29b6f6;">
            <span style="font-size:10px; color:#fff; font-style:italic; opacity:.7;">&nbsp;</span>
          </div>
          <h3 style="margin:0 0 10px 0; font-size:18px; font-weight:600; color:#0d47a1;">Residential Construction</h3>
          <p style="margin:0; font-size:14px; color:#666;">Transform your property dreams into stunning realities with our expertise</p>
        </div>

        <!-- Service item -->
        <div style="text-align:center; padding:20px; background:#fff; border-radius:4px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <div style="width:60px; height:60px; margin:0 auto 15px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:24px; border:2px dashed #29b6f6; background:#29b6f6;">
            <span style="font-size:10px; color:#fff; font-style:italic; opacity:.7;">&nbsp;</span>
          </div>
          <h3 style="margin:0 0 10px 0; font-size:18px; font-weight:600; color:#0d47a1;">Infrastructure Projects</h3>
          <p style="margin:0; font-size:14px; color:#666;">Modernize and expand your facilities with our specialized renovation services</p>
        </div>
      </div>
    </section>

    <!-- Statistics -->
    <section style="display:grid; grid-template-columns:1fr 1fr; gap:30px; margin:0 0 40px 0;">
      <div style="padding:30px 20px; border-radius:8px; text-align:center; color:#fff; background:#29b6f6;">
        <div style="font-size:48px; font-weight:700; margin:0 0 10px 0;">425+</div>
        <div style="font-size:14px; font-weight:600; text-transform:uppercase; letter-spacing:1px;">Projects Completed</div>
        <div style="font-size:12px; opacity:.9; margin-top:5px;">Experience Since 2010–2023</div>
      </div>

      <div style="padding:30px 20px; border-radius:8px; text-align:center; color:#fff; background:#0d47a1;">
        <div style="font-size:48px; font-weight:700; margin:0 0 10px 0;">78+</div>
        <div style="font-size:14px; font-weight:600; text-transform:uppercase; letter-spacing:1px;">Regional Offices</div>
        <div style="font-size:12px; opacity:.9; margin-top:5px;">Our Reach Since 2010–2023</div>
      </div>
    </section>

    <!-- About -->
    <section style="background:#f5f5f5; padding:30px; border-radius:4px; margin:0 0 40px 0;">
      <h2 style="margin:0 0 15px 0; font-size:20px; font-weight:600; color:#0d47a1;">About PropertyMax Construction</h2>
      <p style="margin:0; font-size:16px; color:#444;">
        Since our founding in 2010, we have maintained our commitment to delivering exceptional construction solutions.
        Our philosophy centers on combining superior craftsmanship with competitive pricing and strategic location
        selection. This proven approach has driven our continued success in the industry.
      </p>
    </section>

  </div>
</body>
</html>
  `
  };
  