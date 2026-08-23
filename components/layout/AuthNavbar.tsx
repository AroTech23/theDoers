'use client';

import Link from 'next/link';

interface AuthNavbarProps {
  rightLink?: {
    label: string;
    href: string;
  };
}

export default function AuthNavbar({ rightLink }: AuthNavbarProps) {
  return (
    <nav className="flex items-center justify-between px-6 h-16 bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
      {/* Clicking logo returns to home naturally */}
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

      {rightLink && (
        <Link
          href={rightLink.href}
          className="text-sm font-semibold text-[#0F172A] hover:text-[#4F46E5] transition-colors"
        >
          {rightLink.label}
        </Link>
      )}
    </nav>
  );
}
