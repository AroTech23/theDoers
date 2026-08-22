'use client'

import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Plus, Search, MoreHorizontal, AlertTriangle, Image as ImageIcon } from 'lucide-react'
import { MOCK_PROJECTS } from '@/lib/mockData'
import { useState } from 'react'

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'published' | 'drafts'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const allProjects = MOCK_PROJECTS.map((p, i) => ({
    ...p,
    status: i % 3 === 2 ? 'Draft' : 'Published',
    market: i % 2 === 0 ? 'Education / EdTech' : 'Smart Home / IoT'
  }))

  const filteredProjects = allProjects.filter((project) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'published'
        ? project.status === 'Published'
        : project.status === 'Draft'

    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#111827] mb-2">My Projects</h1>
          <p className="text-[#6B7280]">
            Manage your projects, continue working on drafts, and keep your portfolio up to date.
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="flex items-center gap-1.5 bg-[#1F2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
        >
          <Plus size={16} /> Create New Project
        </Link>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB] mb-8 gap-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setFilter('all')}
            className={`pb-3 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              filter === 'all'
                ? 'border-[#111827] text-[#111827] font-bold'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            All ({allProjects.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`pb-3 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              filter === 'published'
                ? 'border-[#111827] text-[#111827] font-bold'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Published ({allProjects.filter((p) => p.status === 'Published').length})
          </button>
          <button
            onClick={() => setFilter('drafts')}
            className={`pb-3 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              filter === 'drafts'
                ? 'border-[#111827] text-[#111827] font-bold'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Drafts ({allProjects.filter((p) => p.status === 'Draft').length})
          </button>
        </div>

        <div className="relative pb-3 sm:pb-0 sm:mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full sm:w-64 pl-9 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
          />
        </div>
      </div>

      {/* Grid: Clean 2-column or 3-column cards with top banner image (like public portfolio) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, i) => (
          <div
            key={project.id}
            className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
          >
            {/* Top Cover Image / Banner Area */}
            <div className="w-full h-44 bg-[#EEF2FF] flex items-center justify-center border-b border-[#E5E7EB] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E0E7FF] to-[#EEF2FF] flex items-center justify-center text-[#4F46E5]/40">
                <ImageIcon size={36} />
              </div>
              {/* Status Badge Overlaid on Image */}
              <div className="absolute top-3 right-3">
                {project.status === 'Published' ? (
                  <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-1.5 text-xs font-bold text-[#059669] shadow-sm border border-[#E5E7EB]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                    Published
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-1.5 text-xs font-bold text-[#6B7280] shadow-sm border border-[#E5E7EB]">
                    <span className="w-2 h-2 rounded-full border-2 border-[#9CA3AF]"></span>
                    Draft
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-xs text-[#E5E7EB]">|</span>
                <span className="text-xs font-medium text-[#6B7280]">{project.market}</span>
              </div>

              <Link href={`/projects/${project.id}?from=dashboard`}>
                <h3 className="text-lg font-bold text-[#111827] hover:text-[#4F46E5] transition-colors leading-snug">
                  {project.title}
                </h3>
              </Link>

              <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags?.map((tag: string) => (
                  <Badge key={tag} label={tag} />
                ))}
              </div>

              {project.status === 'Draft' && (
                <div className="mt-2 p-2.5 bg-[#FFFBEB] rounded-xl border border-[#FDE68A] flex items-center gap-2 text-xs font-medium text-[#B45309]">
                  <AlertTriangle size={14} className="text-[#F59E0B] shrink-0" />
                  Project Story incomplete
                </div>
              )}

              {/* Footer Actions */}
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#F3F4F6]">
                <span className="text-xs text-[#9CA3AF]">Updated {i + 1} days ago</span>
                <div className="flex items-center gap-2">
                  {project.status === 'Published' ? (
                    <>
                      <Link href={`/dashboard/projects/new?edit=${project.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Link href={`/projects/${project.id}?from=dashboard`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={`/projects/${project.id}?from=dashboard`}>
                        <Button variant="outline" size="sm">Preview</Button>
                      </Link>
                      <Link href={`/dashboard/projects/new?edit=${project.id}`}>
                        <Button variant="outline" size="sm">Continue Editing</Button>
                      </Link>
                    </>
                  )}
                  <button className="p-1.5 text-[#6B7280] hover:text-[#111827] rounded-md hover:bg-[#F3F4F6] cursor-pointer">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
