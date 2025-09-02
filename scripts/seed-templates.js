const { MongoClient } = require('mongodb');
const { getMongoDBUri, validateMongoDBUri } = require('../lib/mongoUri');

const MONGODB_URI = getMongoDBUri();

if (!MONGODB_URI || !validateMongoDBUri(MONGODB_URI)) {
  throw new Error('Invalid MongoDB URI. Please check your MongoDB configuration.');
}


const templates = [
  {
    name: 'Project Proposal',
    description: 'A comprehensive project proposal template',
    category: 'Business',
    content: `# Project Proposal

## Executive Summary
[Brief overview of the project]

## Project Overview
### Background
[Context and background information]

### Objectives
- [Primary objective 1]
- [Primary objective 2]
- [Primary objective 3]

### Scope
[What is included and excluded from the project]

## Methodology
### Approach
[Description of the approach]

### Timeline
- **Phase 1**: [Description and duration]
- **Phase 2**: [Description and duration]
- **Phase 3**: [Description and duration]

## Budget
[Budget breakdown and justification]

## Risk Assessment
[Identified risks and mitigation strategies]

## Conclusion
[Summary and next steps]`,
    contentHtml: `<h1>Project Proposal</h1>

<h2>Executive Summary</h2>
<p>[Brief overview of the project]</p>

<h2>Project Overview</h2>
<h3>Background</h3>
<p>[Context and background information]</p>

<h3>Objectives</h3>
<ul>
<li>[Primary objective 1]</li>
<li>[Primary objective 2]</li>
<li>[Primary objective 3]</li>
</ul>

<h3>Scope</h3>
<p>[What is included and excluded from the project]</p>

<h2>Methodology</h2>
<h3>Approach</h3>
<p>[Description of the approach]</p>

<h3>Timeline</h3>
<ul>
<li><strong>Phase 1</strong>: [Description and duration]</li>
<li><strong>Phase 2</strong>: [Description and duration]</li>
<li><strong>Phase 3</strong>: [Description and duration]</li>
</ul>

<h2>Budget</h2>
<p>[Budget breakdown and justification]</p>

<h2>Risk Assessment</h2>
<p>[Identified risks and mitigation strategies]</p>

<h2>Conclusion</h2>
<p>[Summary and next steps]</p>`,
    prompt: 'Create a professional project proposal for [project name] with clear objectives, methodology, timeline, and budget considerations.',
    isSystem: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Technical Report',
    description: 'A structured technical report template',
    category: 'Technical',
    content: `# Technical Report

## Abstract
[Brief summary of the report]

## Introduction
### Purpose
[Purpose of the report]

### Scope
[Scope and limitations]

## Technical Details
### System Architecture
[Description of the system architecture]

### Implementation
[Implementation details and approach]

### Results
[Results and findings]

## Analysis
### Performance Metrics
[Key performance indicators and metrics]

### Comparison
[Comparison with alternatives or benchmarks]

## Conclusions
[Summary of findings and conclusions]

## Recommendations
[Specific recommendations for future work]

## References
[List of references and sources]`,
    contentHtml: `<h1>Technical Report</h1>

<h2>Abstract</h2>
<p>[Brief summary of the report]</p>

<h2>Introduction</h2>
<h3>Purpose</h3>
<p>[Purpose of the report]</p>

<h3>Scope</h3>
<p>[Scope and limitations]</p>

<h2>Technical Details</h2>
<h3>System Architecture</h3>
<p>[Description of the system architecture]</p>

<h3>Implementation</h3>
<p>[Implementation details and approach]</p>

<h3>Results</h3>
<p>[Results and findings]</p>

<h2>Analysis</h2>
<h3>Performance Metrics</h3>
<p>[Key performance indicators and metrics]</p>

<h3>Comparison</h3>
<p>[Comparison with alternatives or benchmarks]</p>

<h2>Conclusions</h2>
<p>[Summary of findings and conclusions]</p>

<h2>Recommendations</h2>
<p>[Specific recommendations for future work]</p>

<h2>References</h2>
<p>[List of references and sources]</p>`,
    prompt: 'Write a comprehensive technical report about [topic] including system architecture, implementation details, results, and recommendations.',
    isSystem: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Blog Post',
    description: 'An engaging blog post template',
    category: 'Content',
    content: `# [Blog Post Title]

## Introduction
[Engaging opening that hooks the reader]

## Main Content
### Section 1: [Topic]
[First main point with supporting details]

### Section 2: [Topic]
[Second main point with supporting details]

### Section 3: [Topic]
[Third main point with supporting details]

## Key Takeaways
- [Key point 1]
- [Key point 2]
- [Key point 3]

## Conclusion
[Wrap up and call to action]

---
*Published on [Date] | [Author Name]*`,
    contentHtml: `<h1>[Blog Post Title]</h1>

<h2>Introduction</h2>
<p>[Engaging opening that hooks the reader]</p>

<h2>Main Content</h2>
<h3>Section 1: [Topic]</h3>
<p>[First main point with supporting details]</p>

<h3>Section 2: [Topic]</h3>
<p>[Second main point with supporting details]</p>

<h3>Section 3: [Topic]</h3>
<p>[Third main point with supporting details]</p>

<h2>Key Takeaways</h2>
<ul>
<li>[Key point 1]</li>
<li>[Key point 2]</li>
<li>[Key point 3]</li>
</ul>

<h2>Conclusion</h2>
<p>[Wrap up and call to action]</p>

<hr>
<p><em>Published on [Date] | [Author Name]</em></p>`,
    prompt: 'Create an engaging blog post about [topic] with a compelling introduction, clear sections, and actionable takeaways.',
    isSystem: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Resume',
    description: 'A professional resume template',
    category: 'Career',
    content: `# [Your Name]

## Contact Information
- **Email**: [your.email@example.com]
- **Phone**: [Your Phone Number]
- **LinkedIn**: [LinkedIn Profile URL]
- **Location**: [City, State]

## Professional Summary
[2-3 sentence summary of your professional background and career objectives]

## Work Experience
### [Job Title] | [Company Name]
*[Start Date] - [End Date]*
- [Key achievement or responsibility]
- [Key achievement or responsibility]
- [Key achievement or responsibility]

### [Job Title] | [Company Name]
*[Start Date] - [End Date]*
- [Key achievement or responsibility]
- [Key achievement or responsibility]
- [Key achievement or responsibility]

## Education
### [Degree] | [University Name]
*[Graduation Year]*
- [Relevant coursework or achievement]

## Skills
- **Technical Skills**: [Skill 1], [Skill 2], [Skill 3]
- **Soft Skills**: [Skill 1], [Skill 2], [Skill 3]
- **Languages**: [Language 1], [Language 2]

## Certifications
- [Certification 1] - [Issuing Organization] ([Year])
- [Certification 2] - [Issuing Organization] ([Year])`,
    contentHtml: `<h1>[Your Name]</h1>

<h2>Contact Information</h2>
<ul>
<li><strong>Email</strong>: [your.email@example.com]</li>
<li><strong>Phone</strong>: [Your Phone Number]</li>
<li><strong>LinkedIn</strong>: [LinkedIn Profile URL]</li>
<li><strong>Location</strong>: [City, State]</li>
</ul>

<h2>Professional Summary</h2>
<p>[2-3 sentence summary of your professional background and career objectives]</p>

<h2>Work Experience</h2>
<h3>[Job Title] | [Company Name]</h3>
<p><em>[Start Date] - [End Date]</em></p>
<ul>
<li>[Key achievement or responsibility]</li>
<li>[Key achievement or responsibility]</li>
<li>[Key achievement or responsibility]</li>
</ul>

<h3>[Job Title] | [Company Name]</h3>
<p><em>[Start Date] - [End Date]</em></p>
<ul>
<li>[Key achievement or responsibility]</li>
<li>[Key achievement or responsibility]</li>
<li>[Key achievement or responsibility]</li>
</ul>

<h2>Education</h2>
<h3>[Degree] | [University Name]</h3>
<p><em>[Graduation Year]</em></p>
<ul>
<li>[Relevant coursework or achievement]</li>
</ul>

<h2>Skills</h2>
<ul>
<li><strong>Technical Skills</strong>: [Skill 1], [Skill 2], [Skill 3]</li>
<li><strong>Soft Skills</strong>: [Skill 1], [Skill 2], [Skill 3]</li>
<li><strong>Languages</strong>: [Language 1], [Language 2]</li>
</ul>

<h2>Certifications</h2>
<ul>
<li>[Certification 1] - [Issuing Organization] ([Year])</li>
<li>[Certification 2] - [Issuing Organization] ([Year])</li>
</ul>`,
    prompt: 'Create a professional resume for [position] highlighting relevant experience, skills, and achievements.',
    isSystem: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedTemplates() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db();
    const templatesCollection = db.collection('templates');
    
    // Clear existing templates
    await templatesCollection.deleteMany({ isSystem: true });
    
    // Insert new templates
    const result = await templatesCollection.insertMany(templates);
    
    await client.close();
  } catch (error) {
    console.error('Error seeding templates:', error);
  }
}

seedTemplates();