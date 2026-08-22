'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import { useState } from 'react'
import { Menu, X, LogOut, User } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // If we are in the admin section, hide the public navbar completely (Admin has its own dedicated navbar)
  if (pathname?.startsWith('/admin')) {
    return null
  }

  // Check if the user is in the Doer workspace
  const isDoerLoggedIn = pathname?.startsWith('/dashboard')

  return (
    <nav className="w-full bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[#111827] hover:text-[#4F46E5] transition-colors">
          theDoers
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/doers" className="text-sm text-[#6B7280] hover:text-[#111827] font-medium transition-colors">
            Doers
          </Link>
          <Link href="/about" className="text-sm text-[#6B7280] hover:text-[#111827] font-medium transition-colors">
            About
          </Link>
        </div>

        {/* Desktop Actions based on Auth State */}
        <div className="hidden md:flex items-center gap-3">
          {isDoerLoggedIn ? (
            /* When Doer is logged in */
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
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
            /* When Visitor is not logged in */
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
            className="text-sm text-[#6B7280] hover:text-[#111827] font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Doers
          </Link>
          <Link
            href="/about"
            className="text-sm text-[#6B7280] hover:text-[#111827] font-medium"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-[#E5E7EB]">
            {isDoerLoggedIn ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">My Dashboard</Button>
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
