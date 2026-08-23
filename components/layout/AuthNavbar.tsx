'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface AuthNavbarProps {
  rightLink?: {
    label: string;
    href: string;
  };
}

export default function AuthNavbar({ rightLink }: AuthNavbarProps) {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 h-16 bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="flex items-center gap-6">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7280] hover:text-[#111827] bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-[#111827] hover:text-[#4F46E5] transition-colors group">
          <img src="/logo-icon.png" alt="theDoers logo" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
          <span>theDoers</span>
        </Link>
      </div>

      {rightLink && (
        <Link 
          href={rightLink.href}
          className="text-sm font-semibold text-[#111827] hover:text-[#4F46E5] transition-colors"
        >
          {rightLink.label}
        </Link>
      )}
    </nav>
  );
}
