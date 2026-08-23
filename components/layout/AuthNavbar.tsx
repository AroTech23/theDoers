'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

interface AuthNavbarProps {
  rightLink?: {
    label: string;
    href: string;
  };
}

export default function AuthNavbar({ rightLink }: AuthNavbarProps) {
  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-8 lg:px-12 h-16 bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
      {/* Brand Logo links to Home */}
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

      {/* Styled Interactive Button on the Top Right */}
      {rightLink && (
        <Link href={rightLink.href}>
          <Button
            variant={rightLink.label.toLowerCase().includes('create') || rightLink.label.toLowerCase().includes('become') ? 'primary' : 'outline'}
            size="sm"
            className="font-bold text-xs shadow-2xs cursor-pointer"
          >
            {rightLink.label}
          </Button>
        </Link>
      )}
    </nav>
  );
}
