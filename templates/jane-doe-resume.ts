export const janeDoeResumeTemplate = {
  _id: 'jane-doe-resume',
  name: 'Jane Doe Resume',
  description: 'Create and edit HTML documents with inline styles',
  category: 'job-applications',
  prompt: 'Create an HTML document with inline styles',
  preview: '👤',
  editor: 'html',

  contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Creative Resume</title>
</head>
<body style="margin: 0; font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #f8f8f8, #dfe9f3); color: #333;">

  <!-- Container -->
  <div style="max-width: 900px; margin: 40px auto; background-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); padding: 40px; border-radius: 12px;">

    <!-- Header -->
    <div style="text-align: center;">
      <h1 style="margin-bottom: 5px; font-size: 36px;">Jane Doe</h1>
      <p style="margin-top: 0; color: #777;">Creative Designer & Frontend Developer</p>
      <p style="color: #555;">📧 janedoe@email.com | 📞 (123) 456-7890 | 🌐 www.janedoe.com</p>
    </div>

    <hr style="border: none; border-top: 2px solid #eee; margin: 30px 0;">

    <!-- Summary -->
    <section>
      <h2 style="color: #007acc;">Professional Summary</h2>
      <p style="line-height: 1.6;">Passionate and detail-oriented designer with over 5 years of experience in crafting visually appealing user interfaces. Proficient in Adobe Creative Suite and modern frontend frameworks. Adept at bridging design with technology to deliver seamless digital experiences.</p>
    </section>

    <!-- Skills -->
    <section>
      <h2 style="color: #007acc;">Skills</h2>
      <ul style="columns: 2; -webkit-columns: 2; -moz-columns: 2; line-height: 1.6;">
        <li>UI/UX Design</li>
        <li>Figma & Adobe XD</li>
        <li>HTML5 / CSS3 / JS</li>
        <li>React & Vue</li>
        <li>Illustrator & Photoshop</li>
        <li>Responsive Design</li>
      </ul>
    </section>

    <!-- Experience -->
    <section>
      <h2 style="color: #007acc;">Work Experience</h2>

      <div style="margin-bottom: 20px;">
        <h3 style="margin: 5px 0;">Senior UI Designer – PixelStudio</h3>
        <p style="margin: 0; color: #999;">Jan 2021 – Present</p>
        <ul style="margin-top: 10px; line-height: 1.6;">
          <li>Designed interfaces for mobile and web apps used by over 2M users.</li>
          <li>Led a team of 4 designers on a high-visibility project with tight deadlines.</li>
        </ul>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="margin: 5px 0;">Frontend Developer – WebWise</h3>
        <p style="margin: 0; color: #999;">Aug 2018 – Dec 2020</p>
        <ul style="margin-top: 10px; line-height: 1.6;">
          <li>Converted UI mockups into interactive websites using HTML, CSS, and JS.</li>
          <li>Optimized website performance, reducing load times by 40%.</li>
        </ul>
      </div>
    </section>

    <!-- Education -->
    <section>
      <h2 style="color: #007acc;">Education</h2>
      <p style="margin: 5px 0;"><strong>B.Sc. in Computer Science</strong> – University of Design</p>
      <p style="color: #999;">2014 – 2018</p>
    </section>

    <!-- Footer -->
    <hr style="border: none; border-top: 2px solid #eee; margin: 30px 0;">
    <p style="text-align: center; color: #aaa;">© 2025 Jane Doe. All rights reserved.</p>
  </div>

</body>
</html>
`
};
