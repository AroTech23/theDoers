'use client'

import Link from 'next/link'
import { MOCK_ADMIN_STUDENTS, MOCK_ADMIN_PROJECTS } from '@/lib/adminData'
import Avatar from '@/components/ui/Avatar'
import { ArrowRight, ChevronRight, Eye } from 'lucide-react'

export default function AdminDashboardOverviewPage() {
  const registeredCount = 248
  const totalProjects = 132
  const publishedProjects = 87
  const draftProjects = 45

  const recentStudents = MOCK_ADMIN_STUDENTS.slice(0, 3)
  const recentProjects = MOCK_ADMIN_PROJECTS.slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-10">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#111827]">Admin Dashboard</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Manage students, projects, and activity across theDoers.com.
        </p>
      </div>

      {/* Stats Cards Row (4 metric boxes matching wireframe) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            REGISTERED STUDENTS
          </span>
          <p className="text-4xl font-extrabold text-[#111827] mt-3">{registeredCount}</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            TOTAL PROJECTS
          </span>
          <p className="text-4xl font-extrabold text-[#111827] mt-3">{totalProjects}</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            PUBLISHED PROJECTS
          </span>
          <p className="text-4xl font-extrabold text-[#4F46E5] mt-3">{publishedProjects}</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            DRAFT PROJECTS
          </span>
          <p className="text-4xl font-extrabold text-[#6B7280] mt-3">{draftProjects}</p>
        </div>
      </div>

      {/* Quick Action Navigation Cards (Manage Students & Manage Projects) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col justify-between items-start gap-4 hover:border-[#4F46E5]/40 transition-colors">
          <div>
            <h3 className="text-lg font-bold text-[#111827]">Manage Students</h3>
            <p className="text-xs text-[#6B7280] mt-1">
              View registered students, review pending registrations, and manage student accounts.
            </p>
          </div>
          <Link
            href="/admin/students"
            className="inline-flex items-center px-4 py-2 bg-[#111827] hover:bg-[#1F2937] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            View Students
          </Link>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col justify-between items-start gap-4 hover:border-[#4F46E5]/40 transition-colors">
          <div>
            <h3 className="text-lg font-bold text-[#111827]">Manage Projects</h3>
            <p className="text-xs text-[#6B7280] mt-1">
              View and manage student project portfolios and moderated content across the platform.
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center px-4 py-2 border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#111827] rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            View Projects
          </Link>
        </div>
      </div>

      {/* Recent Students Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#111827]">Recent Students</h2>
          <Link
            href="/admin/students"
            className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] inline-flex items-center gap-1"
          >
            View All Students <ChevronRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#374151]">
            <thead className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider border-b border-[#E5E7EB]">
              <tr>
                <th className="py-3 px-2">Student</th>
                <th className="py-3 px-4">Program</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Projects</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {recentStudents.map((s) => (
                <tr key={s.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-3.5 px-2 flex items-center gap-3">
                    <Avatar name={s.full_name} size="sm" />
                    <span className="font-bold text-[#111827]">{s.full_name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs">{s.program}</td>
                  <td className="py-3.5 px-4 text-xs">{s.year}</td>
                  <td className="py-3.5 px-4 text-xs font-medium">{s.projects_count} Projects</td>
                  <td className="py-3.5 px-4 text-xs text-[#6B7280]">{s.joined_date}</td>
                  <td className="py-3.5 px-2 text-right">
                    <Link
                      href={`/admin/students/${s.id}`}
                      className="text-xs font-semibold text-[#4F46E5] hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Projects Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#111827]">Recent Projects</h2>
          <Link
            href="/admin/projects"
            className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] inline-flex items-center gap-1"
          >
            View All Projects <ChevronRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#374151]">
            <thead className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider border-b border-[#E5E7EB]">
              <tr>
                <th className="py-3 px-2">Project</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Published / Updated</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {recentProjects.map((p) => (
                <tr key={p.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-3.5 px-2 font-bold text-[#111827]">{p.title}</td>
                  <td className="py-3.5 px-4 text-xs">{p.student_name}</td>
                  <td className="py-3.5 px-4 text-xs">{p.category}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        p.status === 'Published'
                          ? 'bg-[#EEF2FF] text-[#4F46E5]'
                          : 'bg-[#F3F4F6] text-[#6B7280]'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#6B7280]">{p.last_updated}</td>
                  <td className="py-3.5 px-2 text-right">
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="text-xs font-semibold text-[#4F46E5] hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
