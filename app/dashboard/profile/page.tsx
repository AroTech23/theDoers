'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Loader2,
  Upload,
  Trash2
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export default function EditProfilePage() {
  const supabase = createClient();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [headline, setHeadline] = useState('');
  const [about, setAbout] = useState('');
  const [program, setProgram] = useState('Computer Science');
  const [year, setYear] = useState('Year 3');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  
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
        const { data: profile } = await supabase
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
          setAvatarUrl(profile.avatar_url || null);
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

  // Direct Local Avatar Upload to Supabase Storage
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    try {
      setUploadingAvatar(true);
      setErrorMessage(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `avatar_${userId}_${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) {
        // Fallback: load as local preview DataURL if bucket is creating
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) setAvatarUrl(event.target.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
        setAvatarUrl(publicUrl);
        // Persist avatar_url immediately to public.users
        await supabase
          .from('users')
          .update({ avatar_url: publicUrl })
          .eq('id', userId);
      }
    } catch (err: any) {
      console.error('Avatar upload error:', err);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setAvatarUrl(null);
    if (userId) {
      await supabase
        .from('users')
        .update({ avatar_url: null })
        .eq('id', userId);
    }
  };

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() && skills.length < 10) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (indexToRemove: number) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
    if (!userId) return;

    try {
      setSaving(true);
      setErrorMessage(null);

      // 1. Update Core Profile in public.users
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({
          full_name: fullName.trim(),
          headline: headline.trim(),
          bio: about.trim(),
          program,
          year,
          avatar_url: avatarUrl,
          linkedin_url: linkedin.trim() || null,
          github_url: github.trim() || null,
          portfolio_url: website.trim() || null,
          whatsapp_url: whatsapp.trim() || null,
          phone: whatsapp.trim() || null,
          instagram_url: instagram.trim() || null,
          facebook_url: facebook.trim() || null
        })
        .eq('id', userId);

      if (userUpdateError) throw userUpdateError;

      // 2. Sync Skills
      await supabase.from('doer_skills').delete().eq('doer_id', userId);

      for (const sName of skills) {
        let { data: existingSkill } = await supabase
          .from('skills')
          .select('id')
          .ilike('name', sName)
          .maybeSingle();

        let sId = existingSkill?.id;

        if (!sId) {
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
            <Link href={`/doers/${username || 'doer'}?from=dashboard`}>
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

              {/* Photo Area with Local Upload */}
              <div className="flex items-center gap-5 mb-6">
                <input 
                  type="file" 
                  ref={avatarInputRef}
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleAvatarUpload}
                  className="hidden" 
                />

                <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                  <Avatar name={fullName || 'Doer'} imageUrl={avatarUrl || undefined} size="lg" className="w-20 h-20 text-xl shadow-xs" />
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Camera size={20} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="px-3.5 py-1.5 bg-white border border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC] text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
                    >
                      {uploadingAvatar ? 'Uploading...' : 'Upload Photo'}
                    </button>
                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="text-xs font-semibold text-[#EF4444] hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-1.5">
                    JPG, PNG or WEBP · 500x500 recommended
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Full Name *
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
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                      Degree Program *
                    </label>
                    <select
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
                    >
                      <option>Computer Science</option>
                      <option>Software Engineering</option>
                      <option>Data Science &amp; AI</option>
                      <option>Interactive Design &amp; HCI</option>
                      <option>Cybersecurity</option>
                      <option>Information Systems</option>
                      <option>Business Analytics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                      Year of Study *
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
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
                    <span className="text-[10px] text-[#64748B]">{headline.length}/80</span>
                  </div>
                  <input
                    type="text"
                    maxLength={80}
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Ethical IT Engineer & Distributed Systems Enthusiast"
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      About / Bio *
                    </label>
                    <span className="text-[10px] text-[#64748B]">{about.length}/500</span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tell visitors about your engineering interests, technical background, and what you love building..."
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>
            </div>

            {/* Technical Skills Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-base font-bold text-[#0F172A]">Skills &amp; Technologies</h2>
                <span className="text-[10px] text-[#64748B]">{skills.length}/10 added</span>
              </div>
              <p className="text-xs text-[#64748B] mb-4">
                Add skills and frameworks that highlight your engineering abilities.
              </p>

              <div className="p-3 flex flex-wrap gap-2 rounded-xl border border-[#E2E8F0] focus-within:ring-2 focus-within:ring-[#4F46E5] bg-white mb-2">
                {skills.map((skill, i) => (
                  <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                    {skill}
                    <button type="button" onClick={() => removeSkill(i)} className="ml-1.5 text-[#4F46E5] hover:text-[#3730A3]">
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                  placeholder="Type a skill & press Enter..."
                  className="flex-1 min-w-[140px] outline-none text-[#0F172A] text-xs py-1"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Social Links (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <h2 className="text-base font-bold text-[#0F172A] mb-1">Profile Links</h2>
              <p className="text-xs text-[#64748B] mb-5">
                Only add links you are comfortable sharing publicly on your portfolio.
              </p>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <LinkIcon size={13} /> LinkedIn
                  </label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Code2 size={13} /> GitHub
                  </label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Globe size={13} /> Personal Website
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourportfolio.dev"
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Phone size={13} /> WhatsApp Phone
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+237 600 000 000"
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Camera size={13} /> Instagram
                  </label>
                  <input
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/username"
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Floating Success Toast */}
        {savedToast && (
          <div className="fixed bottom-6 right-6 bg-[#10B981] text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-xs font-bold z-50 animate-bounce">
            <Check size={16} /> Profile saved successfully!
          </div>
        )}

      </div>
    </div>
  );
}
