'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import { ChevronDown, Plus, LogOut } from 'lucide-react'

export default function DoerNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') return true
    if (path !== '/dashboard' && pathname?.startsWith(path)) return true
    return false
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('thedoers_auth_role')
      localStorage.removeItem('thedoers_user_name')
      document.cookie = "thedoers_auth_role=; path=/; max-age=0;"
    }
    router.push('/login')
  }

  return (
    <nav className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50 h-16">
      <div className="w-full px-6 md:px-8 h-full flex items-center justify-between">
        {/* Left: Logo (links to /dashboard) */}
        <div className="flex-shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5 text-xl font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors group" title="theDoers Dashboard">
            <img src="/logo-icon.png" alt="theDoers logo" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
            <span>theDoers</span>
          </Link>
        </div>

        {/* Center: Tabs */}
        <div className="hidden md:flex h-full items-center gap-8">
          <Link
            href="/dashboard"
            className={`h-full flex items-center px-1 border-b-2 transition-colors ${
              isActive('/dashboard') 
                ? 'border-[#0F172A] text-[#0F172A] font-bold' 
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] font-medium'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/projects"
            className={`h-full flex items-center px-1 border-b-2 transition-colors ${
              isActive('/dashboard/projects') 
                ? 'border-[#0F172A] text-[#0F172A] font-bold' 
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] font-medium'
            }`}
          >
            My Projects
          </Link>
          <Link
            href="/dashboard/profile"
            className={`h-full flex items-center px-1 border-b-2 transition-colors ${
              isActive('/dashboard/profile') 
                ? 'border-[#0F172A] text-[#0F172A] font-bold' 
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] font-medium'
            }`}
          >
            My Portfolio
          </Link>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs text-[#64748B] hover:text-[#4F46E5] font-semibold hidden md:inline-block bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-xl hover:bg-[#EEF2FF] transition-colors"
          >
            Public Site ↗
          </Link>

          <Link href="/dashboard/projects/new">
            <button className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs cursor-pointer">
              <Plus size={14} /> Add Project
            </button>
          </Link>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <Avatar name="Alex Chen" size="sm" />
              <ChevronDown size={14} className="text-[#64748B]" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-2xl shadow-lg py-1.5 z-50">
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC]"
                  onClick={() => setDropdownOpen(false)}
                >
                  Account Settings
                </Link>
                <Link
                  href="/doers/alexchen"
                  className="block px-4 py-2 text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC]"
                  onClick={() => setDropdownOpen(false)}
                >
                  View Public Profile ↗
                </Link>
                <div className="border-t border-[#F1F5F9] my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-[#EF4444] hover:bg-[#FEF2F2] flex items-center gap-2 cursor-pointer"
                >
                  <LogOut size={13} /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
