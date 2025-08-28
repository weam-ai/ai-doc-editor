# Templates Directory

This directory contains all the template files for the AI Docs application. Each template is defined as a separate TypeScript file for better organization and maintainability.

## Structure

Each template file exports a single template object with the following structure:

```typescript
export const templateName = {
  _id: string;           // Unique identifier
  name: string;          // Display name
  description: string;   // Template description
  category: string;      // Template category
  prompt: string;        // AI prompt for generation
  preview: string;       // Emoji or icon preview
  content: string;       // Markdown content
  contentHtml: string;   // HTML content
};
```

## Available Templates

### Job Applications
- `emily-anderson-resume.ts` - Professional resume template
- `sarah-johnson-resume.ts` - Creative resume template  
- `james-johnson-resume.ts` - Executive resume template

### Creative & Marketing
- `marcus-sterling-portfolio.ts` - Graphic designer portfolio
- `sarah-mitchell-portfolio.ts` - Senior brand designer portfolio

### Business Communications
- `business-proposal.ts` - Professional business proposal
- `meeting-minutes.ts` - Meeting minutes template

### Reports & Analysis
- `technical-report.ts` - Comprehensive technical report

### General
- `blank-document.ts` - Blank document starter

## Usage

### Importing Templates

```typescript
// Import individual templates
import { blankDocumentTemplate } from '@/templates/blank-document';
import { emilyAndersonResumeTemplate } from '@/templates/emily-anderson-resume';

// Import all templates
import { allTemplates } from '@/templates';
```

### Adding New Templates

1. Create a new TypeScript file in this directory
2. Follow the template structure above
3. Export the template object
4. Add the export to `index.ts`
5. Update the `allTemplates` array

### Example Template

```typescript
export const newTemplate = {
  _id: '10',
  name: 'New Template',
  description: 'Description of the template',
  category: 'category-name',
  prompt: 'AI prompt for this template',
  preview: '🎯',
  content: `# Template Content
## In Markdown Format`,
  contentHtml: `<h1>Template Content</h1>
<h2>In HTML Format</h2>`
};
```

## Categories

- `all` - Available to all users
- `job-applications` - Resume and job-related templates
- `creative-marketing` - Design and marketing templates
- `business-communications` - Business document templates
- `reports-analysis` - Technical and analytical templates

## Benefits of This Structure

1. **Modularity**: Each template is in its own file
2. **Maintainability**: Easy to update individual templates
3. **Scalability**: Simple to add new templates
4. **Type Safety**: Full TypeScript support
5. **Organization**: Clear separation of concerns
