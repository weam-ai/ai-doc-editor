export const newsletterissue = {
    _id: 'newsletter-issue',
    name: 'Newsletter Issue',
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
  <title>The Caseton - Newsletter Issue 01</title>
</head>
<body style="margin:0; background:#fff; color:#4f402d; font-family:Arial, Helvetica, sans-serif;">

  <!-- HEADER -->
  <header
    style="
      background-image:url('https://page1.genspark.site/v1/base64_upload/4852b27fa29f380567c4335374b40e43');
      background-size:cover; background-position:center; background-repeat:no-repeat;
      padding:60px 80px 40px 80px; color:#fff;">

    <div style="display:flex; justify-content:space-between; align-items:center; font-size:14px; margin:0 0 20px 0;">
      <span>Issue No. 01</span>
      <span>10/2025</span>
    </div>

    <div style="width:100%; height:1px; background:#fff; margin:20px 0;"></div>

    <h1 style="margin:0; text-align:center; font-weight:bold; color:#fff; font-size:66px;">The Caseton</h1>
  </header>

  <!-- CONTENT -->
  <main style="padding:40px 80px 80px 80px; background:#fff; max-width:880px; margin:0 auto; box-sizing:border-box;">

    <!-- Headline -->
    <h2 style="font-size:36px; font-weight:bold; color:#f18c09; margin:0 0 15px 0; line-height:1.2;">
      Introducing our latest app
    </h2>
    <p style="font-size:16px; color:#666; font-style:italic; margin:0 0 40px 0;">
      Use the subhead to support your headline and provide context about the article.
    </p>

    <!-- Chart legend -->
    <section style="margin:0 0 40px 0;">
      <div style="display:flex; gap:30px; align-items:center; margin:0 0 20px 0;">
        <div style="display:flex; align-items:center; gap:8px; font-size:14px;">
          <span style="display:inline-block; width:16px; height:16px; background:#F5DEB3;"></span>
          <span>Series 1</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px; font-size:14px;">
          <span style="display:inline-block; width:16px; height:16px; background:#F39C12;"></span>
          <span>Series 2</span>
        </div>
      </div>

      <!-- Chart container -->
      <div style="border:1px solid #e0e0e0; padding:30px; background:#fafafa; position:relative;">
        <div style="display:grid; grid-template-rows:repeat(3,60px); gap:20px; position:relative;">

          <!-- Row 1 -->
          <div style="display:flex; align-items:center; gap:15px;">
            <div style="width:60px; font-size:14px; color:#333;">Item 1</div>
            <div style="flex:1; position:relative; height:40px;">
              <div style="position:absolute; top:0; left:0; height:20px; width:20%; background:#F5DEB3;"></div>
              <div style="position:absolute; top:20px; left:0; height:20px; width:60%; background:#F39C12;"></div>
            </div>
          </div>

          <!-- Row 2 -->
          <div style="display:flex; align-items:center; gap:15px;">
            <div style="width:60px; font-size:14px; color:#333;">Item 2</div>
            <div style="flex:1; position:relative; height:40px;">
              <div style="position:absolute; top:0; left:0; height:20px; width:35%; background:#F5DEB3;"></div>
              <div style="position:absolute; top:20px; left:0; height:20px; width:85%; background:#F39C12;"></div>
            </div>
          </div>

          <!-- Row 3 -->
          <div style="display:flex; align-items:center; gap:15px;">
            <div style="width:60px; font-size:14px; color:#333;">Item 3</div>
            <div style="flex:1; position:relative; height:40px;">
              <div style="position:absolute; top:0; left:0; height:20px; width:55%; background:#F5DEB3;"></div>
              <div style="position:absolute; top:20px; left:0; height:20px; width:95%; background:#F39C12;"></div>
            </div>
          </div>
        </div>

        <!-- Chart scale -->
        <div style="display:flex; justify-content:space-between; margin-top:20px; padding-left:75px; font-size:12px; color:#666;">
          <span>0</span><span>5</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30</span><span>35</span>
        </div>
      </div>
    </section>

    <!-- Body copy -->
    <p style="font-size:16px; line-height:1.6; color:#333; text-align:justify; margin:0 0 40px 0;">
      Distributing newsletters via email remains among the most effective methods to cultivate meaningful connections
      with your audience and clientele. Offer them premium access to your freshest products, solutions, and exclusive
      promotions while concurrently enhancing your company's recognition—there's no reason to restrict yourself to
      printed materials or outdoor advertising. Customers can stay informed about your latest and most significant
      launches from their homes, offices, or even during their travels with just one click.
    </p>

    <!-- Decorative block -->
    <div
      style="
        height:100px;
        background-image:url('https://page1.genspark.site/v1/base64_upload/d641ea3a415e9a3232e1f8df2308cdf8');
        background-size:cover; background-position:center; background-repeat:no-repeat;
        display:flex; align-items:center; justify-content:center; color:#888; font-style:italic;">
    </div>
  </main>
</body>
</html>

  `
  };
  