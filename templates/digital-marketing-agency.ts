export const digitalMarketingAgencyTemplate = {
    _id: 'digital-marketing-agency',
    name: 'Digital Marketing Agency',
    description: 'Create and edit HTML documents with inline styles',
    category: 'all',
    prompt: 'Create an HTML document with inline styles',
    preview: '🌐',
    editor: 'html',
  
    contentHtml: `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Digital Marketing Agency Banner</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
    </head>
    <body style="margin:0;background:#0f1340;">
      <!-- Canvas -->
      <div
        style="
          position:relative;
          width:768px; max-width:100%;
          height:768px;
          margin:0 auto;
          background:#1f2369;
          overflow:hidden;
          font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Inter,Arial,sans-serif;
          color:#fff;
        "
      >
        <!-- soft radial glow shapes -->
        <div style="position:absolute;left:-120px;top:-120px;width:520px;height:520px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.08),rgba(255,255,255,0));"></div>
        <div style="position:absolute;left:-200px;top:300px;width:600px;height:600px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.06),rgba(255,255,255,0));"></div>
  
        <!-- top-right diagonal stripes -->
        <div style="position:absolute;right:-160px;top:-120px;width:560px;height:260px;transform:rotate(28deg);background:#242a7a;border-top-left-radius:24px;border-top-right-radius:24px;"></div>
        <div style="position:absolute;right:-110px;top:-100px;width:500px;height:36px;transform:rotate(28deg);background:#ffffff;"></div>
        <div style="position:absolute;right:-96px;top:-64px;width:480px;height:36px;transform:rotate(28deg);background:#4b33c8;"></div>
        <div style="position:absolute;right:-82px;top:-28px;width:460px;height:36px;transform:rotate(28deg);background:#222b96;"></div>
        <div style="position:absolute;right:-68px;top:8px;width:440px;height:36px;transform:rotate(28deg);background:#f0bf2a;"></div>
  
        <!-- bottom-right diagonal tail -->
        <div style="position:absolute;right:-140px;bottom:-100px;width:520px;height:120px;transform:rotate(28deg);background:#222b96;"></div>
        <div style="position:absolute;right:-126px;bottom:-52px;width:500px;height:22px;transform:rotate(28deg);background:#4b33c8;"></div>
        <div style="position:absolute;right:-112px;bottom:-24px;width:480px;height:22px;transform:rotate(28deg);background:#ffffff;"></div>
        <div style="position:absolute;right:-98px;bottom:4px;width:460px;height:22px;transform:rotate(28deg);background:#f0bf2a;"></div>
  
        <!-- circular photo with white ring + purple ring -->
        <div
          style="
            position:absolute; right:24px; bottom:24px;
            width:420px; height:420px; border-radius:50%;
            background:#ffffff; box-shadow:0 8px 24px rgba(0,0,0,.25);
            overflow:visible;
          "
        >
          <div style="position:absolute; inset:10px; border-radius:50%; background:#4b33c8;"></div>
          <img
            src="/your-image.png"
            alt="person"
            style="
              position:absolute; inset:22px; width:376px; height:376px;
              object-fit:cover; border-radius:50%;
              background:#ddd;
            "
          />
        </div>
  
        <!-- logo -->
        <div style="position:absolute; left:40px; top:40px; display:flex; align-items:center; gap:12px;">
          <div style="width:28px;height:28px;background:#f0bf2a;border-radius:6px;transform:rotate(45deg);"></div>
          <div style="font-weight:700; letter-spacing:.3px; opacity:.95;">Your Logo</div>
        </div>
  
        <!-- Headline -->
        <div style="position:absolute; left:40px; top:110px; max-width:460px; line-height:1.1;">
          <div style="font-size:64px; font-weight:800;">Digital</div>
          <div style="font-size:64px; font-weight:800; margin-top:6px;">Marketing</div>
          <div style="font-size:64px; font-weight:800; color:#f0bf2a; margin-top:6px;">Agency</div>
        </div>
  
        <!-- Services -->
        <div style="position:absolute; left:40px; top:360px; max-width:440px;">
          <div style="font-size:18px; letter-spacing:.5px; opacity:.9; margin-bottom:18px;">BUSINESS SERVICES:</div>
  
          <div style="display:flex; align-items:flex-start; gap:12px; margin:12px 0;">
            <span style="width:12px;height:12px;border-radius:50%;background:#ffffff;display:inline-block;margin-top:6px;"></span>
            <span style="font-size:18px;">Boost your sales</span>
          </div>
  
          <div style="display:flex; align-items:flex-start; gap:12px; margin:12px 0;">
            <span style="width:12px;height:12px;border-radius:50%;background:#ffffff;display:inline-block;margin-top:6px;"></span>
            <span style="font-size:18px;">Creating Opportunities</span>
          </div>
  
          <div style="display:flex; align-items:flex-start; gap:12px; margin:12px 0;">
            <span style="width:12px;height:12px;border-radius:50%;background:#ffffff;display:inline-block;margin-top:6px;"></span>
            <span style="font-size:18px;">Create a Marketing Strategy</span>
          </div>
  
          <div style="display:flex; align-items:flex-start; gap:12px; margin:12px 0;">
            <span style="width:12px;height:12px;border-radius:50%;background:#ffffff;display:inline-block;margin-top:6px;"></span>
            <span style="font-size:18px;">Analyzing the market</span>
          </div>
        </div>
  
        <!-- CTA button -->
        <a
          href="#"
          style="
            position:absolute; left:40px; bottom:118px;
            display:inline-block; padding:18px 28px;
            background:#ffffff; color:#12153a; text-decoration:none;
            font-weight:800; border-radius:999px;
            box-shadow:0 6px 16px rgba(0,0,0,.25);
          "
        >LEARN MORE</a>
  
        <!-- Website -->
        <div style="position:absolute; left:40px; bottom:64px; font-size:18px; opacity:.95;">
          www.reallygreatsite.com
        </div>
      </div>
    </body>
  </html>
  `
  };
  