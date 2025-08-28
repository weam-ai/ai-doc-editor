'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

interface AnnualReportEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function AnnualReportEditor({ content, onChange }: AnnualReportEditorProps) {
  const [reportData, setReportData] = useState({
    companyName: 'Salford & Co.',
    year: '2024',
    projectTitle: 'COMPANY PROJECT',
    presenter: 'Daniel Gallego',
    date: '23 February 2024',
    phone: '+123-456-7890',
    website: 'www.reallygreatsite.com',
    email: 'info@salfordco.com',
    address: '123 Business Street, City, State 12345',
    aboutCompany: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    aboutCompany2: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    teamDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    vision: 'Our vision is to become the leading company in our industry, delivering exceptional value to our customers while maintaining the highest standards of quality and innovation.',
    mission: 'Our mission is to provide innovative solutions that empower businesses to achieve their goals through cutting-edge technology and exceptional service.',
    teamMembers: [
      { name: 'Rufus Stewart', initials: 'RS', jobTitle: 'Job Title' },
      { name: 'Sebastian Bennett', initials: 'SB', jobTitle: 'Job Title' },
      { name: 'Samira Hadid', initials: 'SH', jobTitle: 'Job Title' },
      { name: 'Jonathan Patterson', initials: 'JP', jobTitle: 'Job Title' },
      { name: 'Daniel Gallego', initials: 'DG', jobTitle: 'Job Title' },
      { name: 'Juliana Silva', initials: 'JS', jobTitle: 'Job Title' }
    ],
    salesData: {
      q1: '2.5M',
      q2: '3.1M',
      q3: '3.8M',
      q4: '4.2M',
      total: '13.6M'
    },
    financialMetrics: {
      productSales: '65%',
      serviceRevenue: '25%',
      licensing: '10%',
      grossMargin: '42%',
      operatingMargin: '18%',
      netMargin: '12%'
    },
    monthlyProfits: [
      { month: 'January', amount: '180K' },
      { month: 'February', amount: '195K' },
      { month: 'March', amount: '210K' },
      { month: 'April', amount: '225K' },
      { month: 'May', amount: '240K' },
      { month: 'June', amount: '255K' },
      { month: 'July', amount: '270K' },
      { month: 'August', amount: '285K' },
      { month: 'September', amount: '300K' },
      { month: 'October', amount: '315K' },
      { month: 'November', amount: '330K' },
      { month: 'December', amount: '345K' }
    ],
    achievements: [
      'Launched 3 new product lines',
      'Expanded to 5 new markets',
      'Increased customer satisfaction to 94%',
      'Reduced operational costs by 15%',
      'Hired 25 new team members'
    ],
    challenges: [
      'Successfully navigated supply chain disruptions',
      'Implemented remote work infrastructure',
      'Launched digital transformation initiatives'
    ]
  });

  useEffect(() => {
    // Parse existing content if available
    if (content) {
      try {
        const parsed = JSON.parse(content);
        setReportData(parsed);
      } catch (e) {
        // If parsing fails, use default content
      }
    }
  }, [content]);

  const updateReportData = (newData: any) => {
    setReportData(newData);
    onChange(JSON.stringify(newData));
  };

  const updateField = (field: string, value: any) => {
    const newData = { ...reportData };
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      (newData as any)[parent][child] = value;
    } else {
      (newData as any)[field] = value;
    }
    updateReportData(newData);
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    const newData = { ...reportData };
    (newData.teamMembers[index] as any)[field] = value;
    updateReportData(newData);
  };

  const updateSalesData = (field: string, value: string) => {
    const newData = { ...reportData };
    (newData.salesData as any)[field] = value;
    updateReportData(newData);
  };

  const updateFinancialMetric = (field: string, value: string) => {
    const newData = { ...reportData };
    (newData.financialMetrics as any)[field] = value;
    updateReportData(newData);
  };

  const updateMonthlyProfit = (index: number, field: string, value: string) => {
    const newData = { ...reportData };
    (newData.monthlyProfits[index] as any)[field] = value;
    updateReportData(newData);
  };

  const updateList = (field: string, index: number, value: string) => {
    const newData = { ...reportData };
    (newData as any)[field][index] = value;
    updateReportData(newData);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="cover" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cover">Cover Page</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        {/* Cover Page Tab */}
        <TabsContent value="cover" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Cover Page Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <Input
                  value={reportData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <Input
                  value={reportData.year}
                  onChange={(e) => updateField('year', e.target.value)}
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <Input
                  value={reportData.projectTitle}
                  onChange={(e) => updateField('projectTitle', e.target.value)}
                  placeholder="COMPANY PROJECT"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Presenter</label>
                <Input
                  value={reportData.presenter}
                  onChange={(e) => updateField('presenter', e.target.value)}
                  placeholder="Presenter Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input
                  value={reportData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  placeholder="23 February 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  value={reportData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+123-456-7890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <Input
                  value={reportData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder="www.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  value={reportData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="info@company.com"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Company Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">About Company (First Paragraph)</label>
                <Textarea
                  value={reportData.aboutCompany}
                  onChange={(e) => updateField('aboutCompany', e.target.value)}
                  placeholder="Company description..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">About Company (Second Paragraph)</label>
                <Textarea
                  value={reportData.aboutCompany2}
                  onChange={(e) => updateField('aboutCompany2', e.target.value)}
                  placeholder="Additional company description..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Team Description</label>
                <Textarea
                  value={reportData.teamDescription}
                  onChange={(e) => updateField('teamDescription', e.target.value)}
                  placeholder="Team description..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Vision</label>
                <Textarea
                  value={reportData.vision}
                  onChange={(e) => updateField('vision', e.target.value)}
                  placeholder="Company vision..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mission</label>
                <Textarea
                  value={reportData.mission}
                  onChange={(e) => updateField('mission', e.target.value)}
                  placeholder="Company mission..."
                  rows={3}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Achievements & Challenges</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Major Achievements</label>
                {reportData.achievements.map((achievement, index) => (
                  <Input
                    key={index}
                    value={achievement}
                    onChange={(e) => updateList('achievements', index, e.target.value)}
                    placeholder={`Achievement ${index + 1}`}
                    className="mb-2"
                  />
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Challenges Overcome</label>
                {reportData.challenges.map((challenge, index) => (
                  <Input
                    key={index}
                    value={challenge}
                    onChange={(e) => updateList('challenges', index, e.target.value)}
                    placeholder={`Challenge ${index + 1}`}
                    className="mb-2"
                  />
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Team Members</h3>
            <div className="grid grid-cols-2 gap-4">
              {reportData.teamMembers.map((member, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Team Member {index + 1}</h4>
                  <div className="space-y-2">
                    <Input
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                      placeholder="Full Name"
                    />
                    <Input
                      value={member.initials}
                      onChange={(e) => updateTeamMember(index, 'initials', e.target.value)}
                      placeholder="Initials"
                    />
                    <Input
                      value={member.jobTitle}
                      onChange={(e) => updateTeamMember(index, 'jobTitle', e.target.value)}
                      placeholder="Job Title"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Financials Tab */}
        <TabsContent value="financials" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sales Data</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Q1 Sales</label>
                <Input
                  value={reportData.salesData.q1}
                  onChange={(e) => updateSalesData('q1', e.target.value)}
                  placeholder="2.5M"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Q2 Sales</label>
                <Input
                  value={reportData.salesData.q2}
                  onChange={(e) => updateSalesData('q2', e.target.value)}
                  placeholder="3.1M"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Q3 Sales</label>
                <Input
                  value={reportData.salesData.q3}
                  onChange={(e) => updateSalesData('q3', e.target.value)}
                  placeholder="3.8M"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Q4 Sales</label>
                <Input
                  value={reportData.salesData.q4}
                  onChange={(e) => updateSalesData('q4', e.target.value)}
                  placeholder="4.2M"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Total Annual Sales</label>
                <Input
                  value={reportData.salesData.total}
                  onChange={(e) => updateSalesData('total', e.target.value)}
                  placeholder="13.6M"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Financial Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Sales %</label>
                <Input
                  value={reportData.financialMetrics.productSales}
                  onChange={(e) => updateFinancialMetric('productSales', e.target.value)}
                  placeholder="65%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Service Revenue %</label>
                <Input
                  value={reportData.financialMetrics.serviceRevenue}
                  onChange={(e) => updateFinancialMetric('serviceRevenue', e.target.value)}
                  placeholder="25%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Licensing %</label>
                <Input
                  value={reportData.financialMetrics.licensing}
                  onChange={(e) => updateFinancialMetric('licensing', e.target.value)}
                  placeholder="10%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gross Profit Margin %</label>
                <Input
                  value={reportData.financialMetrics.grossMargin}
                  onChange={(e) => updateFinancialMetric('grossMargin', e.target.value)}
                  placeholder="42%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Operating Margin %</label>
                <Input
                  value={reportData.financialMetrics.operatingMargin}
                  onChange={(e) => updateFinancialMetric('operatingMargin', e.target.value)}
                  placeholder="18%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Net Profit Margin %</label>
                <Input
                  value={reportData.financialMetrics.netMargin}
                  onChange={(e) => updateFinancialMetric('netMargin', e.target.value)}
                  placeholder="12%"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Profit Trends</h3>
            <div className="grid grid-cols-3 gap-4">
              {reportData.monthlyProfits.map((profit, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <label className="block text-sm font-medium mb-2">{profit.month}</label>
                  <Input
                    value={profit.amount}
                    onChange={(e) => updateMonthlyProfit(index, 'amount', e.target.value)}
                    placeholder="180K"
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
