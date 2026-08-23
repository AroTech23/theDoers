'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import { useState, useEffect, Suspense } from 'react'
import { Menu, X, LogOut, LayoutDashboard, ShieldCheck, Plus, ChevronDown } from 'lucide-react'

function NavbarContent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Dynamic Auth State
  const [authRole, setAuthRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('thedoers_auth_role')
      const storedName = localStorage.getItem('thedoers_user_name')
      setAuthRole(storedRole)
      setUserName(storedName || (storedRole === 'admin' ? 'Admin' : storedRole === 'doer' ? 'Alex Chen' : null))
    }
  }, [pathname])

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

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('thedoers_auth_role')
      localStorage.removeItem('thedoers_user_name')
      document.cookie = "thedoers_auth_role=; path=/; max-age=0;"
    }
    setAuthRole(null)
    setUserName(null)
    setUserDropdownOpen(false)
    router.push('/login')
  }

  const isDoersActive = pathname === '/doers' || pathname?.startsWith('/doers/')
  const isAboutActive = pathname === '/about'

  return (
    <nav className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50 h-16">
      <div className="w-full px-6 md:px-8 lg:px-12 h-full flex items-center justify-between">
        
        {/* Left Side: Logo & Tabs */}
        <div className="flex items-center gap-12 lg:gap-14 h-full">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors group">
            <img src="/logo-icon.png" alt="theDoers logo" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
            <span>theDoers</span>
          </Link>

          {/* Desktop Nav Tabs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/doers"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                isDoersActive
                  ? 'bg-[#EEF2FF] text-[#4F46E5] shadow-2xs font-bold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              Doers
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
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
            /* 2. DOER / STUDENT LOGGED IN */
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
                  className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  <Avatar name={userName || 'Alex Chen'} size="sm" />
                  <ChevronDown size={14} className="text-[#64748B]" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-2xl shadow-lg py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-[#F1F5F9]">
                      <p className="text-xs font-bold text-[#0F172A]">{userName || 'Alex Chen'}</p>
                      <p className="text-[10px] text-[#64748B] font-semibold">Active Doer</p>
                    </div>
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC]"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      My Portfolio
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="block px-4 py-2 text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC]"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Account Settings
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
            /* 3. ANONYMOUS VISITOR */
            <>
              <Link href="/login">
                <Button variant="ghost" size="md">Log In</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="md">Become a Doer</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[#64748B] hover:text-[#0F172A]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-6 py-4 flex flex-col gap-4 shadow-lg">
          <Link
            href="/doers"
            className={`text-sm font-medium ${isDoersActive ? 'text-[#4F46E5] font-bold' : 'text-[#64748B]'}`}
            onClick={() => setMenuOpen(false)}
          >
            Doers
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium ${isAboutActive ? 'text-[#4F46E5] font-bold' : 'text-[#64748B]'}`}
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>

          <div className="flex flex-col gap-2 pt-2 border-t border-[#E2E8F0]">
            {isAdminLoggedIn ? (
              <div className="flex items-center justify-between">
                <Link href="/admin" className="text-sm font-bold text-[#4F46E5]" onClick={() => setMenuOpen(false)}>
                  Admin Dashboard →
                </Link>
                <button onClick={handleLogout} className="text-xs font-bold text-[#EF4444]">
                  Log Out
                </button>
              </div>
            ) : isDoerLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link href="/dashboard" className="text-sm font-bold text-[#0F172A]" onClick={() => setMenuOpen(false)}>
                  My Dashboard →
                </Link>
                <Link href="/dashboard/projects/new" className="text-sm font-bold text-[#4F46E5]" onClick={() => setMenuOpen(false)}>
                  + Add Project
                </Link>
                <button onClick={handleLogout} className="text-left text-xs font-bold text-[#EF4444] pt-2 border-t border-[#F1F5F9]">
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" size="md" className="w-full justify-center">Log In</Button>
                </Link>
                <Link href="/register" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full justify-center">Become a Doer</Button>
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
