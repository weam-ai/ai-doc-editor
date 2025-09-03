export const publicspeaking = {
    _id: 'public speaking',
    name: 'Public Speaking Event',
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Public Speaking Workshop</title>
</head>
<body style="margin:0; padding:0; background:#ffffff; font-family:Arial, Helvetica, sans-serif;">

  <!-- Canvas -->
  <div style="width:600px; height:800px; position:relative; background:#ffffff; margin:0 auto; overflow:hidden;">

    <!-- Geometric accents -->
    <div style="position:absolute; top:0; left:0; width:0; height:0; border-left:180px solid #ffb300; border-bottom:120px solid transparent;"></div>
    <div style="position:absolute; top:0; right:0; width:0; height:0; border-right:100px solid #212121; border-bottom:120px solid transparent;"></div>
    <div style="position:absolute; top:320px; right:0; width:0; height:0; border-right:140px solid #ff5722; border-top:150px solid transparent; border-bottom:150px solid transparent;"></div>
    <div style="position:absolute; bottom:50px; left:-15px; width:0; height:0; border-left:30px solid #212121; border-bottom:30px solid transparent;"></div>
    <div style="position:absolute; bottom:0; right:-20px; width:0; height:0; border-right:40px solid #ffb300; border-top:40px solid transparent;"></div>

    <!-- Company banner -->
    <div style="position:absolute; top:40px; left:60px; background:#ffb300; padding:8px 20px; font-size:14px; font-weight:600; color:#212121; clip-path:polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%);">
      ABC &amp; Co. Company
    </div>

    <!-- Title -->
    <h1 style="position:absolute; top:100px; left:60px; margin:0; font-weight:700; font-size:72px; color:#ff5722; line-height:78px;">
      Public<br>Speaking
    </h1>
    <h2 style="position:absolute; top:280px; left:60px; margin:0; font-weight:400; font-size:48px; color:#212121; letter-spacing:2px;">
      Workshop
    </h2>
    <p style="position:absolute; top:350px; left:60px; margin:0; font-size:18px; color:#666;">
      Master the Art of Speaking
    </p>

    <!-- Speaker photo rings -->
    <div style="position:absolute; top:250px; right:20px; width:280px; height:280px;">
      <div style="position:absolute; top:0; left:0; width:280px; height:280px; border:8px solid #ffb300; border-radius:50%;"></div>
      <div style="position:absolute; top:20px; left:20px; width:240px; height:240px; border:4px solid #ff5722; border-radius:50%;"></div>
      <div style="position:absolute; top:30px; left:30px; width:220px; height:220px; border-radius:50%; background-image:url('https://orlandosydney.com/wp-content/uploads/2023/04/Womens-Corporate-Headshots.-Photography-by-Orlandosydney.com-202300290.jpg'); background-size:cover; background-position:center;"></div>
    </div>

    <!-- Event details -->
    <div style="position:absolute; top:400px; left:60px; width:300px;">
      <div style="display:flex; align-items:center; margin-bottom:12px; font-size:16px; font-weight:600; color:#333;">📅 Saturday, 27 June 2025</div>
      <div style="display:flex; align-items:center; margin-bottom:12px; font-size:16px; font-weight:600; color:#333;">⏰ 08:00 AM – 11:00 AM</div>
      <div style="display:flex; align-items:center; font-size:16px; font-weight:600; color:#333;">📍 Studio Shodwe, 123 Anywhere St., Any City</div>
    </div>

    <!-- Speaker -->
    <p style="position:absolute; top:520px; left:60px; margin:0; font-size:18px; color:#ff5722;">Speaker:</p>
    <h3 style="position:absolute; top:550px; left:60px; margin:0; font-size:32px; font-weight:700; color:#212121;">Sacha Dubois</h3>

    <!-- Register button -->
    <a href="#" style="position:absolute; top:600px; left:60px; width:180px; height:50px; background:#ffb300; border-radius:25px; color:#fff; font-size:16px; font-weight:600; display:flex; align-items:center; justify-content:center; text-decoration:none; box-shadow:0 4px 8px rgba(0,0,0,0.15);">
      Register Now
    </a>

    <!-- Contact -->
    <div style="position:absolute; bottom:40px; left:60px; display:flex; gap:40px;">
      <div style="font-size:14px; color:#333;">📞 Call Our Number<br>+123-456-7890</div>
      <div style="font-size:14px; color:#333;">🌐 Visit Our Website<br>www.reallygreatsite.com</div>
    </div>
  </div>

</body>
</html>

  `
  };
  