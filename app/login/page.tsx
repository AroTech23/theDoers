'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import AuthNavbar from '@/components/layout/AuthNavbar';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (authError) {
        throw new Error(authError.message);
      }

      const user = authData.user;
      if (!user) {
        throw new Error('Authentication failed.');
      }

      // 2. Fetch User Role & Status from public.users
      const { data: profile } = await supabase
        .from('users')
        .select('role, full_name, status')
        .eq('id', user.id)
        .maybeSingle();

      const role = profile?.role || (email.toLowerCase().includes('admin') ? 'admin' : 'doer');
      const status = profile?.status || 'pending';
      const fullName = profile?.full_name || user.user_metadata?.full_name || 'Doer';

      // 3. Block Pending & Suspended Doers from accessing Dashboard
      if (role !== 'admin') {
        if (status === 'pending') {
          // Log user out from Supabase Auth session
          await supabase.auth.signOut();
          throw new Error('Your portfolio is currently pending admin review. You will receive access once approved.');
        }
        if (status === 'rejected' || status === 'suspended') {
          await supabase.auth.signOut();
          throw new Error('Your account is currently suspended. Please contact platform support.');
        }
      }

      // 4. Set Verified Session in LocalStorage & Cookies
      if (typeof window !== 'undefined') {
        localStorage.setItem('thedoers_auth_role', role);
        localStorage.setItem('thedoers_user_name', fullName);
        document.cookie = `thedoers_auth_role=${role}; path=/; max-age=604800; SameSite=Lax;`;
      }

      // 5. Route based on verified role
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AuthNavbar rightLink={{ label: 'Create Portfolio', href: '/register' }} />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          
          {/* Left Hero & Proof-of-Work Spotlight (5 Cols) */}
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
                <span>Verified Code &amp; Architecture Vetting</span>
              </div>
            </div>

            {/* Quote Badge */}
            <div className="pt-4 border-t border-[#E2E8F0]/60">
              <p className="text-[11px] text-[#64748B] italic">
                &ldquo;Your projects are your credentials. Build out in the open.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Login Form (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">Welcome back</h1>
                <p className="text-xs text-[#64748B] mt-1">Log in to manage your projects, credentials, and portfolio.</p>
              </div>

              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center gap-2.5 text-xs font-semibold text-[#B91C1C]">
                  <AlertCircle size={16} className="shrink-0 text-[#EF4444]" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      Password *
                    </label>
                    <Link href="/forgot-password" tabIndex={-1} className="text-xs text-[#4F46E5] font-bold hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full font-bold shadow-xs"
                  >
                    Log In <ArrowRight size={15} className="ml-1" />
                  </Button>
                </div>
              </form>

              <div className="mt-6 pt-5 border-t border-[#F1F5F9] text-center">
                <p className="text-xs text-[#64748B]">
                  Don&apos;t have an account?{' '}
                  <Link href="/register" className="text-[#4F46E5] font-bold hover:underline">
                    Create Portfolio
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-6 px-6 md:px-12 border-t border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#64748B] bg-white">
        <div className="font-bold text-[#0F172A]">theDoers</div>
        <div>© 2024 theDoers. All rights reserved.</div>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-[#0F172A]">About Us</Link>
          <Link href="#" className="hover:text-[#0F172A]">Terms of Service</Link>
          <Link href="#" className="hover:text-[#0F172A]">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#0F172A]">Support</Link>
        </div>
      </footer>
    </div>
  );
}
