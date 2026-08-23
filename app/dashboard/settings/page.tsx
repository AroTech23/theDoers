'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft, ShieldCheck, UserCheck, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header Bar */}
        <div className="mb-6 pb-4 border-b border-[#E2E8F0]">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Account Settings</h1>
          <p className="text-xs text-[#64748B] mt-0.5">Manage your account credentials, security preferences, and data.</p>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Account Information & Change Password (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Account Information */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F1F5F9]">
                <UserCheck size={18} className="text-[#4F46E5]" />
                <h2 className="text-base font-bold text-[#0F172A]">Account Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Alex Chen"
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="alex@example.com"
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
                <div className="pt-1">
                  <Button variant="primary" size="sm" className="font-bold text-xs shadow-xs">
                    Save Account Information
                  </Button>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F1F5F9]">
                <ShieldCheck size={18} className="text-[#4F46E5]" />
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">Change Password</h2>
                  <p className="text-[11px] text-[#64748B]">Update the password you use to access your account.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      defaultValue="password123"
                      className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-[10px] text-[#64748B] mt-1">At least 8 characters.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <Button variant="primary" size="sm" className="font-bold text-xs shadow-xs">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Security Insights & Danger Zone (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Account Status Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <h2 className="text-base font-bold text-[#0F172A] mb-3 pb-3 border-b border-[#F1F5F9]">
                Account Security Status
              </h2>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-[#F8FAFC]">
                  <span className="text-[#64748B]">Account Type</span>
                  <span className="font-bold text-[#0F172A]">Doer (Student)</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-[#F8FAFC]">
                  <span className="text-[#64748B]">2-Factor Authentication</span>
                  <span className="font-bold text-[#059669]">Active (Email)</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#64748B]">Last Password Change</span>
                  <span className="font-medium text-[#0F172A]">3 months ago</span>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl border-2 border-[#FEE2E2] p-6 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3 text-red-600 font-bold text-sm">
                <AlertTriangle size={18} />
                <span>Danger Zone</span>
              </div>
              <h3 className="text-xs font-bold text-[#0F172A] mb-1">Delete Account</h3>
              <p className="text-[11px] text-[#64748B] mb-4 leading-relaxed">
                Permanently delete your account, portfolio, and all associated projects. This action is irreversible.
              </p>
              <button
                type="button"
                className="w-full px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Delete Account
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
