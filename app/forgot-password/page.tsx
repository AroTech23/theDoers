'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle2, KeyRound, ShieldAlert, ArrowRight } from 'lucide-react';
import AuthNavbar from '@/components/layout/AuthNavbar';
import Button from '@/components/ui/Button';

type Step = 'request' | 'reset' | 'success';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('request');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('reset');
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
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
              <Link href="/login" className="font-bold text-[#4F46E5] hover:underline">
                Back to Login
              </Link>
            </div>
          </div>

          {/* Right Action Section */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              
              {step === 'request' && (
                <>
                  <div className="mb-6">
                    <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                      Forgot your password?
                    </h1>
                    <p className="text-xs text-[#64748B] mt-1">
                      Enter your email address and we&apos;ll send you instructions to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleRequestSubmit} className="space-y-4">
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

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full py-2.5 font-bold text-sm shadow-xs"
                      >
                        Send Reset Instructions <ArrowRight size={14} className="ml-1.5" />
                      </Button>
                    </div>
                  </form>

                  <div className="mt-6 text-center">
                    <Link
                      href="/login"
                      className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
                    >
                      ← Back to Log In
                    </Link>
                  </div>
                </>
              )}

              {step === 'reset' && (
                <>
                  <div className="mb-6">
                    <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                      Create a new password
                    </h1>
                    <p className="text-xs text-[#64748B] mt-1">
                      Choose a secure new password for your theDoers account.
                    </p>
                  </div>

                  <form onSubmit={handleResetSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                        New Password *
                      </label>
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
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-1">At least 8 characters</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                        Confirm New Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full py-2.5 font-bold text-sm shadow-xs"
                      >
                        Reset Password <ArrowRight size={14} className="ml-1.5" />
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {step === 'success' && (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-[#D1FAE5] text-[#059669] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#A7F3D0]">
                    <CheckCircle2 size={32} />
                  </div>
                  <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mb-2">
                    Password reset successful
                  </h1>
                  <p className="text-xs text-[#64748B] mb-6 leading-relaxed">
                    Your password has been updated. You can now log in with your new credentials.
                  </p>
                  <Link href="/login">
                    <Button variant="primary" size="md" className="w-full py-2.5 font-bold text-sm shadow-xs">
                      Log In <ArrowRight size={14} className="ml-1.5" />
                    </Button>
                  </Link>
                </div>
              )}

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
