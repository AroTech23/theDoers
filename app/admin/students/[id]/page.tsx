'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import {
  ArrowLeft,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Code2,
  Phone,
  Mail,
  User,
  GraduationCap,
  Layers,
  Share2,
  Clock,
  Sparkles,
  Loader2,
  FolderKanban,
  AlertCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { MOCK_ADMIN_STUDENTS, MOCK_ADMIN_PROJECTS } from '@/lib/adminData';

export default function AdminStudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params?.id as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadStudentDetails() {
      try {
        setLoading(true);

        // 1. Fetch User from Supabase
        const { data: dbUser } = await supabase
          .from('users')
          .select('*')
          .eq('id', studentId)
          .maybeSingle();

        if (dbUser) {
          setStudent(dbUser);

          // 2. Fetch Skills
          const { data: skillsData } = await supabase
            .from('doer_skills')
            .select('skill:skills(name)')
            .eq('doer_id', dbUser.id);

          if (skillsData) {
            setSkills(skillsData.map((s: any) => s.skill?.name).filter(Boolean));
          }

          // 3. Fetch Projects
          const { data: projectsData } = await supabase
            .from('projects')
            .select('*')
            .eq('doer_id', dbUser.id)
            .order('created_at', { ascending: false });

          if (projectsData) {
            setProjects(projectsData);
          }
        } else {
          // Fallback mock
          const mockS = MOCK_ADMIN_STUDENTS.find(s => s.id === studentId) || MOCK_ADMIN_STUDENTS[0];
          setStudent(mockS);
          setSkills(['Python', 'React', 'Machine Learning']);
          setProjects(MOCK_ADMIN_PROJECTS.slice(0, 2));
        }
      } catch (err: any) {
        console.error('Error loading student details:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStudentDetails();
  }, [studentId, supabase]);

  const handleUpdateStatus = async (newStatus: 'approved' | 'pending' | 'suspended') => {
    if (!student) return;
    try {
      setUpdating(true);
      setErrorMessage(null);

      const { error } = await supabase
        .from('users')
        .update({ status: newStatus })
        .eq('id', student.id);

      if (error) {
        throw new Error(error.message || 'Failed to update student status. Please ensure admin RLS policy is executed in Supabase.');
      }

      setStudent({ ...student, status: newStatus });
    } catch (err: any) {
      console.error('Error updating status:', err);
      setErrorMessage(err.message || 'Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#4F46E5]" />
        <p className="text-xs font-bold text-[#64748B]">Loading student application profile...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-[#0F172A]">Student Not Found</h2>
        <Link href="/admin/students" className="text-xs font-bold text-[#4F46E5] hover:underline mt-2 inline-block">
          ← Back to Students
        </Link>
      </div>
    );
  }

  const isApproved = student.status === 'approved' || student.status === 'Active';
  const isPending = student.status === 'pending' || student.status === 'Pending';
  const isSuspended = student.status === 'suspended' || student.status === 'Suspended';

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-8">
      
      {/* ── 1. TOP NAVIGATION & BREADCRUMB ── */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/students"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors bg-white border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl shadow-2xs"
        >
          <ArrowLeft size={14} /> Back to All Students
        </Link>
        
        <span className="text-xs text-[#64748B] font-mono">Student ID: {student.id}</span>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center gap-3 text-xs font-semibold text-[#B91C1C]">
          <AlertCircle size={18} className="shrink-0 text-[#EF4444]" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ── 2. TOP BANNER CARD (Quick Overview & Live Moderation Controls) ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Avatar name={student.full_name} imageUrl={student.avatar_url} size="lg" className="w-16 h-16 sm:w-20 sm:h-20 text-xl shadow-xs rounded-full" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">{student.full_name}</h1>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                  isApproved
                    ? 'bg-[#DEF7EC] text-[#03543F] border border-[#BCF0DA]'
                    : isPending
                    ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                    : 'bg-[#FDE8E8] text-[#9B1C1C] border border-[#FBD5D5]'
                }`}
              >
                ● {student.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#0F172A]">{student.program || 'Computer Science'}</span>
              <span>•</span>
              <span>{student.year || 'Year 3'}</span>
              <span>•</span>
              <span>Registered {new Date(student.created_at || Date.now()).toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        {/* Live Admin Moderation Action Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {isPending && (
            <Button
              onClick={() => handleUpdateStatus('approved')}
              variant="primary"
              size="md"
              isLoading={updating}
              className="font-bold text-xs shadow-xs bg-[#10B981] hover:bg-[#059669]"
            >
              <CheckCircle2 size={16} className="mr-1.5" /> Approve Application
            </Button>
          )}

          {isApproved && (
            <>
              <Link href={`/doers/${student.username || student.id}`} target="_blank">
                <Button variant="outline" size="md" className="font-bold text-xs shadow-2xs">
                  <ExternalLink size={14} className="mr-1.5" /> View Public Portfolio ↗
                </Button>
              </Link>

              <Button
                onClick={() => handleUpdateStatus('suspended')}
                variant="outline"
                size="md"
                isLoading={updating}
                className="font-bold text-xs border-[#FCA5A5] text-[#EF4444] hover:bg-[#FEF2F2]"
              >
                <ShieldAlert size={14} className="mr-1.5" /> Suspend Student
              </Button>
            </>
          )}

          {isSuspended && (
            <Button
              onClick={() => handleUpdateStatus('approved')}
              variant="primary"
              size="md"
              isLoading={updating}
              className="font-bold text-xs shadow-xs bg-[#10B981] hover:bg-[#059669]"
            >
              <CheckCircle2 size={16} className="mr-1.5" /> Re-Activate Student
            </Button>
          )}
        </div>
      </div>

      {/* ── 3. DETAILED 2-COLUMN PROFILE INSPECTION GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Bio, Headline, Academic Background, and Verified Skills (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Profile Overview Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3 flex items-center gap-2">
              <User size={18} className="text-[#4F46E5]" /> Applicant Profile Information
            </h2>

            <div>
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-1">Headline</span>
              <p className="text-sm font-semibold text-[#0F172A] bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                {student.headline || 'No headline provided'}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-1">About / Bio</span>
              <p className="text-xs sm:text-sm text-[#334155] bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] leading-relaxed">
                {student.bio || 'No bio provided.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-1">Degree Program</span>
                <p className="text-xs font-semibold text-[#0F172A]">{student.program || 'Computer Science'}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-1">Year of Study</span>
                <p className="text-xs font-semibold text-[#0F172A]">{student.year || 'Year 3'}</p>
              </div>
            </div>
          </div>

          {/* Technical Skills Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3 flex items-center gap-2">
              <Layers size={18} className="text-[#4F46E5]" /> Verified Technical Skills ({skills.length})
            </h2>

            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map(s => (
                  <Badge key={s} label={s} className="bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] font-bold text-xs px-3 py-1.5 rounded-xl" />
                ))
              ) : (
                <span className="text-xs text-[#94A3B8] italic">No skills attached to this profile.</span>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Contact, External Links & Projects List (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Contact & Links Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Contact &amp; External Links
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <span className="text-[#64748B] flex items-center gap-1.5 font-semibold"><Mail size={13} /> Email:</span>
                <strong className="text-[#0F172A]">{student.email}</strong>
              </div>

              {student.phone && (
                <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-semibold"><Phone size={13} /> WhatsApp/Phone:</span>
                  <strong className="text-[#0F172A]">{student.phone}</strong>
                </div>
              )}

              {student.linkedin_url && (
                <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-semibold"><Share2 size={13} /> LinkedIn:</span>
                  <a href={student.linkedin_url} target="_blank" rel="noreferrer" className="text-[#4F46E5] font-bold hover:underline truncate max-w-[180px]">
                    {student.linkedin_url}
                  </a>
                </div>
              )}

              {student.github_url && (
                <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-semibold"><Code2 size={13} /> GitHub:</span>
                  <a href={student.github_url} target="_blank" rel="noreferrer" className="text-[#4F46E5] font-bold hover:underline truncate max-w-[180px]">
                    {student.github_url}
                  </a>
                </div>
              )}

              {student.portfolio_url && (
                <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#64748B] flex items-center gap-1.5 font-semibold"><Globe size={13} /> Website:</span>
                  <a href={student.portfolio_url} target="_blank" rel="noreferrer" className="text-[#4F46E5] font-bold hover:underline truncate max-w-[180px]">
                    {student.portfolio_url}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Student Projects Portfolio Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider border-b border-[#F1F5F9] pb-2">
              Submitted Projects ({projects.length})
            </h3>

            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map(p => (
                  <div key={p.id} className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 hover:border-[#CBD5E1] transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5]">{p.category}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        p.status === 'published' ? 'bg-[#DEF7EC] text-[#03543F]' : 'bg-[#F3F4F6] text-[#4B5563]'
                      }`}>
                        ● {p.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#0F172A]">{p.title}</h4>
                    <p className="text-[11px] text-[#64748B] line-clamp-2">{p.description}</p>
                    <div className="pt-1">
                      <Link href={`/projects/${p.id}`} className="text-[11px] font-bold text-[#4F46E5] hover:underline inline-flex items-center gap-1">
                        Inspect Case Study <ExternalLink size={10} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#94A3B8] italic">No projects submitted by this student yet.</p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
