'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import DoerCard from '@/components/doers/DoerCard'
import { Search, SlidersHorizontal, X, ArrowLeft, Loader2, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_DOERS } from '@/lib/mockData'

export default function ExploreDoersPage() {
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [doers, setDoers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProgram, setSelectedProgram] = useState('All Programs')
  const [selectedYear, setSelectedYear] = useState('All Years')
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const programs = ['All Programs', 'Computer Science', 'Software Engineering', 'Data Science & AI', 'Interactive Design & HCI', 'Cybersecurity', 'Information Systems']
  const years = ['All Years', 'Year 1', 'Year 2', 'Year 3', 'Year 4', "Master's"]

  useEffect(() => {
    async function loadDoers() {
      try {
        setLoading(true)
        // 1. Fetch all approved doers from Supabase
        const { data: dbUsers } = await supabase
          .from('users')
          .select('*, doer_skills(skill:skills(name)), projects(id)')
          .eq('role', 'doer')
          .eq('status', 'approved')
          .order('created_at', { ascending: false })

        if (dbUsers && dbUsers.length > 0) {
          const formatted = dbUsers.map(u => ({
            ...u,
            skills: (u.doer_skills || []).map((ds: any) => ({ name: ds.skill?.name })).filter((s: any) => s.name),
            projects_count: (u.projects || []).length
          }))
          setDoers(formatted)
        } else {
          setDoers(MOCK_DOERS)
        }
      } catch (err) {
        console.error('Error loading doers:', err)
        setDoers(MOCK_DOERS)
      } finally {
        setLoading(false)
      }
    }

    loadDoers()
  }, [supabase])

  const filteredDoers = useMemo(() => {
    return doers.filter((doer) => {
      const matchesSearch =
        searchQuery === '' ||
        doer.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doer.program && doer.program.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doer.headline && doer.headline.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doer.bio && doer.bio.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doer.skills && doer.skills.some((s: any) => s.name?.toLowerCase().includes(searchQuery.toLowerCase())))

      const matchesProgram =
        selectedProgram === 'All Programs' ||
        (doer.program && doer.program.toLowerCase().includes(selectedProgram.toLowerCase()))

      const matchesYear =
        selectedYear === 'All Years' ||
        (doer.year && doer.year.toLowerCase() === selectedYear.toLowerCase())

      const matchesSkill =
        !selectedSkill ||
        (doer.skills && doer.skills.some((s: any) => s.name?.toLowerCase() === selectedSkill.toLowerCase()))

      return matchesSearch && matchesProgram && matchesYear && matchesSkill
    })
  }, [doers, searchQuery, selectedProgram, selectedYear, selectedSkill])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedProgram('All Programs')
    setSelectedYear('All Years')
    setSelectedSkill(null)
  }

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedProgram !== 'All Programs' ||
    selectedYear !== 'All Years' ||
    selectedSkill !== null

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#4F46E5]" />
        <p className="text-xs font-bold text-[#64748B]">Discovering talented student engineers...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-6">
      {/* Previous / Back Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors bg-[#EEF2FF] px-3.5 py-2 rounded-xl"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-[#111827]">Explore Doers</h1>
        <p className="mt-2 text-base text-[#6B7280]">
          Discover talented student engineers by their verified skills, programs, and proof of work.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 mb-8 shadow-sm flex flex-col gap-5">
        {/* Search input */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Doers by name, skill, degree..."
            className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wider">
              Program / Field
            </label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wider">
              Year of Study
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters / Reset */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-[#F3F4F6]">
            <span className="text-xs text-[#6B7280]">
              Showing <strong className="text-[#111827]">{filteredDoers.length}</strong> matching students
            </span>
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-[#EF4444] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X size={14} /> Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Grid of Real Doers */}
      {filteredDoers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoers.map((doer) => (
            <DoerCard key={doer.id} doer={doer} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-[#CBD5E1] p-12 text-center flex flex-col items-center gap-3">
          <Users size={32} className="text-[#4F46E5]" />
          <h3 className="text-xl font-bold text-[#0F172A]">No students found</h3>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md">
            No approved students matched your search criteria. Try clearing your filters or searching for another skill.
          </p>
        </div>
      )}
    </div>
  )
}
