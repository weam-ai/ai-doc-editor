export const meetingMinutesTemplate = {
  _id: '9',
  name: 'Meeting Minutes',
  description: 'Professional meeting minutes template',
  category: 'business-communications',
  prompt: 'Create meeting minutes template for professional meetings',
  preview: '📝',
  content: `# Meeting Minutes
## [Meeting Title]

### Meeting Details
- **Date:** [Date]
- **Time:** [Start Time] - [End Time]
- **Location:** [Location/Virtual Platform]
- **Meeting Type:** [Regular/Special/Emergency]
- **Facilitator:** [Name]
- **Secretary:** [Name]

### Attendees
#### Present
- [Name] - [Role/Department]
- [Name] - [Role/Department]
- [Name] - [Role/Department]

#### Absent
- [Name] - [Role/Department] (Reason)
- [Name] - [Role/Department] (Reason)

### Agenda Items

#### 1. [Agenda Item Title]
**Discussion:**
- Key points discussed
- Concerns raised
- Options considered

**Decision:**
- Final decision made
- Rationale for decision

**Action Items:**
- [ ] [Action item] - Assigned to: [Name] - Due: [Date]
- [ ] [Action item] - Assigned to: [Name] - Due: [Date]

#### 2. [Agenda Item Title]
**Discussion:**
- Key points discussed
- Concerns raised
- Options considered

**Decision:**
- Final decision made
- Rationale for decision

**Action Items:**
- [ ] [Action item] - Assigned to: [Name] - Due: [Date]
- [ ] [Action item] - Assigned to: [Name] - Due: [Date]

### Summary of Decisions
1. [Decision 1] - [Brief description]
2. [Decision 2] - [Brief description]
3. [Decision 3] - [Brief description]

### Action Items Summary
| Action Item | Assigned To | Due Date | Status |
|-------------|-------------|----------|--------|
| [Action] | [Name] | [Date] | Pending |
| [Action] | [Name] | [Date] | Pending |
| [Action] | [Name] | [Date] | Pending |

### Next Meeting
- **Date:** [Date]
- **Time:** [Time]
- **Location:** [Location]
- **Agenda Items:** [Preview of next meeting topics]

### Additional Notes
[Any additional information, announcements, or observations]

---
**Minutes prepared by:** [Secretary Name]
**Date prepared:** [Date]
**Distribution:** [List of recipients]`,
  contentHtml: `<h1>Meeting Minutes</h1>
<h2>[Meeting Title]</h2>

<h3>Meeting Details</h3>
<ul>
<li><strong>Date:</strong> [Date]</li>
<li><strong>Time:</strong> [Start Time] - [End Time]</li>
<li><strong>Location:</strong> [Location/Virtual Platform]</li>
<li><strong>Meeting Type:</strong> [Regular/Special/Emergency]</li>
<li><strong>Facilitator:</strong> [Name]</li>
<li><strong>Secretary:</strong> [Name]</li>
</ul>

<h3>Attendees</h3>
<h4>Present</h4>
<ul>
<li>[Name] - [Role/Department]</li>
<li>[Name] - [Role/Department]</li>
<li>[Name] - [Role/Department]</li>
</ul>

<h4>Absent</h4>
<ul>
<li>[Name] - [Role/Department] (Reason)</li>
<li>[Name] - [Role/Department] (Reason)</li>
</ul>

<h3>Agenda Items</h3>

<h4>1. [Agenda Item Title]</h4>
<p><strong>Discussion:</strong></p>
<ul>
<li>Key points discussed</li>
<li>Concerns raised</li>
<li>Options considered</li>
</ul>

<p><strong>Decision:</strong></p>
<ul>
<li>Final decision made</li>
<li>Rationale for decision</li>
</ul>

<p><strong>Action Items:</strong></p>
<ul>
<li>☐ [Action item] - Assigned to: [Name] - Due: [Date]</li>
<li>☐ [Action item] - Assigned to: [Name] - Due: [Date]</li>
</ul>

<h4>2. [Agenda Item Title]</h4>
<p><strong>Discussion:</strong></p>
<ul>
<li>Key points discussed</li>
<li>Concerns raised</li>
<li>Options considered</li>
</ul>

<p><strong>Decision:</strong></p>
<ul>
<li>Final decision made</li>
<li>Rationale for decision</li>
</ul>

<p><strong>Action Items:</strong></p>
<ul>
<li>☐ [Action item] - Assigned to: [Name] - Due: [Date]</li>
<li>☐ [Action item] - Assigned to: [Name] - Due: [Date]</li>
</ul>

<h3>Summary of Decisions</h3>
<ol>
<li>[Decision 1] - [Brief description]</li>
<li>[Decision 2] - [Brief description]</li>
<li>[Decision 3] - [Brief description]</li>
</ol>

<h3>Action Items Summary</h3>
<table style="border-collapse: collapse; width: 100%; border: 1px solid #ddd;">
<thead>
<tr style="background-color: #f2f2f2;">
<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Action Item</th>
<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Assigned To</th>
<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Due Date</th>
<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Status</th>
</tr>
</thead>
<tbody>
<tr>
<td style="border: 1px solid #ddd; padding: 8px;">[Action]</td>
<td style="border: 1px solid #ddd; padding: 8px;">[Name]</td>
<td style="border: 1px solid #ddd; padding: 8px;">[Date]</td>
<td style="border: 1px solid #ddd; padding: 8px;">Pending</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 8px;">[Action]</td>
<td style="border: 1px solid #ddd; padding: 8px;">[Name]</td>
<td style="border: 1px solid #ddd; padding: 8px;">[Date]</td>
<td style="border: 1px solid #ddd; padding: 8px;">Pending</td>
</tr>
</tbody>
</table>

<h3>Next Meeting</h3>
<ul>
<li><strong>Date:</strong> [Date]</li>
<li><strong>Time:</strong> [Time]</li>
<li><strong>Location:</strong> [Location]</li>
<li><strong>Agenda Items:</strong> [Preview of next meeting topics]</li>
</ul>

<h3>Additional Notes</h3>
<p>[Any additional information, announcements, or observations]</p>

<hr>
<p><strong>Minutes prepared by:</strong> [Secretary Name]<br>
<strong>Date prepared:</strong> [Date]<br>
<strong>Distribution:</strong> [List of recipients]</p>`
};
