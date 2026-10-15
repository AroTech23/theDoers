'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import DoerCard from '@/components/doers/DoerCard'
import Badge from '@/components/ui/Badge'
import { Search, ArrowRight, LayoutDashboard, Plus, ShieldCheck, Sparkles, Loader2, BookOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { MOCK_DOERS } from '@/lib/mockData'

const popularSkills = [
  'Rust', 'Next.js', 'Python', 'React', 'Machine Learning',
  'TypeScript', 'Cybersecurity', 'Data Science', 'IoT & Embedded'
]

export default function HomePage() {
  const supabase = createClient()
  const [authRole, setAuthRole] = useState<string | null>(null)
  const [doers, setDoers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('role, status')
          .eq('id', user.id)
          .maybeSingle()

        if (profile && (profile.status === 'approved' || profile.role === 'admin')) {
          setAuthRole(profile.role)
          // Always ensure session cookie is present for server middleware
          if (typeof window !== 'undefined') {
            document.cookie = `thedoers_auth_role=${profile.role}; path=/; max-age=604800; SameSite=Lax;`
          }
          return
        }
      }
      setAuthRole(null)
    }

    loadAuth()

    async function loadFeaturedDoers() {
      try {
        setLoading(true)
        const { data: dbUsers } = await supabase
          .from('users')
          .select('*, doer_skills(skill:skills(name)), projects(id)')
          .eq('role', 'doer')
          .eq('status', 'approved')
          .limit(4)

        if (dbUsers && dbUsers.length > 0) {
          const formatted = dbUsers.map(u => ({
            ...u,
            skills: (u.doer_skills || []).map((ds: any) => ({ name: ds.skill?.name })).filter((s: any) => s.name),
            projects_count: (u.projects || []).length
          }))
          setDoers(formatted)
        } else {
          setDoers(MOCK_DOERS.slice(0, 4))
        }
      } catch (err) {
        console.error('Error loading homepage doers:', err)
        setDoers(MOCK_DOERS.slice(0, 4))
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedDoers()
  }, [supabase])

  const isDoer = authRole === 'doer'
  const isAdmin = authRole === 'admin'

  return (
    <div className="flex flex-col">

      {/* ── Hero Section ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left: Copy & Role-Aware CTAs */}
          <div className="flex flex-col gap-6">
            <div>
              <Link
                href="/manifesto"
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#0F172A] text-white hover:bg-[#1E293B] text-[11px] sm:text-xs font-mono font-bold transition-all shadow-xs w-fit mb-3"
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                <span>THE MOVEMENT // Read Manifesto &amp; Magazine Issue 01 →</span>
              </Link>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Discover Ethically Skilled Engineers  <span className="text-[#4F46E5]">And Innovators</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-[#64748B] leading-relaxed max-w-lg">
                Meet the next generation of engineers, designers, and innovators through real case studies, architecture diagrams, and live demos. Explore their work and connect with the people behind the ideas.
              </p>
            </div>

            {/* Search bar */}
            <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/doers?q=${encodeURIComponent(searchQuery)}`; }} className="relative max-w-md w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Doers by name, skill, or program..."
                className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white shadow-2xs"
              />
            </form>

            {/* Role-Aware CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link href="/doers" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center font-bold shadow-xs">
                  Explore Doers
                </Button>
              </Link>

              {isAdmin ? (
                <Link href="/admin" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto justify-center border-[#0F172A] text-[#0F172A] hover:bg-[#F8FAFC] font-bold shadow-2xs">
                    <ShieldCheck size={16} className="text-[#4F46E5] mr-1.5" /> Admin Command Center
                  </Button>
                </Link>
              ) : isDoer ? (
                <>
                  <Link href="/dashboard/projects/new" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto justify-center border-[#4F46E5] text-[#4F46E5] hover:bg-[#EEF2FF] font-bold shadow-2xs flex items-center gap-1.5">
                      <Plus size={16} /> Add Project
                    </Button>
                  </Link>
                  <Link href="/dashboard" className="w-full sm:w-auto">
                    <Button variant="ghost" size="lg" className="w-full sm:w-auto justify-center text-[#64748B] hover:text-[#0F172A] font-bold flex items-center gap-1.5">
                      <LayoutDashboard size={16} /> My Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/register" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto justify-center font-bold border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC]">
                    Become a Doer
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Right: Captivating Dynamic Feature Grid */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#EEF2FF] via-[#F5F3FF] to-[#FAF5FF] border border-[#E2E8F0] rounded-3xl p-5 sm:p-8 shadow-sm relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0]/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
                  <Sparkles size={13} /> Verified Technical Showcase
                </span>
              </div>

              <div className="space-y-4 pt-6">
                <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
                  <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider">IoT &amp; Embedded</span>
                  <h4 className="text-base font-bold text-[#0F172A] mt-0.5">Energy Anomaly Detection Network</h4>
                  <p className="text-xs text-[#64748B] mt-1">Sub-second phase sampling and MQTT telemetry on ESP32 in Rust.</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
                  <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">Distributed Systems</span>
                  <h4 className="text-base font-bold text-[#0F172A] mt-0.5">High-Throughput Task Broker</h4>
                  <p className="text-xs text-[#64748B] mt-1">Raft consensus node implementation with zero-allocation memory buffers.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── Featured Doers Section ── */}
      <section className="bg-white py-12 sm:py-16 border-t border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex justify-between items-end mb-8 sm:mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] mb-1">
                Student Innovators
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                Featured Doers
              </h2>
            </div>
            <Link href="/doers" className="text-xs sm:text-sm font-bold text-[#4F46E5] hover:underline flex items-center gap-1">
              View all Doers <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {doers.map((doer) => (
              <DoerCard key={doer.id} doer={doer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── The Doers Magazine Spotlight ── */}
      <section className="py-12 sm:py-16 bg-[#0F172A] text-white border-t border-[#1E293B]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-[#818CF8]">
              <BookOpen size={13} /> The Doers Magazine · Issue 01
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              The Architecture of Student Innovation
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Explore deep architectural case studies by top student engineers. From cloud automation and distributed consensus engines to modern data pipelines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
            <Link href="/magazine" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center font-bold shadow-xs">
                Read Issue 01 <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
            <Link href="/manifesto" className="w-full sm:w-auto">
              <Button variant="outline-light" size="lg" className="w-full sm:w-auto justify-center font-bold">
                The Manifesto
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Popular Skills Section ── */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-2 sm:mb-3">
            Explore by Technology
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto mb-6 sm:mb-8">
            Find student engineers specializing in cutting-edge stacks and engineering tools.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
            {popularSkills.map((skill) => (
              <Link key={skill} href={`/doers?skill=${encodeURIComponent(skill)}`}>
                <span className="inline-flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#334155] hover:border-[#4F46E5] hover:text-[#4F46E5] hover:bg-[#EEF2FF] transition-all cursor-pointer shadow-2xs">
                  {skill}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
