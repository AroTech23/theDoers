'use client'

import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { CheckCircle2, Circle } from 'lucide-react'
import { MOCK_PROJECTS } from '@/lib/mockData'

export default function DashboardPage() {
  const publishedProjects = MOCK_PROJECTS.slice(0, 2).map(p => ({ ...p, status: 'Published' }))
  const draftProjects = MOCK_PROJECTS.slice(2, 3).map(p => ({ ...p, status: 'Draft' }))
  
  const recentProjects = [...publishedProjects, ...draftProjects]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#111827] mb-2">Welcome back, Alex</h1>
        <p className="text-[#6B7280]">Manage your projects and keep your portfolio up to date.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        {/* Your Portfolio Card */}
        <div className="lg:col-span-3 bg-white border border-[#E5E7EB] rounded-2xl p-6">
          <h2 className="text-lg font-bold text-[#111827] mb-6">Your Portfolio</h2>
          <div className="flex items-center justify-between py-4 mb-6 border-y border-[#E5E7EB]">
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-[#111827]">6</div>
              <div className="text-sm text-[#6B7280]">Published Projects</div>
            </div>
            <div className="w-px h-12 bg-[#E5E7EB]"></div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-[#111827]">2</div>
              <div className="text-sm text-[#6B7280]">Draft Projects</div>
            </div>
            <div className="w-px h-12 bg-[#E5E7EB]"></div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-[#111827]">8</div>
              <div className="text-sm text-[#6B7280]">Skills</div>
            </div>
          </div>
          <Link href="/doers/alexchen" className="block w-full">
            <Button variant="outline" className="w-full justify-center">View Public Portfolio</Button>
          </Link>
        </div>

        {/* Portfolio Setup Card */}
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-6">
          <h2 className="text-lg font-bold text-[#111827] mb-6">Portfolio Setup</h2>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-sm text-[#111827]">
              <CheckCircle2 size={20} className="text-[#10B981]" /> Profile photo
            </li>
            <li className="flex items-center gap-3 text-sm text-[#111827]">
              <CheckCircle2 size={20} className="text-[#10B981]" /> About
            </li>
            <li className="flex items-center gap-3 text-sm text-[#111827]">
              <CheckCircle2 size={20} className="text-[#10B981]" /> Skills
            </li>
            <li className="flex items-center gap-3 text-sm text-[#111827]">
              <CheckCircle2 size={20} className="text-[#10B981]" /> 1+ Published Project
            </li>
            <li className="flex items-center gap-3 text-sm text-[#6B7280]">
              <Circle size={20} className="text-[#D1D5DB]" /> LinkedIn or GitHub
            </li>
          </ul>
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
          <Link href="/dashboard/projects" className="text-sm font-medium text-[#4F46E5] hover:text-[#3730A3]">
            View All Projects →
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <button className="px-4 py-1.5 bg-[#F3F4F6] text-[#111827] rounded-full text-sm font-medium">All</button>
          <button className="px-4 py-1.5 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full text-sm font-medium">Published</button>
          <button className="px-4 py-1.5 text-[#6B7280] hover:bg-[#F3F4F6] rounded-full text-sm font-medium">Drafts</button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProjects.map((project, i) => (
            <div key={project.id} className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col">
              <div className="h-40 bg-[#E2E8F0] w-full"></div>
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">{project.category}</div>
                  {project.status === 'Published' ? (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#10B981]">
                      <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                      Published
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280]">
                      <div className="w-2 h-2 rounded-full border-2 border-[#9CA3AF]"></div>
                      Draft
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-[#111827] mb-2">{project.title}</h3>
                
                <div className="mb-4">
                  <Badge label="Education / EdTech" />
                </div>
                
                <div className="mt-auto pt-4 border-t border-[#E5E7EB]">
                  <div className="text-xs text-[#6B7280] mb-4">Updated {i + 1} days ago</div>
                  <div className="flex gap-2">
                    {project.status === 'Published' ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1 justify-center">Edit</Button>
                        <Button variant="outline" size="sm" className="flex-1 justify-center">View</Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full justify-center">Continue Editing</Button>
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
