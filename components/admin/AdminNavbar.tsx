'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ShieldCheck, LogOut } from 'lucide-react'

export default function AdminNavbar() {
  const pathname = usePathname()
  const router = useRouter()

  const navLinks = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Students', href: '/admin/students' },
    { label: 'Projects', href: '/admin/projects' },
  ]

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('thedoers_auth_role')
      localStorage.removeItem('thedoers_user_name')
      // Clear cookie
      document.cookie = "thedoers_auth_role=; path=/; max-age=0;"
    }
    router.push('/login')
  }

  return (
    <header className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
      <div className="w-full px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo (stays in admin dashboard) and primary navigation links */}
        <div className="flex items-center gap-10">
          <Link href="/admin" className="flex items-center gap-2.5 text-xl font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors group" title="theDoers Admin Dashboard">
            <img src="/logo-icon.png" alt="theDoers logo" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
            <span>theDoers</span>
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
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
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

        {/* Right side items: Public Site link, Admin Badge, Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center px-3 py-1.5 bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl text-xs font-bold text-[#4F46E5] gap-1.5 shadow-2xs">
            <ShieldCheck size={14} /> Admin Access
          </div>

          <div className="flex items-center gap-3 pl-2 border-l border-[#E2E8F0]">
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
        </div>
      </div>
    </header>
  )
}
