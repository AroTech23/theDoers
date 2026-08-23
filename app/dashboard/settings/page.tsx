'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24 pt-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Previous / Back Navigation */}
        <div className="mb-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">Account Settings</h1>
          <p className="text-[#6B7280] mt-1">Manage your account information and security.</p>
        </div>

        <div className="space-y-6">
          {/* Account Information */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
            <h2 className="text-xl font-bold text-[#111827] mb-6">Account Information</h2>
            
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Full Name</label>
                <input type="text" defaultValue="Alex Chen" className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Email Address</label>
                <input type="email" defaultValue="alex@example.com" className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
              </div>
              <Button className="bg-[#1F2937] hover:bg-gray-800 text-white mt-2">
                Save Account Information
              </Button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#111827]">Change Password</h2>
              <p className="text-sm text-[#6B7280] mt-1">Update the password you use to access your account.</p>
            </div>
            
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Current Password</label>
                <div className="relative">
                  <input type={showCurrentPassword ? "text" : "password"} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                  <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#111827]">
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">New Password</label>
                <div className="relative">
                  <input type={showNewPassword ? "text" : "password"} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#111827]">
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-[#6B7280] mt-1">At least 8 characters.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Confirm New Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#111827]">
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button className="bg-[#1F2937] hover:bg-gray-800 text-white mt-2">
                Update Password
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] border-l-4 border-l-red-500 p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-red-600 mb-1">Danger Zone</h2>
                <h3 className="text-lg font-semibold text-[#111827]">Delete Account</h3>
                <p className="text-sm text-[#6B7280] mt-1 max-w-lg">Permanently delete your account, portfolio, and associated projects. This action cannot be undone.</p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 shrink-0">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
