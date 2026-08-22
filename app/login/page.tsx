'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [roleSelection, setRoleSelection] = useState<'doer' | 'admin'>('doer')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated auth redirect based on chosen role for previewing flows
    if (roleSelection === 'admin') {
      window.location.href = '/admin'
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#111827]">
            theDoers
          </Link>
          <h2 className="text-xl font-bold text-[#111827] mt-4">Welcome back</h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Log in to manage your Doer profile or administration panel
          </p>
        </div>

        {/* Role toggle for prototype demonstration */}
        <div className="flex bg-[#F3F4F6] p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setRoleSelection('doer')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              roleSelection === 'doer'
                ? 'bg-white text-[#111827] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Doer Account
          </button>
          <button
            type="button"
            onClick={() => setRoleSelection('admin')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              roleSelection === 'admin'
                ? 'bg-white text-[#4F46E5] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Admin Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={roleSelection === 'admin' ? 'admin@thedoers.com' : 'student@university.edu'}
                className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#374151]">Password</label>
              <a href="#" className="text-xs text-[#4F46E5] hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full mt-2 gap-2">
            Log In as {roleSelection === 'admin' ? 'Admin' : 'Doer'} <ArrowRight size={16} />
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pt-6 border-t border-[#F3F4F6]">
          <p className="text-xs text-[#6B7280]">
            Don&apos;t have a Doer profile yet?{' '}
            <Link href="/register" className="font-semibold text-[#4F46E5] hover:underline">
              Become a Doer
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
