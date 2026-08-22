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
    <nav className="flex items-center justify-between px-6 h-16 bg-white border-b border-[#E5E7EB]">
      <Link href="/" className="text-xl font-bold text-[#111827]">
        theDoers
      </Link>
      {rightLink && (
        <Link 
          href={rightLink.href}
          className="text-sm font-medium text-[#111827] hover:text-[#4F46E5] transition-colors"
        >
          {rightLink.label}
        </Link>
      )}
    </nav>
  );
}
