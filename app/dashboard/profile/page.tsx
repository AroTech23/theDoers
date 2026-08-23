'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Link as LinkIcon, 
  Globe, 
  Phone, 
  Camera, 
  Users, 
  X, 
  Check, 
  Code2,
  Sparkles
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { MOCK_DOERS } from '@/lib/mockData';

export default function EditProfilePage() {
  const currentDoer = MOCK_DOERS[0];

  const [fullName, setFullName] = useState(currentDoer.full_name || 'Alex Chen');
  const [headline, setHeadline] = useState(currentDoer.bio || 'Software Engineering student interested in AI');
  const [about, setAbout] = useState('I build robust, production-grade applications with a focus on machine learning and scalable web backend architectures. Eager to solve real-world problems through clean code.');
  const [program, setProgram] = useState(currentDoer.program || 'Computer Science');
  const [year, setYear] = useState(currentDoer.year || 'Year 3');
  
  // Skills
  const [skills, setSkills] = useState(['Python', 'React', 'Machine Learning', 'UI/UX']);
  const [skillInput, setSkillInput] = useState('');
  
  // Social Links
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/alexchen');
  const [github, setGithub] = useState('https://github.com/alexchen');
  const [website, setWebsite] = useState('https://alexchen.dev');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const [savedToast, setSavedToast] = useState(false);

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
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E2E8F0]">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors mb-2"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Edit Profile</h1>
            <p className="text-xs text-[#64748B] mt-0.5">Update the information visitors see on your public portfolio.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href={`/doers/${currentDoer.username || currentDoer.id}?from=dashboard`}>
              <Button variant="outline" size="sm" className="text-xs font-bold">
                View Public Portfolio ↗
              </Button>
            </Link>
            <Button onClick={handleSave} variant="primary" size="sm" className="text-xs font-bold shadow-xs">
              Save Changes
            </Button>
          </div>
        </div>

        {/* 2-Column Balanced Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Core Identity & Bio (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Profile Information Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <h2 className="text-base font-bold text-[#0F172A] mb-5 pb-3 border-b border-[#F1F5F9]">
                Profile Information
              </h2>
              
              {/* Avatar Section */}
              <div className="flex items-center mb-6 gap-5">
                <Avatar name={fullName} imageUrl={currentDoer.avatar_url} size="lg" className="w-16 h-16 text-lg shadow-2xs" />
                <div className="space-y-1.5">
                  <Button variant="outline" size="sm" className="text-xs font-semibold py-1">
                    Change Photo
                  </Button>
                  <div>
                    <button className="text-[11px] font-semibold text-red-500 hover:text-red-700 cursor-pointer">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              {/* Program & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                    Program *
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Data Science">Data Science</option>
                    <option value="UX Design">UX Design</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Information Systems">Information Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                    Year of Study *
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  >
                    <option value="Year 1">Year 1</option>
                    <option value="Year 2">Year 2</option>
                    <option value="Year 3">Year 3</option>
                    <option value="Year 4">Year 4</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>

              {/* Headline */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider">
                    Profile Headline *
                  </label>
                  <span className="text-[10px] text-[#64748B] font-mono">{headline.length} / 80</span>
                </div>
                <input
                  type="text"
                  maxLength={80}
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Brief professional headline"
                  className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              {/* About / Bio */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider">
                    About *
                  </label>
                  <span className="text-[10px] text-[#64748B] font-mono">{about.length} / 500</span>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell visitors about your background and engineering passion..."
                  className="w-full rounded-xl border border-[#E2E8F0] p-3.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] leading-relaxed"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Skills & Profile Links (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Skills Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#F1F5F9]">
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">Skills &amp; Technologies</h2>
                  <p className="text-[11px] text-[#64748B]">Tags that highlight your tech stack.</p>
                </div>
                <span className="text-[10px] font-bold text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-full">
                  {skills.length}/10
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0]"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-[#94A3B8] hover:text-red-600 cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>

              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                placeholder="Type a skill and press Enter..."
                className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

            {/* Profile Links Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <h2 className="text-base font-bold text-[#0F172A] mb-1">Profile Links</h2>
              <p className="text-[11px] text-[#64748B] mb-4 pb-3 border-b border-[#F1F5F9]">
                Add links displayed on your public portfolio.
              </p>

              <div className="space-y-3">
                {/* LinkedIn */}
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">LinkedIn</label>
                  <div className="relative flex items-center">
                    <LinkIcon className="absolute left-3 text-[#94A3B8] w-3.5 h-3.5" />
                    <input
                      type="text"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                  </div>
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">GitHub</label>
                  <div className="relative flex items-center">
                    <Code2 className="absolute left-3 text-[#94A3B8] w-3.5 h-3.5" />
                    <input
                      type="text"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                  </div>
                </div>

                {/* Personal Website */}
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">Personal Website</label>
                  <div className="relative flex items-center">
                    <Globe className="absolute left-3 text-[#94A3B8] w-3.5 h-3.5" />
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">WhatsApp Phone</label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-3 text-[#94A3B8] w-3.5 h-3.5" />
                    <input
                      type="text"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+237 600 000 000"
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Status & Action */}
            <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] flex items-center justify-between">
              <span className="text-xs text-[#64748B]">
                {savedToast ? (
                  <span className="text-[#059669] font-bold flex items-center gap-1">
                    <Check size={14} /> Changes saved!
                  </span>
                ) : (
                  'Unsaved edits will be lost'
                )}
              </span>
              <Button onClick={handleSave} variant="primary" size="sm" className="font-bold text-xs shadow-xs">
                Save Changes
              </Button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
