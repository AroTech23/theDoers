'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import { useState, useEffect, Suspense } from 'react'
import { Menu, X, LogOut, LayoutDashboard, ShieldCheck, Plus, ChevronDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function NavbarContent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  // Dynamic Auth State
  const [authRole, setAuthRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [userAvatar, setUserAvatar] = useState<string | null>(null)

  useEffect(() => {
    async function loadAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('full_name, role, status, avatar_url')
          .eq('id', user.id)
          .maybeSingle()

        // ONLY treat user as logged in if they are approved or admin
        if (profile && (profile.status === 'approved' || profile.role === 'admin')) {
          setAuthRole(profile.role)
          setUserName(profile.full_name)
          setUserAvatar(profile.avatar_url)
          
          // Ensure session cookie is always synchronized
          if (typeof window !== 'undefined') {
            document.cookie = `thedoers_auth_role=${profile.role}; path=/; max-age=604800; SameSite=Lax;`
          }
          return
        }
      }

      // If user is pending, suspended, or unauthenticated, clear local session
      setAuthRole(null)
      setUserName(null)
      setUserAvatar(null)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('thedoers_auth_role')
        localStorage.removeItem('thedoers_user_name')
        document.cookie = "thedoers_auth_role=; path=/; max-age=0;"
      }
    }

    loadAuth()
  }, [pathname, supabase])

  // Hide public navbar on workspace dashboards and auth forms
  if (
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/dashboard') ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname?.startsWith('/forgot-password')
  ) {
    return null
  }

  const isDoerLoggedIn = authRole === 'doer'
  const isAdminLoggedIn = authRole === 'admin'

  const handleLogout = async () => {
    await supabase.auth.signOut()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('thedoers_auth_role')
      localStorage.removeItem('thedoers_user_name')
      document.cookie = "thedoers_auth_role=; path=/; max-age=0;"
    }
    setAuthRole(null)
    setUserName(null)
    setUserAvatar(null)
    setUserDropdownOpen(false)
    router.push('/login?logged_out=true')
  }

  const isDoersActive = pathname === '/doers' || pathname?.startsWith('/doers/')
  const isMagazineActive = pathname === '/magazine' || pathname?.startsWith('/magazine/')
  const isManifestoActive = pathname === '/manifesto'
  const isAboutActive = pathname === '/about'

  return (
    <nav className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50 h-16">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 h-full flex items-center justify-between">
        
        {/* Left Side: Logo & Tabs */}
        <div className="flex items-center gap-4 md:gap-6 lg:gap-12 h-full">
          <Link href="/" className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors group shrink-0">
            <img src="/logo-icon.png" alt="theDoers logo" className="h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
            <span>theDoers</span>
          </Link>

          {/* Desktop & Tablet Nav Tabs */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/doers"
              className={`px-2.5 lg:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                isDoersActive
                  ? 'bg-[#EEF2FF] text-[#4F46E5] shadow-2xs font-bold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              Doers
            </Link>
            <Link
              href="/magazine"
              className={`px-2.5 lg:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                isMagazineActive
                  ? 'bg-[#EEF2FF] text-[#4F46E5] shadow-2xs font-bold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              Magazine
            </Link>
            <Link
              href="/manifesto"
              className={`px-2.5 lg:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                isManifestoActive
                  ? 'bg-[#EEF2FF] text-[#4F46E5] shadow-2xs font-bold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              Manifesto
            </Link>
            <Link
              href="/about"
              className={`px-2.5 lg:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                isAboutActive
                  ? 'bg-[#EEF2FF] text-[#4F46E5] shadow-2xs font-bold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Right Side: Role-Aware Adaptive Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAdminLoggedIn ? (
            /* 1. ADMIN LOGGED IN */
            <div className="flex items-center gap-3">
              <Link 
                href="/admin" 
                className="flex items-center gap-2 text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] hover:bg-[#E0E7FF] px-3.5 py-2 rounded-xl border border-[#C7D2FE] transition-colors shadow-2xs"
              >
                <ShieldCheck size={15} /> Admin Dashboard
              </Link>
              <div className="w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                AD
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#EF4444] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          ) : isDoerLoggedIn ? (
            /* 2. DOER / STUDENT LOGGED IN (APPROVED ONLY) */
            <div className="flex items-center gap-3">
              <Link href="/dashboard/projects/new">
                <Button variant="primary" size="sm" className="gap-1.5 font-bold shadow-2xs">
                  <Plus size={14} /> Add Project
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="gap-1.5 font-bold border-[#E2E8F0] text-[#0F172A]">
                  <LayoutDashboard size={14} /> My Dashboard
                </Button>
              </Link>

              {/* Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-full hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  <Avatar name={userName || 'Doer'} imageUrl={userAvatar || undefined} size="sm" />
                  <ChevronDown size={14} className="text-[#64748B]" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-2xl shadow-lg py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-[#F1F5F9]">
                      <p className="text-xs font-bold text-[#0F172A]">{userName || 'Student Engineer'}</p>
                      <p className="text-[10px] text-[#64748B] font-semibold">Active Doer</p>
                    </div>

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-medium text-[#334155] hover:bg-[#F8FAFC]"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/dashboard/projects"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-medium text-[#334155] hover:bg-[#F8FAFC]"
                    >
                      My Projects
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
          ) : (
            /* 3. PUBLIC VISITOR (LOGGED OUT / PENDING) */
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-semibold text-xs text-[#334155] hover:text-[#0F172A]">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm" className="font-bold text-xs shadow-2xs">
                  Create Portfolio
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#64748B] hover:text-[#0F172A] p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-4 sm:px-6 py-5 flex flex-col gap-3 shadow-lg animate-in slide-in-from-top-2">
          {isDoerLoggedIn && userName && (
            <div className="pb-3 border-b border-[#F1F5F9] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#0F172A]">{userName}</p>
                <p className="text-[10px] text-[#64748B] font-semibold">Active Doer</p>
              </div>
              <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)}>
                <Avatar name={userName} imageUrl={userAvatar || undefined} size="sm" />
              </Link>
            </div>
          )}

          <Link
            href="/doers"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-[#0F172A] py-2 border-b border-[#F1F5F9] flex items-center justify-between"
          >
            <span>Doers</span>
            <span className="text-xs text-[#64748B]">Explore →</span>
          </Link>
          <Link
            href="/magazine"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-[#0F172A] py-2 border-b border-[#F1F5F9] flex items-center justify-between"
          >
            <span>Magazine</span>
            <span className="text-xs text-[#64748B]">Issue 01 →</span>
          </Link>
          <Link
            href="/manifesto"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-[#0F172A] py-2 border-b border-[#F1F5F9] flex items-center justify-between"
          >
            <span>Manifesto</span>
            <span className="text-xs text-[#64748B]">Read →</span>
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-[#0F172A] py-2 border-b border-[#F1F5F9] flex items-center justify-between"
          >
            <span>About Us</span>
            <span className="text-xs text-[#64748B]">Story →</span>
          </Link>

          <div className="flex flex-col gap-2.5 pt-2">
            {isAdminLoggedIn ? (
              <>
                <Link href="/admin" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full justify-center">
                    <ShieldCheck size={16} className="mr-1.5" /> Admin Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="md" onClick={handleLogout} className="w-full justify-center text-[#EF4444] border-[#FECACA]">
                  <LogOut size={15} className="mr-1.5" /> Log Out
                </Button>
              </>
            ) : isDoerLoggedIn ? (
              <>
                <Link href="/dashboard/projects/new" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full justify-center gap-1.5 font-bold shadow-xs">
                    <Plus size={16} /> Add Project
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" size="md" className="w-full justify-center text-xs">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" size="md" className="w-full justify-center text-xs">
                      My Profile
                    </Button>
                  </Link>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-center text-[#EF4444] text-xs font-bold pt-1">
                  <LogOut size={14} className="mr-1.5" /> Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full justify-center font-bold">
                    Log In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full justify-center font-bold shadow-xs">
                    Create Portfolio
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 bg-white border-b border-[#E2E8F0]" />}>
      <NavbarContent />
    </Suspense>
  )
}
