import { generateAnnualReportHTML } from '@/html/annual-report-html';

export const annualReportTemplate = {
  _id: 'annual-report-001',
  name: 'Annual Report 2024',
  description: 'Professional annual report with modern purple gradient design',
  category: 'business-reports',
  prompt: 'Create an annual report template for 2024',
  preview: '📊',
  editor: 'annual-report',
  content: JSON.stringify({
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
  }),
  contentHtml: generateAnnualReportHTML({
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
  })
};
