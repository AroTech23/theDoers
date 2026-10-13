'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { Mail, Share2, Code2, Globe, MessageSquare, Check, Phone } from 'lucide-react'

interface ContactActionGroupProps {
  doerId: string
  doerName: string
  email?: string
  linkedinUrl?: string
  githubUrl?: string
  portfolioUrl?: string
  whatsappUrl?: string
  seekingGoal?: 'job' | 'fundraising' | 'both'
}

export default function ContactActionGroup({
  doerId,
  doerName,
  email,
  linkedinUrl,
  githubUrl,
  portfolioUrl,
  whatsappUrl,
  seekingGoal = 'both'
}: ContactActionGroupProps) {
  const [tracked, setTracked] = useState(false)

  const handleTrack = async (contactType: string) => {
    try {
      // Fire-and-forget telemetry call
      fetch('/api/track-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doerId, contactType })
      }).catch(() => {})

      // Store in local storage for instant dashboard reflection
      if (typeof window !== 'undefined') {
        const key = `thedoers_contacts_${doerId}`
        const current = parseInt(localStorage.getItem(key) || '0', 10)
        localStorage.setItem(key, String(current + 1))
      }

      setTracked(true)
      setTimeout(() => setTracked(false), 3000)
    } catch {
      // Non-blocking
    }
  }

  return (
    <div className="space-y-4">
      {/* Dual Track Intent Badge */}
      <div className="flex items-center gap-2 flex-wrap">
        {seekingGoal === 'job' && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
            💼 Open to Software Engineering Roles &amp; Internships
          </span>
        )}
        {seekingGoal === 'fundraising' && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
            🚀 Seeking: Incubator Support &amp; Pre-Seed Funding
          </span>
        )}
        {seekingGoal === 'both' && (
          <div className="flex gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
              💼 Open to Tech Roles
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
              🚀 Startup / Incubator Ready
            </span>
          </div>
        )}
      </div>

      {/* Primary Outreach Button */}
      <div className="flex items-center gap-3 pt-1 flex-wrap">
        <a
          href={`mailto:${email || 'student@university.edu'}?subject=Reaching out via theDoers platform`}
          onClick={() => handleTrack('email')}
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="primary" size="md" className="gap-2 px-6 py-2.5 rounded-xl font-bold shadow-xs bg-[#0F172A] hover:bg-[#1E293B]">
            <Mail size={16} /> Contact {doerName.split(' ')[0]}
          </Button>
        </a>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            onClick={() => handleTrack('whatsapp')}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" size="md" className="gap-2 px-4 py-2.5 rounded-xl font-bold border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC]">
              <Phone size={15} className="text-[#10B981]" /> WhatsApp
            </Button>
          </a>
        )}

        {tracked && (
          <span className="text-xs font-semibold text-[#059669] flex items-center gap-1 animate-in fade-in">
            <Check size={14} /> Contact logged on platform!
          </span>
        )}
      </div>

      {/* Social Channels with Click Tracking */}
      <div className="flex items-center gap-5 pt-1 flex-wrap text-xs sm:text-sm font-semibold text-[#64748B]">
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            onClick={() => handleTrack('linkedin')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#4F46E5] transition-colors"
          >
            <Share2 size={15} /> LinkedIn
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            onClick={() => handleTrack('github')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#0F172A] transition-colors"
          >
            <Code2 size={15} /> GitHub
          </a>
        )}
        {portfolioUrl && (
          <a
            href={portfolioUrl}
            onClick={() => handleTrack('portfolio')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#4F46E5] transition-colors"
          >
            <Globe size={15} /> Personal Site
          </a>
        )}
      </div>
    </div>
  )
}
