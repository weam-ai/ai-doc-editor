export const twoColumnProfileTemplate = {
  _id: 'two-column-profile',
  name: 'Two-Column Professional Profile',
  description: 'Modern two-column layout with personal info on left and professional details on right',
  category: 'job-applications',
  prompt: 'Create a professional profile template with a two-column layout separating personal information and professional experience',
  preview: '👔',
  useCustomEditor: true, // Flag to use custom two-column editor
  content: `# Two-Column Professional Profile

## Personal Information (Left Side)

### Contact Details
📧 [your.email@example.com]
📱 [Your Phone Number]
💼 [Your LinkedIn Profile]
📍 [City, State, Country]
🌐 [Your Website/Portfolio]

### Personal Summary
[Write a compelling personal summary that highlights your unique qualities, values, and what drives you professionally. This should be 2-3 sentences that give readers insight into who you are as a person.]

### Languages
🇺🇸 English (Native)
🇪🇸 Spanish (Fluent)
🇫🇷 French (Conversational)

### Interests & Hobbies
[List 3-4 professional or personal interests that showcase your personality and work-life balance]

---

## Professional Experience (Right Side)

### Professional Summary
[Write a comprehensive professional summary that outlines your career objectives, key strengths, and what you bring to potential employers. This should be 3-4 sentences that highlight your most relevant experience and expertise.]

### Core Skills

**Technical Skills:**
• [Skill 1]
• [Skill 2]
• [Skill 3]

**Soft Skills:**
• [Skill 1]
• [Skill 2]
• [Skill 3]

### Work Experience

**[Company Name]** | [Position] | [Date Range]
• [Key achievement or responsibility with measurable results]
• [Key achievement or responsibility with measurable results]
• [Key achievement or responsibility with measurable results]

**[Company Name]** | [Position] | [Date Range]
• [Key achievement or responsibility with measurable results]
• [Key achievement or responsibility with measurable results]
• [Key achievement or responsibility with measurable results]

### Education
**[Year Range]** | [University Name]
[Degree] - [Status]
[Relevant coursework or achievements]

### Certifications & Awards
🏆 [Award/Certification 1] - [Year]
🏆 [Award/Certification 2] - [Year]
🏆 [Award/Certification 3] - [Year]`,
  contentHtml: `<table style="width: 100%; border-collapse: collapse;">
  <tr>
    <td style="width: 40%; vertical-align: top; padding: 20px; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #3b82f6;">
      <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px;">Personal Information</h2>
      
      <h3 style="color: #374151; margin-bottom: 15px;">Contact Details</h3>
      <p>📧 [your.email@example.com]</p>
      <p>📱 [Your Phone Number]</p>
      <p>💼 [Your LinkedIn Profile]</p>
      <p>📍 [City, State, Country]</p>
      <p>🌐 [Your Website/Portfolio]</p>

      <h3 style="color: #374151; margin: 25px 0 15px 0;">Personal Summary</h3>
      <p style="text-align: justify; line-height: 1.6;">
        [Write a compelling personal summary that highlights your unique qualities, values, and what drives you professionally. This should be 2-3 sentences that give readers insight into who you are as a person.]
      </p>

      <h3 style="color: #374151; margin: 25px 0 15px 0;">Languages</h3>
      <p>🇺🇸 English (Native)</p>
      <p>🇪🇸 Spanish (Fluent)</p>
      <p>🇫🇷 French (Conversational)</p>

      <h3 style="color: #374151; margin: 25px 0 15px 0;">Interests & Hobbies</h3>
      <p>[List 3-4 professional or personal interests that showcase your personality and work-life balance]</p>
    </td>
    
    <td style="width: 60%; vertical-align: top; padding: 20px;">
      <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px;">Professional Experience</h2>
      
      <h3 style="color: #374151; margin-bottom: 15px;">Professional Summary</h3>
      <p style="text-align: justify; line-height: 1.6; margin-bottom: 20px;">
        [Write a comprehensive professional summary that outlines your career objectives, key strengths, and what you bring to potential employers. This should be 3-4 sentences that highlight your most relevant experience and expertise.]
      </p>

      <h3 style="color: #374151; margin: 25px 0 15px 0;">Core Skills</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">
        <div style="background-color: #f0f9ff; padding: 12px; border-radius: 8px; border-left: 3px solid #0ea5e9;">
          <strong>Technical Skills</strong>
          <ul style="margin: 8px 0 0 0; padding-left: 20px;">
            <li>[Skill 1]</li>
            <li>[Skill 2]</li>
            <li>[Skill 3]</li>
          </ul>
        </div>
        <div style="background-color: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 3px solid #22c55e;">
          <strong>Soft Skills</strong>
          <ul style="margin: 8px 0 0 0; padding-left: 20px;">
            <li>[Skill 1]</li>
            <li>[Skill 2]</li>
            <li>[Skill 3]</li>
          </ul>
        </div>
      </div>

      <h3 style="color: #374151; margin: 25px 0 15px 0;">Work Experience</h3>
      <div style="margin-bottom: 20px;">
        <h4 style="color: #4b5563; margin-bottom: 8px;">[Company Name] | [Position] | [Date Range]</h4>
        <ul style="margin: 8px 0 0 0; padding-left: 20px;">
          <li>[Key achievement or responsibility with measurable results]</li>
          <li>[Key achievement or responsibility with measurable results]</li>
          <li>[Key achievement or responsibility with measurable results]</li>
        </ul>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="color: #4b5563; margin-bottom: 8px;">[Company Name] | [Position] | [Date Range]</h4>
        <ul style="margin: 8px 0 0 0; padding-left: 20px;">
          <li>[Key achievement or responsibility with measurable results]</li>
          <li>[Key achievement or responsibility with measurable results]</li>
          <li>[Key achievement or responsibility with measurable results]</li>
        </ul>
      </div>

      <h3 style="color: #374151; margin: 25px 0 15px 0;">Education</h3>
      <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 3px solid #f59e0b;">
        <h4 style="color: #92400e; margin-bottom: 8px;">[Year Range] | [University Name]</h4>
        <p style="margin: 0;"><strong>[Degree]</strong> - [Status]</p>
        <p style="margin: 5px 0 0 0; color: #92400e;">[Relevant coursework or achievements]</p>
      </div>

      <h3 style="color: #374151; margin: 25px 0 15px 0;">Certifications & Awards</h3>
      <ul style="margin: 8px 0 0 0; padding-left: 20px;">
        <li>🏆 [Award/Certification 1] - [Year]</li>
        <li>🏆 [Award/Certification 2] - [Year]</li>
        <li>🏆 [Award/Certification 3] - [Year]</li>
      </ul>
    </td>
  </tr>
</table>`
};
