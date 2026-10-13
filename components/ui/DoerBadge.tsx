'use client'

import React, { useState } from 'react'
import { ShieldCheck, Sparkles, Check, Copy, Code2, Award } from 'lucide-react'

interface DoerBadgeProps {
  variant?: 'compact' | 'pill' | 'certificate' | 'markdown'
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

  if (variant === 'compact') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#0F172A] text-white border border-[#334155] shadow-2xs ${className}`}
        title="Verified Proof of Work"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
        <span>DOER // VERIFIED</span>
      </span>
    )
  }

  if (variant === 'pill') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] shadow-2xs ${className}`}
      >
        <ShieldCheck size={14} className="text-[#4F46E5]" />
        <span>Proof of Work Certified</span>
      </span>
    )
  }

  if (variant === 'certificate') {
    return (
      <div className={`p-4 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white rounded-2xl border border-[#334155] shadow-lg flex flex-col gap-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center font-bold text-white shadow-xs">
              <Award size={18} />
            </div>
            <div>
              <p className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">theDoers Movement</p>
              <p className="text-sm font-bold text-white">Verified Builder Credential</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40">
            CLASS OF {year}
          </span>
        </div>

        <div className="border-t border-[#334155] pt-2 flex items-center justify-between text-xs text-[#94A3B8]">
          <span>Issued to: <strong className="text-white">{name}</strong></span>
          <span className="font-mono text-[11px]">ID: DOER-{username.toUpperCase().slice(0, 8)}</span>
        </div>
      </div>
    )
  }

  // Markdown variant for GitHub Readmes
  return (
    <div className={`p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
          <Code2 size={14} className="text-[#4F46E5]" /> Embed on GitHub / LinkedIn
        </span>
        <button
          onClick={handleCopy}
          className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] flex items-center gap-1 cursor-pointer transition-colors"
        >
          {copied ? <Check size={13} className="text-[#10B981]" /> : <Copy size={13} />}
          {copied ? 'Copied Markdown!' : 'Copy Badge'}
        </button>
      </div>
      <code className="text-[11px] font-mono bg-white p-2 rounded-lg border border-[#E2E8F0] text-[#475569] overflow-x-auto whitespace-pre">
        {markdownSnippet}
      </code>
    </div>
  )
}
