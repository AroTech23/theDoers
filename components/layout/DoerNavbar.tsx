'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import { ChevronDown, Plus, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function DoerNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userName, setUserName] = useState<string>('Doer')
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined)
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    async function loadUser() {
      // 1. First check localStorage for immediate render
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('thedoers_user_name')
        if (stored) setUserName(stored)
      }

      // 2. Fetch live user details from Supabase
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
    }
    router.push('/login')
  }

  return (
    <nav className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50 h-16">
      <div className="w-full px-6 md:px-8 lg:px-12 h-full flex items-center justify-between">
        
        {/* Left: theDoers Brand Logo with real graphic icon */}
        <div className="flex items-center gap-8 lg:gap-12 h-full">
          <Link 
            href="/" 
            className="flex items-center gap-2.5 text-xl font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors group"
          >
            <img 
              src="/logo-icon.png" 
              alt="theDoers logo" 
              className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" 
            />
            <span>theDoers</span>
          </Link>

          {/* Center: Navigation Tabs */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
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
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs text-[#64748B] hover:text-[#4F46E5] font-semibold hidden md:inline-block bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2 rounded-xl hover:bg-[#EEF2FF] transition-colors"
          >
            Public Site ↗
          </Link>

          <Link href="/dashboard/projects/new">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs cursor-pointer">
              <Plus size={14} /> Add Project
            </button>
          </Link>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none cursor-pointer p-1 rounded-full hover:bg-[#F8FAFC]"
            >
              <Avatar name={userName} imageUrl={userAvatar} size="sm" className="rounded-full overflow-hidden" />
              <ChevronDown size={14} className="text-[#64748B]" />
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
                  className="block px-4 py-2 text-xs font-medium text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                >
                  Edit Profile
                </Link>

                <Link
                  href={`/doers/${username || 'doer'}?from=dashboard`}
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-medium text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                >
                  View Public Portfolio ↗
                </Link>

                <Link
                  href="/dashboard/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-medium text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                >
                  Account Settings
                </Link>

                <div className="border-t border-[#F1F5F9] my-1" />

                <button
                  onClick={() => {
                    setDropdownOpen(false)
                    handleLogout()
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-[#EF4444] hover:bg-[#FEF2F2] flex items-center gap-2 transition-colors cursor-pointer"
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
