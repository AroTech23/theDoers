'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import { ChevronDown, Plus } from 'lucide-react'

export default function DoerNavbar() {
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') return true
    if (path !== '/dashboard' && pathname?.startsWith(path)) return true
    return false
  }

  return (
    <nav className="w-full bg-white border-b border-[#E5E7EB] sticky top-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold text-[#111827]">
            theDoers
          </Link>
        </div>

        {/* Center: Tabs */}
        <div className="hidden md:flex h-full items-center gap-8">
          <Link
            href="/dashboard"
            className={`h-full flex items-center px-1 border-b-2 transition-colors ${
              isActive('/dashboard') 
                ? 'border-[#111827] text-[#111827] font-bold' 
                : 'border-transparent text-[#6B7280] hover:text-[#111827] font-medium'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/projects"
            className={`h-full flex items-center px-1 border-b-2 transition-colors ${
              isActive('/dashboard/projects') 
                ? 'border-[#111827] text-[#111827] font-bold' 
                : 'border-transparent text-[#6B7280] hover:text-[#111827] font-medium'
            }`}
          >
            My Projects
          </Link>
          <Link
            href="/dashboard/profile"
            className={`h-full flex items-center px-1 border-b-2 transition-colors ${
              isActive('/dashboard/profile') 
                ? 'border-[#111827] text-[#111827] font-bold' 
                : 'border-transparent text-[#6B7280] hover:text-[#111827] font-medium'
            }`}
          >
            My Portfolio
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/projects/new"
            className="hidden md:flex items-center gap-1.5 bg-[#1F2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Project
          </Link>

          <div className="relative">
            <button 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Avatar name="Alex Chen" size="sm" />
              <ChevronDown size={16} className="text-[#6B7280]" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-xl shadow-lg py-1 z-50">
                <Link 
                  href="/dashboard/settings" 
                  className="block px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB]"
                  onClick={() => setDropdownOpen(false)}
                >
                  Account Settings
                </Link>
                <Link 
                  href="/doers/alexchen" 
                  className="block px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB]"
                  onClick={() => setDropdownOpen(false)}
                >
                  View Public Profile
                </Link>
                <div className="my-1 border-t border-[#E5E7EB]"></div>
                <Link 
                  href="/login" 
                  className="block px-4 py-2 text-sm text-[#EF4444] hover:bg-[#F9FAFB]"
                  onClick={() => setDropdownOpen(false)}
                >
                  Log Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
