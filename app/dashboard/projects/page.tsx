'use client'

import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Plus, Search, MoreHorizontal, AlertTriangle } from 'lucide-react'
import { MOCK_PROJECTS } from '@/lib/mockData'

export default function ProjectsPage() {
  const projects = MOCK_PROJECTS.map((p, i) => ({
    ...p,
    status: i % 3 === 2 ? 'Draft' : 'Published'
  }))

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#111827] mb-2">My Projects</h1>
          <p className="text-[#6B7280]">Manage your projects, continue working on drafts, and keep your portfolio up to date.</p>
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
          <button className="pb-3 border-b-2 border-[#111827] text-[#111827] font-medium text-sm">
            All (6)
          </button>
          <button className="pb-3 border-b-2 border-transparent text-[#6B7280] hover:text-[#111827] font-medium text-sm">
            Published (4)
          </button>
          <button className="pb-3 border-b-2 border-transparent text-[#6B7280] hover:text-[#111827] font-medium text-sm">
            Drafts (2)
          </button>
        </div>
        
        <div className="relative pb-3 sm:pb-0 sm:mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full sm:w-64 pl-9 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <div key={project.id} className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col sm:flex-row">
            {/* Cover Image Area */}
            <div className={`sm:w-48 h-48 sm:h-auto ${i % 2 === 0 ? 'bg-[#E2E8F0]' : 'bg-[#E0E7FF]'} flex-shrink-0`}></div>
            
            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">{project.category}</div>
                {project.status === 'Published' ? (
                  <div className="px-2.5 py-1 bg-[#F3F4F6] rounded-full flex items-center gap-1.5 text-xs font-medium text-[#111827]">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                    Published
                  </div>
                ) : (
                  <div className="px-2.5 py-1 bg-[#F3F4F6] rounded-full flex items-center gap-1.5 text-xs font-medium text-[#111827]">
                    <div className="w-2 h-2 rounded-full border-2 border-[#9CA3AF]"></div>
                    Draft
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-[#111827] mb-2">{project.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge label="Education / EdTech" />
                {project.tags?.slice(0, 2).map((tag: string, idx: number) => (
                  <Badge key={idx} label={tag} />
                ))}
              </div>

              {project.status === 'Draft' && (
                <div className="mt-2 mb-3 p-2 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] flex items-center gap-2 text-xs text-[#6B7280]">
                  <AlertTriangle size={14} className="text-[#F59E0B]" />
                  Project Story incomplete
                </div>
              )}
              
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#E5E7EB]">
                <div className="text-xs text-[#6B7280]">Updated {i + 1} days ago</div>
                <div className="flex items-center gap-2">
                  {project.status === 'Published' ? (
                    <>
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View Project</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm">Preview</Button>
                      <Button variant="outline" size="sm">Continue Editing</Button>
                    </>
                  )}
                  <button className="p-1.5 text-[#6B7280] hover:text-[#111827] rounded-md hover:bg-[#F3F4F6]">
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
