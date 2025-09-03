export const aboutus = {
    _id: 'about-us',
    name: 'About Us',
    description: 'Create and edit HTML documents with inline styles',
    category: 'creative-marketing',
    prompt: 'Create an HTML document with inline styles',
    preview: '📈',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>About Us - Rimberio Co</title>
</head>
<body style="max-width:880px; margin:0 auto; padding:32px 80px; position:relative; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height:1.6; color:#333; background:#fff;">

  <!-- HERO -->
  <div style="background:
                linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
                url('https://images.pexels.com/photos/9608197/pexels-photo-9608197.jpeg');
              background-size:cover; background-position:center;
              height:300px; display:flex; align-items:center; justify-content:center; position:relative;
              margin:-32px -80px 60px -80px; overflow:hidden;">
    <!-- geometric accents -->
    <div style="position:absolute; width:60px; height:60px; background:#d4a574; top:20px; left:20px; clip-path:polygon(0 0, 100% 0, 0 100%);"></div>
    <div style="position:absolute; width:60px; height:60px; background:#d4a574; top:20px; right:20px; clip-path:polygon(100% 0, 100% 100%, 0 0);"></div>
    <div style="position:absolute; width:60px; height:60px; background:#d4a574; bottom:20px; right:20px; clip-path:polygon(100% 100%, 0 100%, 100% 0);"></div>

    <h1 style="font-size:72px; font-weight:700; color:#fff; text-align:center; margin:0;">About Us.</h1>
  </div>

  <!-- INTRO GRID -->
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; margin:0 0 40px;">
    <!-- company info card -->
    <div style="background:#f8f9fa; padding:30px; border-radius:8px;">
      <div style="display:flex; align-items:center; margin:0 0 20px;">
        <div style="width:40px; height:40px; background:#2c5f5f; margin-right:15px;
                    display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:18px;">
          R
        </div>
        <div style="font-size:24px; font-weight:700; color:#2c5f5f;">Rimberio Co</div>
      </div>
      <div style="font-size:14px; color:#666; line-height:1.8;">
        123-456-7890<br>
        @reallygreatsite<br>
        123 Anywhere St., Any City, ST 12345
      </div>
    </div>

    <!-- office image -->
    <div style="height:300px; border-radius:8px;
                background:url('https://img.freepik.com/free-photo/3d-rendering-business-meeting-working-room-office-building_105762-1972.jpg') center/cover no-repeat;">
    </div>
  </div>

  <!-- SECTION: Introduction -->
  <div style="margin:0 0 40px;">
    <h2 style="font-size:28px; font-weight:700; color:#2c5f5f; margin:0 0 20px;">Introduction</h2>
    <p style="color:#555; line-height:1.8; text-align:justify; margin:0;">
      Welcome to Rimberio Co., a leading force in the real estate market. Our commitment to reshaping urban living
      defines our essence. With a focus on innovation and quality, Rimberio Co. is dedicated to creating residential
      and commercial spaces that surpass expectations, merging functionality with aesthetics.
    </p>
  </div>

  <!-- SECTION: Philosophy -->
  <div style="margin:0 0 40px;">
    <h2 style="font-size:28px; font-weight:700; color:#2c5f5f; margin:0 0 20px;">Our Philosophy</h2>
    <p style="color:#555; line-height:1.8; text-align:justify; margin:0;">
      Rooted in a profound philosophy, Rimberio Co. views real estate as a canvas for enhancing lives and communities.
      Our professional team crafts projects that embody sustainability, modern design, and technological innovation.
    </p>
  </div>

  <!-- TWO-COLUMN: Image + Future -->
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; margin:0 0 40px;">
    <div style="height:400px; border-radius:8px;
                background:url('https://images.stockcake.com/public/0/c/1/0c124e9e-00c4-47c0-a161-840605ecc6fc_large/professional-handshake-meeting-stockcake.jpg') center/cover no-repeat;">
    </div>

    <div style="display:flex; flex-direction:column; justify-content:center;">
      <h2 style="font-size:28px; font-weight:700; color:#2c5f5f; margin:0 0 20px;">Future Horizons</h2>
      <p style="color:#555; line-height:1.8; text-align:justify; margin:0;">
        Rimberio Co. envisions a global presence, leaving a distinctive mark on skylines. Committed to transparency
        and ethical practices, we redefine industry benchmarks, inviting you to join us in shaping a future of
        innovation, sustainability, and timeless quality.
      </p>
    </div>
  </div>

  <!-- WEBSITE -->
  <div style="text-align:center; font-weight:700; color:#2c5f5f; margin-top:30px; font-size:16px;">
    www.reallygreatsite.com
  </div>

</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>About Us - Rimberio Co</title>
</head>
<body style="max-width:880px; margin:0 auto; padding:32px 80px; position:relative; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height:1.6; color:#333; background:#fff;">

  <!-- HERO -->
  <div style="background:
                linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
                url('https://images.pexels.com/photos/9608197/pexels-photo-9608197.jpeg');
              background-size:cover; background-position:center;
              height:300px; display:flex; align-items:center; justify-content:center; position:relative;
              margin:-32px -80px 60px -80px; overflow:hidden;">
    <!-- geometric accents -->
    <div style="position:absolute; width:60px; height:60px; background:#d4a574; top:20px; left:20px; clip-path:polygon(0 0, 100% 0, 0 100%);"></div>
    <div style="position:absolute; width:60px; height:60px; background:#d4a574; top:20px; right:20px; clip-path:polygon(100% 0, 100% 100%, 0 0);"></div>
    <div style="position:absolute; width:60px; height:60px; background:#d4a574; bottom:20px; right:20px; clip-path:polygon(100% 100%, 0 100%, 100% 0);"></div>

    <h1 style="font-size:72px; font-weight:700; color:#fff; text-align:center; margin:0;">About Us.</h1>
  </div>

  <!-- INTRO GRID -->
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; margin:0 0 40px;">
    <!-- company info card -->
    <div style="background:#f8f9fa; padding:30px; border-radius:8px;">
      <div style="display:flex; align-items:center; margin:0 0 20px;">
        <div style="width:40px; height:40px; background:#2c5f5f; margin-right:15px;
                    display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:18px;">
          R
        </div>
        <div style="font-size:24px; font-weight:700; color:#2c5f5f;">Rimberio Co</div>
      </div>
      <div style="font-size:14px; color:#666; line-height:1.8;">
        123-456-7890<br>
        @reallygreatsite<br>
        123 Anywhere St., Any City, ST 12345
      </div>
    </div>

    <!-- office image -->
    <div style="height:300px; border-radius:8px;
                background:url('https://img.freepik.com/free-photo/3d-rendering-business-meeting-working-room-office-building_105762-1972.jpg') center/cover no-repeat;">
    </div>
  </div>

  <!-- SECTION: Introduction -->
  <div style="margin:0 0 40px;">
    <h2 style="font-size:28px; font-weight:700; color:#2c5f5f; margin:0 0 20px;">Introduction</h2>
    <p style="color:#555; line-height:1.8; text-align:justify; margin:0;">
      Welcome to Rimberio Co., a leading force in the real estate market. Our commitment to reshaping urban living
      defines our essence. With a focus on innovation and quality, Rimberio Co. is dedicated to creating residential
      and commercial spaces that surpass expectations, merging functionality with aesthetics.
    </p>
  </div>

  <!-- SECTION: Philosophy -->
  <div style="margin:0 0 40px;">
    <h2 style="font-size:28px; font-weight:700; color:#2c5f5f; margin:0 0 20px;">Our Philosophy</h2>
    <p style="color:#555; line-height:1.8; text-align:justify; margin:0;">
      Rooted in a profound philosophy, Rimberio Co. views real estate as a canvas for enhancing lives and communities.
      Our professional team crafts projects that embody sustainability, modern design, and technological innovation.
    </p>
  </div>

  <!-- TWO-COLUMN: Image + Future -->
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; margin:0 0 40px;">
    <div style="height:400px; border-radius:8px;
                background:url('https://images.stockcake.com/public/0/c/1/0c124e9e-00c4-47c0-a161-840605ecc6fc_large/professional-handshake-meeting-stockcake.jpg') center/cover no-repeat;">
    </div>

    <div style="display:flex; flex-direction:column; justify-content:center;">
      <h2 style="font-size:28px; font-weight:700; color:#2c5f5f; margin:0 0 20px;">Future Horizons</h2>
      <p style="color:#555; line-height:1.8; text-align:justify; margin:0;">
        Rimberio Co. envisions a global presence, leaving a distinctive mark on skylines. Committed to transparency
        and ethical practices, we redefine industry benchmarks, inviting you to join us in shaping a future of
        innovation, sustainability, and timeless quality.
      </p>
    </div>
  </div>

  <!-- WEBSITE -->
  <div style="text-align:center; font-weight:700; color:#2c5f5f; margin-top:30px; font-size:16px;">
    www.reallygreatsite.com
  </div>

</body>
</html>

  `
  };
  