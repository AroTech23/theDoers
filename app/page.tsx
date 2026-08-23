'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import DoerCard from '@/components/doers/DoerCard'
import Badge from '@/components/ui/Badge'
import { Search, ArrowRight, LayoutDashboard, Plus, ShieldCheck } from 'lucide-react'
import { User } from '@/types'

// Mock featured doers
const featuredDoers: (User & { skills: { name: string }[] })[] = [
  {
    id: '1', email: '', full_name: 'Jane Doe', username: 'janedoe',
    role: 'doer', status: 'approved', is_featured: true, created_at: '',
    program: 'B.S. Interactive Design', year: 'Senior',
    bio: 'Building tools for student creators',
    skills: [{ name: 'Product Design' }, { name: 'Figma' }],
  },
  {
    id: '2', email: '', full_name: 'Marcus Vance', username: 'marcusvance',
    role: 'doer', status: 'approved', is_featured: true, created_at: '',
    program: 'B.S. Computer Science', year: 'Junior',
    bio: 'Machine learning enthusiast and backend tinkerer',
    skills: [{ name: 'Python' }, { name: 'Node.js' }],
  },
  {
    id: '3', email: '', full_name: 'Alex Rivera', username: 'alexrivera',
    role: 'doer', status: 'approved', is_featured: true, created_at: '',
    program: 'B.A. UX Research', year: 'Senior',
    bio: 'Prototyping delightful, human-centered products',
    skills: [{ name: 'Figma' }, { name: 'Research' }],
  },
  {
    id: '4', email: '', full_name: 'Priya Shah', username: 'priyashah',
    role: 'doer', status: 'approved', is_featured: true, created_at: '',
    program: 'B.S. Data Science', year: 'Sophomore',
    bio: 'Turning messy datasets into clear stories',
    skills: [{ name: 'Python' }, { name: 'SQL' }],
  },
]

const popularSkills = [
  'Web Development', 'Mobile Development', 'AI / Machine Learning',
  'UI/UX', 'Cybersecurity', 'Data Science', 'Business', 'IoT',
]

export default function HomePage() {
  const [authRole, setAuthRole] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthRole(localStorage.getItem('thedoers_auth_role'))
    }
  }, [])

  const isDoer = authRole === 'doer'
  const isAdmin = authRole === 'admin'

  return (
    <div className="flex flex-col">

      {/* ── Hero Section ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: Copy & Role-Aware CTAs */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#4F46E5] mb-3">
                Proof of Work Over Paper Resumes
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                See What Students Are <span className="text-[#4F46E5]">Building.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed max-w-lg">
                Discover the next generation of engineers, designers, and innovators through real case studies, architecture diagrams, and live demos. Explore their work and connect with the people behind the ideas.
              </p>
            </div>

            {/* Search bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
              <input
                type="text"
                placeholder="Search Doers by name, skill, or program..."
                className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white shadow-2xs"
              />
            </div>

            {/* Role-Aware CTAs */}
            <div className="flex gap-3 flex-wrap">
              <Link href="/doers">
                <Button variant="primary" size="lg" className="font-bold shadow-xs">
                  Explore Doers
                </Button>
              </Link>

              {isAdmin ? (
                <Link href="/admin">
                  <Button variant="outline" size="lg" className="font-bold gap-2 text-[#4F46E5] border-[#C7D2FE] bg-[#EEF2FF]/60 hover:bg-[#EEF2FF]">
                    <ShieldCheck size={18} /> Admin Dashboard →
                  </Button>
                </Link>
              ) : isDoer ? (
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="font-bold gap-2 text-[#0F172A] border-[#E2E8F0] hover:bg-[#F8FAFC]">
                    <LayoutDashboard size={18} /> Go to Dashboard →
                  </Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button variant="outline" size="lg" className="font-bold">
                    Become a Doer
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Right: Floating cards preview with clickable links */}
          <div className="hidden md:flex flex-col gap-4 items-end">
            <Link 
              href="/doers/marcusvance"
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs w-72 hover:shadow-md hover:border-[#CBD5E1] transition-all group"
            >
              <div className="w-full h-32 bg-[#EEF2FF] rounded-xl mb-3 flex items-center justify-center text-[#4F46E5]/40 font-bold text-xs group-hover:bg-[#E0E7FF] transition-colors">
                AI / Machine Learning
              </div>
              <p className="font-bold text-[#0F172A] text-sm group-hover:text-[#4F46E5] transition-colors">Marcus Vance</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="w-6 h-6 rounded-full bg-[#4F46E5] flex items-center justify-center text-white text-xs font-bold">MV</div>
                <span className="text-xs text-[#64748B]">B.S. Computer Science</span>
              </div>
            </Link>

            <Link 
              href="/projects/p1"
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs w-64 self-start ml-8 hover:shadow-md hover:border-[#CBD5E1] transition-all group"
            >
              <p className="font-bold text-[#0F172A] text-sm leading-snug group-hover:text-[#4F46E5] transition-colors">AI-Powered Study Assistant</p>
              <Badge label="Python / NLP" className="mt-2 bg-[#F1F5F9] text-[#334155]" />
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 rounded-full bg-[#4F46E5] flex items-center justify-center text-white text-xs font-bold">AC</div>
                <span className="text-xs text-[#64748B]">Alex Chen</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Doers ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 py-12 lg:py-16 w-full">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">Featured Doers</h2>
          <Link href="/doers" className="flex items-center gap-1 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors">
            View All Doers <ArrowRight size={14} />
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-[#64748B] mb-8">Meet students building, creating, and solving real problems.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoers.map((doer) => (
            <DoerCard key={doer.id} doer={doer} />
          ))}
        </div>
      </section>

      {/* ── Explore by Skill ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 py-12 lg:py-16 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">Explore by Skill</h2>
        <p className="text-xs sm:text-sm text-[#64748B] mb-6">Find Doers based on what they know and what they can do.</p>

        <div className="flex flex-wrap gap-2.5">
          {popularSkills.map((skill) => (
            <Link key={skill} href={`/doers?skill=${encodeURIComponent(skill)}`}>
              <span className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white transition-colors cursor-pointer shadow-2xs">
                {skill}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Role-Aware Bottom CTA Section ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 mb-16 w-full">
        <div className="rounded-3xl bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-[#E2E8F0] py-14 px-8 text-center">
          {isDoer ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
                Keep Your Portfolio &amp; Projects Updated
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mb-6 max-w-md mx-auto leading-relaxed">
                Add your latest case studies, metrics, architecture diagrams, and repositories to stay top-of-mind.
              </p>
              <div className="flex justify-center gap-3">
                <Link href="/dashboard/projects/new">
                  <Button variant="primary" size="lg" className="font-bold shadow-xs gap-2">
                    <Plus size={16} /> Add New Project
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="font-bold border-[#E2E8F0]">
                    Manage Projects
                  </Button>
                </Link>
              </div>
            </>
          ) : isAdmin ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
                theDoers Administration Center
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mb-6 max-w-md mx-auto leading-relaxed">
                Review pending student submissions, moderate case studies, and audit community quality.
              </p>
              <Link href="/admin">
                <Button variant="primary" size="lg" className="font-bold shadow-xs gap-2">
                  <ShieldCheck size={16} /> Enter Admin Command Center
                </Button>
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
                Ready to Show What You Can Do?
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mb-6 max-w-md mx-auto leading-relaxed">
                Create your Doer profile, showcase your skills, and let your work speak for you.
              </p>
              <Link href="/register">
                <Button variant="primary" size="lg" className="font-bold shadow-xs">Become a Doer</Button>
              </Link>
            </>
          )}
        </div>
      </section>

    </div>
  )
}
