'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, X, Check, Link as LinkIcon, Code2, Globe, Phone, Users, Share2, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { MOCK_DOERS } from '@/lib/mockData';

export default function EditProfilePage() {
  const currentDoer = MOCK_DOERS[0];
  const [fullName, setFullName] = useState(currentDoer.full_name);
  const [program, setProgram] = useState(currentDoer.program);
  const [year, setYear] = useState(currentDoer.year);
  const [headline, setHeadline] = useState('Software Engineering student interested in AI');
  const [about, setAbout] = useState(currentDoer.bio || '');
  const [skills, setSkills] = useState(['Python', 'React', 'Machine Learning', 'UI/UX']);
  const [skillInput, setSkillInput] = useState('');
  const [savedToast, setSavedToast] = useState(false);

  // Social Links
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/alexchen');
  const [github, setGithub] = useState('https://github.com/alexchen');
  const [website, setWebsite] = useState('https://alexchen.dev');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() && skills.length < 10) {
      e.preventDefault();
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (indexToRemove: number) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24 pt-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">Edit Profile</h1>
            <p className="text-[#6B7280] mt-1 text-sm">Update the information visitors see on your public portfolio.</p>
          </div>
          <Link href={`/doers/${currentDoer.username || currentDoer.id}?from=dashboard`}>
            <Button variant="outline" className="text-[#111827] border-[#E5E7EB] text-xs">
              View Public Portfolio
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#111827] mb-6">Profile Information</h2>
            
            {/* Avatar section */}
            <div className="flex items-center mb-8 gap-6">
              <Avatar name={fullName} imageUrl={currentDoer.avatar_url} size="lg" className="w-20 h-20 text-xl shadow-sm" />
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="border-[#E5E7EB] text-[#111827]">Change Photo</Button>
                <div>
                  <button className="text-xs font-medium text-red-500 hover:text-red-700 cursor-pointer">Remove</button>
                </div>
              </div>
            </div>

            {/* Editable Full Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#111827] mb-1.5">Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Chen"
                className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-1.5">Program *</label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="UX Design">UX Design</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-1.5">Year of Study *</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                >
                  <option value="Year 1">Year 1</option>
                  <option value="Year 2">Year 2</option>
                  <option value="Year 3">Year 3</option>
                  <option value="Year 4">Year 4</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>

            {/* Profile Headline */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-[#111827]">Profile Headline *</label>
                <span className="text-xs text-[#6B7280]">{headline.length} / 80</span>
              </div>
              <input
                type="text"
                maxLength={80}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Brief professional headline"
                className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

            {/* About / Bio */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-[#111827]">About *</label>
                <span className="text-xs text-[#6B7280]">{about.length} / 500</span>
              </div>
              <textarea
                rows={4}
                maxLength={500}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell visitors about your background and engineering passion..."
                className="w-full rounded-xl border border-[#E5E7EB] p-4 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#111827] mb-2">Skills</h2>
            <p className="text-xs text-[#6B7280] mb-6">Add the skills, tools, technologies, or areas you work with.</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <div key={index} className="inline-flex items-center gap-1.5 bg-[#F3F4F6] text-[#111827] px-3 py-1.5 rounded-full text-xs font-semibold">
                  <span>{skill}</span>
                  <button onClick={() => removeSkill(index)} className="text-[#6B7280] hover:text-[#111827] cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
              placeholder="Type a skill and press Enter..."
              className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] mb-2"
            />
            <span className="text-xs text-[#6B7280]">{skills.length} / 10 skills added</span>
          </div>

          {/* Profile Links */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#111827] mb-2">Profile Links</h2>
            <p className="text-xs text-[#6B7280] mb-6">Add links where visitors can learn more about you or connect with you.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LinkedIn */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">LinkedIn</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-[#9CA3AF]">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/student"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              {/* GitHub */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">GitHub</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-[#9CA3AF]">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              {/* Personal Website */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Personal Website</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-[#9CA3AF]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">WhatsApp (Phone)</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-[#9CA3AF]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Instagram</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-[#9CA3AF]">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/username"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              {/* Facebook */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Facebook</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-[#9CA3AF]">
                    <Users className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="https://facebook.com/username"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#9CA3AF] mt-4">
              Helper text: Only add links you are comfortable displaying publicly on your portfolio.
            </p>
          </div>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-between pt-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-[#6B7280]">Cancel</Button>
            </Link>
            <div className="flex items-center gap-4">
              {savedToast && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#059669]">
                  <Check size={16} /> Profile updated successfully.
                </span>
              )}
              <Button onClick={handleSave} className="bg-[#111827] hover:bg-gray-800 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
