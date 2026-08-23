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
  Loader2
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#4F46E5]" />
        <p className="text-xs font-bold text-[#64748B]">Loading your workspace...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-10">
      
      {/* ── TOP SECTION: TWO CLEAN WHITE CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Card: Live Profile Snapshot */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            {/* Avatar Circle */}
            <div className="w-16 h-16 rounded-2xl bg-[#4F46E5] flex items-center justify-center text-white text-xl font-bold shadow-xs">
              <Avatar name={fullName} size="lg" />
            </div>

            {/* Name & Academic info */}
            <div>
              <h2 className="text-2xl font-bold text-[#111827]">{fullName}</h2>
              <p className="text-xs font-medium text-[#6B7280] mt-0.5">
                {year} · {program}
              </p>
            </div>

            {/* Short Bio / Headline */}
            <p className="text-xs text-[#6B7280] leading-relaxed">
              {headline}
            </p>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 pt-6 mt-2">
            <Link
              href={`/doers/${username}?from=dashboard`}
              className="flex-1"
            >
              <button className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs">
                View Public Portfolio ↗
              </button>
            </Link>

            {/* Edit Button */}
            <Link href="/dashboard/profile">
              <button
                title="Edit Profile"
                className="p-2.5 bg-white hover:bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
              >
                <Edit2 size={15} />
              </button>
            </Link>

            {/* Share / Copy Link Button */}
            <button
              onClick={handleCopyLink}
              title="Copy Portfolio Link"
              className="p-2.5 bg-white hover:bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
            >
              {copied ? <Check size={15} className="text-[#10B981]" /> : <Share2 size={15} />}
            </button>
          </div>
        </div>

        {/* Right Card: Portfolio Stats & Setup */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] mb-2 block">
              Portfolio Overview
            </span>
            <h3 className="text-xl font-bold text-[#111827] mb-6">Your Proof of Work</h3>

            {/* Three Key Metrics */}
            <div className="grid grid-cols-3 gap-4 pb-6 border-b border-[#F1F5F9] text-center">
              <div>
                <div className="text-2xl font-extrabold text-[#0F172A]">{publishedCount}</div>
                <div className="text-[11px] font-semibold text-[#64748B] mt-0.5">Published</div>
              </div>
              <div className="border-x border-[#F1F5F9]">
                <div className="text-2xl font-extrabold text-[#0F172A]">{draftCount}</div>
                <div className="text-[11px] font-semibold text-[#64748B] mt-0.5">Drafts</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#0F172A]">{skills.length}</div>
                <div className="text-[11px] font-semibold text-[#64748B] mt-0.5">Skills</div>
              </div>
            </div>

            {/* Attached Skills */}
            <div className="pt-5">
              <span className="text-xs font-bold text-[#0F172A] mb-2 block">Your Verified Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {skills.length > 0 ? (
                  skills.map(s => (
                    <Badge key={s} label={s} className="bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] text-xs font-bold" />
                  ))
                ) : (
                  <span className="text-xs text-[#94A3B8] italic">No skills added yet.</span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Link href="/dashboard/projects/new">
              <Button variant="primary" size="md" className="w-full font-bold shadow-xs">
                <Plus size={15} className="mr-1" /> Create New Project
              </Button>
            </Link>
          </div>
        </div>

      </div>

      {/* ── BOTTOM SECTION: MY PROJECTS ── */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">My Projects</h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider bg-[#EEF2FF] px-2 py-0.5 rounded-md">
                      {p.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.status === 'published' ? 'bg-[#DEF7EC] text-[#03543F]' : 'bg-[#F3F4F6] text-[#4B5563]'
                    }`}>
                      {p.status === 'published' ? '● Published' : '○ Draft'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#111827] line-clamp-1 mb-1.5">{p.title}</h3>
                  <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-4">
                    {p.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                  <Link href={`/projects/${p.id}`}>
                    <span className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1">
                      View Project <ExternalLink size={12} />
                    </span>
                  </Link>
                  <Link href={`/dashboard/projects/new?edit=${p.id}`}>
                    <Button variant="outline" size="sm" className="text-xs font-bold">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-[#CBD5E1] p-12 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
              <FolderKanban size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">No projects published yet</h3>
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
