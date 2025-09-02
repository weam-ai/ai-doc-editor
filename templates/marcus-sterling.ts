export const marcusSterlingPortfolioTemplate = {
    _id: 'marcus-sterling-portfolio',
    name: 'Marcus Sterling Portfolio',
    description: 'Create and edit HTML documents with inline styles',
    category: 'job-applications',
    prompt: 'Create an HTML document with inline styles',
    preview: '📋',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Professional Resume — Marcus Sterling</title>
</head>
<body style="margin:0; padding:0; background:#fff; color:#000; font-family:Arial, Helvetica, sans-serif; line-height:1.4;">

  <!-- Page container -->
  <div style="max-width:880px; margin:0 auto; padding:32px 80px; box-sizing:border-box;">

    <!-- Header -->
    <header style="display:flex; justify-content:space-between; align-items:baseline; gap:16px; flex-wrap:wrap; margin:0 0 40px 0;">
      <h1 style="margin:0; font-family:'Arial Black', Arial, Helvetica, sans-serif; font-size:52px; font-weight:900; letter-spacing:2px; color:#000;">
        MARCUS STERLING
      </h1>
      <div style="margin:0; font-size:24px; font-weight:400; color:#000; white-space:nowrap;">
        GRAPHIC DESIGNER
      </div>
    </header>

    <!-- Two-column layout -->
    <main style="display:flex; gap:40px; align-items:flex-start;">

      <!-- Left column -->
      <section style="flex:0 0 70%;">

        <!-- About -->
        <h2 style="font-family:'Arial Black', Arial, Helvetica, sans-serif; font-size:22px; font-weight:900; letter-spacing:1px; margin:0 0 15px 0; color:#000; padding-bottom:8px; border-bottom:3px solid #000;">
          ABOUT ME
        </h2>
        <p style="text-align:justify; margin:0 0 30px 0; font-size:14px; line-height:1.5; color:#000;">
          Creative professional with extensive experience in visual design and brand development. Specialized in
          creating compelling visual narratives that drive engagement and communicate brand values effectively. Proven
          track record of delivering innovative design solutions across digital and print media. Passionate about
          typography, color theory, and emerging design trends. Collaborative team player with strong project management
          skills and ability to work under tight deadlines. Committed to continuous learning and staying current with
          industry best practices and new technologies.
        </p>

        <!-- Work Experience -->
        <h2 style="font-family:'Arial Black', Arial, Helvetica, sans-serif; font-size:22px; font-weight:900; letter-spacing:1px; margin:30px 0 15px 0; color:#000; padding-bottom:8px; border-bottom:3px solid #000;">
          WORK EXPERIENCE
        </h2>

        <!-- Timeline Item -->
        <div style="position:relative; padding-left:25px; margin:0 0 25px 0; border-left:2px solid #8b8c1a;">
          <span style="position:absolute; left:-7px; top:8px; width:12px; height:12px; background:#8b8c1a; border-radius:50%; display:inline-block;"></span>
          <div style="font-weight:700; font-size:16px; margin:0 0 5px 0; color:#000;">Senior Designer (2019–Present)</div>
          <div style="font-size:14px; color:#666; margin:0 0 8px 0;">Creative Solutions Agency</div>
          <div style="font-size:13px; line-height:1.4; text-align:justify; color:#000;">
            Led comprehensive design projects for major clients including brand identity development, digital marketing
            campaigns, and print collateral. Managed creative workflows and mentored junior designers. Collaborated with
            marketing teams to develop cohesive visual strategies that increased client engagement by 40%. Streamlined
            design processes and implemented new creative tools that improved team productivity.
          </div>
        </div>

        <!-- Timeline Item -->
        <div style="position:relative; padding-left:25px; margin:0 0 25px 0; border-left:2px solid #8b8c1a;">
          <span style="position:absolute; left:-7px; top:8px; width:12px; height:12px; background:#8b8c1a; border-radius:50%; display:inline-block;"></span>
          <div style="font-weight:700; font-size:16px; margin:0 0 5px 0; color:#000;">Visual Designer (2016–2019)</div>
          <div style="font-size:14px; color:#666; margin:0 0 8px 0;">Innovation Studios</div>
          <div style="font-size:13px; line-height:1.4; text-align:justify; color:#000;">
            Developed creative concepts for digital platforms and traditional media campaigns. Created compelling visual
            content for social media, websites, and marketing materials. Worked closely with clients to understand their
            vision and translate concepts into effective design solutions. Maintained consistent brand standards across
            all deliverables while exploring innovative design approaches that enhanced brand recognition.
          </div>
        </div>

        <!-- Education -->
        <h2 style="font-family:'Arial Black', Arial, Helvetica, sans-serif; font-size:22px; font-weight:900; letter-spacing:1px; margin:30px 0 15px 0; color:#000; padding-bottom:8px; border-bottom:3px solid #000;">
          EDUCATIONAL HISTORY
        </h2>

        <div style="position:relative; padding-left:25px; margin:0 0 25px 0; border-left:2px solid #8b8c1a;">
          <span style="position:absolute; left:-7px; top:8px; width:12px; height:12px; background:#8b8c1a; border-radius:50%; display:inline-block;"></span>
          <div style="font-weight:700; font-size:16px; margin:0 0 5px 0; color:#000;">Master of Fine Arts in Design (2014–2016)</div>
          <div style="font-size:14px; color:#666; margin:0 0 8px 0;">California Institute of the Arts</div>
          <div style="font-size:13px; line-height:1.4; text-align:justify; color:#000;">
            Concentrated in graphic design with emphasis on digital media and interactive design. Completed thesis
            project on sustainable design practices in contemporary visual communication. Participated in collaborative
            projects with industry professionals and gained expertise in advanced design methodologies and creative
            problem-solving techniques.
          </div>
        </div>

        <div style="position:relative; padding-left:25px; margin:0 0 25px 0; border-left:2px solid #8b8c1a;">
          <span style="position:absolute; left:-7px; top:8px; width:12px; height:12px; background:#8b8c1a; border-radius:50%; display:inline-block;"></span>
          <div style="font-weight:700; font-size:16px; margin:0 0 5px 0; color:#000;">Bachelor of Arts in Visual Communication (2010–2014)</div>
          <div style="font-size:14px; color:#666; margin:0 0 8px 0;">San Francisco State University</div>
          <div style="font-size:13px; line-height:1.4; text-align:justify; color:#000;">
            Comprehensive study of visual communication principles, typography, and design theory. Completed internships
            with local design firms and developed strong foundation in both traditional and digital design techniques.
            Graduated magna cum laude with portfolio showcasing diverse design capabilities across multiple media
            platforms.
          </div>
        </div>

        <div style="position:relative; padding-left:25px; margin:0 0 25px 0; border-left:2px solid #8b8c1a;">
          <span style="position:absolute; left:-7px; top:8px; width:12px; height:12px; background:#8b8c1a; border-radius:50%; display:inline-block;"></span>
          <div style="font-weight:700; font-size:16px; margin:0 0 5px 0; color:#000;">High School Diploma (2006–2010)</div>
          <div style="font-size:14px; color:#666; margin:0 0 8px 0;">Westfield Academy</div>
          <div style="font-size:13px; line-height:1.4; text-align:justify; color:#000;">
            Excelled in art and design coursework with focus on studio arts and computer graphics. Participated in
            regional art competitions and received recognition for innovative design projects. Developed early interest
            in visual communication and began building foundational skills in creative software and design principles.
          </div>
        </div>
      </section>

      <!-- Right column -->
      <aside style="flex:0 0 25%;">

        <h2 style="font-family:'Arial Black', Arial, Helvetica, sans-serif; font-size:22px; font-weight:900; letter-spacing:1px; margin:0 0 15px 0; color:#000; padding-bottom:8px; border-bottom:3px solid #000;">
          AWARDS
        </h2>
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="display:flex; gap:15px; margin:0 0 15px 0; font-size:13px; color:#000;">
            <div style="font-weight:700; font-size:24px; color:#000; min-width:30px;">01</div>
            <div style="flex:1; line-height:1.3;">Regional Design Excellence Award for innovative brand identity campaign.</div>
          </li>
          <li style="display:flex; gap:15px; margin:0 0 15px 0; font-size:13px; color:#000;">
            <div style="font-weight:700; font-size:24px; color:#000; min-width:30px;">02</div>
            <div style="flex:1; line-height:1.3;">Creative Industry Recognition for outstanding digital marketing design portfolio.</div>
          </li>
          <li style="display:flex; gap:15px; margin:0 0 15px 0; font-size:13px; color:#000;">
            <div style="font-weight:700; font-size:24px; color:#000; min-width:30px;">03</div>
            <div style="flex:1; line-height:1.3;">Best Visual Communication Project at annual design conference showcase.</div>
          </li>
          <li style="display:flex; gap:15px; margin:0 0 15px 0; font-size:13px; color:#000;">
            <div style="font-weight:700; font-size:24px; color:#000; min-width:30px;">04</div>
            <div style="flex:1; line-height:1.3;">Professional Achievement Award for leadership in creative team management.</div>
          </li>
        </ul>

        <div style="margin:25px 0 0 0;">
          <div style="font-family:'Arial Black', Arial, Helvetica, sans-serif; font-size:18px; font-weight:900; letter-spacing:1px; margin:0 0 8px 0; color:#000;">
            ADDRESS
          </div>
          <div style="font-size:13px; line-height:1.4; color:#000;">
            1847 Mission District Blvd<br/>San Francisco, CA
          </div>
        </div>

        <div style="margin:25px 0 0 0;">
          <div style="font-family:'Arial Black', Arial, Helvetica, sans-serif; font-size:18px; font-weight:900; letter-spacing:1px; margin:0 0 8px 0; color:#000;">
            PHONE
          </div>
          <div style="font-size:13px; line-height:1.4; color:#000;">
            (415) 987-6543<br/>(628) 123-4567
          </div>
        </div>

        <div style="margin:25px 0 0 0;">
          <div style="font-family:'Arial Black', Arial, Helvetica, sans-serif; font-size:18px; font-weight:900; letter-spacing:1px; margin:0 0 8px 0; color:#000;">
            EMAIL
          </div>
          <div style="font-size:13px; line-height:1.4; color:#000;">
            <a href="mailto:marcus.sterling@example.com" style="color:#000; text-decoration:underline;">marcus.sterling@example.com</a>
          </div>
        </div>

        <div style="margin:25px 0 0 0;">
          <div style="font-family:'Arial Black', Arial, Helvetica, sans-serif; font-size:18px; font-weight:900; letter-spacing:1px; margin:0 0 8px 0; color:#000;">
            SKILLS
          </div>
          <div style="font-size:13px; line-height:1.4; color:#000;">
            Brand Development, Visual Identity, Digital Design, Print Design, Typography, Color Theory,
            Creative Direction, Project Management, Team Leadership, Client Relations
          </div>
        </div>
      </aside>

    </main>
  </div>
</body>
</html>
  `
  };
  