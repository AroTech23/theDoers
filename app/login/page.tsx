'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, AlertCircle, X, Loader2 } from 'lucide-react';
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-dismiss popup toast error after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // 1. Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (authError) {
        if (authError.message.toLowerCase().includes('email not confirmed')) {
          throw new Error('Your portfolio is currently pending admin review. You will be able to log in once an admin approves your application.');
        }
        if (authError.message.toLowerCase().includes('invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials or wait for admin approval if newly registered.');
        }
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

      // 5. Show Success Toast Immediately on the Screen
      setSuccessMessage(`Welcome back, ${fullName}! Logging you in...`);

      // 6. Smoothly transition to Dashboard after 1.8 seconds so the user sees the popup and it closes
      setTimeout(() => {
        if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }, 1800);

    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid email or password.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] relative">
      <AuthNavbar rightLink={{ label: 'Create Portfolio', href: '/register' }} />

      {/* Floating Success Toast Notification Popup (Appears right upon submit) */}
      {successMessage && (
        <div className="fixed top-20 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#A7F3D0] flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-[#0F172A] tracking-tight">Successfully Logged In</p>
              <p className="text-xs text-[#059669] font-semibold leading-relaxed mt-0.5">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Error Toast Notification Popup */}
      {errorMessage && (
        <div className="fixed top-20 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-[#FCA5A5] flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA] flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-[#0F172A] tracking-tight">Application Notice</p>
              <p className="text-xs text-[#64748B] leading-relaxed mt-0.5">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-[#94A3B8] hover:text-[#0F172A] transition-colors p-1 rounded-lg hover:bg-[#F8FAFC] cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

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

            <div className="space-y-3 my-6">
              <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm border border-[#E2E8F0] rounded-2xl">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span className="text-xs font-semibold text-[#0F172A]">Problem-to-Solution Case Studies</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm border border-[#E2E8F0] rounded-2xl">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span className="text-xs font-semibold text-[#0F172A]">Direct Contact &amp; Public Portfolio</span>
              </div>
            </div>

            <p className="text-[11px] text-[#94A3B8] font-medium">
              theDoers © {new Date().getFullYear()} · Proof of work platform.
            </p>
          </div>

          {/* Right Form Container (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  Welcome back
                </h1>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  Log in to manage your engineering projects and public portfolio.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. developerp070@gmail.com"
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
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
                      className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent pr-10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] transition-colors p-1"
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
                    className="w-full font-bold text-xs sm:text-sm shadow-xs justify-center"
                  >
                    {successMessage ? 'Redirecting to workspace...' : 'Log In →'}
                  </Button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-[#F1F5F9] text-center">
                <p className="text-xs text-[#64748B]">
                  Don&apos;t have a portfolio account yet?{' '}
                  <Link href="/register" className="font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors">
                    Create Portfolio →
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
