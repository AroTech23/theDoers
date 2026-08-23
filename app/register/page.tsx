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
  Edit3,
  AlertCircle
} from 'lucide-react';
import AuthNavbar from '@/components/layout/AuthNavbar';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { createClient } from '@/lib/supabase/client';

const steps = ['Account', 'Profile', 'Skills & Links', 'Review'];

export default function RegisterPage() {
  const supabase = createClient();

  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [skills, setSkills] = useState<string[]>(['Python', 'React', 'Machine Learning', 'TypeScript']);
  const [skillInput, setSkillInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    program: 'Computer Science',
    year: 'Year 3',
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

  const handleNext = () => {
    setErrorMessage(null);
    if (currentStep === 1) {
      if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
        setErrorMessage('Please fill in all required fields in this step.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      if (formData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setErrorMessage(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const cleanUsername = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '') || `user${Date.now().toString().slice(-4)}`;

      // 1. Sign up user via Supabase Auth with full metadata included
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.name.trim(),
            username: cleanUsername,
            phone: formData.links.whatsapp || null,
            program: formData.program,
            year: formData.year,
            headline: formData.headline || null,
            bio: formData.about || null,
            linkedin_url: formData.links.linkedin || null,
            github_url: formData.links.github || null,
            portfolio_url: formData.links.website || null,
            whatsapp_url: formData.links.whatsapp || null,
            instagram_url: formData.links.instagram || null,
            facebook_url: formData.links.facebook || null
          }
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      const userId = authData.user?.id;
      if (!userId) {
        throw new Error('User creation failed. Please try again.');
      }

      // 2. Explicitly ensure public.users is updated
      await supabase
        .from('users')
        .upsert({
          id: userId,
          email: formData.email.trim(),
          full_name: formData.name.trim(),
          username: cleanUsername,
          phone: formData.links.whatsapp || null,
          program: formData.program,
          year: formData.year,
          headline: formData.headline || null,
          bio: formData.about || null,
          linkedin_url: formData.links.linkedin || null,
          github_url: formData.links.github || null,
          portfolio_url: formData.links.website || null,
          whatsapp_url: formData.links.whatsapp || null,
          instagram_url: formData.links.instagram || null,
          facebook_url: formData.links.facebook || null,
          role: 'doer',
          status: 'pending',
          is_featured: false
        }, { onConflict: 'id' });

      // 3. Connect Skills in public.skills & public.doer_skills
      for (const skillName of skills) {
        let skillId: string | null = null;
        
        const { data: existingSkill } = await supabase
          .from('skills')
          .select('id')
          .eq('name', skillName)
          .maybeSingle();

        if (existingSkill) {
          skillId = existingSkill.id;
        } else {
          const { data: newSkill } = await supabase
            .from('skills')
            .insert({ name: skillName, category: 'General' })
            .select('id')
            .maybeSingle();
          if (newSkill) skillId = newSkill.id;
        }

        if (skillId) {
          await supabase
            .from('doer_skills')
            .upsert({ doer_id: userId, skill_id: skillId }, { onConflict: 'doer_id,skill_id' });
        }
      }

      // 4. Store session role & cookies for instant seamless access
      if (typeof window !== 'undefined') {
        localStorage.setItem('thedoers_auth_role', 'doer');
        localStorage.setItem('thedoers_user_name', formData.name.trim());
        document.cookie = "thedoers_auth_role=doer; path=/; max-age=604800; SameSite=Lax;";
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="w-full max-w-3xl mb-6 p-4 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center gap-3 text-xs font-semibold text-[#B91C1C]">
            <AlertCircle size={18} className="shrink-0 text-[#EF4444]" />
            <span>{errorMessage}</span>
          </div>
        )}

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
                  required
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">University / Academic Email *</label>
                <input
                  type="email"
                  required
                  placeholder="alex.chen@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-[11px] text-[#64748B] mt-1">Must be at least 6 characters.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] flex justify-end">
                <Button
                  onClick={handleNext}
                  variant="primary"
                  size="lg"
                  className="font-bold shadow-xs"
                >
                  Continue to Profile Details →
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 2: PROFILE & ACADEMIC DETAILS ── */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-[#F1F5F9] pb-3">
                <h2 className="text-xl font-bold text-[#0F172A]">2. Profile &amp; Academic Background</h2>
                <p className="text-xs text-[#64748B] mt-0.5">Let visitors and recruiters know your field of study and passion.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Program / Degree *</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A] bg-white"
                  >
                    <option>Computer Science</option>
                    <option>Software Engineering</option>
                    <option>Data Science &amp; AI</option>
                    <option>Interactive Design &amp; HCI</option>
                    <option>Cybersecurity</option>
                    <option>Information Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Year of Study *</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A] bg-white"
                  >
                    <option>Year 1</option>
                    <option>Year 2</option>
                    <option>Year 3</option>
                    <option>Year 4</option>
                    <option>Master&apos;s</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">Profile Headline *</label>
                  <span className="text-[10px] text-[#64748B]">{formData.headline.length}/100</span>
                </div>
                <input
                  type="text"
                  maxLength={100}
                  placeholder="e.g. Software Engineering student focused on AI systems & developer tools"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">About / Bio *</label>
                  <span className="text-[10px] text-[#64748B]">{formData.about.length}/600</span>
                </div>
                <textarea
                  rows={4}
                  maxLength={600}
                  placeholder="Tell visitors about your technical passion, problem-solving journey, and what you love building..."
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                />
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] flex justify-between">
                <Button onClick={handleBack} variant="outline" size="lg" className="font-bold">
                  ← Back
                </Button>
                <Button onClick={handleNext} variant="primary" size="lg" className="font-bold shadow-xs">
                  Continue to Skills &amp; Links →
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 3: SKILLS & CONNECTED LINKS ── */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-[#F1F5F9] pb-3">
                <h2 className="text-xl font-bold text-[#0F172A]">3. Technical Skills &amp; Public Links</h2>
                <p className="text-xs text-[#64748B] mt-0.5">Add your technologies and external profile links for recruiter discovery.</p>
              </div>

              {/* Skills Tag Input */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Technical Skills ({skills.length}/10)</label>
                <div className="flex flex-wrap gap-2 mb-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl min-h-[52px]">
                  {skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#C7D2FE] text-[#4F46E5] font-bold text-xs rounded-xl shadow-2xs">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="text-[#94A3B8] hover:text-[#EF4444]">
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                  {skills.length === 0 && (
                    <span className="text-xs text-[#94A3B8] italic self-center">No skills added yet. Type below and press Enter.</span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Type a skill (e.g. Docker, Rust, PyTorch) and press Enter..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                />
              </div>

              {/* Connected Links Grid */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">Connected Links</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1.5 mb-1"><LinkIcon size={13} /> LinkedIn Profile</span>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.links.linkedin}
                      onChange={(e) => setFormData({ ...formData, links: { ...formData.links, linkedin: e.target.value } })}
                      className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1.5 mb-1"><Code size={13} /> GitHub Profile</span>
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      value={formData.links.github}
                      onChange={(e) => setFormData({ ...formData, links: { ...formData.links, github: e.target.value } })}
                      className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1.5 mb-1"><Globe size={13} /> Personal Website / Portfolio</span>
                    <input
                      type="url"
                      placeholder="https://yourname.dev"
                      value={formData.links.website}
                      onChange={(e) => setFormData({ ...formData, links: { ...formData.links, website: e.target.value } })}
                      className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1.5 mb-1"><Phone size={13} /> WhatsApp Contact</span>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      value={formData.links.whatsapp}
                      onChange={(e) => setFormData({ ...formData, links: { ...formData.links, whatsapp: e.target.value } })}
                      className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] flex justify-between">
                <Button onClick={handleBack} variant="outline" size="lg" className="font-bold">
                  ← Back
                </Button>
                <Button onClick={handleNext} variant="primary" size="lg" className="font-bold shadow-xs">
                  Continue to Final Review →
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 4: STRUCTURED REVIEW ── */}
          {currentStep === 4 && (
            <div className="space-y-6">
              
              {!isSubmitted ? (
                <>
                  <div className="border-b border-[#F1F5F9] pb-3">
                    <h2 className="text-xl font-bold text-[#0F172A]">4. Review Portfolio Details</h2>
                    <p className="text-xs text-[#64748B] mt-0.5">Please review your complete submission before creating your account.</p>
                  </div>

                  {/* Summary Breakdown Cards */}
                  <div className="space-y-4">
                    
                    {/* Card 1: Account Credentials */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
                          <User size={14} /> Account Credentials
                        </span>
                        <button onClick={() => setCurrentStep(1)} className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1 cursor-pointer">
                          <Edit3 size={12} /> Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div><span className="text-[#64748B]">Full Name:</span> <strong className="text-[#0F172A]">{formData.name}</strong></div>
                        <div><span className="text-[#64748B]">Email:</span> <strong className="text-[#0F172A]">{formData.email}</strong></div>
                      </div>
                    </div>

                    {/* Card 2: Profile & Bio */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
                          <GraduationCap size={14} /> Academic Background &amp; Bio
                        </span>
                        <button onClick={() => setCurrentStep(2)} className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1 cursor-pointer">
                          <Edit3 size={12} /> Edit
                        </button>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex gap-4">
                          <div><span className="text-[#64748B]">Program:</span> <strong className="text-[#0F172A]">{formData.program}</strong></div>
                          <div><span className="text-[#64748B]">Year:</span> <strong className="text-[#0F172A]">{formData.year}</strong></div>
                        </div>
                        <div>
                          <span className="text-[#64748B] block mb-0.5">Headline:</span>
                          <p className="font-semibold text-[#0F172A] bg-white p-2.5 rounded-xl border border-[#E2E8F0]">{formData.headline || 'No headline added'}</p>
                        </div>
                        <div>
                          <span className="text-[#64748B] block mb-0.5">About Bio:</span>
                          <p className="text-[#334155] bg-white p-3 rounded-xl border border-[#E2E8F0] leading-relaxed">{formData.about || 'No bio added'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Skills & Links */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
                          <Layers size={14} /> Technical Skills &amp; Connected Links
                        </span>
                        <button onClick={() => setCurrentStep(3)} className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1 cursor-pointer">
                          <Edit3 size={12} /> Edit
                        </button>
                      </div>
                      <div className="space-y-3 text-xs">
                        <div>
                          <span className="text-[#64748B] block mb-1.5">Skills ({skills.length}):</span>
                          <div className="flex flex-wrap gap-1.5">
                            {skills.map(s => (
                              <Badge key={s} label={s} className="bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] font-bold" />
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#E2E8F0]">
                          {formData.links.linkedin && <div><span className="text-[#64748B]">LinkedIn:</span> <span className="font-semibold text-[#0F172A]">{formData.links.linkedin}</span></div>}
                          {formData.links.github && <div><span className="text-[#64748B]">GitHub:</span> <span className="font-semibold text-[#0F172A]">{formData.links.github}</span></div>}
                          {formData.links.website && <div><span className="text-[#64748B]">Website:</span> <span className="font-semibold text-[#0F172A]">{formData.links.website}</span></div>}
                          {formData.links.whatsapp && <div><span className="text-[#64748B]">WhatsApp:</span> <span className="font-semibold text-[#0F172A]">{formData.links.whatsapp}</span></div>}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Submission Controls */}
                  <div className="flex gap-4 pt-2">
                    <Button onClick={handleBack} variant="outline" size="lg" className="font-bold">
                      ← Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
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
                    Your account has been created in Supabase. You can now log into your Doer dashboard to start showcasing your engineering projects.
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
