'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MOCK_DOERS, MOCK_SKILLS } from '@/lib/mockData'
import DoerCard from '@/components/doers/DoerCard'
import { Search, SlidersHorizontal, X, ArrowLeft } from 'lucide-react'

export default function ExploreDoersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProgram, setSelectedProgram] = useState('All Programs')
  const [selectedMarket, setSelectedMarket] = useState('All Markets')
  const [selectedYear, setSelectedYear] = useState('All Years')
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('Most Recent')

  const programs = ['All Programs', 'Computer Science', 'Interactive Design', 'Data Science', 'UX Design', 'Cybersecurity', 'Information Systems', 'Business Analytics']
  const years = ['All Years', 'Year 1', 'Sophomore', 'Junior', 'Senior', 'Graduate']
  const markets = ['All Markets', 'United States', 'Europe', 'Canada', 'Remote']

  const filteredDoers = useMemo(() => {
    return MOCK_DOERS.filter((doer) => {
      // Search
      const matchesSearch =
        searchQuery === '' ||
        doer.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doer.program?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doer.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doer.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))

      // Program
      const matchesProgram =
        selectedProgram === 'All Programs' ||
        doer.program?.toLowerCase().includes(selectedProgram.toLowerCase())

      // Year
      const matchesYear =
        selectedYear === 'All Years' ||
        doer.year?.toLowerCase() === selectedYear.toLowerCase()

      // Skill tag
      const matchesSkill =
        !selectedSkill ||
        doer.skills.some((s) => s.name.toLowerCase() === selectedSkill.toLowerCase())

      return matchesSearch && matchesProgram && matchesYear && matchesSkill
    })
  }, [searchQuery, selectedProgram, selectedYear, selectedSkill])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedProgram('All Programs')
    setSelectedMarket('All Markets')
    setSelectedYear('All Years')
    setSelectedSkill(null)
  }

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedProgram !== 'All Programs' ||
    selectedMarket !== 'All Markets' ||
    selectedYear !== 'All Years' ||
    selectedSkill !== null

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-6">
      {/* Previous / Back Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-[#111827]">Explore Doers</h1>
        <p className="mt-2 text-base text-[#6B7280]">
          Discover talented students by their skills, interests, and areas of expertise.
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
            placeholder="Search Doers by name, skill, market..."
            className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">Program</label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">Market</label>
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {markets.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Popular Skills Quick-Select & Clear filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#F3F4F6]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#6B7280] mr-1">Popular Skills:</span>
            {MOCK_SKILLS.slice(0, 8).map((skill) => {
              const active = selectedSkill === skill.name
              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(active ? null : skill.name)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#4F46E5] text-white'
                      : 'bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#E0E7FF]'
                  }`}
                >
                  {skill.name}
                </button>
              )
            })}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#EF4444] hover:text-[#B91C1C] cursor-pointer self-start sm:self-auto"
            >
              <X size={14} /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-semibold text-[#374151]">
          {filteredDoers.length} Doers found
        </span>

        <div className="flex items-center gap-2">
          <label className="text-xs text-[#6B7280]">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          >
            <option value="Most Recent">Most Recent</option>
            <option value="Name">Name (A-Z)</option>
            <option value="Most Projects">Most Projects</option>
          </select>
        </div>
      </div>

      {/* Doer Grid */}
      {filteredDoers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoers.map((doer) => (
            <DoerCard key={doer.id} doer={doer} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-12 text-center">
          <p className="text-[#6B7280] text-base">No Doers found matching your filter criteria.</p>
          <button
            onClick={handleClearFilters}
            className="mt-4 px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#3730A3] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
