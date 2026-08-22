'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MOCK_ADMIN_PROJECTS, AdminProject } from '@/lib/adminData'
import { Search, X, MoreHorizontal, Layers } from 'lucide-react'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<AdminProject[]>(MOCK_ADMIN_PROJECTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedStatus, setSelectedStatus] = useState('All Statuses')

  const categories = ['All Categories', 'AI / Machine Learning', 'Web Development', 'IoT', 'Data Science', 'Mobile Development']
  const statuses = ['All Statuses', 'Published', 'Draft']

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.student_name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchCat =
        selectedCategory === 'All Categories' || p.category === selectedCategory

      const matchStatus =
        selectedStatus === 'All Statuses' || p.status === selectedStatus

      return matchSearch && matchCat && matchStatus
    })
  }, [projects, searchQuery, selectedCategory, selectedStatus])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Categories')
    setSelectedStatus('All Statuses')
  }

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedStatus !== 'All Statuses'

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Projects</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            View and manage student projects across theDoers.com.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] shadow-sm self-start sm:self-auto">
          <Layers size={16} className="text-[#4F46E5]" />
          <span>{projects.length} total projects</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All Categories' ? 'Category: All Categories' : c}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>{st === 'All Statuses' ? 'Status: All Statuses' : st}</option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-bold text-[#EF4444] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <X size={14} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#374151]">
            <thead className="bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] uppercase tracking-wider border-b border-[#E5E7EB]">
              <tr>
                <th className="py-3.5 px-6">PROJECT</th>
                <th className="py-3.5 px-6">STUDENT</th>
                <th className="py-3.5 px-6">CATEGORY</th>
                <th className="py-3.5 px-6 text-center">STATUS</th>
                <th className="py-3.5 px-6">LAST UPDATED</th>
                <th className="py-3.5 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#111827]">{p.title}</td>
                  <td className="py-4 px-6 text-xs text-[#111827] font-medium">{p.student_name}</td>
                  <td className="py-4 px-6 text-xs text-[#6B7280]">{p.category}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        p.status === 'Published'
                          ? 'bg-[#EEF2FF] text-[#4F46E5]'
                          : 'bg-[#F3F4F6] text-[#6B7280]'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-[#6B7280]">{p.last_updated}</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] px-2 py-1 rounded hover:bg-[#EEF2FF] transition-colors"
                    >
                      View <MoreHorizontal size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="py-4 px-6 bg-[#F9FAFB] border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <span>Showing {filteredProjects.length} of {projects.length} projects</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg bg-white hover:bg-[#F9FAFB] disabled:opacity-50" disabled>
              Previous
            </button>
            <span className="px-3 py-1.5 bg-[#111827] text-white rounded-lg font-bold">1</span>
            <button className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg bg-white hover:bg-[#F9FAFB]">
              2
            </button>
            <button className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg bg-white hover:bg-[#F9FAFB]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
