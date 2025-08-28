interface AnnualReportData {
  companyName: string;
  year: string;
  projectTitle: string;
  presenter: string;
  date: string;
  phone: string;
  website: string;
  email: string;
  address: string;
  aboutCompany: string;
  aboutCompany2: string;
  teamDescription: string;
  vision: string;
  mission: string;
  teamMembers: Array<{ name: string; initials: string; jobTitle: string }>;
  salesData: {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    total: string;
  };
  financialMetrics: {
    productSales: string;
    serviceRevenue: string;
    licensing: string;
    grossMargin: string;
    operatingMargin: string;
    netMargin: string;
  };
  monthlyProfits: Array<{ month: string; amount: string }>;
  achievements: string[];
  challenges: string[];
}

export function generateAnnualReportHTML(data: AnnualReportData): string {
  return `
<div class="annual-report" style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; background: white;">
  
  <!-- Cover Page -->
  <div class="cover-page" style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative; overflow: hidden; padding: 40px; box-sizing: border-box;">
    <!-- Geometric Shapes -->
    <div style="position: absolute; top: 0; right: 0; width: 60%; height: 100%; background: linear-gradient(45deg, #4c1d95, #7c3aed); clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);"></div>
    
    <!-- Title Section -->
    <div style="position: relative; z-index: 2; color: white;">
      <h1 style="font-size: 48px; font-weight: bold; margin: 0; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${data.year} ANNUAL REPORT</h1>
      <h2 style="font-size: 32px; font-weight: 600; margin: 0; margin-bottom: 60px; color: #fbbf24;">${data.projectTitle}</h2>
    </div>
    
    <!-- Company Logo -->
    <div style="position: absolute; top: 40px; right: 40px; z-index: 2; background: rgba(255,255,255,0.9); padding: 15px 25px; border-radius: 8px;">
      <h3 style="margin: 0; color: #1f2937; font-size: 18px; font-weight: bold;">${data.companyName}</h3>
    </div>
    
    <!-- Bottom Info -->
    <div style="position: absolute; bottom: 40px; left: 40px; z-index: 2;">
      <div style="background: rgba(79, 70, 229, 0.9); padding: 15px 25px; border-radius: 8px; margin-bottom: 15px;">
        <p style="margin: 0; color: white; font-size: 16px;"><strong>DATE:</strong> ${data.date}</p>
        <p style="margin: 0; color: white; font-size: 16px;"><strong>PRESENTED BY:</strong> ${data.presenter}</p>
      </div>
    </div>
    
    <div style="position: absolute; bottom: 40px; right: 40px; z-index: 2;">
      <div style="background: rgba(30, 58, 138, 0.9); padding: 15px 25px; border-radius: 8px;">
        <p style="margin: 0; color: white; font-size: 16px;"><strong>Phone:</strong> ${data.phone}</p>
        <p style="margin: 0; color: white; font-size: 16px;"><strong>Website:</strong> ${data.website}</p>
      </div>
    </div>
  </div>
  
  <!-- Table of Contents -->
  <div class="toc-page" style="min-height: 100vh; padding: 40px; background: white; position: relative;">
    <div style="background: #4c1d95; color: white; padding: 15px 25px; border-radius: 8px; display: inline-block; margin-bottom: 30px;">
      <h3 style="margin: 0; font-size: 18px;">${data.companyName}</h3>
    </div>
    
    <div style="position: absolute; top: 40px; right: 40px; background: #4c1d95; color: white; padding: 15px 25px; border-radius: 8px;">
      <span style="font-size: 18px; font-weight: bold;">02</span>
    </div>
    
    <h1 style="font-size: 36px; font-weight: bold; color: #1f2937; margin-bottom: 40px;">Table Of Content</h1>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px;">
      <div>
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 40px; height: 40px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">03</div>
          <span style="font-size: 18px; color: #1f2937;">About Company</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 40px; height: 40px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">04</div>
          <span style="font-size: 18px; color: #1f2937;">Meet Our Team</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 40px; height: 40px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">05</div>
          <span style="font-size: 18px; color: #1f2937;">Vision And Mission</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 40px; height: 40px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">06</div>
          <span style="font-size: 18px; color: #1f2937;">Annual Sales</span>
        </div>
      </div>
      
      <div>
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 40px; height: 40px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">07</div>
          <span style="font-size: 18px; color: #1f2937;">Financial Statements</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 40px; height: 40px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">08</div>
          <span style="font-size: 18px; color: #1f2937;">Monthly Profit</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 40px; height: 40px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">09</div>
          <span style="font-size: 18px; color: #1f2937;">One Year Review</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 40px; height: 40px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">10</div>
          <span style="font-size: 18px; color: #1f2937;">Contact Us</span>
        </div>
      </div>
    </div>
    
    <!-- Cityscape Image Placeholder -->
    <div style="width: 100%; height: 200px; background: linear-gradient(45deg, #1e40af, #7c3aed); border-radius: 8px; position: relative;">
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 18px; text-align: center;">
        <p style="margin: 0;">Cityscape Image</p>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">(Purple overlay effect)</p>
      </div>
    </div>
  </div>
  
  <!-- About Company Page -->
  <div class="about-page" style="min-height: 100vh; padding: 40px; background: white; position: relative;">
    <div style="background: #4c1d95; color: white; padding: 15px 25px; border-radius: 8px; display: inline-block; margin-bottom: 30px;">
      <h3 style="margin: 0; font-size: 18px;">${data.companyName}</h3>
    </div>
    
    <div style="position: absolute; top: 40px; right: 40px; background: #4c1d95; color: white; padding: 15px 25px; border-radius: 8px;">
      <span style="font-size: 18px; font-weight: bold;">03</span>
    </div>
    
    <h1 style="font-size: 36px; font-weight: bold; color: #1f2937; margin-bottom: 30px;">About Company</h1>
    
    <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 30px;">
      ${data.aboutCompany}
    </p>
    
    <!-- Cityscape Image Placeholder -->
    <div style="width: 100%; height: 200px; background: linear-gradient(45deg, #1e40af, #7c3aed); border-radius: 8px; margin: 30px 0; position: relative;">
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 18px; text-align: center;">
        <p style="margin: 0;">Cityscape Image</p>
        <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">(Purple overlay effect)</p>
      </div>
    </div>
    
    <p style="font-size: 16px; line-height: 1.6; color: #374151;">
      ${data.aboutCompany2}
    </p>
  </div>
  
  <!-- Meet Our Team Page -->
  <div class="team-page" style="min-height: 100vh; padding: 40px; background: white; position: relative;">
    <div style="background: #4c1d95; color: white; padding: 15px 25px; border-radius: 8px; display: inline-block; margin-bottom: 30px;">
      <h3 style="margin: 0; font-size: 18px;">${data.companyName}</h3>
    </div>
    
    <div style="position: absolute; top: 40px; right: 40px; background: #4c1d95; color: white; padding: 15px 25px; border-radius: 8px;">
      <span style="font-size: 18px; font-weight: bold;">04</span>
    </div>
    
    <h1 style="font-size: 36px; font-weight: bold; color: #1f2937; margin-bottom: 30px;">Meet Our Team</h1>
    
    <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 40px;">
      ${data.teamDescription}
    </p>
    
    <!-- Team Members Grid -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 40px;">
      <!-- Top Row -->
      ${data.teamMembers.slice(0, 3).map(member => `
        <div style="text-align: center;">
          <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #7c3aed, #a855f7); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">${member.initials}</div>
          <h4 style="margin: 0 0 5px 0; color: #1f2937; font-size: 18px;">${member.name}</h4>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">${member.jobTitle}</p>
        </div>
      `).join('')}
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
      <!-- Bottom Row -->
      ${data.teamMembers.slice(3, 6).map(member => `
        <div style="text-align: center;">
          <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #7c3aed, #a855f7); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">${member.initials}</div>
          <h4 style="margin: 0 0 5px 0; color: #1f2937; font-size: 18px;">${member.name}</h4>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">${member.jobTitle}</p>
        </div>
      `).join('')}
    </div>
    
    <!-- Background Gradient -->
    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 200px; background: linear-gradient(to bottom, #1e40af, #7c3aed); z-index: -1; border-radius: 8px 8px 0 0;"></div>
  </div>
  
  <!-- Content Pages -->
  <div style="padding: 40px; background: white;">
    <h2 style="color: #7c3aed; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Vision And Mission</h2>
    <p>${data.vision}</p>
    <p>${data.mission}</p>
    
    <h2 style="color: #7c3aed; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Annual Sales</h2>
    <p><strong>${data.year} Sales Performance:</strong></p>
    <ul>
      <li>Q1: $${data.salesData.q1}</li>
      <li>Q2: $${data.salesData.q2}</li>
      <li>Q3: $${data.salesData.q3}</li>
      <li>Q4: $${data.salesData.q4}</li>
      <li><strong>Total Annual Sales: $${data.salesData.total}</strong></li>
    </ul>
    
    <h2 style="color: #7c3aed; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Financial Statements</h2>
    <p><strong>Revenue Breakdown:</strong></p>
    <ul>
      <li>Product Sales: ${data.financialMetrics.productSales}</li>
      <li>Service Revenue: ${data.financialMetrics.serviceRevenue}</li>
      <li>Licensing: ${data.financialMetrics.licensing}</li>
    </ul>
    
    <h2 style="color: #7c3aed; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Monthly Profit</h2>
    <p><strong>Monthly Profit Trends (${data.year}):</strong></p>
    <ul>
      ${data.monthlyProfits.map(profit => `<li>${profit.month}: $${profit.amount}</li>`).join('')}
    </ul>
    
    <h2 style="color: #7c3aed; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">One Year Review</h2>
    <p><strong>Major Achievements:</strong></p>
    <ul>
      ${data.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
    </ul>
    
    <h2 style="color: #7c3aed; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">Contact Us</h2>
    <p><strong>${data.companyName}</strong></p>
    <ul>
      <li>Phone: ${data.phone}</li>
      <li>Website: ${data.website}</li>
      <li>Email: ${data.email}</li>
      <li>Address: ${data.address}</li>
    </ul>
    
    <hr style="border: none; height: 2px; background: linear-gradient(90deg, #7c3aed, #a855f7); margin: 40px 0;">
    <p style="text-align: center; color: #6b7280; font-style: italic;">This annual report was presented on ${data.date} by ${data.presenter}</p>
  </div>
  
</div>`;
}
