'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { ArrowRight, ChevronRight, Eye, Users, FolderKanban, CheckCircle2, Clock, Loader2, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { MOCK_ADMIN_STUDENTS, MOCK_ADMIN_PROJECTS } from '@/lib/adminData';

export default function AdminDashboardOverviewPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function loadAdminMetrics() {
      try {
        setLoading(true);

        // 1. Fetch live Students from Supabase
        const { data: dbStudents } = await supabase
          .from('users')
          .select('*, projects(id)')
          .eq('role', 'doer')
          .order('created_at', { ascending: false });

        if (dbStudents && dbStudents.length > 0) {
          setStudents(dbStudents);
        } else {
          setStudents(MOCK_ADMIN_STUDENTS);
        }

        // 2. Fetch live Projects from Supabase
        const { data: dbProjects } = await supabase
          .from('projects')
          .select('*, doer:users(full_name, username)')
          .order('created_at', { ascending: false });

        if (dbProjects && dbProjects.length > 0) {
          setProjects(dbProjects);
        } else {
          setProjects(MOCK_ADMIN_PROJECTS);
        }
      } catch (err) {
        console.error('Error loading admin overview:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAdminMetrics();
  }, [supabase]);

  const registeredCount = students.length;
  const pendingCount = students.filter(s => s.status === 'pending').length;
  const publishedProjects = projects.filter(p => p.status === 'published').length;
  const draftProjects = projects.filter(p => p.status === 'draft').length;

  const recentStudents = students.slice(0, 5);
  const recentProjects = projects.slice(0, 5);


  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Admin Command Center</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Real-time student applicant review, moderation, and project portfolio metrics.
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] rounded-xl text-xs font-bold shadow-2xs">
            <Clock size={15} className="text-[#D97706]" />
            <span>{pendingCount} student application{pendingCount > 1 ? 's' : ''} pending review</span>
          </div>
        )}
      </div>

      {/* Stats Cards Row (4 metric boxes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center justify-between">
            REGISTERED STUDENTS
            <Users size={16} className="text-[#4F46E5]" />
          </span>
          <p className="text-4xl font-extrabold text-[#111827] mt-3">{registeredCount}</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center justify-between">
            PENDING APPROVAL
            <Clock size={16} className="text-[#F59E0B]" />
          </span>
          <p className="text-4xl font-extrabold text-[#D97706] mt-3">{pendingCount}</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center justify-between">
            PUBLISHED PROJECTS
            <CheckCircle2 size={16} className="text-[#10B981]" />
          </span>
          <p className="text-4xl font-extrabold text-[#4F46E5] mt-3">{publishedProjects}</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center justify-between">
            DRAFT PROJECTS
            <FolderKanban size={16} className="text-[#64748B]" />
          </span>
          <p className="text-4xl font-extrabold text-[#6B7280] mt-3">{draftProjects}</p>
        </div>
      </div>

      {/* Quick Action Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between items-start gap-4 hover:border-[#4F46E5]/40 transition-colors">
          <div>
            <h3 className="text-lg font-bold text-[#111827]">Student Moderation &amp; Verification</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Review applicant details, approve or suspend accounts, and view student portfolios.
            </p>
          </div>
          <Link
            href="/admin/students"
            className="inline-flex items-center px-4 py-2.5 bg-[#111827] hover:bg-[#1F2937] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Manage Students →
          </Link>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between items-start gap-4 hover:border-[#4F46E5]/40 transition-colors">
          <div>
            <h3 className="text-lg font-bold text-[#111827]">Case Study &amp; Project Moderation</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Inspect student technical case studies, view live demos, and moderate network deliverables.
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center px-4 py-2.5 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#111827] rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Moderate Projects →
          </Link>
        </div>
      </div>

      {/* Recent Students Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#111827]">Recent Student Registrations</h2>
          <Link
            href="/admin/students"
            className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] inline-flex items-center gap-1"
          >
            View All Students <ChevronRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F1F5F9] text-[#64748B] uppercase tracking-wider font-semibold">
                <th className="pb-3">Student</th>
                <th className="pb-3">Program &amp; Year</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {recentStudents.map((s) => (
                <tr key={s.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3.5 flex items-center gap-3">
                    <Avatar name={s.full_name} size="sm" />
                    <div>
                      <p className="font-bold text-[#0F172A]">{s.full_name}</p>
                      <p className="text-[11px] text-[#64748B]">{s.email}</p>
                    </div>
                  </td>
                  <td className="py-3.5 text-[#334155]">
                    {s.program || 'Computer Science'} · {s.year || 'Year 3'}
                  </td>
                  <td className="py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      s.status === 'approved' || s.status === 'Active'
                        ? 'bg-[#DEF7EC] text-[#03543F]'
                        : s.status === 'pending' || s.status === 'Pending'
                        ? 'bg-[#FEF3C7] text-[#92400E]'
                        : 'bg-[#FDE8E8] text-[#9B1C1C]'
                    }`}>
                      ● {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href={`/admin/students/${s.id}`}
                      className="text-xs font-bold text-[#4F46E5] hover:underline"
                    >
                      Inspect Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
