'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import AuthNavbar from '@/components/layout/AuthNavbar';

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
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <AuthNavbar rightLink={
        step === 'success' 
          ? { label: 'Log In', href: '/login' } 
          : { label: 'Log In', href: '/login' }
      } />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          
          {step === 'request' && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[#111827] mb-2">Forgot your password?</h1>
                <p className="text-[#6B7280]">Enter your email address and we'll send you instructions to reset your password.</p>
              </div>

              <form onSubmit={handleRequestSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1F2937] text-white py-3 rounded-lg font-medium hover:bg-[#111827] transition-colors flex items-center justify-center gap-2"
                >
                  Send Reset Instructions <span aria-hidden="true">&rarr;</span>
                </button>
                
                <div className="text-center">
                  <Link href="/login" className="text-sm font-medium text-[#4F46E5] hover:text-[#3730A3]">
                    &larr; Back to Log In
                  </Link>
                </div>
              </form>
            </>
          )}

          {step === 'reset' && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[#111827] mb-2">Create a new password</h1>
                <p className="text-[#6B7280]">Choose a new password for your theDoers account.</p>
              </div>

              <form onSubmit={handleResetSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1">
                    New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">At least 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827]"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1F2937] text-white py-3 rounded-lg font-medium hover:bg-[#111827] transition-colors flex items-center justify-center gap-2"
                >
                  Reset Password <span aria-hidden="true">&rarr;</span>
                </button>
              </form>
            </>
          )}

          {step === 'success' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EEF2FF] text-[#4F46E5] mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h1 className="text-2xl font-bold text-[#111827] mb-2">Password reset successful</h1>
              <p className="text-[#6B7280] mb-8">Your password has been updated. You can now log in with your new password.</p>
              
              <Link
                href="/login"
                className="w-full bg-[#1F2937] text-white py-3 rounded-lg font-medium hover:bg-[#111827] transition-colors flex items-center justify-center gap-2"
              >
                Log In <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}

        </div>
      </main>

      <footer className="py-6 px-4 md:px-8 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#6B7280]">
        <div className="font-medium text-[#111827]">theDoers</div>
        <div>© 2024 theDoers</div>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-[#111827]">Terms of Service</Link>
          <Link href="#" className="hover:text-[#111827]">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#111827]">Support</Link>
        </div>
      </footer>
    </div>
  );
}
