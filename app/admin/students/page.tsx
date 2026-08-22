'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MOCK_ADMIN_STUDENTS, AdminStudent } from '@/lib/adminData'
import Avatar from '@/components/ui/Avatar'
import { Search, Users, X, MoreHorizontal } from 'lucide-react'

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<AdminStudent[]>(MOCK_ADMIN_STUDENTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProgram, setSelectedProgram] = useState('All Programs')
  const [selectedYear, setSelectedYear] = useState('All Years')
  const [selectedStatus, setSelectedStatus] = useState('All Statuses')

  const programs = ['All Programs', 'Computer Science', 'Software Engineering', 'Data Science', 'UX Design']
  const years = ['All Years', 'Year 2', 'Year 3', 'Year 4']
  const statuses = ['All Statuses', 'Active', 'Pending', 'Suspended']

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        searchQuery === '' ||
        s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchProgram =
        selectedProgram === 'All Programs' || s.program.includes(selectedProgram)

      const matchYear =
        selectedYear === 'All Years' || s.year === selectedYear

      const matchStatus =
        selectedStatus === 'All Statuses' || s.status === selectedStatus

      return matchSearch && matchProgram && matchYear && matchStatus
    })
  }, [students, searchQuery, selectedProgram, selectedYear, selectedStatus])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedProgram('All Programs')
    setSelectedYear('All Years')
    setSelectedStatus('All Statuses')
  }

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedProgram !== 'All Programs' ||
    selectedYear !== 'All Years' ||
    selectedStatus !== 'All Statuses'

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Students</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            View and manage students registered on theDoers.com.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] shadow-sm self-start sm:self-auto">
          <Users size={16} className="text-[#4F46E5]" />
          <span>{students.length} registered students</span>
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
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {programs.map((p) => (
                <option key={p} value={p}>{p === 'All Programs' ? 'Program: All Programs' : p}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y === 'All Years' ? 'Year: All Years' : y}</option>
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

      {/* Students Data Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#374151]">
            <thead className="bg-[#F9FAFB] text-xs font-semibold text-[#6B7280] uppercase tracking-wider border-b border-[#E5E7EB]">
              <tr>
                <th className="py-3.5 px-6">STUDENT</th>
                <th className="py-3.5 px-6">PROGRAM</th>
                <th className="py-3.5 px-6">YEAR</th>
                <th className="py-3.5 px-6 text-center">PROJECTS</th>
                <th className="py-3.5 px-6">JOINED</th>
                <th className="py-3.5 px-6 text-center">STATUS</th>
                <th className="py-3.5 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <Avatar name={s.full_name} size="sm" />
                    <div>
                      <p className="font-bold text-[#111827]">{s.full_name}</p>
                      <p className="text-xs text-[#6B7280]">{s.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-[#111827] font-medium">{s.program}</td>
                  <td className="py-4 px-6 text-xs text-[#6B7280]">{s.year}</td>
                  <td className="py-4 px-6 text-xs font-bold text-center">{s.projects_count}</td>
                  <td className="py-4 px-6 text-xs text-[#6B7280]">{s.joined_date}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        s.status === 'Active'
                          ? 'bg-[#DEF7EC] text-[#03543F]'
                          : s.status === 'Pending'
                          ? 'bg-[#FEF3C7] text-[#92400E]'
                          : 'bg-[#FDE8E8] text-[#9B1C1C]'
                      }`}
                    >
                      ● {s.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/admin/students/${s.id}`}
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
          <span>Showing {filteredStudents.length} of {students.length} students</span>
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
