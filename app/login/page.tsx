'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import AuthNavbar from '@/components/layout/AuthNavbar';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (email.includes('admin')) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AuthNavbar rightLink={{ label: 'Create Portfolio', href: '/register' }} />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          
          {/* Left Hero & Proof-of-Work Spotlight (5 Cols) - Eliminates empty white void */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#EEF2FF] via-[#F5F3FF] to-[#FAF5FF] p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2E8F0] relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm border border-[#E2E8F0] rounded-full text-xs font-bold text-[#4F46E5] shadow-2xs mb-6">
                <Sparkles size={13} /> Ethical IT Engineers
              </div>
              <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                Showcase What You <span className="text-[#4F46E5]">Build</span>
              </h2>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                Connect your engineering case studies, live demos, and verified technical skills to top recruiters and collaborators.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-3 my-6">
              <div className="flex items-center gap-2.5 text-xs text-[#334155] font-semibold bg-white/80 p-2.5 rounded-xl border border-[#E2E8F0]/70">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>Deep Problem → Solution Case Studies</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#334155] font-semibold bg-white/80 p-2.5 rounded-xl border border-[#E2E8F0]/70">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>Live Shareable Portfolio URL</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#334155] font-semibold bg-white/80 p-2.5 rounded-xl border border-[#E2E8F0]/70">
                <ShieldCheck size={16} className="text-[#4F46E5] shrink-0" />
                <span>Admin Verified Student Community</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0]/60 flex items-center justify-between text-[11px] text-[#64748B]">
              <span>theDoers Platform</span>
              <span>Douala, CM</span>
            </div>
          </div>

          {/* Right Form Section (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                  Welcome back
                </h1>
                <p className="text-xs text-[#64748B] mt-1">
                  Log in to manage your engineering projects and portfolio.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider">
                      Password *
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#4F46E5] hover:text-[#3730A3] transition-colors"
                    >
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
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isLoading}
                    className="w-full py-2.5 font-bold text-sm shadow-xs"
                  >
                    Log In <ArrowRight size={14} className="ml-1.5" />
                  </Button>
                </div>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-[#E2E8F0]" />
                <span className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-[#E2E8F0]" />
              </div>

              <p className="text-center text-xs text-[#64748B]">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-bold text-[#4F46E5] hover:underline">
                  Create Portfolio
                </Link>
              </p>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-5 px-6 border-t border-[#E2E8F0] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
        <div className="font-semibold text-[#0F172A]">theDoers</div>
        <div>© {new Date().getFullYear()} theDoers. All rights reserved.</div>
        <div className="flex gap-4 font-medium">
          <Link href="#" className="hover:text-[#0F172A]">Terms of Service</Link>
          <Link href="#" className="hover:text-[#0F172A]">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#0F172A]">Support</Link>
        </div>
      </footer>
    </div>
  );
}
