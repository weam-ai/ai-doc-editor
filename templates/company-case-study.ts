export const companycasestudy = {
    _id: 'company-case-study',
    name: 'Company Case Study',
    description: 'Create and edit HTML documents with inline styles',
    category: 'reports-analysis',
    prompt: 'Create an HTML document with inline styles',
    preview: '📈',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Company Case Study - Hanover & Tyke</title>
</head>
<body style="max-width:880px; margin:0 auto; padding:32px 80px; font-family:Arial, sans-serif; background-color:#f5f5f5; color:#333; line-height:1.6;">

  <!-- HEADER -->
  <div style="display:flex; align-items:flex-start; margin-bottom:40px;">
    <div style="flex:1; padding-right:40px;">
      <div style="font-size:18px; font-weight:600; margin-bottom:10px; color:#333;">Hanover &amp; Tyke</div>
      <h1 style="font-size:48px; font-weight:bold; line-height:1.1; margin-bottom:20px; color:#000; text-transform:lowercase;">
        company<br>case study
      </h1>
      <div style="font-size:16px; font-weight:600; margin-bottom:20px; color:#333;">From Vision to Reality</div>
      <div style="font-size:14px; text-align:justify; color:#555;">
        TechSolutions Enterprise faced several challenges that impeded their digital transformation and market presence:
        Complex System Integration, Scalability Issues, and Operational Efficiency bottlenecks.
      </div>
    </div>
    <div style="width:280px; height:200px; flex-shrink:0; border-radius:4px; overflow:hidden;">
      <img src="https://images.stockcake.com/public/6/4/d/64d8f4f9-4646-48cf-beef-a5089439d0b2_large/business-discussion-meeting-stockcake.jpg"
           alt="Professional business meeting discussion"
           style="width:100%; height:100%; object-fit:cover; border-radius:4px;"/>
    </div>
  </div>

  <!-- OBJECTIVES + SOLUTION -->
  <div style="display:flex; margin:50px 0; gap:40px;">
    <div style="flex:1;">
      <h2 style="font-size:18px; font-weight:bold; margin-bottom:20px; color:#333;">Objectives</h2>
      <div style="margin-bottom:20px;">
        <div style="font-size:14px; font-weight:bold; margin-bottom:8px; color:#333;">Streamline System Integration</div>
        <div style="font-size:13px; text-align:justify; color:#555;">
          Implement advanced integration solutions and processes to connect disparate systems more effectively and
          reduce operational complexity.
        </div>
      </div>
      <div style="margin-bottom:20px;">
        <div style="font-size:14px; font-weight:bold; margin-bottom:8px; color:#333;">Enhance Scalability Framework</div>
        <div style="font-size:13px; text-align:justify; color:#555;">
          Introduce cloud-native solutions and practices to support rapid growth in a competitive technology market.
        </div>
      </div>
      <div>
        <div style="font-size:14px; font-weight:bold; margin-bottom:8px; color:#333;">Improve Operational Efficiency</div>
        <div style="font-size:13px; text-align:justify; color:#555;">
          Develop automated workflows to optimize processes and build sustainable operational excellence.
        </div>
      </div>
    </div>

    <div style="flex:1;">
      <h2 style="font-size:18px; font-weight:bold; margin-bottom:20px; color:#333;">Solution</h2>
      <div style="margin-bottom:20px;">
        <div style="font-size:14px; font-weight:bold; margin-bottom:8px; color:#333;">System Integration Optimization</div>
        <ul style="list-style-type:disc; padding-left:20px; margin:0;">
          <li style="font-size:13px; margin-bottom:4px; color:#555;">Advanced API Integration</li>
          <li style="font-size:13px; margin-bottom:4px; color:#555;">Microservices Architecture</li>
        </ul>
      </div>
      <div style="margin-bottom:20px;">
        <div style="font-size:14px; font-weight:bold; margin-bottom:8px; color:#333;">Cloud Infrastructure Development</div>
        <ul style="list-style-type:disc; padding-left:20px; margin:0;">
          <li style="font-size:13px; margin-bottom:4px; color:#555;">Scalable Cloud Platforms</li>
          <li style="font-size:13px; margin-bottom:4px; color:#555;">DevOps Implementation</li>
        </ul>
      </div>
      <div>
        <div style="font-size:14px; font-weight:bold; margin-bottom:8px; color:#333;">Process Automation Strategies</div>
        <ul style="list-style-type:disc; padding-left:20px; margin:0;">
          <li style="font-size:13px; margin-bottom:4px; color:#555;">Workflow Automation Tools</li>
          <li style="font-size:13px; margin-bottom:4px; color:#555;">Performance Analytics Dashboard</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- RESULTS -->
  <div style="background-color:#404040; color:white; padding:30px; margin:50px 0;">
    <h2 style="text-align:center; font-size:24px; font-weight:bold; margin-bottom:30px; letter-spacing:2px;">RESULT</h2>
    <div style="display:flex; gap:40px;">
      <div style="flex:1;">
        <div style="font-size:14px; font-weight:bold; margin-bottom:10px;">System Efficiency</div>
        <div style="font-size:13px; line-height:1.5;">
          Reduced system response time by 45% and cut integration costs by 35% through improved architecture and
          automation practices.
        </div>
      </div>
      <div style="flex:1;">
        <div style="font-size:14px; font-weight:bold; margin-bottom:10px;">Revenue Growth</div>
        <div style="font-size:13px; line-height:1.5;">
          Achieved a 55% increase in operational capacity, driven by successful cloud migration and enhanced system scalability.
        </div>
      </div>
      <div style="flex:1;">
        <div style="font-size:14px; font-weight:bold; margin-bottom:10px;">Performance Metrics</div>
        <div style="font-size:13px; line-height:1.5;">
          System uptime improved by 99.8%, with enhanced monitoring and automated performance optimization across all platforms.
        </div>
      </div>
    </div>
  </div>

  <!-- CONCLUSION -->
  <div style="display:flex; margin:50px 0; gap:40px; align-items:flex-start;">
    <div style="width:280px; height:160px; border-radius:4px; overflow:hidden; flex-shrink:0;">
      <img src="https://page1.genspark.site/v1/base64_upload/dd6eafe589cb988b73efaea4291570f8"
           alt="Modern professional office workspace with desks and computers"
           style="width:100%; height:100%; object-fit:cover; border-radius:4px;"/>
    </div>
    <div style="flex:1;">
      <h2 style="font-size:18px; font-weight:bold; margin-bottom:15px; color:#333;">Conclusion</h2>
      <div style="font-size:13px; text-align:justify; color:#555;">
        TechSolutions Enterprise's strategic focus on optimizing system integration, embracing cloud infrastructure,
        and enhancing operational efficiency has led to substantial business growth. Their commitment to transforming
        challenges into opportunities exemplifies their role as a leader in the technology consulting industry.
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid #ddd;">
    <div style="display:flex; align-items:center; font-size:13px; color:#555;">
      <div style="width:16px; height:16px; background-color:#666; border-radius:50%; margin-right:8px;"></div>
      +123-456-7890
    </div>
    <div style="display:flex; align-items:center; font-size:13px; color:#555;">
      <div style="width:16px; height:16px; background-color:#666; border-radius:50%; margin-right:8px;"></div>
      www.techgreatsite.com
    </div>
    <div style="display:flex; align-items:center; font-size:13px; color:#555;">
      <div style="width:16px; height:16px; background-color:#666; border-radius:50%; margin-right:8px;"></div>
      123 Anywhere St., Any City
    </div>
  </div>

</body>
</html>

  `
  };
  