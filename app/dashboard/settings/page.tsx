'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft, ShieldCheck, UserCheck, AlertCircle, Check, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  
  // Password Update
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadAccount() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setEmail(user.email || '');

        const { data: profile } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', user.id)
          .maybeSingle();

        if (profile) {
          setFullName(profile.full_name || '');
        }
      } catch (err: any) {
        console.error('Error loading account:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, [supabase]);

  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingAccount(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('users')
        .update({ full_name: fullName.trim() })
        .eq('id', user.id);

      if (error) throw error;

      if (typeof window !== 'undefined') {
        localStorage.setItem('thedoers_user_name', fullName.trim());
      }

      setSuccessMessage('Account name updated successfully!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update account details.');
    } finally {
      setIsUpdatingAccount(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setNewPassword('');
      setConfirmPassword('');
      setSuccessMessage('Password changed successfully! Please use your new password next time you log in.');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#4F46E5]" />
        <p className="text-xs font-bold text-[#64748B]">Loading account settings...</p>
      </div>
    );
  }

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

        {/* Global Feedback Notifications */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#DEF7EC] border border-[#BCF0DA] flex items-center gap-3 text-xs font-semibold text-[#03543F]">
            <Check size={18} className="shrink-0 text-[#10B981]" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center gap-3 text-xs font-semibold text-[#B91C1C]">
            <AlertCircle size={18} className="shrink-0 text-[#EF4444]" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Account Information & Change Password (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Account Information */}
            <form onSubmit={handleUpdateAccount} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F1F5F9]">
                <UserCheck size={18} className="text-[#4F46E5]" />
                <h2 className="text-base font-bold text-[#0F172A]">Account Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#64748B] bg-[#F8FAFC] cursor-not-allowed"
                  />
                  <p className="text-[11px] text-[#94A3B8] mt-1">Email is verified by academic institution.</p>
                </div>
                <div className="pt-1">
                  <Button type="submit" variant="primary" size="sm" isLoading={isUpdatingAccount} className="font-bold text-xs shadow-xs">
                    Save Account Information
                  </Button>
                </div>
              </div>
            </form>

            {/* Change Password */}
            <form onSubmit={handleUpdatePassword} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F1F5F9]">
                <ShieldCheck size={18} className="text-[#4F46E5]" />
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">Change Password</h2>
                  <p className="text-[11px] text-[#64748B]">Update the password you use to access your account.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-1">Must be at least 6 characters.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <Button type="submit" variant="primary" size="sm" isLoading={isUpdatingPassword} className="font-bold text-xs shadow-xs">
                    Update Password
                  </Button>
                </div>
              </div>
            </form>

          </div>

          {/* Right Column: Platform Standards & Security Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
              <h3 className="text-sm font-bold text-[#0F172A] mb-2">Account Privacy &amp; Visibility</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Your portfolio is displayed across theDoers network. Only information you explicitly enter (Bio, Skills, Links, and Published Projects) will be accessible to visitors.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
