export const twoColumnResumeTemplate = {
  _id: 'two-column-resume',
  name: 'Two-Column Resume Template',
  description: 'Professional two-column resume template with modern layout and customizable sections',
  category: 'job-applications',
  prompt: 'Create a professional resume template with a two-column layout, customizable sections, and modern styling',
  preview: '📄',
  editor: 'two-column',
  content: `<div style="background-color: #1e40af; color: white; padding: 20px; margin: -20px -20px 20px -20px; border-radius: 8px 8px 0 0;">
  <h1 style="color: white; margin: 0; font-size: 2.5rem; font-weight: bold;">[Your Name]</h1>
  <h2 style="color: white; margin: 10px 0 0 0; font-size: 1.5rem; font-weight: normal;">[Your Professional Title]</h2>
</div>

<div style="display: flex; gap: 20px;">
  <div style="flex: 1; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="width: 120px; height: 120px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: #666; font-size: 24px;">
        👤
      </div>
    </div>

    ### PROFILE
    [Write a compelling summary of your professional background, key skills, and career objectives. This should be 2-3 sentences that highlight your most relevant experience and what you bring to potential employers.]

    [Add a second paragraph about your specialized skills and expertise in your field. Mention specific areas where you excel and what makes you unique.]

    [Include a third paragraph about your career goals and what you're seeking in your next role. Be specific about the type of opportunities you're looking for.]

    ### LANGUAGE
    [List your language proficiencies, e.g., English (Native), Spanish (Conversational)]

    ### CONTACT
    📧 [your.email@example.com]  
    📱 [Your Phone Number]  
    💼 [Your LinkedIn Profile]  
    📍 [City, State]
  </div>

  <div style="flex: 2;">
    ### SKILLS
    • [Skill 1]  
    • [Skill 2]  
    • [Skill 3]  
    • [Skill 4]  
    • [Skill 5]  
    • [Skill 6]  
    • [Skill 7]  
    • [Skill 8]

    ### EDUCATION
    **[Year Range]**  
    **[University Name]**  
    [Degree], [Status]

    **[Year Range]**  
    **[University Name]**  
    [Degree], [Status]

    ### EXPERIENCE
    **[Company Name]** | [Position] | [Date Range]
    • [Key achievement or responsibility with measurable results]
    • [Key achievement or responsibility with measurable results]
    • [Key achievement or responsibility with measurable results]

    **[Company Name]** | [Position] | [Date Range]
    • [Key achievement or responsibility with measurable results]
    • [Key achievement or responsibility with measurable results]
    • [Key achievement or responsibility with measurable results]

    **[Company Name]** | [Position] | [Date Range]
    • [Key achievement or responsibility with measurable results]
    • [Key achievement or responsibility with measurable results]
    • [Key achievement or responsibility with measurable results]
  </div>
</div>`,
  contentHtml: `<div  class="ProseMirror" style="background-color: #1e40af; color: white; padding: 20px; margin: -20px -20px 20px -20px; border-radius: 8px 8px 0 0;">
  <h1 style="color: white; margin: 0; font-size: 2.5rem; font-weight: bold;">[Your Name]</h1>
  <h2 style="color: white; margin: 10px 0 0 0; font-size: 1.5rem; font-weight: normal;">[Your Professional Title]</h2>
</div>

<div style="display: flex; gap: 20px;">
  <div style="flex: 1; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
    

    <h3>PROFILE</h3>
    <p>[Write a compelling summary of your professional background, key skills, and career objectives. This should be 2-3 sentences that highlight your most relevant experience and what you bring to potential employers.]</p>
    
    <p>[Add a second paragraph about your specialized skills and expertise in your field. Mention specific areas where you excel and what makes you unique.]</p>
    
    <p>[Include a third paragraph about your career goals and what you're seeking in your next role. Be specific about the type of opportunities you're looking for.]</p>

    <blockquote>LANGUAGE</blockquote>
    <p>[List your language proficiencies, e.g., English (Native), Spanish (Conversational)]</p>

    <blockquote>CONTACT</blockquote>
    <p>📧 [your.email@example.com]<br>
    📱 [Your Phone Number]<br>
    💼 [Your LinkedIn Profile]<br>
    📍 [City, State]</p>
  </div>

  <div style="flex: 2;">
    <blockquote>SKILLS</blockquote>
    <p>
    • [Skill 1]<br>
    • [Skill 2]<br>
    • [Skill 3]<br>
    • [Skill 4]<br>
    • [Skill 5]<br>
    • [Skill 6]<br>
    • [Skill 7]<br>
    • [Skill 8]</p>

    <blockquote>EDUCATION</blockquote>
    <p><strong>[Year Range]</strong><br>
    <strong>[University Name]</strong><br>
    [Degree], [Status]</p>

    <p><strong>[Year Range]</strong><br>
    <strong>[University Name]</strong><br>
    [Degree], [Status]</p>

    <blockquote>EXPERIENCE</blockquote>
    <p><strong>[Company Name]</strong> | [Position] | [Date Range]</p>
    <ul>
    <li>[Key achievement or responsibility with measurable results]</li>
    <li>[Key achievement or responsibility with measurable results]</li>
    <li>[Key achievement or responsibility with measurable results]</li>
    </ul>

    <p><strong>[Company Name]</strong> | [Position] | [Date Range]</p>
    <ul>
    <li>[Key achievement or responsibility with measurable results]</li>
    <li>[Key achievement or responsibility with measurable results]</li>
    <li>[Key achievement or responsibility with measurable results]</li>
    </ul>

    <p><strong>[Company Name]</strong> | [Position] | [Date Range]</p>
    <ul>
    <li>[Key achievement or responsibility with measurable results]</li>
    <li>[Key achievement or responsibility with measurable results]</li>
    <li>[Key achievement or responsibility with measurable results]</li>
    </ul>
  </div>
</div>`
};
