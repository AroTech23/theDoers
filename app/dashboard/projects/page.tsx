'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Plus, Search, MoreHorizontal, Edit, Eye, Trash2, ExternalLink, Image as ImageIcon, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_PROJECTS } from '@/lib/mockData'

export default function MyProjectsPage() {
  const supabase = createClient()
  const [filter, setFilter] = useState<'all' | 'published' | 'drafts'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: dbProjects } = await supabase
          .from('projects')
          .select('*')
          .eq('doer_id', user.id)
          .order('created_at', { ascending: false })

        if (dbProjects) {
          setProjects(dbProjects)
        }
      } catch (err) {
        console.error('Error loading projects:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [supabase])

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'published' && project.status === 'published') ||
      (filter === 'drafts' && project.status === 'draft')

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.category && project.category.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 size={28} className="animate-spin text-[#4F46E5]" />
        <p className="text-xs font-bold text-[#64748B]">Loading your projects...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-1">My Projects</h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Manage your engineering case studies, work on drafts, and keep your proof of work up to date.
          </p>
        </div>

        <Link href="/dashboard/projects/new">
          <Button variant="primary" size="md" className="font-bold shadow-xs">
            <Plus size={15} className="mr-1" /> Create New Project
          </Button>
        </Link>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] mb-6 sm:mb-8 gap-3 sm:gap-4">
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`pb-3 border-b-2 font-semibold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 ${
              filter === 'all'
                ? 'border-[#0F172A] text-[#0F172A] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`pb-3 border-b-2 font-semibold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 ${
              filter === 'published'
                ? 'border-[#0F172A] text-[#0F172A] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Published ({projects.filter((p) => p.status === 'published').length})
          </button>
          <button
            onClick={() => setFilter('drafts')}
            className={`pb-3 border-b-2 font-semibold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 ${
              filter === 'drafts'
                ? 'border-[#0F172A] text-[#0F172A] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Drafts ({projects.filter((p) => p.status === 'draft').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative pb-2 sm:pb-0 w-full sm:w-auto">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 text-xs bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#CBD5E1] transition-all group"
            >
              {/* Project Image Banner */}
              <div className="w-full h-40 sm:h-44 bg-[#EEF2FF] border-b border-[#E2E8F0] overflow-hidden relative">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#4F46E5]/40">
                    <ImageIcon size={32} />
                  </div>
                )}
                {/* Floating Status Pill */}
                <div className="absolute top-2.5 right-2.5">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs backdrop-blur-md ${
                    project.status === 'published' 
                      ? 'bg-[#DEF7EC]/90 text-[#03543F] border border-[#BCF0DA]' 
                      : 'bg-white/90 text-[#4B5563] border border-[#E5E7EB]'
                  }`}>
                    {project.status === 'published' ? '● Published' : '○ Draft'}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2">
                {project.category && (
                  <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider">
                    {project.category}
                  </span>
                )}

                <h3 className="text-sm sm:text-base font-bold text-[#0F172A] line-clamp-1 leading-snug">{project.title}</h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed flex-1">
                  {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-[10px] bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded-md font-semibold">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] text-[#94A3B8] font-bold self-center">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="px-4 sm:px-5 py-3 bg-[#F8FAFC]/60 border-t border-[#F1F5F9] flex items-center justify-between">
                <Link href={`/projects/${project.id}?from=dashboard`}>
                  <span className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1">
                    Case Study <ExternalLink size={11} />
                  </span>
                </Link>
                <Link href={`/dashboard/projects/new?edit=${project.id}`}>
                  <Button variant="outline" size="sm" className="text-xs font-bold bg-white px-3 py-1">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-dashed border-[#CBD5E1] p-8 sm:p-12 text-center flex flex-col items-center gap-3">
          <p className="text-sm font-semibold text-[#64748B]">No projects found in this view.</p>
          <Link href="/dashboard/projects/new" className="pt-2">
            <Button variant="primary" size="sm" className="font-bold shadow-xs">
              <Plus size={14} className="mr-1" /> Create Project
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
