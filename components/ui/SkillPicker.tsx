'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  X,
  Search,
  Check,
  Plus,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react'
import {
  PREDEFINED_SKILL_CATEGORIES,
  searchPredefinedSkills,
  isValidSkill,
  ALL_PREDEFINED_SKILLS
} from '@/lib/predefinedSkills'

interface SkillPickerProps {
  selectedSkills: string[]
  onChange: (skills: string[]) => void
  maxSkills?: number
  label?: string
  helperText?: string
  className?: string
}

export default function SkillPicker({
  selectedSkills = [],
  onChange,
  maxSkills = 10,
  label = 'Technical Skills',
  helperText = 'Select from our verified technical library to showcase your engineering stack.',
  className = ''
}: SkillPickerProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>(PREDEFINED_SKILL_CATEGORIES[0].name)
  const [showBrowse, setShowBrowse] = useState(false)
  const [warningMessage, setWarningMessage] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const searchResults = searchPredefinedSkills(query, selectedSkills)

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const addSkill = (skill: string) => {
    setWarningMessage(null)
    if (selectedSkills.includes(skill)) {
      return
    }
    if (selectedSkills.length >= maxSkills) {
      setWarningMessage(`Maximum of ${maxSkills} skills reached. Remove one to add another.`)
      return
    }

    if (!isValidSkill(skill)) {
      setWarningMessage(
        `"${skill}" is not a recognized technical skill. Please select an approved skill from the list below.`
      )
      return
    }

    onChange([...selectedSkills, skill])
    setQuery('')
    setDropdownOpen(false)
  }

  const removeSkill = (skillToRemove: string) => {
    setWarningMessage(null)
    onChange(selectedSkills.filter((s) => s !== skillToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (searchResults.length > 0) {
        addSkill(searchResults[0])
      } else if (query.trim()) {
        if (!isValidSkill(query.trim())) {
          setWarningMessage(
            `"${query.trim()}" is not in the approved skills list. Please pick from the curated technical options.`
          )
        } else {
          // If valid exact match
          addSkill(query.trim())
        }
      }
    } else if (e.key === 'Escape') {
      setDropdownOpen(false)
    }
  }

  const currentCategoryObj =
    PREDEFINED_SKILL_CATEGORIES.find((c) => c.name === activeCategory) ||
    PREDEFINED_SKILL_CATEGORIES[0]

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Label and Counter Header */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          {label} ({selectedSkills.length}/{maxSkills})
        </label>
        <button
          type="button"
          onClick={() => setShowBrowse(!showBrowse)}
          className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] flex items-center gap-1 transition-colors cursor-pointer"
        >
          {showBrowse ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showBrowse ? 'Hide Category Directory' : 'Browse All by Category'}
        </button>
      </div>

      {helperText && <p className="text-[11px] text-[#64748B]">{helperText}</p>}

      {/* Selected Skills Chips Area */}
      <div className="flex flex-wrap gap-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl min-h-[52px]">
        {selectedSkills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#C7D2FE] text-[#4F46E5] font-bold text-xs rounded-xl shadow-2xs group hover:border-[#818CF8] transition-all"
          >
            <span>{skill}</span>
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="text-[#94A3B8] hover:text-[#EF4444] transition-colors p-0.5 rounded cursor-pointer"
              title={`Remove ${skill}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}

        {selectedSkills.length === 0 && (
          <span className="text-xs text-[#94A3B8] italic self-center">
            No skills selected. Type below or browse categories to select up to {maxSkills} skills.
          </span>
        )}
      </div>

      {/* Warning message if user tries an unapproved skill */}
      {warningMessage && (
        <div className="flex items-center gap-2 p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-xs text-[#B91C1C] animate-in fade-in duration-200">
          <AlertCircle size={15} className="shrink-0 text-[#EF4444]" />
          <span>{warningMessage}</span>
        </div>
      )}

      {/* Search Input with Autocomplete Dropdown */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={15} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search predefined skills (e.g. Python, Docker, React, PyTorch)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setWarningMessage(null)
              setDropdownOpen(true)
            }}
            onFocus={() => {
              if (query.trim()) setDropdownOpen(true)
            }}
            onKeyDown={handleKeyDown}
            disabled={selectedSkills.length >= maxSkills}
            className="w-full pl-9 pr-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A] bg-white disabled:bg-[#F1F5F9] disabled:cursor-not-allowed"
          />
        </div>

        {/* Live Search Results Dropdown */}
        {dropdownOpen && query.trim().length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 mt-1.5 bg-white border border-[#CBD5E1] rounded-2xl shadow-xl z-50 py-2 max-h-56 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150"
          >
            {searchResults.length > 0 ? (
              <div>
                <div className="px-3.5 py-1 text-[10px] font-bold font-mono text-[#64748B] uppercase tracking-wider">
                  Matching Approved Skills:
                </div>
                {searchResults.map((match) => (
                  <button
                    key={match}
                    type="button"
                    onClick={() => addSkill(match)}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#0F172A] hover:bg-[#EEF2FF] hover:text-[#4F46E5] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{match}</span>
                    <Plus size={13} className="text-[#4F46E5]" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-xs text-[#64748B]">
                <p className="font-semibold text-[#0F172A]">No approved skills match &quot;{query}&quot;</p>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Only verified software engineering skills are accepted. Try another search or browse below.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category Directory Browser (Expandable) */}
      {showBrowse && (
        <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
            <Sparkles size={14} className="text-[#4F46E5]" />
            <span>Curated Skill Categories:</span>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-[#F1F5F9] pb-3">
            {PREDEFINED_SKILL_CATEGORIES.map((cat) => {
              const isCatActive = cat.name === activeCategory
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    isCatActive
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                  }`}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>

          {/* Skills in Active Category */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
              Click to Add / Remove ({currentCategoryObj.skills.length} available):
            </span>
            <div className="flex flex-wrap gap-2">
              {currentCategoryObj.skills.map((skill) => {
                const isSelected = selectedSkills.includes(skill)
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        removeSkill(skill)
                      } else {
                        addSkill(skill)
                      }
                    }}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                      isSelected
                        ? 'bg-[#4F46E5] text-white ring-2 ring-[#818CF8]'
                        : 'bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] hover:border-[#4F46E5] hover:text-[#4F46E5]'
                    }`}
                  >
                    {isSelected ? <Check size={12} /> : <Plus size={12} />}
                    <span>{skill}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
