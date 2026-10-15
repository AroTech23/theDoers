'use client'

import React, { useState } from 'react'
import { Check, Copy, Code2 } from 'lucide-react'

// Authentic SVG Heraldic Medal / Scalloped Seal Badge Icon
export function VerifiedBadgeEmblem({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
    >
      <title>theDoers Official Verified Builder</title>
      <defs>
        {/* Medallion outer starburst gradient */}
        <linearGradient id="badgeGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#3730A3" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>

        {/* Polished metallic gold/amber rim accent */}
        <linearGradient id="goldRim" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Inner center medallion gradient */}
        <radialGradient id="innerGlow" cx="12" cy="12" r="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#312E81" />
        </radialGradient>
      </defs>

      {/* 12-point scalloped starburst rosette / medal seal */}
      <path
        d="M12 1.5L14.47 3.58L17.65 3.32L19.23 6.09L22.18 7.33L22.14 10.54L23.75 13.25L22.14 15.96L22.18 19.17L19.23 20.41L17.65 23.18L14.47 22.92L12 25L9.53 22.92L6.35 23.18L4.77 20.41L1.82 19.17L1.86 15.96L0.25 13.25L1.86 10.54L1.82 7.33L4.77 6.09L6.35 3.32L9.53 3.58L12 1.5Z"
        fill="url(#badgeGradient)"
        stroke="url(#goldRim)"
        strokeWidth="1.2"
        strokeLinejoin="round"
        transform="scale(0.92) translate(1, -0.5)"
      />

      {/* Inner circular enameled core */}
      <circle cx="12" cy="11.5" r="6.2" fill="url(#innerGlow)" stroke="#FCD34D" strokeWidth="0.8" />

      {/* Bold, crisp verified checkmark */}
      <path
        d="M9 11.5L11 13.5L15 9.5"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tiny star sparkle at top right */}
      <circle cx="16.5" cy="6" r="0.8" fill="#FDE68A" />
    </svg>
  )
}

interface DoerBadgeProps {
  variant?: 'compact' | 'pill' | 'certificate' | 'markdown' | 'icon'
  username?: string
  name?: string
  year?: string
  className?: string
}

export default function DoerBadge({
  variant = 'compact',
  username = 'doer',
  name = 'Verified Doer',
  year = '2024',
  className = ''
}: DoerBadgeProps) {
  const [copied, setCopied] = useState(false)

  const markdownSnippet = `[![theDoers Verified](https://img.shields.io/badge/theDoers-Verified%20Builder-4F46E5?style=flat-square&logo=codeforces&logoColor=white)](https://thedoers.app/doers/${username})`

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Pure icon variant (for card corners, avatar overlays, or next to user titles)
  if (variant === 'icon') {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} title="Verified Doer · Proof of Work Certified">
        <VerifiedBadgeEmblem size={24} />
      </span>
    )
  }

  // Compact Pill Badge with the authentic Medal Emblem
  if (variant === 'compact') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] text-white border border-[#4338CA]/60 shadow-sm hover:border-[#6366F1] transition-all cursor-default select-none ${className}`}
        title="theDoers Official Verified Builder"
      >
        <VerifiedBadgeEmblem size={15} />
        <span className="bg-gradient-to-r from-white via-indigo-100 to-amber-200 bg-clip-text text-transparent font-extrabold">
          VERIFIED DOER
        </span>
      </span>
    )
  }

  // Proof-of-work certified banner pill
  if (variant === 'pill') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] shadow-2xs ${className}`}
      >
        <VerifiedBadgeEmblem size={16} />
        <span>Proof of Work Certified</span>
      </span>
    )
  }

  // Full Credential Certificate Card
  if (variant === 'certificate') {
    return (
      <div
        className={`p-5 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] text-white rounded-3xl border border-[#334155] shadow-xl flex flex-col gap-4 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4F46E5]/20 border border-[#6366F1]/40 flex items-center justify-center shadow-inner">
              <VerifiedBadgeEmblem size={26} />
            </div>
            <div>
              <p className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">theDoers Movement</p>
              <p className="text-sm font-black text-white">Verified Builder Credential</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40">
            CLASS OF {year}
          </span>
        </div>

        <div className="border-t border-[#334155]/80 pt-3 flex items-center justify-between text-xs text-[#94A3B8]">
          <span>
            Issued to: <strong className="text-white">{name}</strong>
          </span>
          <span className="font-mono text-[11px] text-[#A5B4FC]">ID: DOER-{username.toUpperCase().slice(0, 8)}</span>
        </div>
      </div>
    )
  }

  // Markdown variant for GitHub Readmes
  return (
    <div className={`p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex flex-col gap-2.5 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#0F172A] flex items-center gap-2">
          <VerifiedBadgeEmblem size={16} /> Embed Badge on GitHub / Portfolio
        </span>
        <button
          onClick={handleCopy}
          className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          {copied ? <Check size={13} className="text-[#10B981]" /> : <Copy size={13} />}
          {copied ? 'Copied Markdown!' : 'Copy Badge'}
        </button>
      </div>
      <code className="text-[11px] font-mono bg-white p-2.5 rounded-xl border border-[#E2E8F0] text-[#475569] overflow-x-auto whitespace-pre">
        {markdownSnippet}
      </code>
    </div>
  )
}
