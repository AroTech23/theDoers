'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  // Hide the public footer on admin pages so the admin footer remains clean
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="bg-white border-t border-[#E5E7EB] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-bold text-[#111827]">
              theDoers.com
            </Link>
            <p className="mt-2 text-sm text-[#6B7280]">
              Discover students by what they can do.
            </p>
            <p className="mt-4 text-xs text-[#9CA3AF]">
              © {new Date().getFullYear()} theDoers.com
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-[#111827] mb-3">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/doers" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors">
                  Doers
                </Link>
              </li>
              <li>
                <Link href="/doers?filter=skills" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors">
                  Skills
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-[#111827] mb-3">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-[#4F46E5] hover:text-[#3730A3] font-medium transition-colors">
                  Become a Doer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
