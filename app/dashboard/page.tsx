'use client'

import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import {
  ExternalLink,
  Copy,
  Check,
  Edit2,
  Share2,
  Image as ImageIcon
} from 'lucide-react'
import { MOCK_PROJECTS, MOCK_DOERS } from '@/lib/mockData'
import { useState } from 'react'

export default function DashboardPage() {
  const currentDoer = MOCK_DOERS[0]
  const [copied, setCopied] = useState(false)

  const publishedProjects = MOCK_PROJECTS.slice(0, 2).map((p) => ({
    ...p,
    status: 'Published',
    market: p.id === 'p1' ? 'Education / EdTech' : 'Smart Home / IoT'
  }))

  const portfolioUrl = `thedoers.com/${currentDoer.username || 'alexchen'}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${portfolioUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-10">
      
      {/* ── TOP SECTION: TWO CLEAN WHITE CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Card: Profile Snapshot */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-full bg-[#4F46E5] flex items-center justify-center text-white text-2xl font-bold tracking-tight shadow-sm">
              AC
            </div>

            {/* Name & Academic info */}
            <div>
              <h2 className="text-2xl font-bold text-[#111827]">{currentDoer.full_name}</h2>
              <p className="text-xs font-medium text-[#6B7280] mt-0.5">
                {currentDoer.year} · {currentDoer.program}
              </p>
            </div>

            {/* Short Bio / Location */}
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Building AI &amp; embedded systems projects · Douala, Cameroon
            </p>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 pt-6 mt-2">
            <Link
              href={`/doers/${currentDoer.username || currentDoer.id}?from=dashboard`}
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

            {/* Share / Export Button */}
            <button
              onClick={handleCopyLink}
              title="Share Portfolio"
              className="p-2.5 bg-white hover:bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>

        {/* Right Card: Overview Metrics & Share Link */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#111827] mb-6">Overview</h2>

            {/* Metrics Box (06 PUBLISHED | 02 DRAFTS | 08 SKILLS TAGGED) */}
            <div className="grid grid-cols-3 divide-x divide-[#E5E7EB] border border-[#E5E7EB] bg-white rounded-2xl py-4 mb-6 text-center shadow-2xs">
              <div className="px-2">
                <div className="text-2xl font-extrabold text-[#4F46E5]">06</div>
                <div className="text-[10px] font-bold tracking-wider text-[#6B7280] uppercase mt-1">
                  Published
                </div>
              </div>
              <div className="px-2">
                <div className="text-2xl font-extrabold text-[#4F46E5]">02</div>
                <div className="text-[10px] font-bold tracking-wider text-[#6B7280] uppercase mt-1">
                  Drafts
                </div>
              </div>
              <div className="px-2">
                <div className="text-2xl font-extrabold text-[#4F46E5]">08</div>
                <div className="text-[10px] font-bold tracking-wider text-[#6B7280] uppercase mt-1">
                  Skills Tagged
                </div>
              </div>
            </div>

            {/* Public Link Bar */}
            <div className="p-3 bg-[#EEF2FF]/60 border border-[#E0E7FF] rounded-xl flex items-center justify-between gap-3 mb-4">
              <span className="text-xs text-[#4F46E5] font-medium truncate">
                {portfolioUrl}
              </span>
              <button
                onClick={handleCopyLink}
                className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#FAF5FF] text-xs font-bold text-[#4F46E5] border border-[#C7D2FE] rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                {copied ? <Check size={13} className="text-[#059669]" /> : null}
                {copied ? 'Copied' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Bottom Context Links */}
          <div className="flex items-center justify-between pt-2 text-xs font-semibold">
            <Link
              href={`/doers/${currentDoer.username || currentDoer.id}?from=dashboard`}
              className="text-[#111827] hover:text-[#4F46E5] transition-colors inline-flex items-center gap-1"
            >
              View Public Portfolio ↗
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-[#4F46E5] hover:text-[#3730A3] transition-colors"
            >
              Edit Profile Information →
            </Link>
          </div>
        </div>

      </div>

      {/* ── BOTTOM SECTION: RECENT PUBLISHED PROJECTS ── */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Recent Published Projects</h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Your latest live case studies, visible to recruiters and peers.
            </p>
          </div>
          <Link
            href="/dashboard/projects"
            className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors"
          >
            View All Projects (3) →
          </Link>
        </div>

        {/* 2-Column Grid Matching Wireframe Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Cover Image Area */}
              <div className="w-full h-52 bg-[#EEF2FF] flex items-center justify-center border-b border-[#E5E7EB] relative">
                <div className="text-[#4F46E5]/30">
                  <ImageIcon size={44} />
                </div>
                {/* Published Status Pill */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-1.5 text-xs font-bold text-[#059669] shadow-2xs border border-[#E5E7EB]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                    Published
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex-1 flex flex-col gap-3">
                <span className="text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider">
                  {project.category}
                </span>

                <Link href={`/projects/${project.id}?from=dashboard`}>
                  <h3 className="text-lg font-bold text-[#111827] hover:text-[#4F46E5] transition-colors leading-snug">
                    {project.title}
                  </h3>
                </Link>

                <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge
                    label={project.market}
                    className="bg-[#F3F4F6] text-[#374151] text-xs font-medium px-3 py-1 rounded-lg"
                  />
                  {project.tags?.slice(0, 2).map((tag: string) => (
                    <Badge
                      key={tag}
                      label={tag}
                      className="bg-[#F3F4F6] text-[#374151] text-xs font-medium px-3 py-1 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
