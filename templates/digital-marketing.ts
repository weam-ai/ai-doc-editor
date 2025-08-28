export const digitalMarketingTemplate = {
    _id: 'digital-marketing',
    name: 'Digital Marketing',
    description: 'Create and edit HTML documents with inline styles',
    category: 'all',
    prompt: 'Create an HTML document with inline styles for a digital marketing',
    preview: '🌐',
    editor: 'html',
  
    contentHtml: `
  <div style="position: relative; width: 800px; height: 600px; margin: 0 auto; padding: 40px; 
              background: linear-gradient(135deg, #0d47a1, #1976d2); color: #fff; border-radius: 10px;">

    <!-- Logo -->
    <div style="font-size: 16px; margin-bottom: 30px; display: flex; align-items: center;">
      <div style="width: 14px; height: 14px; background: #f4d06f; margin-right: 8px; border-radius: 2px;"></div>
      <span>Salford &amp; co.</span>
    </div>

    <!-- Title -->
    <h1 style="font-size: 48px; margin: 0; line-height: 1.1; font-weight: 700;">
      Digital <br> Marketing
    </h1>
    <h2 style="font-size: 36px; margin: 10px 0 20px; font-style: italic; color: #f4d06f;">
      Agency
    </h2>

    <!-- Description -->
    <p style="font-size: 18px; max-width: 500px; margin-bottom: 30px; line-height: 1.6;">
      Engage, inspire, and convert with our social media expertise. Elevate your brand on platforms that matter.
    </p>

    <!-- Button -->
    <a href="#" style="display: inline-block; background: #f4d06f; color: #000; text-decoration: none; padding: 12px 24px; font-weight: bold; border-radius: 4px; margin-bottom: 40px;">
      JOIN NOW
    </a>

    <!-- Contact Info -->
    <div style="font-size: 18px; margin-top: 30px;">
      <p style="margin: 6px 0;">123-456-7890</p>
      <p style="margin: 6px 0;">123 Anywhere st., Any City</p>
    </div>

    <!-- Simple Icon Placeholder -->
    <div style="position: absolute; bottom: 40px; right: 40px; width: 80px; height: 80px; background: #f4d06f; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #000;">
      📢
    </div>

  </div>`
  };
  