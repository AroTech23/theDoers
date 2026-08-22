'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Mail, Lock, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'request' | 'reset' | 'success'>('request')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('reset')
  }

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('success')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
        {/* Step 1: Forgot Password Request */}
        {step === 'request' && (
          <div>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#111827]">Forgot Password</h1>
              <p className="text-xs text-[#6B7280] mt-1.5">
                Enter your student email and we will send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleRequestSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2 gap-2">
                Send Reset Link <ArrowRight size={16} />
              </Button>
            </form>

            <div className="text-center mt-6 pt-4 border-t border-[#F3F4F6]">
              <Link href="/login" className="text-xs font-semibold text-[#4F46E5] hover:underline inline-flex items-center gap-1">
                <ArrowLeft size={14} /> Back to Login
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: Reset Password Form */}
        {step === 'reset' && (
          <div>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#111827]">Reset Password</h1>
              <p className="text-xs text-[#6B7280] mt-1.5">
                Create a new secure password for your student account.
              </p>
            </div>

            <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                Save New Password
              </Button>
            </form>
          </div>
        )}

        {/* Step 3: Password Reset Successful */}
        {step === 'success' && (
          <div className="text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-[#DEF7EC] text-[#03543F] rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="text-2xl font-bold text-[#111827]">Password Reset Complete</h1>
            <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
              Your password has been successfully updated. You can now log into your Doer account with your new credentials.
            </p>

            <Link href="/login" className="w-full mt-6">
              <Button variant="primary" size="lg" className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
