'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';

interface TwoColumnEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TwoColumnEditor({ content, onChange }: TwoColumnEditorProps) {
  const [leftContent, setLeftContent] = useState({
    contact: {
      email: '[your.email@example.com]',
      phone: '[Your Phone Number]',
      linkedin: '[Your LinkedIn Profile]',
      location: '[City, State, Country]',
      website: '[Your Website/Portfolio]'
    },
    summary: '[Write a compelling personal summary that highlights your unique qualities, values, and what drives you professionally. This should be 2-3 sentences that give readers insight into who you are as a person.]',
    languages: {
      english: 'English (Native)',
      spanish: 'Spanish (Fluent)',
      french: 'French (Conversational)'
    },
    interests: '[List 3-4 professional or personal interests that showcase your personality and work-life balance]'
  });

  const [rightContent, setRightContent] = useState({
    summary: '[Write a comprehensive professional summary that outlines your career objectives, key strengths, and what you bring to potential employers. This should be 3-4 sentences that highlight your most relevant experience and expertise.]',
    technicalSkills: ['[Skill 1]', '[Skill 2]', '[Skill 3]'],
    softSkills: ['[Skill 1]', '[Skill 2]', '[Skill 3]'],
    experience: [
      {
        company: '[Company Name]',
        position: '[Position]',
        dates: '[Date Range]',
        achievements: ['[Key achievement or responsibility with measurable results]', '[Key achievement or responsibility with measurable results]', '[Key achievement or responsibility with measurable results]']
      },
      {
        company: '[Company Name]',
        position: '[Position]',
        dates: '[Date Range]',
        achievements: ['[Key achievement or responsibility with measurable results]', '[Key achievement or responsibility with measurable results]', '[Key achievement or responsibility with measurable results]']
      }
    ],
    education: {
      years: '[Year Range]',
      university: '[University Name]',
      degree: '[Degree]',
      status: '[Status]',
      coursework: '[Relevant coursework or achievements]'
    },
    certifications: ['[Award/Certification 1] - [Year]', '[Award/Certification 2] - [Year]', '[Award/Certification 3] - [Year]']
  });

  useEffect(() => {
    // Parse existing content if available
    if (content) {
      try {
        const parsed = JSON.parse(content);
        if (parsed.leftContent) setLeftContent(parsed.leftContent);
        if (parsed.rightContent) setRightContent(parsed.rightContent);
      } catch (e) {
        // If parsing fails, use default content
      }
    }
  }, [content]);

  const updateContent = (newLeftContent: any, newRightContent: any) => {
    const fullContent = JSON.stringify({
      leftContent: newLeftContent,
      rightContent: newRightContent
    });
    onChange(fullContent);
  };

  const updateLeftContent = (field: string, subField: string | null, value: string) => {
    const newLeftContent = { ...leftContent };
    if (subField) {
      if (field === 'contact') {
        (newLeftContent.contact as any)[subField] = value;
      } else if (field === 'languages') {
        (newLeftContent.languages as any)[subField] = value;
      }
    } else {
      (newLeftContent as any)[field] = value;
    }
    updateContent(newLeftContent, rightContent);
  };

  const updateRightContent = (field: string, subField: string | null, value: any) => {
    const newRightContent = { ...rightContent };
    if (subField) {
      if (field === 'experience') {
        (newRightContent.experience[parseInt(subField)] as any)[subField] = value;
      } else if (field === 'education') {
        (newRightContent.education as any)[subField] = value;
      }
    } else {
      (newRightContent as any)[field] = value;
    }
    updateContent(leftContent, newRightContent);
  };

  const updateSkill = (type: 'technical' | 'soft', index: number, value: string) => {
    const newRightContent = { ...rightContent };
    if (type === 'technical') {
      newRightContent.technicalSkills[index] = value;
    } else {
      newRightContent.softSkills[index] = value;
    }
    updateContent(leftContent, newRightContent);
  };

  const updateCertification = (index: number, value: string) => {
    const newRightContent = { ...rightContent };
    newRightContent.certifications[index] = value;
    updateContent(leftContent, newRightContent);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
      {/* Left Column - Personal Information */}
      <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-500 pb-2 mb-6">
          Personal Information
        </h2>
        
        {/* Contact Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Contact Details</h3>
          <div className="space-y-2">
            <Input
              value={leftContent.contact.email}
              onChange={(e) => updateLeftContent('contact', 'email', e.target.value)}
              placeholder="Email"
              className="text-sm"
            />
            <Input
              value={leftContent.contact.phone}
              onChange={(e) => updateLeftContent('contact', 'phone', e.target.value)}
              placeholder="Phone"
              className="text-sm"
            />
            <Input
              value={leftContent.contact.linkedin}
              onChange={(e) => updateLeftContent('contact', 'linkedin', e.target.value)}
              placeholder="LinkedIn"
              className="text-sm"
            />
            <Input
              value={leftContent.contact.location}
              onChange={(e) => updateLeftContent('contact', 'location', e.target.value)}
              placeholder="Location"
              className="text-sm"
            />
            <Input
              value={leftContent.contact.website}
              onChange={(e) => updateLeftContent('contact', 'website', e.target.value)}
              placeholder="Website"
              className="text-sm"
            />
          </div>
        </div>

        {/* Personal Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Summary</h3>
          <Textarea
            value={leftContent.summary}
            onChange={(e) => updateLeftContent('summary', null, e.target.value)}
            placeholder="Write your personal summary..."
            className="min-h-[100px] text-sm"
          />
        </div>

        {/* Languages */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Languages</h3>
          <div className="space-y-2">
            <Input
              value={leftContent.languages.english}
              onChange={(e) => updateLeftContent('languages', 'english', e.target.value)}
              placeholder="English proficiency"
              className="text-sm"
            />
            <Input
              value={leftContent.languages.spanish}
              onChange={(e) => updateLeftContent('languages', 'spanish', e.target.value)}
              placeholder="Spanish proficiency"
              className="text-sm"
            />
            <Input
              value={leftContent.languages.french}
              onChange={(e) => updateLeftContent('languages', 'french', e.target.value)}
              placeholder="French proficiency"
              className="text-sm"
            />
          </div>
        </div>

        {/* Interests */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Interests & Hobbies</h3>
          <Textarea
            value={leftContent.interests}
            onChange={(e) => updateLeftContent('interests', null, e.target.value)}
            placeholder="List your interests and hobbies..."
            className="min-h-[80px] text-sm"
          />
        </div>
      </div>

      {/* Right Column - Professional Experience */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-500 pb-2 mb-6">
          Professional Experience
        </h2>
        
        {/* Professional Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Professional Summary</h3>
          <Textarea
            value={rightContent.summary}
            onChange={(e) => updateRightContent('summary', null, e.target.value)}
            placeholder="Write your professional summary..."
            className="min-h-[100px] text-sm"
          />
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Core Skills</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-3 border-blue-400">
              <h4 className="font-semibold text-blue-700 mb-2">Technical Skills</h4>
              <div className="space-y-2">
                {rightContent.technicalSkills.map((skill, index) => (
                  <Input
                    key={index}
                    value={skill}
                    onChange={(e) => updateSkill('technical', index, e.target.value)}
                    placeholder={`Skill ${index + 1}`}
                    className="text-sm"
                  />
                ))}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-3 border-green-400">
              <h4 className="font-semibold text-green-700 mb-2">Soft Skills</h4>
              <div className="space-y-2">
                {rightContent.softSkills.map((skill, index) => (
                  <Input
                    key={index}
                    value={skill}
                    onChange={(e) => updateSkill('soft', index, e.target.value)}
                    placeholder={`Skill ${index + 1}`}
                    className="text-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Work Experience</h3>
          <div className="space-y-4">
            {rightContent.experience.map((exp, index) => (
              <Card key={index} className="p-4">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <Input
                    value={exp.company}
                    onChange={(e) => updateRightContent('experience', index.toString(), { ...exp, company: e.target.value })}
                    placeholder="Company"
                    className="text-sm"
                  />
                  <Input
                    value={exp.position}
                    onChange={(e) => updateRightContent('experience', index.toString(), { ...exp, position: e.target.value })}
                    placeholder="Position"
                    className="text-sm"
                  />
                  <Input
                    value={exp.dates}
                    onChange={(e) => updateRightContent('experience', index.toString(), { ...exp, dates: e.target.value })}
                    placeholder="Date Range"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  {exp.achievements.map((achievement, aIndex) => (
                    <Input
                      key={aIndex}
                      value={achievement}
                      onChange={(e) => {
                        const newAchievements = [...exp.achievements];
                        newAchievements[aIndex] = e.target.value;
                        updateRightContent('experience', index.toString(), { ...exp, achievements: newAchievements });
                      }}
                      placeholder={`Achievement ${aIndex + 1}`}
                      className="text-sm"
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Education</h3>
          <Card className="bg-yellow-50 p-4 border-l-3 border-yellow-400">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Input
                value={rightContent.education.years}
                onChange={(e) => updateRightContent('education', 'years', e.target.value)}
                placeholder="Year Range"
                className="text-sm"
              />
              <Input
                value={rightContent.education.university}
                onChange={(e) => updateRightContent('education', 'university', e.target.value)}
                placeholder="University"
                className="text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Input
                value={rightContent.education.degree}
                onChange={(e) => updateRightContent('education', 'degree', e.target.value)}
                placeholder="Degree"
                className="text-sm"
              />
              <Input
                value={rightContent.education.status}
                onChange={(e) => updateRightContent('education', 'status', e.target.value)}
                placeholder="Status"
                className="text-sm"
              />
            </div>
            <Input
              value={rightContent.education.coursework}
              onChange={(e) => updateRightContent('education', 'coursework', e.target.value)}
              placeholder="Relevant coursework or achievements"
              className="text-sm"
            />
          </Card>
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Certifications & Awards</h3>
          <div className="space-y-2">
            {rightContent.certifications.map((cert, index) => (
              <Input
                key={index}
                value={cert}
                onChange={(e) => updateCertification(index, e.target.value)}
                placeholder={`Award/Certification ${index + 1}`}
                className="text-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
