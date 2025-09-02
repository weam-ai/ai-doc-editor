export const weeklyProgressReportTemplate = {
    _id: 'weekly-progress-report',
    name: 'Weekly Progress Report',
    description: 'Create and edit HTML documents with inline styles',
    category: 'business-communications',
    prompt: 'Create an HTML document with inline styles',
    preview: '📋',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>GOLDEN WING HOTEL - Weekly Progress Report</title>
</head>
<body style="max-width:880px; margin:0 auto; padding:32px 80px; font-family:Arial, Helvetica, sans-serif; background:#fff; color:#333; box-sizing:border-box;">

  <!-- Header pattern -->
  <div style="height:40px; background-image:url('https://page1.genspark.site/v1/base64_upload/3353c3a30733212e7288f9919009f36a'); background-repeat:repeat; background-size:auto; border-radius:0 0 20px 20px / 0 0 40px 40px; margin-bottom:20px;"></div>

  <!-- Hotel name -->
  <div style="text-align:center; font-size:12px; font-weight:400; color:#666; margin:10px 0 5px; letter-spacing:2px;">GOLDEN WING HOTEL</div>

  <!-- Main title -->
  <h1 style="text-align:center; font-family:Georgia, 'Times New Roman', serif; font-size:36px; font-weight:700; color:#b8860b; margin:0 0 30px; text-shadow:1px 1px 2px rgba(0,0,0,0.1);">
    Weekly Progress Report
  </h1>

  <!-- Form section -->
  <div style="margin-bottom:30px;">
    <div style="display:flex; align-items:center; margin-bottom:15px; font-size:14px;">
      <span style="font-weight:600; min-width:80px; margin-right:15px;">Name:</span>
      <input type="text" placeholder="Insert name here" readonly
             style="flex:1; border:none; border-bottom:1px solid #333; background:transparent; padding:5px 0; font-size:14px; color:#666;"/>
    </div>
    <div style="display:flex; align-items:center; margin-bottom:15px; font-size:14px;">
      <span style="font-weight:600; min-width:80px; margin-right:15px;">Position:</span>
      <input type="text" placeholder="Insert role here" readonly
             style="flex:1; border:none; border-bottom:1px solid #333; background:transparent; padding:5px 0; font-size:14px; color:#666;"/>
    </div>
    <div style="display:flex; align-items:center; margin-bottom:15px; font-size:14px;">
      <span style="font-weight:600; min-width:80px; margin-right:15px;">Date:</span>
      <input type="text" value="Jan 9, 2030" readonly
             style="flex:1; border:none; border-bottom:1px solid #333; background:transparent; padding:5px 0; font-size:14px; color:#666;"/>
    </div>
  </div>

  <!-- Main table -->
  <table style="width:100%; border-collapse:collapse; margin-bottom:30px; border:1px solid #ddd;">
    <thead>
      <tr>
        <th style="background:#daa520; color:#fff; font-weight:600; text-align:center; padding:12px 8px; font-size:14px; letter-spacing:1px;">TIME</th>
        <th style="background:#daa520; color:#fff; font-weight:600; text-align:center; padding:12px 8px; font-size:14px; letter-spacing:1px;">TASK</th>
        <th style="background:#daa520; color:#fff; font-weight:600; text-align:center; padding:12px 8px; font-size:14px; letter-spacing:1px;">REPORT</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid #ddd;">
        <td style="padding:15px 10px; vertical-align:top; font-size:13px; width:20%; text-align:center;">
          <div style="margin:5px 0; font-size:13px;">• HH:MM:SS AM/PM</div>
        </td>
        <td style="padding:15px 10px; vertical-align:top; font-size:13px; width:40%;">
          <label style="margin:5px 0; display:flex; align-items:center;"><input type="checkbox" style="margin-right:8px;"/> <span>You can even make checklists</span></label>
          <label style="margin:5px 0; display:flex; align-items:center;"><input type="checkbox" style="margin-right:8px;"/> <span>Now you can check on your list</span></label>
          <label style="margin:5px 0; display:flex; align-items:center;"><input type="checkbox" style="margin-right:8px;"/> <span>Have another box to tick</span></label>
        </td>
        <td style="padding:15px 10px; vertical-align:top; font-size:13px; width:40%; color:#666;">
          This is what the text looks like when it's inside a table.
        </td>
      </tr>

      <tr style="border-bottom:1px solid #ddd;">
        <td style="padding:15px 10px; vertical-align:top; font-size:13px; width:20%; text-align:center;">
          <div style="margin:5px 0; font-size:13px;">• HH:MM:SS AM/PM</div>
        </td>
        <td style="padding:15px 10px; vertical-align:top; font-size:13px; width:40%;">
          <label style="margin:5px 0; display:flex; align-items:center;"><input type="checkbox" style="margin-right:8px;"/> <span>You can even make checklists</span></label>
          <label style="margin:5px 0; display:flex; align-items:center;"><input type="checkbox" style="margin-right:8px;"/> <span>Now you can check on your list</span></label>
          <label style="margin:5px 0; display:flex; align-items:center;"><input type="checkbox" style="margin-right:8px;"/> <span>Have another box to tick</span></label>
        </td>
        <td style="padding:15px 10px; vertical-align:top; font-size:13px; width:40%; color:#666;">
          This is what the text looks like when it's inside a table.
        </td>
      </tr>

      <tr>
        <td style="padding:15px 10px; vertical-align:top; font-size:13px; width:20%; text-align:center;">
          <div style="margin:5px 0; font-size:13px;">• HH:MM:SS AM/PM</div>
        </td>
        <td style="padding:15px 10px; vertical-align:top; font-size:13px; width:40%;">
          <label style="margin:5px 0; display:flex; align-items:center;"><input type="checkbox" style="margin-right:8px;"/> <span>You can even make checklists</span></label>
          <label style="margin:5px 0; display:flex; align-items:center;"><input type="checkbox" style="margin-right:8px;"/> <span>Now you can check on your list</span></label>
          <label style="margin:5px 0; display:flex; align-items:center;"><input type="checkbox" style="margin-right:8px;"/> <span>Have another box to tick</span></label>
        </td>
        <td style="padding:15px 10px; vertical-align:top; font-size:13px; width:40%; color:#666;">
          This is what the text looks like when it's inside a table.
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Bottom two-column section -->
  <div style="display:flex; gap:20px; margin-top:30px;">
    <!-- Completed -->
    <div style="flex:1;">
      <div style="background:#daa520; color:#fff; padding:10px 15px; font-weight:600; text-align:center; font-size:14px; letter-spacing:1px; margin:0;">COMPLETED</div>
      <div style="background:#fff8dc; padding:15px; border:1px solid #daa520; border-top:none; min-height:100px;">
        <label style="margin:8px 0; display:flex; align-items:center; font-size:13px;"><input type="checkbox" style="margin-right:8px;"/> You can even make checklists</label>
        <label style="margin:8px 0; display:flex; align-items:center; font-size:13px;"><input type="checkbox" style="margin-right:8px;"/> Now you can check on your list</label>
        <label style="margin:8px 0; display:flex; align-items:center; font-size:13px;"><input type="checkbox" style="margin-right:8px;"/> Have another box to tick</label>
      </div>
    </div>

    <!-- Ongoing -->
    <div style="flex:1;">
      <div style="background:#daa520; color:#fff; padding:10px 15px; font-weight:600; text-align:center; font-size:14px; letter-spacing:1px; margin:0;">ONGOING</div>
      <div style="background:#fff8dc; padding:15px; border:1px solid #daa520; border-top:none; min-height:100px;">
        <div style="margin:8px 0; font-size:13px;">• You can even add bullet points</div>
        <div style="margin:8px 0; font-size:13px;">• Why not have another one</div>
        <div style="margin:8px 0; font-size:13px;">• But wait there's more</div>
      </div>
    </div>
  </div>

</body>
</html>
  `
  };
  