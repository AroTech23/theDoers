'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import DoerCard from '@/components/doers/DoerCard'
import { Search, SlidersHorizontal, X, ArrowLeft, Loader2, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_DOERS } from '@/lib/mockData'

const programs = [
  'All Programs',
  'Computer Science',
  'Software Engineering',
  'Information Systems',
  'Data Science',
  'UX Design',
  'Cybersecurity'
]

const years = ['All Years', 'Year 1', 'Year 2', 'Year 3', 'Year 4']

function ExploreDoersContent() {
  const searchParams = useSearchParams()
  const skillParam = searchParams.get('skill')
  const queryParam = searchParams.get('q')

  const supabase = createClient()
  const [doers, setDoers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState(queryParam || '')
  const [selectedProgram, setSelectedProgram] = useState('All Programs')
  const [selectedYear, setSelectedYear] = useState('All Years')
  const [selectedSkill, setSelectedSkill] = useState<string | null>(skillParam || null)

  useEffect(() => {
    async function loadDoers() {
      try {
        setLoading(true)
        const { data: dbUsers, error } = await supabase
          .from('users')
          .select('*, doer_skills(skill:skills(name)), projects(id)')
          .eq('role', 'doer')
          .eq('status', 'approved')
          .order('created_at', { ascending: false })

        if (dbUsers && dbUsers.length > 0) {
          const formatted = dbUsers.map((u: any) => ({
            ...u,
            skills: (u.doer_skills || []).map((ds: any) => ({ name: ds.skill?.name })).filter((s: any) => s.name),
            projects_count: (u.projects || []).length
          }))
          setDoers(formatted)
        } else {
          setDoers(MOCK_DOERS)
        }
      } catch (err) {
        console.error('Error fetching doers:', err)
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


  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 flex flex-col gap-6 sm:gap-8">
      {/* Previous / Back Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors bg-[#EEF2FF] px-3.5 py-1.5 rounded-xl shadow-2xs"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">Explore Doers</h1>
        <p className="mt-1.5 text-xs sm:text-sm text-[#64748B] leading-relaxed">
          Discover talented student engineers by their verified skills, programs, and proof of work.
        </p>
      </div>

      {/* ── CLEAN PROMINENT SEARCH BAR (OUTSIDE) ── */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Doers by name, technical skills, program, or keywords..."
          className="w-full pl-11 pr-10 py-3 bg-white border border-[#E2E8F0] rounded-2xl text-xs sm:text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] shadow-xs hover:border-[#CBD5E1] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* ── FILTER CHIPS & DROPDOWNS BAR ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#F1F5F9] text-xs font-bold text-[#0F172A]">
          <SlidersHorizontal size={14} className="text-[#4F46E5]" />
          <span>Filter by Category &amp; Academic Year</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1 uppercase tracking-wider">
              Program / Discipline
            </label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all cursor-pointer"
            >
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1 uppercase tracking-wider">
              Year of Study
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Pill Status / Reset Action */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
            <span className="text-xs text-[#64748B]">
              Showing <strong className="text-[#0F172A] font-bold">{filteredDoers.length}</strong> matching students
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredDoers.map((doer) => (
            <DoerCard key={doer.id} doer={doer} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-[#CBD5E1] p-12 text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
            <Users size={24} />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">No students found</h3>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md">
            No approved students matched your search criteria. Try clearing your filters or searching for another skill.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-2 px-4 py-2 bg-[#4F46E5] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#4338CA] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default function ExploreDoersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" />}>
      <ExploreDoersContent />
    </Suspense>
  )
}
