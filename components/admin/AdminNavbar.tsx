'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ShieldCheck, LogOut, Menu, X, LayoutDashboard, Users, Layers, ExternalLink } from 'lucide-react'

export default function AdminNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Students', href: '/admin/students', icon: Users },
    { label: 'Projects', href: '/admin/projects', icon: Layers },
  ]

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('thedoers_auth_role')
      localStorage.removeItem('thedoers_user_name')
      document.cookie = "thedoers_auth_role=; path=/; max-age=0;"
    }
    router.push('/login?logged_out=true')
  }

  return (
    <header className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo and primary navigation links */}
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href="/admin" className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors group shrink-0" title="theDoers Admin Dashboard">
            <img src="/logo-icon.png" alt="theDoers logo" className="h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
            <span>theDoers</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'text-[#4F46E5] bg-[#EEF2FF] shadow-2xs font-bold'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="hidden lg:flex items-center px-3 py-1.5 bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl text-xs font-bold text-[#4F46E5] gap-1.5 shadow-2xs">
            <ShieldCheck size={14} /> Admin Access
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:border-l sm:border-[#E2E8F0]">
            <Link
              href="/"
              className="text-xs text-[#64748B] hover:text-[#4F46E5] font-semibold hidden md:inline-block bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-xl hover:bg-[#EEF2FF] transition-colors"
            >
              Public Site ↗
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
              AD
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-[#64748B] hover:text-[#EF4444] p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              title="Log Out"
            >
              <LogOut size={15} />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#64748B] hover:text-[#0F172A] rounded-xl cursor-pointer"
            aria-label="Toggle admin navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-6 py-4 flex flex-col gap-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive =
              link.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold ${
                  isActive ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#334155]'
                }`}
              >
                <Icon size={16} /> {link.label}
              </Link>
            )
          })}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#4F46E5] mt-2 border-t border-[#F1F5F9] pt-3"
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
    </header>
  )
}
