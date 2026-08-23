'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle2, KeyRound, ShieldAlert, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import AuthNavbar from '@/components/layout/AuthNavbar';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/dashboard/settings`,
      });

      if (error) {
        throw new Error(error.message);
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to send password reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AuthNavbar rightLink={{ label: 'Log In', href: '/login' }} />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          {/* Left Security & Recovery Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#EEF2FF] via-[#F5F3FF] to-[#FAF5FF] p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2E8F0]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm border border-[#E2E8F0] rounded-full text-xs font-bold text-[#4F46E5] shadow-2xs mb-6">
                <KeyRound size={13} /> Account Security
              </div>
              <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                Password <span className="text-[#4F46E5]">Recovery</span>
              </h2>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                Protecting your engineering portfolio, code repositories, and case studies is our highest priority.
              </p>
            </div>

            <div className="space-y-3 my-6">
              <div className="flex items-center gap-2.5 text-xs text-[#334155] font-semibold bg-white/80 p-2.5 rounded-xl border border-[#E2E8F0]/70">
                <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
                <span>Instant secure reset link delivery</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#334155] font-semibold bg-white/80 p-2.5 rounded-xl border border-[#E2E8F0]/70">
                <ShieldAlert size={16} className="text-[#4F46E5] shrink-0" />
                <span>End-to-end encrypted session tokens</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0]/60 flex items-center justify-between text-[11px] text-[#64748B]">
              <span>theDoers Platform</span>
              <Link href="/login" className="font-bold text-[#4F46E5] hover:underline flex items-center gap-1">
                <ArrowLeft size={12} /> Back to Login
              </Link>
            </div>
          </div>

          {/* Right Action Section */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              
              {!isSuccess ? (
                <>
                  <div className="mb-6">
                    <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Forgot your password?</h1>
                    <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                      Enter your university or registered email address and we&apos;ll send you instructions to reset your password.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-5 p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center gap-2.5 text-xs font-semibold text-[#B91C1C]">
                      <AlertCircle size={16} className="shrink-0 text-[#EF4444]" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleRequestSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. alex.chen@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#0F172A]"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={isLoading}
                        className="w-full font-bold shadow-xs"
                      >
                        Send Reset Instructions <ArrowRight size={15} className="ml-1" />
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center space-y-4 py-4">
                  <div className="w-14 h-14 rounded-full bg-[#DEF7EC] text-[#03543F] flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0F172A]">Instructions Sent!</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed max-w-sm mx-auto">
                    We have sent a secure password reset link to <strong className="text-[#0F172A]">{email}</strong>. Please check your inbox or spam folder.
                  </p>
                  <div className="pt-3">
                    <Link href="/login">
                      <Button variant="outline" size="md" className="font-bold">
                        ← Return to Log In
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-[#F1F5F9] text-center">
                <Link href="/login" className="text-xs text-[#64748B] hover:text-[#4F46E5] font-semibold">
                  Remember your password? <strong className="text-[#4F46E5]">Log In</strong>
                </Link>
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
