import Link from 'next/link'
import { MOCK_ADMIN_PROJECTS } from '@/lib/adminData'
import { MOCK_DOERS } from '@/lib/mockData'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import {
  ArrowLeft,
  Code2,
  ExternalLink,
  Calendar,
  Tag,
  Globe,
  FileText,
  TrendingDown
} from 'lucide-react'

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProjectDetailsPage({ params, searchParams }: ProjectDetailsPageProps) {
  const { id } = await params
  const sParams = searchParams ? await searchParams : {}
  const fromDashboard = sParams?.from === 'dashboard'

  const project = MOCK_ADMIN_PROJECTS.find((p) => p.id === id) || MOCK_ADMIN_PROJECTS[0]
  const doer = MOCK_DOERS.find((d) => d.id === '1') || MOCK_DOERS[0]

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 w-full flex flex-col gap-8">
      {/* Dynamic Back link based on origin */}
      <div>
        {fromDashboard ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors bg-[#EEF2FF] px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft size={16} /> Back to My Dashboard Projects
          </Link>
        ) : (
          <Link
            href={`/doers/${doer.username || doer.id}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            <ArrowLeft size={16} /> Back to {doer.full_name}&apos;s Profile
          </Link>
        )}
      </div>

      {/* Main Project Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
        {/* Project Architecture / Blueprint Image Banner */}
        <div className="w-full h-80 bg-[#1E293B] flex flex-col items-center justify-center p-8 text-center text-white border-b border-[#E5E7EB] relative">
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-lg text-xs font-mono text-gray-300">
            Project Architecture Blueprint &amp; Diagram
          </div>
          <div className="max-w-md space-y-2 opacity-90">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400 mx-auto flex items-center justify-center text-indigo-300 font-mono text-xs">
              [SYS_AI]
            </div>
            <h2 className="text-base font-bold">{project.title}</h2>
            <p className="text-xs text-gray-400">Microservices, NLP Pipelines, &amp; Inference Topology</p>
          </div>
        </div>

        <div className="p-8 flex flex-col gap-8">
          {/* Header Info */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-wider text-[#4F46E5] uppercase">
                {project.category}
              </span>
              <span className="text-xs text-[#E5E7EB]">|</span>
              <span className="text-xs font-medium text-[#6B7280] flex items-center gap-1">
                <Globe size={13} /> Global EdTech Market
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-[#111827]">{project.title}</h1>

            <div className="flex items-center gap-4 text-xs text-[#6B7280] pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> Created in 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Tag size={14} /> {project.skills.length} Tech Tags
              </span>
            </div>
          </div>

          {/* Project Overview */}
          <div className="border-t border-b border-[#F3F4F6] py-6 flex flex-col gap-4 text-sm text-[#374151] leading-relaxed">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Project Overview</h3>
            <p>{project.short_description}</p>
          </div>

          {/* Project Story Section (Problem, Current State, Process, Desired State, Result) */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111827]">
              Project Story &amp; Engineering Case Study
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
                <span className="text-xs font-bold uppercase text-[#6B7280]">PROCESS &amp; DEVELOPMENT</span>
                <ul className="mt-2 space-y-1.5 text-xs text-[#374151] list-disc list-inside">
                  {project.process_steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
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
                  <p className="text-xl font-extrabold text-[#111827] mt-0.5">40% reduction</p>
                  <p className="text-xs text-[#6B7280]">{project.key_result}</p>
                </div>
                <TrendingDown size={28} className="text-[#4F46E5] opacity-80" />
              </div>
            )}
          </div>

          {/* Screenshots Gallery */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">Project Screenshots</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="h-28 bg-[#F3F4F6] rounded-xl border border-[#E5E7EB] flex items-center justify-center text-xs text-[#9CA3AF]">
                Interface Overview
              </div>
              <div className="h-28 bg-[#F3F4F6] rounded-xl border border-[#E5E7EB] flex items-center justify-center text-xs text-[#9CA3AF]">
                NLP Concept Map
              </div>
              <div className="h-28 bg-[#F3F4F6] rounded-xl border border-[#E5E7EB] flex items-center justify-center text-xs text-[#9CA3AF]">
                Flashcard Engine
              </div>
            </div>
          </div>

          {/* Supporting Document */}
          {project.document_name && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">Supporting Documentation</h3>
              <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText size={22} className="text-[#4F46E5]" />
                  <div>
                    <p className="text-xs font-bold text-[#111827]">{project.document_name}</p>
                    <p className="text-[10px] text-[#6B7280]">{project.document_size}</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-[#4F46E5] hover:underline cursor-pointer">
                  Download Document
                </button>
              </div>
            </div>
          )}

          {/* Technologies Used Badges */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">Skills &amp; Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((tag) => (
                <Badge key={tag} label={tag} className="text-xs px-3 py-1.5" />
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#F3F4F6]">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noreferrer">
                <Button variant="primary" size="md" className="gap-2">
                  <ExternalLink size={16} /> Open Live Application
                </Button>
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noreferrer">
                <Button variant="outline" size="md" className="gap-2">
                  <Code2 size={16} /> View Source Code
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Creator Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar name={doer.full_name} imageUrl={doer.avatar_url} size="lg" />
          <div>
            <h4 className="font-bold text-[#111827] text-base">{doer.full_name}</h4>
            <p className="text-xs text-[#6B7280]">{doer.program} · {doer.year}</p>
          </div>
        </div>
        <Link href={`/doers/${doer.username || doer.id}${fromDashboard ? '?from=dashboard' : ''}`}>
          <Button variant="outline" size="sm">View Full Profile</Button>
        </Link>
      </div>
    </div>
  )
}
