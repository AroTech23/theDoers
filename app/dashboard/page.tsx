'use client'

import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import {
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  Image as ImageIcon,
  FolderPlus
} from 'lucide-react'
import { MOCK_PROJECTS, MOCK_DOERS } from '@/lib/mockData'
import { useState } from 'react'

export default function DashboardPage() {
  const currentDoer = MOCK_DOERS[0]
  const [copied, setCopied] = useState(false)

  const publishedProjects = MOCK_PROJECTS.slice(0, 2).map((p) => ({
    ...p,
    status: 'Published',
    market: 'Education / EdTech'
  }))
  const draftProjects = MOCK_PROJECTS.slice(2, 3).map((p) => ({
    ...p,
    status: 'Draft',
    market: 'Smart Home / IoT'
  }))

  const portfolioUrl = `thedoers.com/${currentDoer.username || 'alexchen'}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${portfolioUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-10">
      {/* ── 1. GREETING & CONTEXT HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">
            Welcome back, {currentDoer.full_name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Here&apos;s an overview of your student engineering portfolio and active projects.
          </p>
        </div>

        <Link href="/dashboard/projects/new">
          <Button variant="primary" size="md" className="gap-2 shadow-sm">
            <Plus size={16} /> Create New Project
          </Button>
        </Link>
      </div>

      {/* ── 2. TWO STRATEGIC SUMMARY CARDS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Card: Public Portfolio & Shareable Link (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-3xl p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                  Live Public Portfolio
                </span>
              </div>
              <span className="text-xs text-[#6B7280] font-medium">
                {currentDoer.program} · {currentDoer.year}
              </span>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 divide-x divide-[#E5E7EB] bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl py-4 mb-6 text-center">
              <div className="px-2">
                <div className="text-2xl font-extrabold text-[#111827]">6</div>
                <div className="text-xs text-[#6B7280] font-medium mt-0.5">Published</div>
              </div>
              <div className="px-2">
                <div className="text-2xl font-extrabold text-[#F59E0B]">2</div>
                <div className="text-xs text-[#6B7280] font-medium mt-0.5">Drafts</div>
              </div>
              <div className="px-2">
                <div className="text-2xl font-extrabold text-[#4F46E5]">{currentDoer.skills.length}</div>
                <div className="text-xs text-[#6B7280] font-medium mt-0.5">Skills Tagged</div>
              </div>
            </div>

            {/* Public Link Bar */}
            <div className="p-3 bg-[#EEF2FF] border border-[#E0E7FF] rounded-xl flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-xs text-[#4F46E5] font-mono truncate font-medium">
                  https://{portfolioUrl}
                </span>
              </div>
              <button
                onClick={handleCopyLink}
                className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#FAF5FF] text-xs font-bold text-[#4F46E5] border border-[#C7D2FE] rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                {copied ? <Check size={13} className="text-[#059669]" /> : <Copy size={13} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href={`/doers/${currentDoer.username || currentDoer.id}?from=dashboard`}
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs font-bold">
                <ExternalLink size={14} /> View Public Portfolio
              </Button>
            </Link>
            <Link href="/dashboard/profile" className="flex-1">
              <Button variant="ghost" size="sm" className="w-full text-xs font-bold text-[#4F46E5]">
                Edit Profile Information →
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Card: Portfolio Setup / Optimization (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-3xl p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                <Sparkles size={18} className="text-[#4F46E5]" /> Portfolio Optimization
              </h2>
              <span className="text-xs font-extrabold text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-full">
                80% Complete
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#F3F4F6] h-2 rounded-full overflow-hidden mb-5">
              <div className="bg-[#4F46E5] h-full w-[80%] transition-all duration-500 rounded-full" />
            </div>

            {/* Checklist items */}
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2.5 text-xs text-[#374151] font-medium">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>Profile photo &amp; bio</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-[#374151] font-medium">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>Skills &amp; academic program tagged</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-[#374151] font-medium">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>At least 1 published engineering project</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-[#B45309] bg-[#FFFBEB] p-2 rounded-lg border border-[#FDE68A] font-semibold">
                <Circle size={16} className="text-[#F59E0B] shrink-0" />
                <span>Add LinkedIn or GitHub link (Next Step)</span>
              </li>
            </ul>
          </div>

          <Link href="/dashboard/profile" className="block w-full">
            <Button variant="outline" size="sm" className="w-full text-xs font-bold">
              Complete Next Step →
            </Button>
          </Link>
        </div>

      </div>

      {/* ── 3. ACTIONABLE ACTIVE DRAFTS SECTION ── */}
      {draftProjects.length > 0 && (
        <div className="bg-gradient-to-r from-[#FAF5FF] to-[#EEF2FF] border border-[#E0E7FF] rounded-3xl p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-white text-[#4F46E5] rounded-2xl shadow-xs shrink-0 border border-[#E0E7FF]">
                <AlertCircle size={22} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4F46E5]">
                  UNFINISHED DRAFT PROJECT
                </span>
                <h3 className="text-base font-bold text-[#111827] mt-0.5">
                  {draftProjects[0].title}
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Project story and architecture blueprint are pending completion.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href={`/dashboard/projects/new?edit=${draftProjects[0].id}`}>
                <Button variant="primary" size="sm" className="gap-1.5 text-xs">
                  Continue Editing <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. RECENT PUBLISHED PROJECTS ── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Recent Published Projects</h2>
            <p className="text-xs text-[#6B7280] mt-0.5">Your latest live case studies visible to recruiters and peers.</p>
          </div>
          <Link
            href="/dashboard/projects"
            className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors flex items-center gap-1"
          >
            View All Projects ({publishedProjects.length + draftProjects.length}) →
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Published Project 1 */}
          {publishedProjects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Cover Image Area */}
              <div className="w-full h-40 bg-[#EEF2FF] flex items-center justify-center border-b border-[#E5E7EB] relative">
                <div className="text-[#4F46E5]/40">
                  <ImageIcon size={32} />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-0.5 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-1.5 text-[10px] font-bold text-[#059669] shadow-2xs border border-[#E5E7EB]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                    Published
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col gap-2.5">
                <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider">
                  {project.category}
                </span>

                <Link href={`/projects/${project.id}?from=dashboard`}>
                  <h3 className="text-base font-bold text-[#111827] hover:text-[#4F46E5] transition-colors leading-snug">
                    {project.title}
                  </h3>
                </Link>

                <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {project.tags?.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} label={tag} className="text-[10px]" />
                  ))}
                </div>

                <div className="mt-auto pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
                  <span className="text-[11px] text-[#9CA3AF]">Updated {idx + 2} days ago</span>
                  <div className="flex items-center gap-2">
                    <Link href={`/projects/${project.id}?from=dashboard`}>
                      <Button variant="outline" size="sm" className="text-xs px-2.5 py-1">View</Button>
                    </Link>
                    <Link href={`/dashboard/projects/new?edit=${project.id}`}>
                      <Button variant="ghost" size="sm" className="text-xs px-2.5 py-1 text-[#4F46E5]">Edit</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Quick Create Card (New Action Prompt) */}
          <Link
            href="/dashboard/projects/new"
            className="group bg-[#F9FAFB] hover:bg-[#F3F4F6] border-2 border-dashed border-[#E5E7EB] hover:border-[#4F46E5] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[280px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E7EB] group-hover:border-[#4F46E5] group-hover:scale-105 transition-all flex items-center justify-center text-[#4F46E5] mb-3 shadow-2xs">
              <FolderPlus size={24} />
            </div>
            <h4 className="font-bold text-[#111827] text-sm group-hover:text-[#4F46E5] transition-colors">
              Add Another Project
            </h4>
            <p className="text-xs text-[#6B7280] max-w-[200px] mt-1">
              Document an engineering project, prototype, or research case study.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#4F46E5]">
              Start Project Wizard <ArrowRight size={12} />
            </span>
          </Link>

        </div>
      </div>
    </div>
  )
}
