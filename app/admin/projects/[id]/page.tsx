'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { MOCK_ADMIN_PROJECTS, AdminProject } from '@/lib/adminData'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  TrendingDown,
  AlertOctagon,
  ImageOff,
  Code2,
  Calendar,
  Eye
} from 'lucide-react'

export default function AdminProjectDetailsPage() {
  const params = useParams()
  const projectId = params?.id as string

  const initialProject =
    MOCK_ADMIN_PROJECTS.find((p) => p.id === projectId) || MOCK_ADMIN_PROJECTS[0]

  const [project, setProject] = useState<AdminProject>(initialProject)

  const handleTogglePublish = () => {
    setProject({
      ...project,
      status: project.status === 'Published' ? 'Draft' : 'Published'
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-8">
      {/* Back button */}
      <div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
            {project.category}
          </span>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-3xl font-extrabold text-[#111827]">{project.title}</h1>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                project.status === 'Published'
                  ? 'bg-[#EEF2FF] text-[#4F46E5]'
                  : 'bg-[#F3F4F6] text-[#6B7280]'
              }`}
            >
              ● {project.status}
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Created by <span className="font-semibold text-[#111827]">{project.student_name}</span> · Last updated: {project.last_updated}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/admin/students/${project.student_id}`}>
            <Button variant="outline" size="sm">View Student</Button>
          </Link>
          <Link href={`/projects/p1`} target="_blank">
            <Button variant="primary" size="sm" className="gap-1.5">
              <ExternalLink size={14} /> View Public Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Media Architecture Blueprint Image (Wireframe Mockup) */}
      <div className="w-full h-80 bg-[#1E293B] rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center text-white border border-[#334155] shadow-sm relative">
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-lg text-xs font-mono text-gray-300">
          Architecture Blueprint &amp; Diagram Preview
        </div>
        <div className="max-w-md space-y-2 opacity-80">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400 mx-auto flex items-center justify-center text-indigo-300 font-mono text-xs">
            [SYS_V2]
          </div>
          <p className="text-sm font-semibold">Project Chimera: AI Architecture Blueprint</p>
          <p className="text-xs text-gray-400">Microservices, NLP Pipelines, &amp; Inference Topology</p>
        </div>
      </div>

      {/* 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Project Basics, Project Story, Visuals & Resources */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Project Basics */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111827]">
              Project Basics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#6B7280] font-semibold">TITLE</span>
                <p className="font-bold text-[#111827] mt-0.5">{project.title}</p>
              </div>
              <div>
                <span className="text-[#6B7280] font-semibold">CATEGORY</span>
                <p className="font-bold text-[#4F46E5] mt-0.5">{project.category}</p>
              </div>
            </div>

            <div>
              <span className="text-[#6B7280] font-semibold text-xs">SHORT DESCRIPTION</span>
              <p className="text-xs text-[#374151] mt-1 leading-relaxed">
                {project.short_description}
              </p>
            </div>

            <div>
              <span className="text-[#6B7280] font-semibold text-xs">SKILLS &amp; TECH</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} label={skill} />
                ))}
              </div>
            </div>
          </div>

          {/* Project Story (Problem, Current State, Process, Solution, Result) */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111827]">
              Project Story
            </h3>

            {project.problem && (
              <div className="border-l-2 border-[#4F46E5] pl-4">
                <span className="text-xs font-bold uppercase text-[#6B7280]">THE PROBLEM</span>
                <p className="text-xs text-[#374151] mt-1 leading-relaxed">{project.problem}</p>
              </div>
            )}

            {project.current_state && (
              <div className="border-l-2 border-[#E5E7EB] pl-4">
                <span className="text-xs font-bold uppercase text-[#6B7280]">CURRENT STATE</span>
                <p className="text-xs text-[#374151] mt-1 leading-relaxed">{project.current_state}</p>
              </div>
            )}

            {project.process_steps && (
              <div className="border-l-2 border-[#E5E7EB] pl-4">
                <span className="text-xs font-bold uppercase text-[#6B7280]">PROCESS</span>
                <ul className="mt-2 space-y-2 text-xs text-[#374151]">
                  {project.process_steps.map((step, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="font-bold text-[#4F46E5] flex-shrink-0">Step {idx + 1}:</span>
                      <span>{typeof step === 'string' ? step : `${step.title} - ${step.description}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.desired_state && (
              <div className="border-l-2 border-[#E5E7EB] pl-4">
                <span className="text-xs font-bold uppercase text-[#6B7280]">DESIRED STATE</span>
                <p className="text-xs text-[#374151] mt-1 leading-relaxed">{project.desired_state}</p>
              </div>
            )}

            {project.solution && (
              <div className="border-l-2 border-[#4F46E5] pl-4">
                <span className="text-xs font-bold uppercase text-[#6B7280]">SOLUTION</span>
                <p className="text-xs text-[#374151] mt-1 leading-relaxed">{project.solution}</p>
              </div>
            )}

            {project.key_result && (
              <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5]">KEY RESULT</span>
                  <p className="text-2xl font-extrabold text-[#111827] mt-0.5">40% reduction</p>
                  <p className="text-xs text-[#6B7280]">{project.key_result}</p>
                </div>
                <TrendingDown size={32} className="text-[#4F46E5] opacity-80" />
              </div>
            )}
          </div>

          {/* Visuals & Resources */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111827]">
              Visuals &amp; Resources
            </h3>

            {/* Screenshots row */}
            <div>
              <span className="text-xs font-semibold text-[#6B7280]">PROJECT SCREENSHOTS</span>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <div className="h-24 bg-[#F3F4F6] rounded-lg border border-[#E5E7EB] flex items-center justify-center text-xs text-[#9CA3AF]">
                  Screen 1
                </div>
                <div className="h-24 bg-[#F3F4F6] rounded-lg border border-[#E5E7EB] flex items-center justify-center text-xs text-[#9CA3AF]">
                  Screen 2
                </div>
                <div className="h-24 bg-[#F3F4F6] rounded-lg border border-[#E5E7EB] flex items-center justify-center text-xs text-[#9CA3AF]">
                  Screen 3
                </div>
              </div>
            </div>

            {/* Supporting Document */}
            {project.document_name && (
              <div>
                <span className="text-xs font-semibold text-[#6B7280]">SUPPORTING DOCUMENT</span>
                <div className="mt-2 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-[#4F46E5]" />
                    <div>
                      <p className="text-xs font-bold text-[#111827]">{project.document_name}</p>
                      <p className="text-[10px] text-[#6B7280]">{project.document_size}</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-[#4F46E5] hover:underline cursor-pointer">
                    View Document
                  </button>
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#F3F4F6] text-xs font-medium text-[#4F46E5]">
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline">
                  <Code2 size={14} /> GitHub Repository
                </a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Project Management Moderation (Danger Zone: Unpublish / Publish) */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#111827]">Project Management</h3>
            <p className="text-xs text-[#6B7280]">
              Administrative actions affect whether this project is publicly visible on theDoers.com.
            </p>

            <div className="p-4 border border-[#FEE2E2] bg-[#FEF2F2] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-[#991B1B]">
                  {project.status === 'Published' ? 'Unpublish Project' : 'Re-publish Project'}
                </h4>
                <p className="text-[11px] text-[#B91C1C] mt-0.5">
                  {project.status === 'Published'
                    ? 'Unpublishing removes this project from public discovery. The student\'s project and content will remain saved in the database.'
                    : 'Publishing will restore this project to public discovery and the student\'s profile.'}
                </p>
              </div>

              <button
                onClick={handleTogglePublish}
                className="px-4 py-2 border border-[#DC2626] bg-white text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                {project.status === 'Published' ? 'Unpublish Project' : 'Publish Project'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Project Owner & Project Information */}
        <div className="flex flex-col gap-6">
          {/* Project Owner Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col items-center text-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] self-start">
              PROJECT OWNER
            </span>
            <Avatar name={project.student_name} size="lg" className="w-16 h-16 text-lg my-1" />
            <div>
              <h4 className="font-bold text-[#111827] text-base">{project.student_name}</h4>
              <p className="text-xs text-[#6B7280]">{project.student_program}</p>
            </div>
            <p className="text-xs text-[#4B5563] italic">
              &quot;Software Engineering student passionate about utilizing AI to solve everyday educational challenges.&quot;
            </p>
            <Link href={`/admin/students/${project.student_id}`} className="w-full mt-2">
              <Button variant="outline" size="sm" className="w-full text-xs">
                View Student Profile
              </Button>
            </Link>
          </div>

          {/* Project Metadata Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] flex items-center gap-1.5">
              <AlertOctagon size={14} className="text-[#4F46E5]" /> PROJECT INFORMATION
            </h4>

            <div className="divide-y divide-[#F3F4F6] text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-[#6B7280]">Status</span>
                <span className="font-bold text-[#4F46E5]">● {project.status}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#6B7280]">Created</span>
                <span className="font-bold text-[#111827]">{project.created_date}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#6B7280]">Last Updated</span>
                <span className="font-bold text-[#111827]">{project.last_updated}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#6B7280]">Public Visibility</span>
                <span className="font-bold text-[#059669]">
                  {project.status === 'Published' ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
