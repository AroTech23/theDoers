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
  Code2,
  Phone,
  Mail,
  User,
  GraduationCap,
  Layers,
  Camera,
  Share2,
  Calendar,
  Clock,
  Sparkles
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

      {/* ── 2. TOP BANNER CARD (Quick Overview & Direct Actions) ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Avatar name={student.full_name} size="lg" className="w-16 h-16 sm:w-20 sm:h-20 text-xl shadow-xs" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">{student.full_name}</h1>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                  student.status === 'Active'
                    ? 'bg-[#DEF7EC] text-[#03543F] border border-[#BCF0DA]'
                    : student.status === 'Pending'
                    ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                    : 'bg-[#FDE8E8] text-[#9B1C1C] border border-[#FBD5D5]'
                }`}
              >
                ● {student.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#0F172A]">{student.program}</span>
              <span>•</span>
              <span>{student.year}</span>
              <span>•</span>
              <span>Registered {student.joined_date}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {student.status === 'Pending' && (
            <Button 
              variant="primary" 
              size="md" 
              onClick={handleApproveRegistration} 
              className="gap-2 font-bold shadow-xs bg-[#10B981] hover:bg-[#059669]"
            >
              <CheckCircle2 size={16} /> Approve Registration
            </Button>
          )}
          <Link href={`/doers/alexchen`} target="_blank">
            <Button variant="outline" size="md" className="gap-2 font-bold">
              <ExternalLink size={14} /> View Public Portfolio
            </Button>
          </Link>
        </div>
      </div>

      {/* ── 3. MAIN 2-COLUMN INSPECTION LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: COMPLETE APPLICATION DETAILS (5 COLS) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Card 1: Core Account & Contact Data */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F46E5] border-b border-[#F1F5F9] pb-3">
              <User size={15} /> Account &amp; Contact Credentials
            </div>

            <div className="divide-y divide-[#F1F5F9] text-xs">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-[#64748B] font-medium flex items-center gap-1.5"><User size={13} /> Full Name</span>
                <span className="font-bold text-[#0F172A]">{student.full_name}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-[#64748B] font-medium flex items-center gap-1.5"><Mail size={13} /> Email Address</span>
                <span className="font-bold text-[#0F172A]">{student.email}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-[#64748B] font-medium flex items-center gap-1.5"><Phone size={13} /> Phone / WhatsApp</span>
                <span className="font-bold text-[#4F46E5]">{student.phone || 'Not provided'}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-[#64748B] font-medium flex items-center gap-1.5"><GraduationCap size={13} /> Degree Program</span>
                <span className="font-bold text-[#0F172A]">{student.program}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-[#64748B] font-medium flex items-center gap-1.5"><Calendar size={13} /> Year of Study</span>
                <span className="font-bold text-[#0F172A]">{student.year}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-[#64748B] font-medium flex items-center gap-1.5"><Clock size={13} /> Registration Date</span>
                <span className="font-bold text-[#0F172A]">{student.joined_date}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Profile Bio & Headline */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F46E5] border-b border-[#F1F5F9] pb-3">
              <Sparkles size={15} /> Student Bio &amp; Headline
            </div>

            {student.headline && (
              <div>
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Profile Headline</span>
                <p className="text-xs text-[#0F172A] font-semibold mt-1 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  &quot;{student.headline}&quot;
                </p>
              </div>
            )}

            {student.bio && (
              <div>
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">About Bio</span>
                <p className="text-xs text-[#334155] leading-relaxed mt-1 p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  {student.bio}
                </p>
              </div>
            )}

            {/* Skills Badges */}
            <div>
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Technical Skills ({student.skills.length})</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {student.skills.map((skill) => (
                  <Badge key={skill} label={skill} className="bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] font-bold text-xs px-2.5 py-1 rounded-lg" />
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: All Connected Public Links */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F46E5] border-b border-[#F1F5F9] pb-3">
              <Globe size={15} /> Connected Public Links
            </div>

            <div className="space-y-2 text-xs">
              {student.links?.linkedin && (
                <a href={student.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 bg-[#F8FAFC] hover:bg-[#EEF2FF] rounded-xl border border-[#E2E8F0] text-[#0F172A] font-medium transition-colors group">
                  <div className="flex items-center gap-2 truncate">
                    <Share2 size={14} className="text-[#4F46E5] flex-shrink-0" />
                    <span className="truncate">LinkedIn: {student.links.linkedin}</span>
                  </div>
                  <ExternalLink size={12} className="text-[#94A3B8] group-hover:text-[#4F46E5]" />
                </a>
              )}

              {student.links?.github && (
                <a href={student.links.github} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 bg-[#F8FAFC] hover:bg-[#EEF2FF] rounded-xl border border-[#E2E8F0] text-[#0F172A] font-medium transition-colors group">
                  <div className="flex items-center gap-2 truncate">
                    <Code2 size={14} className="text-[#4F46E5] flex-shrink-0" />
                    <span className="truncate">GitHub: {student.links.github}</span>
                  </div>
                  <ExternalLink size={12} className="text-[#94A3B8] group-hover:text-[#4F46E5]" />
                </a>
              )}

              {student.links?.website && (
                <a href={student.links.website} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 bg-[#F8FAFC] hover:bg-[#EEF2FF] rounded-xl border border-[#E2E8F0] text-[#0F172A] font-medium transition-colors group">
                  <div className="flex items-center gap-2 truncate">
                    <Globe size={14} className="text-[#4F46E5] flex-shrink-0" />
                    <span className="truncate">Website: {student.links.website}</span>
                  </div>
                  <ExternalLink size={12} className="text-[#94A3B8] group-hover:text-[#4F46E5]" />
                </a>
              )}

              {student.links?.whatsapp && (
                <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-[#0F172A] font-medium">
                  <div className="flex items-center gap-2 truncate">
                    <Phone size={14} className="text-[#10B981] flex-shrink-0" />
                    <span className="truncate">WhatsApp: {student.links.whatsapp}</span>
                  </div>
                </div>
              )}

              {student.links?.instagram && (
                <a href={student.links.instagram} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 bg-[#F8FAFC] hover:bg-[#EEF2FF] rounded-xl border border-[#E2E8F0] text-[#0F172A] font-medium transition-colors group">
                  <div className="flex items-center gap-2 truncate">
                    <Camera size={14} className="text-[#EC4899] flex-shrink-0" />
                    <span className="truncate">Instagram: {student.links.instagram}</span>
                  </div>
                  <ExternalLink size={12} className="text-[#94A3B8] group-hover:text-[#4F46E5]" />
                </a>
              )}

              {student.links?.facebook && (
                <a href={student.links.facebook} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 bg-[#F8FAFC] hover:bg-[#EEF2FF] rounded-xl border border-[#E2E8F0] text-[#0F172A] font-medium transition-colors group">
                  <div className="flex items-center gap-2 truncate">
                    <User size={14} className="text-[#2563EB] flex-shrink-0" />
                    <span className="truncate">Facebook: {student.links.facebook}</span>
                  </div>
                  <ExternalLink size={12} className="text-[#94A3B8] group-hover:text-[#4F46E5]" />
                </a>
              )}

              {!student.links?.linkedin && !student.links?.github && !student.links?.website && !student.links?.whatsapp && (
                <span className="text-[#94A3B8] italic block py-1">No additional external links provided.</span>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: STUDENT'S PROJECTS & ACCOUNT MODERATION (7 COLS) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Projects Table */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div className="flex items-center gap-2 text-base font-extrabold text-[#0F172A]">
                <Layers size={18} className="text-[#4F46E5]" /> Projects by {student.full_name}
              </div>
              <span className="text-xs font-bold text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-lg">
                {studentProjects.length} Total
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#374151]">
                <thead className="bg-[#F8FAFC] text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0]">
                  <tr>
                    <th className="py-3 px-3">PROJECT</th>
                    <th className="py-3 px-3">CATEGORY</th>
                    <th className="py-3 px-3">STATUS</th>
                    <th className="py-3 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {studentProjects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-3 font-bold text-[#0F172A]">{proj.title}</td>
                      <td className="py-3.5 px-3 text-[#64748B]">{proj.category}</td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            proj.status === 'Published'
                              ? 'bg-[#DEF7EC] text-[#03543F]'
                              : 'bg-[#F1F5F9] text-[#64748B]'
                          }`}
                        >
                          ● {proj.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <Link
                          href={`/admin/projects/${proj.id}`}
                          className="font-bold text-[#4F46E5] hover:text-[#3730A3] hover:underline"
                        >
                          Inspect Case Study →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Account Moderation Action Box (Danger Zone) */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col gap-4">
            <h3 className="text-base font-extrabold text-[#EF4444] flex items-center gap-2">
              <ShieldAlert size={20} /> Administrative Account Control
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Administrative actions affect the student&apos;s access to theDoers. Suspending an account will immediately
              revoke login privileges and unlist public portfolios from the network directory.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={handleToggleSuspend}
                className={`font-bold text-xs ${
                  student.status === 'Suspended'
                    ? 'border-[#059669] text-[#059669] hover:bg-[#DEF7EC]'
                    : 'border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2]'
                }`}
              >
                {student.status === 'Suspended' ? 'Reactivate Student Account' : 'Suspend Student Account'}
              </Button>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
