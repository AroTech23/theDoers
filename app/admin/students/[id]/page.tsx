'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { MOCK_ADMIN_STUDENTS, MOCK_ADMIN_PROJECTS } from '@/lib/adminData'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import {
  ArrowLeft,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Share2,
  Code2
} from 'lucide-react'

export default function AdminStudentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const studentId = params?.id as string

  const initialStudent =
    MOCK_ADMIN_STUDENTS.find((s) => s.id === studentId) || MOCK_ADMIN_STUDENTS[0]

  const [student, setStudent] = useState(initialStudent)
  const studentProjects = MOCK_ADMIN_PROJECTS.filter((p) => p.student_id === student.id || student.id === 's1')

  const handleToggleSuspend = () => {
    setStudent({
      ...student,
      status: student.status === 'Suspended' ? 'Active' : 'Suspended'
    })
  }

  const handleApproveRegistration = () => {
    setStudent({
      ...student,
      status: 'Active'
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-8">
      {/* Back link */}
      <div>
        <Link
          href="/admin/students"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Students
        </Link>
      </div>

      {/* Top Banner Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar name={student.full_name} size="lg" className="w-16 h-16 text-lg" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#111827]">{student.full_name}</h1>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  student.status === 'Active'
                    ? 'bg-[#DEF7EC] text-[#03543F]'
                    : student.status === 'Pending'
                    ? 'bg-[#FEF3C7] text-[#92400E]'
                    : 'bg-[#FDE8E8] text-[#9B1C1C]'
                }`}
              >
                ● {student.status}
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mt-1">
              {student.program} · {student.year} · Joined {student.joined_date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {student.status === 'Pending' && (
            <Button variant="primary" size="sm" onClick={handleApproveRegistration} className="gap-1.5">
              <CheckCircle2 size={16} /> Approve Registration
            </Button>
          )}
          <Link href={`/doers/alexchen`} target="_blank">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ExternalLink size={14} /> View Public Portfolio
            </Button>
          </Link>
        </div>
      </div>

      {/* 2-Column Grid matching Figma Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Account Information & Profile Details */}
        <div className="flex flex-col gap-6">
          {/* Account Information Box */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111827]">
              Account Information
            </h3>
            <div className="divide-y divide-[#F3F4F6] text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-[#6B7280]">FULL NAME</span>
                <span className="font-bold text-[#111827]">{student.full_name}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#6B7280]">EMAIL</span>
                <span className="font-bold text-[#111827]">{student.email}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#6B7280]">PROGRAM</span>
                <span className="font-bold text-[#111827]">{student.program}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#6B7280]">YEAR OF STUDY</span>
                <span className="font-bold text-[#111827]">{student.year}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#6B7280]">ACCOUNT STATUS</span>
                <span className="font-bold text-[#4F46E5]">{student.status}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#6B7280]">JOINED</span>
                <span className="font-bold text-[#111827]">{student.joined_date}</span>
              </div>
            </div>
          </div>

          {/* Profile Details Box */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111827]">
              Profile Details
            </h3>

            {student.headline && (
              <div>
                <span className="text-xs font-semibold text-[#6B7280]">HEADLINE</span>
                <p className="text-xs text-[#111827] font-medium mt-1 italic">
                  &quot;{student.headline}&quot;
                </p>
              </div>
            )}

            {student.bio && (
              <div>
                <span className="text-xs font-semibold text-[#6B7280]">ABOUT</span>
                <p className="text-xs text-[#4B5563] leading-relaxed mt-1">
                  {student.bio}
                </p>
              </div>
            )}

            <div>
              <span className="text-xs font-semibold text-[#6B7280]">SKILLS</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {student.skills.map((skill) => (
                  <Badge key={skill} label={skill} />
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#F3F4F6] flex flex-col gap-2 text-xs font-medium text-[#4F46E5]">
              {student.website_url && (
                <a href={student.website_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline">
                  <Globe size={14} /> Website
                </a>
              )}
              {student.github_url && (
                <a href={student.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline">
                  <Code2 size={14} /> GitHub
                </a>
              )}
              {student.linkedin_url && (
                <a href={student.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline">
                  <Share2 size={14} /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Projects & Account Management (Danger Zone) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Projects Table */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#111827]">Projects</h3>
              <span className="text-xs text-[#6B7280]">
                {studentProjects.length} Total ({studentProjects.filter(p => p.status === 'Published').length} Published, {studentProjects.filter(p => p.status === 'Draft').length} Drafts)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#374151]">
                <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider border-b border-[#E5E7EB]">
                  <tr>
                    <th className="py-2.5 px-3">PROJECT</th>
                    <th className="py-2.5 px-3">CATEGORY</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3">LAST UPDATED</th>
                    <th className="py-2.5 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  {studentProjects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-[#F9FAFB]">
                      <td className="py-3 px-3 font-bold text-[#111827]">{proj.title}</td>
                      <td className="py-3 px-3">{proj.category}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            proj.status === 'Published'
                              ? 'bg-[#EEF2FF] text-[#4F46E5]'
                              : 'bg-[#F3F4F6] text-[#6B7280]'
                          }`}
                        >
                          {proj.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#6B7280]">{proj.last_updated}</td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/admin/projects/${proj.id}`}
                          className="font-bold text-[#4F46E5] hover:underline"
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

          {/* Account Management Action Box */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#EF4444] flex items-center gap-1.5">
              <ShieldAlert size={18} /> Account Management
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Administrative actions affect the student&apos;s access to theDoers.com. Suspending an account will immediately
              revoke login privileges and hide public portfolios.
            </p>

            <div className="pt-2">
              <button
                onClick={handleToggleSuspend}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  student.status === 'Suspended'
                    ? 'bg-[#DEF7EC] text-[#03543F] hover:bg-[#BCF0DA]'
                    : 'border border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2]'
                }`}
              >
                {student.status === 'Suspended' ? 'Reactivate Account' : 'Suspend Account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
