'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import {
  Copy,
  Check,
  Edit2,
  Share2,
  FolderKanban,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Plus,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function DashboardPage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. Fetch live Profile
        const { data: userProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (userProfile) {
          setProfile(userProfile);
        }

        // 2. Fetch live Skills
        const { data: doerSkills } = await supabase
          .from('doer_skills')
          .select('skill:skills(name)')
          .eq('doer_id', user.id);

        if (doerSkills) {
          setSkills(doerSkills.map((s: any) => s.skill?.name).filter(Boolean));
        }

        // 3. Fetch live Projects
        const { data: userProjects } = await supabase
          .from('projects')
          .select('*')
          .eq('doer_id', user.id)
          .order('created_at', { ascending: false });

        if (userProjects) {
          setProjects(userProjects);
        }
      } catch (err: any) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [supabase]);

  const fullName = profile?.full_name || 'Student Engineer';
  const avatarUrl = profile?.avatar_url || null;
  const program = profile?.program || 'Computer Science';
  const year = profile?.year || 'Year 3';
  const headline = profile?.headline || 'Ethical IT Engineer';
  const username = profile?.username || 'doer';
  const publishedCount = projects.filter(p => p.status === 'published').length;
  const draftCount = projects.filter(p => p.status === 'draft').length;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/doers/${username}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 size={28} className="animate-spin text-[#4F46E5]" />
        <p className="text-xs font-bold text-[#64748B]">Loading your workspace...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 flex flex-col gap-8 lg:gap-10">
      
      {/* ── TOP SECTION: CONTENT-DRIVEN PROFILE & OVERVIEW GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* Left Card: Live Profile Snapshot (~40% on Desktop = 5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between h-auto gap-5">
          <div className="flex flex-col gap-3.5">
            {/* Header row with Avatar + Quick Academic summary */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 shadow-2xs">
                <Avatar name={fullName} imageUrl={avatarUrl || undefined} size="lg" className="w-14 h-14 sm:w-16 sm:h-16 text-lg sm:text-xl rounded-full" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight truncate">{fullName}</h2>
                <p className="text-xs font-semibold text-[#64748B] mt-0.5 truncate">
                  {year} · {program}
                </p>
              </div>
            </div>

            {/* Short Bio / Headline */}
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3">
              {headline}
            </p>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 pt-3 border-t border-[#F1F5F9] mt-auto">
            <Link
              href={`/doers/${username}?from=dashboard`}
              className="flex-1 min-w-0"
            >
              <button className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs truncate">
                View Portfolio ↗
              </button>
            </Link>

            {/* Edit Button */}
            <Link href="/dashboard/profile" className="shrink-0">
              <button
                title="Edit Profile"
                className="p-2 sm:p-2.5 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
              >
                <Edit2 size={15} />
              </button>
            </Link>

            {/* Share / Copy Link Button */}
            <button
              onClick={handleCopyLink}
              title="Copy Portfolio Link"
              className="p-2 sm:p-2.5 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer shrink-0"
            >
              {copied ? <Check size={15} className="text-[#10B981]" /> : <Share2 size={15} />}
            </button>
          </div>
        </div>

        {/* Right Card: Portfolio Stats & Setup (~60% on Desktop = 7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs flex flex-col justify-between h-auto gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] block">
                  Portfolio Overview
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">Your Proof of Work</h3>
              </div>

              <Link href="/dashboard/projects/new" className="hidden sm:inline-block">
                <Button variant="primary" size="sm" className="font-bold text-xs shadow-2xs">
                  <Plus size={13} className="mr-1" /> New Project
                </Button>
              </Link>
            </div>

            {/* Three Key Metrics in Compact Card Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-3 px-3 sm:px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-center">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">{publishedCount}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-[#64748B] mt-0.5">Published</div>
              </div>
              <div className="border-x border-[#E2E8F0]">
                <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">{draftCount}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-[#64748B] mt-0.5">Drafts</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">{skills.length}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-[#64748B] mt-0.5">Skills</div>
              </div>
            </div>

            {/* Attached Skills */}
            <div>
              <span className="text-[11px] font-bold text-[#0F172A] mb-1.5 block">Your Verified Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {skills.length > 0 ? (
                  skills.slice(0, 8).map(s => (
                    <Badge key={s} label={s} className="bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] text-[11px] font-bold py-0.5" />
                  ))
                ) : (
                  <span className="text-xs text-[#94A3B8] italic">No skills added yet.</span>
                )}
                {skills.length > 8 && (
                  <span className="text-[11px] font-bold text-[#64748B] self-center px-1">
                    +{skills.length - 8} more
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 sm:hidden">
            <Link href="/dashboard/projects/new">
              <Button variant="primary" size="md" className="w-full font-bold shadow-xs">
                <Plus size={14} className="mr-1" /> Create New Project
              </Button>
            </Link>
          </div>
        </div>

      </div>

      {/* ── BOTTOM SECTION: MY PROJECTS ── */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">My Projects</h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Manage your engineering case studies, live demos, and drafts.
            </p>
          </div>
          <Link href="/dashboard/projects">
            <span className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1 cursor-pointer">
              View All ({projects.length}) <ArrowRight size={13} />
            </span>
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {projects.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#CBD5E1] transition-all group"
              >
                {/* Project Image Banner */}
                <div className="w-full h-40 sm:h-44 bg-[#EEF2FF] border-b border-[#E2E8F0] overflow-hidden relative">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#4F46E5]/40">
                      <ImageIcon size={32} />
                    </div>
                  )}
                  {/* Floating Status Pill */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs backdrop-blur-md ${
                      p.status === 'published' 
                        ? 'bg-[#DEF7EC]/90 text-[#03543F] border border-[#BCF0DA]' 
                        : 'bg-white/90 text-[#4B5563] border border-[#E5E7EB]'
                    }`}>
                      {p.status === 'published' ? '● Published' : '○ Draft'}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2">
                  {p.category && (
                    <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider">
                      {p.category}
                    </span>
                  )}

                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A] line-clamp-1 leading-snug">{p.title}</h3>
                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed flex-1">
                    {p.description}
                  </p>
                </div>

                <div className="px-4 sm:px-5 py-3 bg-[#F8FAFC]/60 border-t border-[#F1F5F9] flex items-center justify-between">
                  <Link href={`/projects/${p.id}?from=dashboard`}>
                    <span className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1">
                      Case Study <ExternalLink size={11} />
                    </span>
                  </Link>
                  <Link href={`/dashboard/projects/new?edit=${p.id}`}>
                    <Button variant="outline" size="sm" className="text-xs font-bold bg-white px-3 py-1">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-dashed border-[#CBD5E1] p-8 sm:p-12 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
              <FolderKanban size={24} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">No projects published yet</h3>
            <p className="text-xs text-[#64748B] max-w-sm">
              Start building your portfolio by writing your first engineering problem-to-solution case study.
            </p>
            <Link href="/dashboard/projects/new" className="pt-2">
              <Button variant="primary" size="md" className="font-bold shadow-xs">
                <Plus size={15} className="mr-1" /> Create Your First Project
              </Button>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
