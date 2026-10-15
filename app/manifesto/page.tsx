'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, ShieldCheck, Code2, Terminal, Sparkles, CheckCircle2, Flame, Users, BookOpen } from 'lucide-react'
import Button from '@/components/ui/Button'
import DoerBadge from '@/components/ui/DoerBadge'

export default function ManifestoPage() {
  const tenets = [
    {
      number: '01',
      title: 'Code Over Claims',
      tagline: 'Talk is cheap. Show the repository.',
      description:
        'Anyone can list ten technologies on a bullet-pointed CV. A Doer proves competence through running code, public git history, and systems deployed into production. If it does not run, it does not count.'
    },
    {
      number: '02',
      title: 'Real Problems Over Shallow Clones',
      tagline: 'We build for utility, not tutorial vanity.',
      description:
        'The tech world is drowning in cookie-cutter tutorial clones. Doers identify real inefficiencies in their campuses, communities, and industries — architecting original, battle-tested solutions that deliver measurable value.'
    },
    {
      number: '03',
      title: 'Engineering Rigor & Architecture',
      tagline: 'Writing code is only half the battle.',
      description:
        'A real builder understands system design, database indexing, DevOps pipelines, containerization, security boundaries, and trade-offs. We take pride in deep documentation and architectural integrity.'
    },
    {
      number: '04',
      title: 'Meritocracy Over Pedigree',
      tagline: 'Proof of work renders pedigree secondary.',
      description:
        'It does not matter whether you attend a world-famous institution or write code from a dorm room in Buea, Douala, or Lagos. Your engineering output speaks louder than any brand name.'
    },
    {
      number: '05',
      title: 'Ethical Building in the Open',
      tagline: 'We build with honor, integrity, and community.',
      description:
        'Zero plagiarism. Zero puffed metrics. We respect open source, support fellow students, collaborate across disciplines, and hold each other to the highest standards of professional ethics.'
    }
  ]

  const founders = [
    { name: 'NGONG ARNOLD NDOKWO', role: 'Cloud & DevOps Engineer', institution: 'Seven International University · Year 2' },
    { name: 'Peace Ndukwo Ikechukwu John Kalu', role: 'Software Systems Engineer', institution: 'Seven International University · Year 2' },
    { name: 'Rosa Daniella Tiffany Base', role: 'Data Engineer', institution: 'Seven International University · Year 2' }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-8">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors bg-[#EEF2FF] px-3.5 py-1.5 rounded-xl shadow-2xs"
          >
            <ArrowLeft size={14} /> Back to Homepage
          </Link>
        </div>

        {/* ── 1. MANIFESTO HERO HEADER ── */}
        <div className="space-y-6 border-b border-[#E2E8F0] pb-12">
          <div className="flex items-center gap-3">
            <DoerBadge variant="compact" />
            <span className="text-xs font-mono text-[#64748B] tracking-wider uppercase">Document // MANIFESTO-2024.v1</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.08]">
            The Doers Manifesto: <br />
            <span className="text-[#4F46E5]">Proof of Work</span> Over Promises.
          </h1>

          <p className="text-sm sm:text-lg lg:text-xl text-[#475569] leading-relaxed max-w-2xl font-medium">
            We are student software engineers, systems architects, and innovators who believe that the traditional resume is broken. We do not ask recruiters or investors to trust our words — we give them systems to inspect.
          </p>
        </div>

        {/* ── 2. THE 5 TENETS ── */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#64748B] flex items-center gap-2">
              <Terminal size={14} className="text-[#4F46E5]" /> The Five Fundamental Tenets
            </h2>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {tenets.map((tenet) => (
              <div
                key={tenet.number}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-8 hover:border-[#CBD5E1] transition-all shadow-xs group"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6">
                  <span className="font-mono text-xl sm:text-3xl font-black text-[#94A3B8] group-hover:text-[#4F46E5] transition-colors shrink-0">
                    {tenet.number}
                  </span>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <h3 className="text-lg sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                        {tenet.title}
                      </h3>
                      <span className="text-[11px] sm:text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-0.5 rounded-md w-fit">
                        {tenet.tagline}
                      </span>
                    </div>
                    <p className="text-xs sm:text-base text-[#475569] leading-relaxed pt-1">
                      {tenet.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. SIGNATORIES OF THE MOVEMENT ── */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-5 sm:p-8 sm:p-12 border border-[#1E293B] shadow-xl space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-[#A5B4FC]">
              <Sparkles size={13} /> Foundational Signatories
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Signed by the Inaugural Cohort
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Penned and established by student engineers of Seven International University.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
            {founders.map((founder) => (
              <div key={founder.name} className="p-4 sm:p-5 rounded-2xl bg-[#1E293B]/70 border border-[#334155] space-y-2">
                <p className="font-bold text-sm text-white">{founder.name}</p>
                <p className="text-xs text-[#818CF8] font-mono">{founder.role}</p>
                <p className="text-[11px] text-[#94A3B8]">{founder.institution}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#334155] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <span className="text-xs text-[#94A3B8] font-mono text-center sm:text-left">
              Are you building real engineering solutions? Sign the manifesto by joining.
            </span>
            <Link href="/register" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full sm:w-auto justify-center font-bold gap-2">
                Apply to Become a Doer <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>

        {/* ── 4. BADGE PROMOTION ── */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-8 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#0F172A]">Wear Your Badge with Pride</h3>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Every verified Doer receives a permanent cryptographic badge to embed directly on GitHub repositories and portfolios.
            </p>
          </div>

          <DoerBadge variant="markdown" username="arnold" />
        </div>

      </div>
    </div>
  )
}
