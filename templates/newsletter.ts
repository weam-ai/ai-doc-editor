export const newsletter = {
    _id: 'newsletter',
    name: 'Business Newsletter',
    description: 'Create and edit HTML documents with inline styles',
    category: 'reports-analysis',
    prompt: 'Create an HTML document with inline styles',
    preview: '📈',
    editor: 'html',
  
    contentHtml: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Business Newsletter - June 25, 2025</title>
</head>
<body style="margin:0; background:#fff; color:#333; font-family:Arial, Helvetica, sans-serif;">

  <!-- PAGE WRAPPER -->
  <div style="max-width:880px; margin:0 auto; padding:32px 80px; box-sizing:border-box;">

    <!-- HEADER -->
    <div style="margin:0 0 36px 0;">
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:12pt; color:#666; margin:0 0 22px 0;">
        <span>25th June, 2025</span>
        <span>www.reallygreatsite.com</span>
      </div>

      <h1 style="font-family:'Times New Roman', Times, serif; font-size:48pt; font-weight:400; line-height:1; text-align:center; color:#2c3e50; margin:12px 0 8px 0;">
        Newsletter
      </h1>

      <!-- Title decoration -->
      <div style="position:relative; text-align:center; margin:16px 0 34px 0;">
        <div style="position:absolute; left:0; top:50%; width:32%; height:1px; background:#2c3e50; transform:translateY(-50%);"></div>
        <div style="position:absolute; right:0; top:50%; width:32%; height:1px; background:#2c3e50; transform:translateY(-50%);"></div>
        <span style="display:inline-block; padding:0 20px; background:#fff; font-size:12pt; color:#666;">www.reallygreatsite.com</span>
      </div>
    </div>

    <!-- MAIN CONTENT GRID -->
    <div style="display:grid; grid-template-columns:1fr 300px; gap:30px; margin:0 0 24px 0;">
      <img
        src="https://page1.genspark.site/v1/base64_upload/2656d936d60366bc205fab3572af8363"
        alt="Technology and business concept"
        style="width:100%; height:100%; min-height:100%; object-fit:cover; object-position:center; border-radius:4px;"
      />

      <div style="display:flex; flex-direction:column;">
        <div style="background:#e67e22; color:#fff; text-align:center; font-size:18pt; font-weight:700; padding:15px 20px; margin:0;">
          TECHNOLOGY
        </div>
        <div style="background:#2c3e50; color:#fff; padding:20px; font-size:12pt; line-height:1.6; margin:0;">
          Digital transformation continues to reshape the business landscape as companies embrace artificial
          intelligence, cloud computing, and automation technologies. Organizations are investing heavily in digital
          infrastructure to enhance operational efficiency, improve customer experiences, and maintain competitive
          advantages in an increasingly connected marketplace. The integration of emerging technologies is driving
          unprecedented innovation across all industry sectors.
        </div>
      </div>
    </div>

    <!-- ORANGE STRIPE -->
    <div style="width:100%; height:6px; background:#e67e22; margin:28px 0;"></div>

    <!-- FOOTER GRID -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0; margin-top:12px;">
      <div style="background:#2c3e50; color:#fff; padding:30px;">
        <h3 style="margin:0 0 12px 0; font-size:18pt; font-weight:700; color:#fff;">MARKET INSIGHTS</h3>
        <p style="margin:0; font-size:12pt; line-height:1.6;">
          Global markets demonstrate resilience amid economic uncertainties, with technology and healthcare sectors
          showing robust growth. Investment patterns indicate a shift toward sustainable and ESG-compliant businesses.
          Analysts project continued volatility in commodity markets while service industries maintain steady expansion.
          Consumer spending patterns reflect changing preferences toward digital services and sustainable products.
        </p>
      </div>

      <div style="background:#2c3e50; color:#fff; padding:30px;">
        <h3 style="margin:0 0 12px 0; font-size:18pt; font-weight:700; color:#fff;">INDUSTRY UPDATES</h3>
        <p style="margin:0; font-size:12pt; line-height:1.6;">
          Manufacturing sectors are adopting smart factory technologies to optimize production efficiency and reduce
          operational costs. Financial services are implementing blockchain solutions for enhanced security and
          transparency. Retail industries are expanding omnichannel strategies to meet evolving consumer demands.
          Healthcare organizations continue advancing telemedicine capabilities and personalized treatment approaches.
        </p>
      </div>
    </div>

  </div>
</body>
</html>

  `
  };
  