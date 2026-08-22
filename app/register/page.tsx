'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Link as LinkIcon, Code, Globe, Phone, Camera, User, X } from 'lucide-react';
import AuthNavbar from '@/components/layout/AuthNavbar';

const steps = ['Account', 'Profile', 'Skills & Links', 'Review'];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    program: '',
    year: '',
    headline: '',
    about: '',
    links: {
      linkedin: '',
      github: '',
      website: '',
      whatsapp: '',
      instagram: '',
      facebook: ''
    }
  });

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (skills.length < 10 && !skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput('');
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <AuthNavbar rightLink={{ label: 'Log In', href: '/login' }} />
      
      <main className="flex-1 flex flex-col items-center py-12 px-4">
        
        <div className="text-center mb-8 max-w-lg">
          <h1 className="text-3xl font-bold text-[#111827] mb-2">Create your portfolio</h1>
          <p className="text-[#6B7280]">Join theDoers and start showcasing the projects, skills, and work you are building.</p>
        </div>

        <div className="w-full max-w-xl mb-8 flex items-center justify-between px-4">
          {steps.map((label, index) => (
            <div key={label} className="flex items-center">
              <div className={`text-sm font-medium ${currentStep > index ? 'text-[#4F46E5]' : 'text-[#6B7280]'}`}>
                ({index + 1}) {label}
              </div>
              {index < steps.length - 1 && (
                <div className="mx-4 text-[#E5E7EB] font-bold">&rarr;</div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-[#6B7280] mt-1">At least 8 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-[#1F2937] text-white py-3 rounded-lg font-medium hover:bg-[#111827] flex items-center justify-center gap-2"
              >
                Create Account & Continue &rarr;
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-[#6B7280]">
                  Already have an account? <Link href="/login" className="text-[#4F46E5] font-medium">Login</Link>
                </p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Program *</label>
                <select 
                  value={formData.program}
                  onChange={(e) => setFormData({...formData, program: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
                >
                  <option value="">Select a program</option>
                  <option>Computer Science</option>
                  <option>Data Science</option>
                  <option>Information Systems</option>
                  <option>UX Design</option>
                  <option>Cybersecurity</option>
                  <option>Business Analytics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Year of Study *</label>
                <select 
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
                >
                  <option value="">Select year</option>
                  <option>Year 1</option>
                  <option>Year 2</option>
                  <option>Year 3</option>
                  <option>Year 4</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <label className="block text-sm font-medium text-[#111827]">Profile Headline *</label>
                  <span className="text-xs text-[#6B7280]">{formData.headline.length}/80</span>
                </div>
                <input
                  type="text"
                  maxLength={80}
                  value={formData.headline}
                  onChange={(e) => setFormData({...formData, headline: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <label className="block text-sm font-medium text-[#111827]">About *</label>
                  <span className="text-xs text-[#6B7280]">{formData.about.length}/500</span>
                </div>
                <textarea
                  maxLength={500}
                  rows={4}
                  value={formData.about}
                  onChange={(e) => setFormData({...formData, about: e.target.value})}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border border-[#E5E7EB] rounded-lg font-medium text-[#111827] hover:bg-[#F9FAFB]"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-[#1F2937] text-white py-3 rounded-lg font-medium hover:bg-[#111827] flex items-center justify-center gap-2"
                >
                  Continue to Skills & Links &rarr;
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Skills</label>
                <div className="border border-[#E5E7EB] rounded-xl p-2 min-h-[50px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-[#4F46E5] focus-within:border-transparent">
                  {skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-1 bg-[#EEF2FF] text-[#4F46E5] px-3 py-1 rounded-full text-sm">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-[#3730A3] focus:outline-none">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder={skills.length < 10 ? "Type and press Enter..." : ""}
                    disabled={skills.length >= 10}
                    className="flex-1 min-w-[120px] outline-none bg-transparent text-sm px-1 py-1"
                  />
                </div>
                <p className="text-xs text-[#6B7280] mt-1">{skills.length}/10 skills added</p>
              </div>

              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#111827] mb-1">Profile Links</label>
                  <p className="text-xs text-[#6B7280]">Only add links you are comfortable displaying publicly on your portfolio.</p>
                </div>
                
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"><LinkIcon size={18} /></div>
                    <input type="url" placeholder="LinkedIn URL" value={formData.links.linkedin} onChange={(e) => setFormData({...formData, links: {...formData.links, linkedin: e.target.value}})} className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"><Code size={18} /></div>
                    <input type="url" placeholder="GitHub URL" value={formData.links.github} onChange={(e) => setFormData({...formData, links: {...formData.links, github: e.target.value}})} className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"><Globe size={18} /></div>
                    <input type="url" placeholder="Personal Website URL" value={formData.links.website} onChange={(e) => setFormData({...formData, links: {...formData.links, website: e.target.value}})} className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"><Phone size={18} /></div>
                    <input type="tel" placeholder="WhatsApp Phone" value={formData.links.whatsapp} onChange={(e) => setFormData({...formData, links: {...formData.links, whatsapp: e.target.value}})} className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"><Camera size={18} /></div>
                    <input type="url" placeholder="Instagram URL" value={formData.links.instagram} onChange={(e) => setFormData({...formData, links: {...formData.links, instagram: e.target.value}})} className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"><User size={18} /></div>
                    <input type="url" placeholder="Facebook URL" value={formData.links.facebook} onChange={(e) => setFormData({...formData, links: {...formData.links, facebook: e.target.value}})} className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="px-6 py-3 border border-[#E5E7EB] rounded-lg font-medium text-[#111827] hover:bg-[#F9FAFB]">Back</button>
                <button onClick={handleNext} className="flex-1 bg-[#1F2937] text-white py-3 rounded-lg font-medium hover:bg-[#111827] flex items-center justify-center gap-2">Continue to Review &rarr;</button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-[#111827] mb-4">Review your information</h2>
              
              <div className="bg-[#F9FAFB] p-6 rounded-xl border border-[#E5E7EB] space-y-4 text-sm">
                <div>
                  <span className="text-[#6B7280] block mb-1">Account</span>
                  <p className="font-medium text-[#111827]">{formData.name || 'Not provided'} ({formData.email || 'Not provided'})</p>
                </div>
                
                <div>
                  <span className="text-[#6B7280] block mb-1">Education</span>
                  <p className="font-medium text-[#111827]">{formData.program || 'Not provided'} - {formData.year || 'Not provided'}</p>
                </div>

                <div>
                  <span className="text-[#6B7280] block mb-1">Profile Headline</span>
                  <p className="font-medium text-[#111827]">{formData.headline || 'Not provided'}</p>
                </div>

                <div>
                  <span className="text-[#6B7280] block mb-1">Skills</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {skills.length > 0 ? skills.map(s => (
                      <span key={s} className="bg-[#E5E7EB] px-2 py-1 rounded text-xs font-medium text-[#111827]">{s}</span>
                    )) : 'None added'}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="px-6 py-3 border border-[#E5E7EB] rounded-lg font-medium text-[#111827] hover:bg-[#F9FAFB]">Back</button>
                <button className="flex-1 bg-[#4F46E5] text-white py-3 rounded-lg font-medium hover:bg-[#3730A3] flex items-center justify-center gap-2">Submit Portfolio for Review</button>
              </div>
            </div>
          )}

        </div>
      </main>

      <footer className="py-6 px-4 md:px-8 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#6B7280]">
        <div className="font-medium text-[#111827]">theDoers</div>
        <div>© 2024 theDoers</div>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-[#111827]">Terms of Service</Link>
          <Link href="#" className="hover:text-[#111827]">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#111827]">Support</Link>
        </div>
      </footer>
    </div>
  );
}
