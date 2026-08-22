'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import AuthNavbar from '@/components/layout/AuthNavbar';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <AuthNavbar rightLink={{ label: 'Create Portfolio', href: '/register' }} />

      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-sm border border-[#E5E7EB] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* LEFT COLUMN: Hero Section with Circular Photo Holder & Design Elements */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#EEF2FF] via-[#F5F3FF] to-[#FAF5FF] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#E5E7EB]">
            
            {/* Top Dot Matrix Accent */}
            <div className="flex gap-2 opacity-30 text-[#4F46E5]">
              <div className="grid grid-cols-6 gap-1.5">
                {[...Array(18)].map((_, idx) => (
                  <span key={idx} className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] inline-block" />
                ))}
              </div>
            </div>

            {/* Circular Profile Avatar Holder with Curved Blue Border Accents */}
            <div className="my-auto py-6 flex flex-col items-center justify-center relative">
              <div className="relative w-56 h-56 flex items-center justify-center">
                {/* Curved Accent Ring (as in reference image) */}
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#4F46E5]/40 animate-spin-slow"></div>
                <div className="absolute -top-2 -left-2 w-28 h-28 border-t-4 border-l-4 border-[#4F46E5] rounded-tl-full"></div>
                <div className="absolute -bottom-2 -right-2 w-28 h-28 border-b-4 border-r-4 border-[#4F46E5] rounded-br-full"></div>

                {/* Circular Photo Holder */}
                <div className="w-48 h-48 rounded-full bg-white shadow-md border-4 border-white overflow-hidden flex items-center justify-center relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                    alt="Featured Doer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Tag below image */}
              <div className="mt-5 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm border border-[#E5E7EB] rounded-full text-xs font-bold text-[#4F46E5] shadow-xs">
                  <Sparkles size={13} /> Showcase What You Build
                </div>
                <p className="text-xs text-[#6B7280] mt-2 font-medium">Join 500+ student engineers & creators</p>
              </div>
            </div>

            {/* Bottom Dots Accent */}
            <div className="flex justify-between items-center text-xs text-[#9CA3AF]">
              <div className="grid grid-cols-4 gap-1.5 opacity-30">
                {[...Array(8)].map((_, idx) => (
                  <span key={idx} className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] inline-block" />
                ))}
              </div>
              <span className="font-mono text-[10px] text-[#6B7280]">theDoers · Engineering Talent</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Form Section */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">
                  Welcome <span className="text-[#4F46E5]">Back</span>
                </h1>
                <p className="text-sm text-[#6B7280] mt-1.5">
                  Log in to manage your engineering projects and portfolio.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#374151]">
                      Password *
                    </label>
                    <Link href="/forgot-password" className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111827] cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#111827] hover:bg-black text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  Log In <span aria-hidden="true">&rarr;</span>
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="flex-1 h-px bg-[#E5E7EB]" />
                <span className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
              </div>

              <div className="text-center">
                <p className="text-xs text-[#6B7280]">
                  Don&apos;t have an account?{' '}
                  <Link href="/register" className="font-bold text-[#4F46E5] hover:underline">
                    Create Portfolio
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-6 px-6 border-t border-[#E5E7EB] bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
        <div>
          <span className="font-bold text-[#111827]">theDoers</span> · Ethically Skilled IT Engineers
        </div>
        <div>
          © 2026 theDoers. All rights reserved.
        </div>
        <div className="flex gap-6 font-medium">
          <Link href="#" className="hover:text-[#111827]">Terms</Link>
          <Link href="#" className="hover:text-[#111827]">Privacy</Link>
          <Link href="#" className="hover:text-[#111827]">Support</Link>
        </div>
      </footer>
    </div>
  );
}
