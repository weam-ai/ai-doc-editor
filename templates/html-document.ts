export const htmlDocumentTemplate = {
  _id: 'html-document',
  name: 'HTML Document',
  description: 'Create and edit HTML documents with inline styles',
  category: 'all',
  prompt: 'Create an HTML document with inline styles',
  preview: '🌐',
  editor: 'html',

  contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Modern Startup Pitch Deck</title>
</head>
<body style="margin: 0; font-family: 'Helvetica Neue', sans-serif; background: #0f1115; color: white;">

  <div style="max-width: 1100px; margin: auto; padding: 40px 60px;">

    <!-- Slide 1: Cover -->
    <section style="text-align: center; background: linear-gradient(135deg, #007cf0, #00dfd8); padding: 100px 40px; border-radius: 16px; margin-bottom: 60px;">
      <h1 style="font-size: 54px; margin: 0; color: #fff;">NovaSpace</h1>
      <p style="font-size: 24px; margin-top: 10px; color: #f0f0f0;">Revolutionizing Satellite Logistics with AI</p>
      <p style="margin-top: 40px; font-size: 16px;">Investor Pitch • August 2025</p>
    </section>

    <!-- Slide 2: Problem -->
    <section style="background: #1a1c20; padding: 60px; border-radius: 12px; margin-bottom: 40px;">
      <h2 style="color: #00e0ff;">1. The Problem</h2>
      <div style="display: flex; gap: 40px; margin-top: 30px;">
        <div style="flex: 1;">
          <h3>:rocket: Satellite Launch Delays</h3>
          <p>Up to 30% of launches face schedule or routing inefficiencies due to outdated coordination systems.</p>
        </div>
        <div style="flex: 1;">
          <h3>:chart_with_downwards_trend: Data Fragmentation</h3>
          <p>Ground control, manufacturers, and clients operate with siloed systems — causing miscommunication and downtime.</p>
        </div>
      </div>
    </section>

    <!-- Slide 3: Our Solution -->
    <section style="background: #22252b; padding: 60px; border-radius: 12px; margin-bottom: 40px;">
      <h2 style="color: #32cdff;">2. Our Solution</h2>
      <p style="font-size: 18px; margin-top: 20px;">NovaSpace builds a cloud-based AI logistics hub that:</p>
      <ul style="line-height: 2; font-size: 17px;">
        <li>:link: Synchronizes satellite readiness with launch providers</li>
        <li>:bar_chart: Automates trajectory + cargo planning</li>
        <li>:globe_with_meridians: Offers real-time launch command dashboard</li>
      </ul>
    </section>

    <!-- Slide 4: Market -->
    <section style="background: #1a1c20; padding: 60px; border-radius: 12px; margin-bottom: 40px;">
      <h2 style="color: #ffbb33;">3. Market Opportunity</h2>
      <p style="font-size: 18px;">The global space logistics market is expected to reach <strong>$27B</strong> by 2030. NovaSpace targets <strong>small-to-mid scale satellite operators</strong> and logistics providers worldwide.</p>
    </section>

    <!-- Slide 5: Product Preview -->
    <section style="background: #23272f; padding: 60px; border-radius: 12px; margin-bottom: 40px;">
      <h2 style="color: #00e676;">4. Platform Preview</h2>
      <img src="https://via.placeholder.com/1000x400?text=Dashboard+Preview" style="width: 100%; border-radius: 12px; margin-top: 20px;">
      <p style="text-align: center; margin-top: 10px; font-size: 14px; color: #ccc;">NovaControl Dashboard UI (prototype)</p>
    </section>

    <!-- Slide 6: Business Model -->
    <section style="background: #1c1f26; padding: 60px; border-radius: 12px; margin-bottom: 40px;">
      <h2 style="color: #2196f3;">5. Business Model</h2>
      <ul style="line-height: 2; font-size: 18px;">
        <li>:moneybag: SaaS: $2K/month per satellite client</li>
        <li>:link: Enterprise licensing for ground control centers</li>
        <li>:chart_with_upwards_trend: API access for integrators and third-party software</li>
      </ul>
    </section>

    <!-- Slide 7: Traction -->
    <section style="background: #282c34; padding: 60px; border-radius: 12px; margin-bottom: 40px;">
      <h2 style="color: #80d8ff;">6. Traction</h2>
      <ul style="line-height: 2; font-size: 18px;">
        <li>:white_check_mark: 12 pilot customers onboarded</li>
        <li>:white_check_mark: $430K ARR with 95% retention</li>
        <li>:white_check_mark: Featured at SpaceTech Expo 2025</li>
      </ul>
    </section>

    <!-- Slide 8: Roadmap -->
    <section style="background: #1a1c20; padding: 60px; border-radius: 12px; margin-bottom: 40px;">
      <h2 style="color: #64dd17;">7. Roadmap</h2>
      <ul style="line-height: 2; font-size: 18px;">
        <li>:test_tube: Q3 2025: Complete beta rollout</li>
        <li>:rocket: Q1 2026: Launch v1.0 with 30+ satellites live</li>
        <li>:earth_africa: Q2 2026: Expand to EU and APAC markets</li>
      </ul>
    </section>

    <!-- Slide 9: Team -->
    <section style="background: #1c1e22; padding: 60px; border-radius: 12px; margin-bottom: 40px;">
      <h2 style="color: #ff4081;">8. Our Team</h2>
      <ul style="line-height: 2; font-size: 18px;">
        <li>:male-astronaut: Jake Warner – CEO, ex-SpaceX logistics lead</li>
        <li>:female-technologist: Lina Cho – CTO, ex-NASA systems engineer</li>
        <li>:dart: Ravi Patel – COO, 10+ yrs in defense tech</li>
      </ul>
    </section>

    <!-- Slide 10: The Ask -->
    <section style="background: #2d323b; padding: 60px; border-radius: 12px; margin-bottom: 40px;">
      <h2 style="color: #f44336;">9. The Ask</h2>
      <p style="font-size: 18px;">We are raising <strong>$2.2M Seed</strong> to:</p>
      <ul style="line-height: 2; font-size: 18px;">
        <li>:chart_with_upwards_trend: Accelerate platform development</li>
        <li>:handshake: Expand client acquisition</li>
        <li>:globe_with_meridians: Build satellite ops partnerships</li>
      </ul>
    </section>

    <!-- Slide 11: Contact -->
    <section style="text-align: center; background: linear-gradient(to right, #007cf0, #00dfd8); padding: 100px 40px; border-radius: 16px; margin-top: 60px;">
      <h2 style="font-size: 32px; margin-bottom: 10px;">Let's launch together :rocket:</h2>
      <p style="font-size: 20px;">:e-mail: founders@novaspace.ai</p>
      <p style="font-size: 14px; margin-top: 30px; color: #eee;">© 2025 NovaSpace • All rights reserved</p>
    </section>

  </div>

</body>
</html>
`
};
