export const projectStatusTemplate = {
    _id: 'project-status',
    name: 'Project Status Report',
    description: 'Create and edit HTML documents with inline styles',
    category: 'reports-analysis',
    prompt: 'Create an HTML document with inline styles',
    preview: '📋',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Project Status Report</title>
</head>
<body style="font-family: Verdana, sans-serif; background-color: #f0f2f5; padding: 30px;">
  <div style="max-width: 850px; margin: auto; background: #ffffff; padding: 40px; box-shadow: 0 0 10px rgba(0,0,0,0.08);">
    <h1 style="text-align: center; color: #333;">Project Status Report</h1>
    <p><strong>Project Name:</strong> Orion Revamp Initiative</p>
    <p><strong>Project Manager:</strong> Nina Wallace</p>
    <p><strong>Date:</strong> August 25, 2025</p>

    <h3 style="color: #0d47a1;">Status Summary</h3>
    <p><strong>Overall Status:</strong> :large_green_circle: On Track</p>
    <p><strong>Timeline:</strong> 75% complete</p>
    <p><strong>Budget Usage:</strong> $210,000 / $300,000</p>

    <h2 style="color: #0d47a1;">Key Milestones</h2>
    <ul>
      <li>Design Phase – :white_check_mark: Completed July 15</li>
      <li>Development Phase – :large_yellow_circle: In Progress (ETA Sept 20)</li>
      <li>Testing Phase – :hourglass_flowing_sand: Begins Sept 21</li>
    </ul>

    <h2 style="color: #0d47a1;">Risks & Issues</h2>
    <ul>
      <li>Risk: Possible delay in API integration – Mitigation: Extend vendor contract.</li>
      <li>Issue: One designer on leave – Coverage provided by external contractor.</li>
    </ul>

    <h2 style="color: #0d47a1;">Next Steps</h2>
    <ul>
      <li>Complete dev sprint 6 by Aug 31</li>
      <li>Schedule QA readiness review</li>
      <li>Draft product release notes</li>
    </ul>
  </div>
</body>
</html>
  `
  };
  