'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Eye, 
  EyeOff, 
  Link as LinkIcon, 
  Code, 
  Globe, 
  Phone, 
  Camera, 
  User, 
  X, 
  CheckCircle2, 
  GraduationCap, 
  FileText, 
  Layers, 
  Sparkles,
  ArrowRight,
  Edit3
} from 'lucide-react';
import AuthNavbar from '@/components/layout/AuthNavbar';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';

const steps = ['Account', 'Profile', 'Skills & Links', 'Review'];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [skills, setSkills] = useState<string[]>(['Python', 'React', 'Machine Learning', 'TypeScript']);
  const [skillInput, setSkillInput] = useState('');

  const [formData, setFormData] = useState({
    name: 'Alex Chen',
    email: 'alex.chen@university.edu',
    password: 'password123',
    confirmPassword: 'password123',
    program: 'Computer Science',
    year: 'Year 3',
    headline: 'Software Engineering student focused on AI systems & developer tools',
    about: 'I am a passionate software engineering student building intelligent systems and web applications. Beyond coursework, I actively contribute to open-source projects and love solving complex real-world data challenges.',
    links: {
      linkedin: 'https://linkedin.com/in/alexchen',
      github: 'https://github.com/alexchen',
      website: 'https://alexchen.dev',
      whatsapp: '+1 (555) 234-5678',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AuthNavbar rightLink={{ label: 'Log In', href: '/login' }} />
      
      <main className="flex-1 flex flex-col items-center py-10 px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center mb-8 max-w-xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-2">
            Create your portfolio
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Join <strong className="text-[#0F172A]">theDoers</strong> and start showcasing the projects, skills, and work you are building.
          </p>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="w-full max-w-3xl mb-8">
          <div className="flex items-center justify-between px-2 sm:px-6">
            {steps.map((label, index) => {
              const stepNum = index + 1;
              const isActive = currentStep === stepNum;
              const isCompleted = currentStep > stepNum;

              return (
                <div key={label} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-2xs ${
                      isActive ? 'bg-[#4F46E5] text-white ring-4 ring-[#EEF2FF]' :
                      isCompleted ? 'bg-[#0F172A] text-white' :
                      'bg-white border border-[#CBD5E1] text-[#64748B]'
                    }`}>
                      {isCompleted ? '✓' : stepNum}
                    </div>
                    <span className={`text-xs hidden sm:inline ${isActive ? 'font-bold text-[#4F46E5]' : isCompleted ? 'font-medium text-[#0F172A]' : 'text-[#64748B]'}`}>
                      {label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 sm:w-16 h-0.5 bg-[#E2E8F0] mx-2 sm:mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xs border border-[#E2E8F0] p-6 sm:p-10">
          
          {/* ── STEP 1: ACCOUNT DETAILS ── */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-[#F1F5F9] pb-3">
                <h2 className="text-xl font-bold text-[#0F172A]">1. Account Information</h2>
                <p className="text-xs text-[#64748B] mt-0.5">Enter your basic login credentials and full legal name.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 text-sm text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">University / Academic Email *</label>
                <input
                  type="email"
                  placeholder="alex.chen@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2.5 text-sm text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-4 py-2.5 text-sm text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-1">At least 8 characters</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-2.5 text-sm text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleNext}
                  variant="primary"
                  size="lg"
                  className="w-full font-bold shadow-xs"
                >
                  Create Account &amp; Continue →
                </Button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-[#64748B]">
                  Already have an account? <Link href="/login" className="text-[#4F46E5] font-bold hover:underline">Log in</Link>
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 2: PROFILE & EDUCATION ── */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-[#F1F5F9] pb-3">
                <h2 className="text-xl font-bold text-[#0F172A]">2. Profile &amp; Studies</h2>
                <p className="text-xs text-[#64748B] mt-0.5">Let visitors and peers know your field of study and technical focus.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Program / Degree *</label>
                  <select 
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
                  >
                    <option value="">Select a program</option>
                    <option>Computer Science</option>
                    <option>Software Engineering</option>
                    <option>Data Science</option>
                    <option>Information Systems</option>
                    <option>UX / Product Design</option>
                    <option>Cybersecurity</option>
                    <option>Business Analytics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Year of Study *</label>
                  <select 
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
                  >
                    <option value="">Select year</option>
                    <option>Year 1 (Freshman)</option>
                    <option>Year 2 (Sophomore)</option>
                    <option>Year 3 (Junior)</option>
                    <option>Year 4 (Senior)</option>
                    <option>Masters / Postgrad</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">Profile Headline *</label>
                  <span className="text-[11px] text-[#64748B]">{formData.headline.length}/80</span>
                </div>
                <input
                  type="text"
                  maxLength={80}
                  placeholder="e.g. Software Engineering student focused on AI systems"
                  value={formData.headline}
                  onChange={(e) => setFormData({...formData, headline: e.target.value})}
                  className="w-full px-4 py-2.5 text-sm text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">About Bio *</label>
                  <span className="text-[11px] text-[#64748B]">{formData.about.length}/500</span>
                </div>
                <textarea
                  maxLength={500}
                  rows={4}
                  placeholder="Tell visitors about what you love building, your engineering passions, and hackathon/project experiences..."
                  value={formData.about}
                  onChange={(e) => setFormData({...formData, about: e.target.value})}
                  className="w-full px-4 py-2.5 text-sm text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  size="lg"
                  className="px-6 font-bold"
                >
                  ← Back
                </Button>
                <Button
                  onClick={handleNext}
                  variant="primary"
                  size="lg"
                  className="flex-1 font-bold shadow-xs"
                >
                  Continue to Skills &amp; Links →
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 3: SKILLS & PROFILE LINKS ── */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-[#F1F5F9] pb-3">
                <h2 className="text-xl font-bold text-[#0F172A]">3. Skills &amp; Social Links</h2>
                <p className="text-xs text-[#64748B] mt-0.5">Add your core technical skills and public contact links.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Technical Skills &amp; Stack *</label>
                <div className="border border-[#E2E8F0] rounded-2xl p-3 min-h-[56px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-[#4F46E5] bg-white">
                  {skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-1.5 bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] px-3 py-1 rounded-xl text-xs font-bold">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-[#3730A3]">
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder={skills.length < 10 ? "Type a skill & press Enter..." : ""}
                    disabled={skills.length >= 10}
                    className="flex-1 min-w-[150px] outline-none bg-transparent text-xs py-1 text-[#0F172A]"
                  />
                </div>
                <p className="text-[11px] text-[#64748B] mt-1">{skills.length}/10 skills added</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">Public Profile Links</label>
                <p className="text-[11px] text-[#64748B] mb-3">Add links you are comfortable displaying publicly on your portfolio.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"><LinkIcon size={16} /></div>
                    <input type="url" placeholder="LinkedIn URL" value={formData.links.linkedin} onChange={(e) => setFormData({...formData, links: {...formData.links, linkedin: e.target.value}})} className="w-full pl-10 pr-3.5 py-2 text-xs text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"><Code size={16} /></div>
                    <input type="url" placeholder="GitHub URL" value={formData.links.github} onChange={(e) => setFormData({...formData, links: {...formData.links, github: e.target.value}})} className="w-full pl-10 pr-3.5 py-2 text-xs text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"><Globe size={16} /></div>
                    <input type="url" placeholder="Personal Website" value={formData.links.website} onChange={(e) => setFormData({...formData, links: {...formData.links, website: e.target.value}})} className="w-full pl-10 pr-3.5 py-2 text-xs text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"><Phone size={16} /></div>
                    <input type="tel" placeholder="WhatsApp Phone" value={formData.links.whatsapp} onChange={(e) => setFormData({...formData, links: {...formData.links, whatsapp: e.target.value}})} className="w-full pl-10 pr-3.5 py-2 text-xs text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"><Camera size={16} /></div>
                    <input type="url" placeholder="Instagram URL" value={formData.links.instagram} onChange={(e) => setFormData({...formData, links: {...formData.links, instagram: e.target.value}})} className="w-full pl-10 pr-3.5 py-2 text-xs text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"><User size={16} /></div>
                    <input type="url" placeholder="Facebook URL" value={formData.links.facebook} onChange={(e) => setFormData({...formData, links: {...formData.links, facebook: e.target.value}})} className="w-full pl-10 pr-3.5 py-2 text-xs text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  size="lg"
                  className="px-6 font-bold"
                >
                  ← Back
                </Button>
                <Button
                  onClick={handleNext}
                  variant="primary"
                  size="lg"
                  className="flex-1 font-bold shadow-xs"
                >
                  Continue to Review →
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 4: COMPLETE & FORMATTED REVIEW ── */}
          {currentStep === 4 && (
            <div className="space-y-6">
              
              {!isSubmitted ? (
                <>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0]">
                    <CheckCircle2 size={24} className="text-[#059669] flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-[#065F46]">Ready for Final Review</h3>
                      <p className="text-xs text-[#047857] mt-0.5">Please confirm all information below before submitting your portfolio for platform approval.</p>
                    </div>
                  </div>

                  {/* Section 1: Account Snapshot */}
                  <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                        <User size={15} className="text-[#4F46E5]" /> 1. Account Credentials
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(1)} 
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3]"
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[#64748B] block mb-0.5">Full Name</span>
                        <p className="font-bold text-[#0F172A]">{formData.name || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-[#64748B] block mb-0.5">Academic Email</span>
                        <p className="font-bold text-[#0F172A]">{formData.email || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Profile & Education */}
                  <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                        <GraduationCap size={15} className="text-[#4F46E5]" /> 2. Profile &amp; Bio
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(2)} 
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3]"
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="text-[#64748B] block mb-0.5">Program / Degree</span>
                          <p className="font-bold text-[#0F172A]">{formData.program || 'Not selected'}</p>
                        </div>
                        <div>
                          <span className="text-[#64748B] block mb-0.5">Year of Study</span>
                          <p className="font-bold text-[#0F172A]">{formData.year || 'Not selected'}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-[#64748B] block mb-0.5">Profile Headline</span>
                        <p className="font-semibold text-[#0F172A] bg-white p-2.5 rounded-xl border border-[#E2E8F0]">
                          {formData.headline || 'No headline entered'}
                        </p>
                      </div>

                      <div>
                        <span className="text-[#64748B] block mb-0.5">About Bio</span>
                        <p className="text-[#334155] leading-relaxed bg-white p-3 rounded-xl border border-[#E2E8F0]">
                          {formData.about || 'No bio entered'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Skills & Profile Links */}
                  <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                        <Layers size={15} className="text-[#4F46E5]" /> 3. Skills &amp; Public Links
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(3)} 
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3]"
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-[#64748B] block mb-1.5">Technical Skills ({skills.length})</span>
                        <div className="flex flex-wrap gap-1.5">
                          {skills.length > 0 ? (
                            skills.map(s => (
                              <Badge key={s} label={s} className="bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] font-bold text-xs px-2.5 py-1 rounded-lg" />
                            ))
                          ) : (
                            <span className="text-[#94A3B8]">No skills added</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="text-[#64748B] block mb-1.5">Connected Links</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {formData.links.linkedin && (
                            <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-[#E2E8F0] text-[#0F172A] font-medium truncate">
                              <LinkIcon size={14} className="text-[#4F46E5] flex-shrink-0" />
                              <span className="truncate">{formData.links.linkedin}</span>
                            </div>
                          )}
                          {formData.links.github && (
                            <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-[#E2E8F0] text-[#0F172A] font-medium truncate">
                              <Code size={14} className="text-[#4F46E5] flex-shrink-0" />
                              <span className="truncate">{formData.links.github}</span>
                            </div>
                          )}
                          {formData.links.website && (
                            <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-[#E2E8F0] text-[#0F172A] font-medium truncate">
                              <Globe size={14} className="text-[#4F46E5] flex-shrink-0" />
                              <span className="truncate">{formData.links.website}</span>
                            </div>
                          )}
                          {formData.links.whatsapp && (
                            <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-[#E2E8F0] text-[#0F172A] font-medium truncate">
                              <Phone size={14} className="text-[#4F46E5] flex-shrink-0" />
                              <span className="truncate">{formData.links.whatsapp}</span>
                            </div>
                          )}
                          {!formData.links.linkedin && !formData.links.github && !formData.links.website && !formData.links.whatsapp && (
                            <span className="text-[#94A3B8] col-span-2">No public links attached</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission Buttons */}
                  <div className="flex gap-4 pt-2">
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      size="lg"
                      className="px-6 font-bold"
                    >
                      ← Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      variant="primary"
                      size="lg"
                      className="flex-1 font-bold shadow-xs bg-[#10B981] hover:bg-[#059669]"
                    >
                      Submit Portfolio for Review 🚀
                    </Button>
                  </div>
                </>
              ) : (
                /* Post-Submission Success State */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0F172A]">Portfolio Submitted Successfully!</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
                    Your student portfolio has been sent for admin verification. You can now log into your Doer dashboard and start building project case studies.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <Link href="/dashboard">
                      <Button variant="primary" size="lg" className="font-bold shadow-xs">
                        Go to Doer Dashboard →
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 md:px-12 border-t border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#64748B] bg-white">
        <div className="font-bold text-[#0F172A]">theDoers</div>
        <div>© 2024 theDoers. All rights reserved.</div>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-[#0F172A]">About Us</Link>
          <Link href="#" className="hover:text-[#0F172A]">Terms of Service</Link>
          <Link href="#" className="hover:text-[#0F172A]">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#0F172A]">Support</Link>
        </div>
      </footer>
    </div>
  );
}
