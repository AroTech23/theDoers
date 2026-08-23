'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import { useState, Suspense } from 'react'
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react'

function NavbarContent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
  const fromDashboard = searchParams?.get('from') === 'dashboard'

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
          {fromDashboard ? (
            /* When Doer is viewing public pages from their workspace */
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] hover:bg-[#E0E7FF] px-3 py-1.5 rounded-lg transition-colors">
                <LayoutDashboard size={14} /> My Dashboard
              </Link>
              <Link href="/dashboard/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar name="Alex Chen" size="sm" />
                <span className="text-xs font-bold text-[#111827]">Alex Chen</span>
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-[#6B7280]">
                  <LogOut size={14} /> Log Out
                </Button>
              </Link>
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
          className="md:hidden p-2 text-[#6B7280] hover:text-[#111827]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white px-6 py-4 flex flex-col gap-4">
          <Link
            href="/doers"
            className={`text-sm font-medium ${isDoersActive ? 'text-[#4F46E5] font-bold' : 'text-[#6B7280]'}`}
            onClick={() => setMenuOpen(false)}
          >
            Doers
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium ${isAboutActive ? 'text-[#4F46E5] font-bold' : 'text-[#6B7280]'}`}
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-[#E5E7EB]">
            {fromDashboard ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full gap-2">
                    <LayoutDashboard size={16} /> My Dashboard
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">Log Out</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">Log In</Button>
                </Link>
                <Link href="/register" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">Become a Doer</Button>
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
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  )
}
