'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
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
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#111827] mb-2">Welcome back</h1>
            <p className="text-[#6B7280]">Log in to manage your projects and portfolio.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-[#111827]">
                  Password *
                </label>
                <Link href="/forgot-password" className="text-sm font-medium text-[#4F46E5] hover:text-[#3730A3]">
                  Forgot password?
                </Link>
              </div>
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
            </div>

            <button
              type="submit"
              className="w-full bg-[#1F2937] text-white py-3 rounded-lg font-medium hover:bg-[#111827] transition-colors flex items-center justify-center gap-2"
            >
              Log In <span aria-hidden="true">&rarr;</span>
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-sm text-[#6B7280]">or</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          <p className="text-center text-[#6B7280] text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-[#4F46E5] hover:text-[#3730A3]">
              Create Portfolio
            </Link>
          </p>
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
