'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, X, Check, Link as LinkIcon, Code2, Globe, Phone, Users, Share2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function EditProfilePage() {
  const [skills, setSkills] = useState(['Python', 'React', 'Machine Learning', 'UI/UX']);
  const [skillInput, setSkillInput] = useState('');

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

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24 pt-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">Edit Profile</h1>
            <p className="text-[#6B7280] mt-1">Update the information visitors see on your public portfolio.</p>
          </div>
          <Link href="/doers/alexchen">
            <Button variant="outline" className="text-[#111827] border-[#E5E7EB]">
              View Public Portfolio
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
            <h2 className="text-xl font-bold text-[#111827] mb-6">Profile Information</h2>
            
            <div className="flex items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-[#E5E7EB] flex items-center justify-center mr-6 text-[#9CA3AF]">
                <Camera className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="border-[#E5E7EB] text-[#111827]">Change Photo</Button>
                <div>
                  <button className="text-sm font-medium text-red-500 hover:text-red-700">Remove</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Program *</label>
                <select className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]">
                  <option>Computer Science</option>
                  <option>Software Engineering</option>
                  <option>Information Technology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Year of Study *</label>
                <select className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]">
                  <option>Year 1</option>
                  <option>Year 2</option>
                  <option>Year 3</option>
                  <option>Year 4</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#111827] mb-1">Profile Headline *</label>
              <input type="text" defaultValue="Software Engineering student interested in AI" className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-[#6B7280]">43/80</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">About *</label>
              <textarea rows={4} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"></textarea>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-[#6B7280]">240/500</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
            <h2 className="text-xl font-bold text-[#111827]">Skills</h2>
            <p className="text-sm text-[#6B7280] mb-6 mt-1">Add the skills, tools, technologies, or areas you work with.</p>
            
            <div className="p-3 flex flex-wrap gap-2 rounded-xl border border-[#E5E7EB] focus-within:ring-2 focus-within:ring-[#4F46E5]">
              {skills.map((skill, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-[#F3F4F6] text-[#111827]">
                  {skill}
                  <button type="button" onClick={() => removeSkill(i)} className="ml-2 inline-flex items-center justify-center text-[#6B7280] hover:text-[#111827]">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                placeholder="Type a skill and press Enter..."
                className="flex-1 min-w-[200px] outline-none text-[#111827] bg-transparent py-1"
              />
            </div>
            <p className="text-xs text-[#6B7280] mt-2 font-medium">{skills.length} / 10 skills added</p>
          </div>

          {/* Profile Links */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
            <h2 className="text-xl font-bold text-[#111827]">Profile Links</h2>
            <p className="text-sm text-[#6B7280] mb-6 mt-1">Add links where visitors can learn more about you or connect with you.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
                  <LinkIcon className="w-5 h-5" />
                </div>
                <input type="text" placeholder="https://linkedin.com/in/student" className="w-full pl-10 rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
                  <Code2 className="w-5 h-5" />
                </div>
                <input type="text" placeholder="https://github.com/username" className="w-full pl-10 rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
                  <Globe className="w-5 h-5" />
                </div>
                <input type="text" placeholder="https://yourwebsite.com" className="w-full pl-10 rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
                  <Phone className="w-5 h-5" />
                </div>
                <input type="text" placeholder="+1 (555) 000-0000" className="w-full pl-10 rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
                  <Share2 className="w-5 h-5" />
                </div>
                <input type="text" placeholder="https://instagram.com/username" className="w-full pl-10 rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
                  <Users className="w-5 h-5" />
                </div>
                <input type="text" placeholder="https://facebook.com/username" className="w-full pl-10 rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
              </div>
            </div>
            <p className="text-xs text-[#6B7280] mt-4">Only add links you are comfortable displaying publicly on your portfolio.</p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-4 py-4 z-10">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button className="text-sm font-medium text-[#6B7280] hover:text-[#111827]">
            Cancel
          </button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm font-medium text-green-600 hidden">
              <Check className="w-4 h-4 mr-1" /> Profile updated successfully.
            </div>
            <Button className="bg-[#1F2937] hover:bg-gray-800 text-white px-6">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
