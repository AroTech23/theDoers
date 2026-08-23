'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import { ChevronDown, Plus, LogOut, Menu, X, LayoutDashboard, FolderKanban, User, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function DoerNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userName, setUserName] = useState<string>('Doer')
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined)
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    async function loadUser() {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('thedoers_user_name')
        if (stored) setUserName(stored)
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('full_name, username, avatar_url')
          .eq('id', user.id)
          .maybeSingle()

        if (profile) {
          if (profile.full_name) {
            setUserName(profile.full_name)
            if (typeof window !== 'undefined') {
              localStorage.setItem('thedoers_user_name', profile.full_name)
            }
          }
          if (profile.username) {
            setUsername(profile.username)
          }
          if (profile.avatar_url) {
            setUserAvatar(profile.avatar_url)
          }
        }
      }
    }

    loadUser()
  }, [supabase])

  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') return true
    if (path !== '/dashboard' && pathname?.startsWith(path)) return true
    return false
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('thedoers_auth_role')
      localStorage.removeItem('thedoers_user_name')
      localStorage.removeItem('thedoers_user_email')
      document.cookie = "thedoers_auth_role=; path=/; max-age=0;"
    }
    router.push('/login?logged_out=true')
  }

  return (
    <nav className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 h-16 flex items-center justify-between">
        
        {/* Left: theDoers Brand Logo with real graphic icon */}
        <div className="flex items-center gap-6 lg:gap-10 h-full">
          <Link 
            href="/" 
            className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors group shrink-0"
          >
            <img 
              src="/logo-icon.png" 
              alt="theDoers logo" 
              className="h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform" 
            />
            <span>theDoers</span>
          </Link>

          {/* Desktop & Tablet Nav Tabs */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8 h-full">
            <Link
              href="/dashboard"
              className={`h-full flex items-center px-1 border-b-2 text-xs sm:text-sm transition-colors ${
                isActive('/dashboard') 
                  ? 'border-[#0F172A] text-[#0F172A] font-bold' 
                  : 'border-transparent text-[#64748B] hover:text-[#0F172A] font-medium'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/projects"
              className={`h-full flex items-center px-1 border-b-2 text-xs sm:text-sm transition-colors ${
                isActive('/dashboard/projects') 
                  ? 'border-[#0F172A] text-[#0F172A] font-bold' 
                  : 'border-transparent text-[#64748B] hover:text-[#0F172A] font-medium'
              }`}
            >
              My Projects
            </Link>
            <Link
              href="/dashboard/profile"
              className={`h-full flex items-center px-1 border-b-2 text-xs sm:text-sm transition-colors ${
                isActive('/dashboard/profile') 
                  ? 'border-[#0F172A] text-[#0F172A] font-bold' 
                  : 'border-transparent text-[#64748B] hover:text-[#0F172A] font-medium'
              }`}
            >
              My Portfolio
            </Link>
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Link
            href="/"
            className="text-xs text-[#64748B] hover:text-[#4F46E5] font-semibold hidden lg:inline-block bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl hover:bg-[#EEF2FF] transition-colors"
          >
            Public Site ↗
          </Link>

          <Link href="/dashboard/projects/new" className="hidden sm:inline-block">
            <button className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs cursor-pointer">
              <Plus size={14} /> Add Project
            </button>
          </Link>

          {/* Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 focus:outline-none cursor-pointer p-1 rounded-full hover:bg-[#F8FAFC]"
            >
              <Avatar name={userName} imageUrl={userAvatar} size="sm" className="rounded-full overflow-hidden w-8 h-8" />
              <ChevronDown size={14} className="text-[#64748B] hidden sm:inline-block" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-[#E2E8F0] rounded-2xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-[#F1F5F9] mb-1">
                  <p className="text-xs font-bold text-[#0F172A] truncate">{userName}</p>
                  <p className="text-[11px] text-[#64748B] truncate">Student Engineer</p>
                </div>

                <Link
                  href="/dashboard/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-medium text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                >
                  Edit Profile
                </Link>

                <Link
                  href={`/doers/${username || 'doer'}?from=dashboard`}
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-medium text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                >
                  View Public Portfolio ↗
                </Link>

                <Link
                  href="/dashboard/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-medium text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                >
                  Account Settings
                </Link>

                <div className="border-t border-[#F1F5F9] my-1" />

                <button
                  onClick={() => {
                    setDropdownOpen(false)
                    handleLogout()
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-[#EF4444] hover:bg-[#FEF2F2] flex items-center gap-2 cursor-pointer"
                >
                  <LogOut size={13} /> Log Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Drawer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-xl cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-6 py-4 flex flex-col gap-3 shadow-lg animate-in slide-in-from-top-2">
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-bold ${
              isActive('/dashboard') ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#334155]'
            }`}
          >
            <LayoutDashboard size={15} /> Dashboard
          </Link>
          <Link
            href="/dashboard/projects"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-bold ${
              isActive('/dashboard/projects') ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#334155]'
            }`}
          >
            <FolderKanban size={15} /> My Projects
          </Link>
          <Link
            href="/dashboard/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-bold ${
              isActive('/dashboard/profile') ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#334155]'
            }`}
          >
            <User size={15} /> My Portfolio
          </Link>
          <Link
            href="/dashboard/projects/new"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#0F172A] text-white shadow-2xs mt-2"
          >
            <Plus size={15} /> + Add Project
          </Link>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#4F46E5]"
          >
            <ExternalLink size={13} /> Visit Public Site ↗
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              handleLogout()
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold text-[#EF4444] hover:bg-[#FEF2F2] border-t border-[#F1F5F9] pt-3 mt-1 cursor-pointer"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      )}
    </nav>
  )
}
