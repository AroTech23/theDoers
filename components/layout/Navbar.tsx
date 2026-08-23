'use client'

import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import { useState, useEffect, Suspense } from 'react'
import { Menu, X, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react'

function NavbarContent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  // State to track if user is logged in as admin or doer
  const [authRole, setAuthRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('thedoers_auth_role')
      const storedName = localStorage.getItem('thedoers_user_name')
      if (storedRole) {
        setAuthRole(storedRole)
        setUserName(storedName || (storedRole === 'admin' ? 'Admin' : 'Alex Chen'))
      }
    }
  }, [pathname])

  // Hide the public navbar on admin pages, dashboard, and auth routes
  if (
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/dashboard') ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname?.startsWith('/forgot-password')
  ) {
    return null
  }

  // Check if the visitor came from their dashboard workspace
  const fromDashboard = searchParams?.get('from') === 'dashboard' || authRole === 'doer'
  const isAdmin = authRole === 'admin'

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('thedoers_auth_role')
      localStorage.removeItem('thedoers_user_name')
    }
    setAuthRole(null)
    setUserName(null)
    router.push('/login')
  }

  const isDoersActive = pathname === '/doers' || pathname?.startsWith('/doers/')
  const isAboutActive = pathname === '/about'

  return (
    <nav className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50 h-16">
      <div className="w-full px-6 md:px-8 lg:px-12 h-full flex items-center justify-between">
        {/* Left Side: Logo & Primary Navigation Links */}
        <div className="flex items-center gap-12 lg:gap-14 h-full">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors group">
            <img src="/logo-icon.png" alt="theDoers logo" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
            <span>theDoers</span>
          </Link>

          {/* Desktop Nav with Interactive Pill/Tab Buttons */}
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

        {/* Desktop Actions based on Auth State */}
        <div className="hidden md:flex items-center gap-3">
          {isAdmin ? (
            /* When Admin is browsing the public site while authenticated */
            <div className="flex items-center gap-4">
              <Link 
                href="/admin" 
                className="flex items-center gap-2 text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] hover:bg-[#E0E7FF] px-3 py-1.5 rounded-xl border border-[#C7D2FE] transition-colors shadow-2xs"
              >
                <ShieldCheck size={15} /> Admin Dashboard
              </Link>
              <div className="w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                AD
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#EF4444] px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          ) : fromDashboard ? (
            /* When Doer is viewing public pages while authenticated */
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] hover:bg-[#E0E7FF] px-3 py-1.5 rounded-xl transition-colors">
                <LayoutDashboard size={14} /> My Dashboard
              </Link>
              <Link href="/dashboard/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar name={userName || "Alex Chen"} size="sm" />
                <span className="text-xs font-bold text-[#0F172A]">{userName || "Alex Chen"}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#EF4444] px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          ) : (
            /* When Visitor is browsing publicly */
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

        {/* Mobile Hamburger */}
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
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-6 py-4 flex flex-col gap-4">
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
            {isAdmin ? (
              <div className="flex items-center justify-between">
                <Link href="/admin" className="text-sm font-bold text-[#4F46E5]" onClick={() => setMenuOpen(false)}>
                  Admin Dashboard →
                </Link>
                <button onClick={handleLogout} className="text-xs text-[#EF4444]">
                  Log Out
                </button>
              </div>
            ) : fromDashboard ? (
              <div className="flex items-center justify-between">
                <Link href="/dashboard" className="text-sm font-bold text-[#4F46E5]" onClick={() => setMenuOpen(false)}>
                  My Dashboard →
                </Link>
                <button onClick={handleLogout} className="text-xs text-[#EF4444]">
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
