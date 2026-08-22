'use client'

import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { CheckCircle2, Circle, Image as ImageIcon } from 'lucide-react'
import { MOCK_PROJECTS, MOCK_DOERS } from '@/lib/mockData'
import { useState } from 'react'

export default function DashboardPage() {
  const currentDoer = MOCK_DOERS[0]
  const [filter, setFilter] = useState<'all' | 'published' | 'drafts'>('all')

  const publishedProjects = MOCK_PROJECTS.slice(0, 4).map(p => ({ ...p, status: 'Published', market: 'Education / EdTech' }))
  const draftProjects = MOCK_PROJECTS.slice(4, 6).map(p => ({ ...p, status: 'Draft', market: 'Smart Home / IoT' }))
  const allProjects = [...publishedProjects, ...draftProjects]

  const displayedProjects = allProjects.filter(p => {
    if (filter === 'published') return p.status === 'Published'
    if (filter === 'drafts') return p.status === 'Draft'
    return true
  }).slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#111827] mb-2">Welcome back, {currentDoer.full_name.split(' ')[0]}</h1>
        <p className="text-[#6B7280]">Manage your projects and keep your portfolio up to date.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        {/* Your Portfolio Card with Avatar Image Holder */}
        <div className="lg:col-span-3 bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Avatar name={currentDoer.full_name} imageUrl={currentDoer.avatar_url} size="lg" className="w-16 h-16 text-xl shadow-sm" />
              <div>
                <h2 className="text-xl font-bold text-[#111827]">{currentDoer.full_name}</h2>
                <p className="text-xs text-[#6B7280]">{currentDoer.program} · {currentDoer.year}</p>
                <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DEF7EC] text-[#03543F]">
                  ✓ Approved Doer
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 mb-6 border-y border-[#E5E7EB]">
              <div className="text-center flex-1">
                <div className="text-2xl font-extrabold text-[#111827]">6</div>
                <div className="text-xs text-[#6B7280]">Published Projects</div>
              </div>
              <div className="w-px h-10 bg-[#E5E7EB]"></div>
              <div className="text-center flex-1">
                <div className="text-2xl font-extrabold text-[#111827]">2</div>
                <div className="text-xs text-[#6B7280]">Draft Projects</div>
              </div>
              <div className="w-px h-10 bg-[#E5E7EB]"></div>
              <div className="text-center flex-1">
                <div className="text-2xl font-extrabold text-[#111827]">8</div>
                <div className="text-xs text-[#6B7280]">Skills</div>
              </div>
            </div>
          </div>

          <Link href={`/doers/${currentDoer.username || currentDoer.id}?from=dashboard`} className="block w-full">
            <Button variant="outline" className="w-full justify-center">View Public Portfolio</Button>
          </Link>
        </div>

        {/* Portfolio Setup Card */}
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-[#111827] mb-6">Portfolio Setup</h2>
            <ul className="space-y-3.5 mb-6">
              <li className="flex items-center gap-3 text-sm text-[#111827]">
                <CheckCircle2 size={18} className="text-[#10B981]" /> Profile photo
              </li>
              <li className="flex items-center gap-3 text-sm text-[#111827]">
                <CheckCircle2 size={18} className="text-[#10B981]" /> About
              </li>
              <li className="flex items-center gap-3 text-sm text-[#111827]">
                <CheckCircle2 size={18} className="text-[#10B981]" /> Skills
              </li>
              <li className="flex items-center gap-3 text-sm text-[#111827]">
                <CheckCircle2 size={18} className="text-[#10B981]" /> 1+ Published Project
              </li>
              <li className="flex items-center gap-3 text-sm text-[#6B7280]">
                <Circle size={18} className="text-[#D1D5DB]" /> LinkedIn or GitHub
              </li>
            </ul>
          </div>
          <Link href="/dashboard/profile" className="block w-full">
            <Button variant="outline" className="w-full justify-center">Complete Profile</Button>
          </Link>
        </div>
      </div>

      {/* My Projects Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">My Projects</h2>
            <p className="text-sm text-[#6B7280]">Manage your published projects and continue working on drafts.</p>
          </div>
          <Link href="/dashboard/projects" className="text-sm font-semibold text-[#4F46E5] hover:text-[#3730A3]">
            View All Projects →
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              filter === 'all' ? 'bg-[#111827] text-white' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              filter === 'published' ? 'bg-[#111827] text-white' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter('drafts')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              filter === 'drafts' ? 'bg-[#111827] text-white' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
            }`}
          >
            Drafts
          </button>
        </div>

        {/* Grid matching public portfolio card format */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedProjects.map((project, i) => (
            <div key={project.id} className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              {/* Cover Image Area */}
              <div className="w-full h-44 bg-[#EEF2FF] flex items-center justify-center border-b border-[#E5E7EB] relative">
                <div className="text-[#4F46E5]/40">
                  <ImageIcon size={36} />
                </div>
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

              {/* Card Body */}
              <div className="p-5 flex-grow flex flex-col gap-3">
                <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider">
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

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags?.map((tag: string) => (
                    <Badge key={tag} label={tag} />
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-[#F3F4F6]">
                  <div className="text-[11px] text-[#9CA3AF] mb-3">Updated {i + 1} days ago</div>
                  <div className="flex gap-2">
                    {project.status === 'Published' ? (
                      <>
                        <Link href={`/dashboard/projects/new?edit=${project.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full justify-center text-xs">Edit</Button>
                        </Link>
                        <Link href={`/projects/${project.id}?from=dashboard`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full justify-center text-xs">View</Button>
                        </Link>
                      </>
                    ) : (
                      <Link href={`/dashboard/projects/new?edit=${project.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full justify-center text-xs">Continue Editing</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
