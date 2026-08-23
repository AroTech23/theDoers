'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  AlertCircle,
  Loader2
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export default function EditProfilePage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [headline, setHeadline] = useState('');
  const [about, setAbout] = useState('');
  const [program, setProgram] = useState('Computer Science');
  const [year, setYear] = useState('Year 3');
  const [username, setUsername] = useState('');
  
  // Skills
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  
  // Social Links
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [website, setWebsite] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const [savedToast, setSavedToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch logged in student's live profile & skills from Supabase
  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUserId(user.id);

        // Fetch User details
        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (profile) {
          setFullName(profile.full_name || '');
          setHeadline(profile.headline || '');
          setAbout(profile.bio || '');
          setProgram(profile.program || 'Computer Science');
          setYear(profile.year || 'Year 3');
          setUsername(profile.username || '');
          setLinkedin(profile.linkedin_url || '');
          setGithub(profile.github_url || '');
          setWebsite(profile.portfolio_url || '');
          setWhatsapp(profile.whatsapp_url || profile.phone || '');
          setInstagram(profile.instagram_url || '');
          setFacebook(profile.facebook_url || '');
        }

        // Fetch attached skills
        const { data: doerSkills } = await supabase
          .from('doer_skills')
          .select('skill:skills(name)')
          .eq('doer_id', user.id);

        if (doerSkills && doerSkills.length > 0) {
          const loadedSkills = doerSkills
            .map((ds: any) => ds.skill?.name)
            .filter(Boolean);
          setSkills(loadedSkills);
        }
      } catch (err: any) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [supabase]);

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() && skills.length < 10) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput('');
      }
    }
  };

  const removeSkill = (indexToRemove: number) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    setErrorMessage(null);

    try {
      // 1. Update public.users row
      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: fullName.trim(),
          headline: headline.trim() || null,
          bio: about.trim() || null,
          program: program,
          year: year,
          phone: whatsapp.trim() || null,
          linkedin_url: linkedin.trim() || null,
          github_url: github.trim() || null,
          portfolio_url: website.trim() || null,
          whatsapp_url: whatsapp.trim() || null,
          instagram_url: instagram.trim() || null,
          facebook_url: facebook.trim() || null,
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      // 2. Refresh local session name
      if (typeof window !== 'undefined') {
        localStorage.setItem('thedoers_user_name', fullName.trim());
      }

      // 3. Sync skills in public.skills and public.doer_skills
      // Delete old relations
      await supabase.from('doer_skills').delete().eq('doer_id', userId);

      // Insert new skills
      for (const sName of skills) {
        let sId: string | null = null;
        const { data: existing } = await supabase
          .from('skills')
          .select('id')
          .eq('name', sName)
          .maybeSingle();

        if (existing) {
          sId = existing.id;
        } else {
          const { data: created } = await supabase
            .from('skills')
            .insert({ name: sName, category: 'General' })
            .select('id')
            .maybeSingle();
          if (created) sId = created.id;
        }

        if (sId) {
          await supabase.from('doer_skills').insert({ doer_id: userId, skill_id: sId });
        }
      }

      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#4F46E5]" />
        <p className="text-xs font-bold text-[#64748B]">Loading your student profile...</p>
      </div>
    );
  }

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
            <Link href={`/doers/${username || 'alexchen'}?from=dashboard`}>
              <Button variant="outline" size="sm" className="text-xs font-bold">
                View Public Portfolio ↗
              </Button>
            </Link>
            <Button onClick={handleSave} variant="primary" size="sm" isLoading={saving} className="text-xs font-bold shadow-xs">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center gap-3 text-xs font-semibold text-[#B91C1C]">
            <AlertCircle size={18} className="shrink-0 text-[#EF4444]" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 2-Column Balanced Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Core Identity & Bio (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Profile Information Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <h2 className="text-base font-bold text-[#0F172A] mb-5 pb-3 border-b border-[#F1F5F9]">
                Profile Information
              </h2>

              {/* Photo Area */}
              <div className="flex items-center gap-5 mb-6">
                <Avatar name={fullName || 'Doer'} size="lg" className="w-16 h-16 text-lg shadow-xs" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#0F172A] block">{fullName}</span>
                  <p className="text-[11px] text-[#64748B]">Profile avatar initialized from your initials.</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider">
                      Program / Degree *
                    </label>
                    <select
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
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
                    <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider">
                      Year of Study *
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
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
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      Profile Headline *
                    </label>
                    <span className="text-[10px] text-[#64748B]">{headline.length}/100</span>
                  </div>
                  <input
                    type="text"
                    maxLength={100}
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Software Engineering student focused on AI systems"
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      About / Bio *
                    </label>
                    <span className="text-[10px] text-[#64748B]">{about.length}/600</span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={600}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Describe your technical background, passions, and what you build..."
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>
            </div>

            {/* Technical Skills Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <h2 className="text-base font-bold text-[#0F172A] mb-1">
                Technical Skills ({skills.length}/10)
              </h2>
              <p className="text-xs text-[#64748B] mb-4">Add the technologies, languages, and frameworks you work with.</p>

              <div className="flex flex-wrap gap-2 mb-3 min-h-[44px] p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#C7D2FE] text-[#4F46E5] text-xs font-bold rounded-lg shadow-2xs"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-[#94A3B8] hover:text-[#EF4444] transition-colors"
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))}
              </div>

              <input
                type="text"
                placeholder="Type a skill (e.g. Next.js, PyTorch, Docker) and press Enter..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

          </div>

          {/* Right Column: Connected Profile Links (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <h2 className="text-base font-bold text-[#0F172A] mb-1">
                Connected Profile Links
              </h2>
              <p className="text-xs text-[#64748B] mb-4">Add your social channels and developer repositories.</p>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-[#64748B] mb-1 flex items-center gap-1.5 uppercase tracking-wider">
                    <LinkIcon size={13} /> LinkedIn
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#64748B] mb-1 flex items-center gap-1.5 uppercase tracking-wider">
                    <Code2 size={13} /> GitHub
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#64748B] mb-1 flex items-center gap-1.5 uppercase tracking-wider">
                    <Globe size={13} /> Personal Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#64748B] mb-1 flex items-center gap-1.5 uppercase tracking-wider">
                    <Phone size={13} /> WhatsApp Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#64748B] mb-1 flex items-center gap-1.5 uppercase tracking-wider">
                    <Camera size={13} /> Instagram
                  </label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/username"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#64748B] mb-1 flex items-center gap-1.5 uppercase tracking-wider">
                    <Users size={13} /> Facebook
                  </label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/username"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>
            </div>

            {/* Sticky Save Changes Bar */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex items-center justify-between shadow-xs">
              <div className="text-xs text-[#64748B]">
                {savedToast ? (
                  <span className="text-[#059669] font-bold flex items-center gap-1">
                    <Check size={14} /> Profile updated successfully!
                  </span>
                ) : (
                  <span>Unsaved changes</span>
                )}
              </div>
              <Button onClick={handleSave} variant="primary" size="sm" isLoading={saving} className="font-bold shadow-xs">
                Save Changes
              </Button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
