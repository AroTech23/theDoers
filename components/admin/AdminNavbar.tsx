'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Settings, ShieldCheck } from 'lucide-react'

export default function AdminNavbar() {
  const pathname = usePathname()

  const navLinks = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Students', href: '/admin/students' },
    { label: 'Projects', href: '/admin/projects' },
  ]

  return (
    <header className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
      <div className="w-full px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo and primary navigation links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-[#111827] hover:text-[#4F46E5] transition-colors group">
            <img src="/logo-icon.png" alt="theDoers logo" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
            <span>theDoers<span className="text-[#4F46E5]">.com</span></span>
          </Link>

          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'text-[#4F46E5] bg-[#EEF2FF]'
                      : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right side items: Search, Settings, Admin Badge */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center px-2.5 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-xs font-semibold text-[#4F46E5] gap-1.5">
            <ShieldCheck size={14} /> Admin Access
          </div>

          <div className="flex items-center gap-3 pl-2 border-l border-[#E5E7EB]">
            <Link
              href="/"
              className="text-xs text-[#6B7280] hover:text-[#4F46E5] font-medium hidden md:inline-block"
            >
              Public Site ↗
            </Link>
            <div className="w-9 h-9 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              AD
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
