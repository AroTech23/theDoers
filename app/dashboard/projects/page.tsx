'use client'

import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Plus, Search, MoreHorizontal, AlertTriangle, FolderKanban, Loader2, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ProjectsPage() {
  const supabase = createClient()
  const [filter, setFilter] = useState<'all' | 'published' | 'drafts'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: userProjects } = await supabase
          .from('projects')
          .select('*')
          .eq('doer_id', user.id)
          .order('created_at', { ascending: false })

        if (userProjects) {
          setProjects(userProjects)
        }
      } catch (err: any) {
        console.error('Error loading projects:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [supabase])

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'published'
        ? project.status === 'published'
        : project.status === 'draft'

    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.category && project.category.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#4F46E5]" />
        <p className="text-xs font-bold text-[#64748B]">Loading your projects...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#111827] mb-1">My Projects</h1>
          <p className="text-xs sm:text-sm text-[#6B7280]">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB] mb-8 gap-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setFilter('all')}
            className={`pb-3 border-b-2 font-medium text-xs sm:text-sm transition-colors cursor-pointer ${
              filter === 'all'
                ? 'border-[#111827] text-[#111827] font-bold'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`pb-3 border-b-2 font-medium text-xs sm:text-sm transition-colors cursor-pointer ${
              filter === 'published'
                ? 'border-[#111827] text-[#111827] font-bold'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Published ({projects.filter((p) => p.status === 'published').length})
          </button>
          <button
            onClick={() => setFilter('drafts')}
            className={`pb-3 border-b-2 font-medium text-xs sm:text-sm transition-colors cursor-pointer ${
              filter === 'drafts'
                ? 'border-[#111827] text-[#111827] font-bold'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Drafts ({projects.filter((p) => p.status === 'draft').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative pb-2 sm:pb-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 text-xs bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider bg-[#EEF2FF] px-2.5 py-1 rounded-lg">
                    {project.category || 'General Engineering'}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    project.status === 'published' ? 'bg-[#DEF7EC] text-[#03543F]' : 'bg-[#F3F4F6] text-[#4B5563]'
                  }`}>
                    {project.status === 'published' ? '● Published' : '○ Draft'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#111827] line-clamp-1 mb-1.5">{project.title}</h3>
                <p className="text-xs text-[#6B7280] line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-[10px] font-semibold bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-md text-[#475569]">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] font-semibold text-[#94A3B8] self-center">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                <Link href={`/projects/${project.id}?from=dashboard`}>
                  <span className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1">
                    View Case Study <ExternalLink size={12} />
                  </span>
                </Link>
                <Link href={`/dashboard/projects/new?edit=${project.id}`}>
                  <Button variant="outline" size="sm" className="text-xs font-bold">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-[#CBD5E1] p-12 text-center flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shadow-2xs">
            <FolderKanban size={28} />
          </div>
          <h3 className="text-xl font-bold text-[#0F172A]">No projects found</h3>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md">
            {searchQuery 
              ? 'No projects matched your search criteria.' 
              : 'You haven\'t created any projects yet. Start publishing your technical case studies and show what you build!'}
          </p>
          <div className="pt-2">
            <Link href="/dashboard/projects/new">
              <Button variant="primary" size="md" className="font-bold shadow-xs">
                <Plus size={15} className="mr-1" /> Create Your First Project
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
