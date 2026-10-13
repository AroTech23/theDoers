'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, ExternalLink, Code2, Cloud, Cpu, Database, Award, Bookmark, Share2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import DoerBadge from '@/components/ui/DoerBadge'

export default function MagazinePage() {
  const issues = [
    {
      id: 'issue-01',
      title: 'Issue 01: The Architecture of Student Innovation',
      date: 'Autumn 2024',
      theme: 'Systems Engineering & Cloud Infrastructure',
      editor: 'Seven International University Editorial Board',
      articles: [
        {
          title: 'Automated CI/CD & Resilient Cloud Deployments',
          author: 'NGONG ARNOLD NDOKWO',
          role: 'Co-Founder & Cloud / DevOps Engineer',
          icon: Cloud,
          category: 'DevOps & Infrastructure',
          summary:
            'A deep dive into containerized orchestration, automated pipeline security, and eliminating downtime in mission-critical student platforms.',
          keyMetric: '99.9% Uptime · 4x Faster Deploys',
          link: '/doers/arnold'
        },
        {
          title: 'Algorithmic Engines & Scalable Backend Systems',
          author: 'Peace Ndukwo Ikechukwu John Kalu',
          role: 'Co-Founder & Software Systems Engineer',
          icon: Cpu,
          category: 'Software Architecture',
          summary:
            'How rigorous systems thinking, memory-conscious data structures, and clean API design replace bloated frameworks in student applications.',
          keyMetric: '<45ms Latency · Distributed Design',
          link: '/doers/peace'
        },
        {
          title: 'Modern Data Pipelines: From Raw Streams to Intelligence',
          author: 'Rosa Daniella Tiffany Base',
          role: 'Co-Founder & Data Engineer',
          icon: Database,
          category: 'Data Engineering',
          summary:
            'Structuring robust ETL pipelines, managing data lineage, and transforming chaotic institutional records into actionable engineering intelligence.',
          keyMetric: '100% Data Integrity · Automated Schemas',
          link: '/doers/rosa'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors bg-[#EEF2FF] px-3.5 py-1.5 rounded-xl shadow-2xs"
          >
            <ArrowLeft size={14} /> Back to Homepage
          </Link>
        </div>

        {/* ── 1. MAGAZINE MASTHEAD HEADER ── */}
        <div className="border-b border-[#E2E8F0] pb-10 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0F172A] text-white">
                THE DOERS EDITORIAL
              </span>
              <span className="text-xs font-mono text-[#64748B]">VOL. 01 · ISSUE 01</span>
            </div>
            <span className="text-xs font-mono text-[#64748B]">PUBLISHED FOR RECRUITERS &amp; INCUBATORS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#0F172A] tracking-tight">
            The Doers Magazine
          </h1>

          <p className="text-base sm:text-lg text-[#475569] max-w-3xl leading-relaxed">
            A quarterly editorial publication highlighting top student software engineering case studies, architectural breakdowns, and startup innovations born on university campuses.
          </p>
        </div>

        {/* ── 2. FEATURED COVER STORY ── */}
        <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white rounded-3xl p-8 sm:p-12 border border-[#1E293B] shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 rounded-full text-xs font-mono text-[#A5B4FC]">
              <Sparkles size={14} /> Cover Story Feature
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Seven International University: <br className="hidden sm:inline" />
              How Student Builders Are Killing the Resume
            </h2>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              In an era of generic degrees, students at Seven International University are skipping conventional resume padding. By deploying full-scale cloud platforms, distributed algorithms, and analytical pipelines, they are defining a new standard of verified engineering competence.
            </p>

            <div className="pt-2 flex items-center gap-4 flex-wrap">
              <Link href="/about">
                <Button variant="primary" size="md" className="font-bold shadow-xs">
                  Read Founder Journey <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
              <Link href="/manifesto">
                <Button variant="outline" size="md" className="font-bold border-[#334155] text-white hover:bg-white/10">
                  Read The Manifesto
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── 3. FEATURED CASE STUDIES & ARTICLES ── */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">Issue 01: Top Project Deep-Dives</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Selected by technical peer reviewers for architectural excellence.</p>
            </div>
            <span className="text-xs font-mono text-[#4F46E5] font-bold">3 CURATED PIECES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {issues[0].articles.map((article) => {
              const Icon = article.icon
              return (
                <div
                  key={article.title}
                  className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-[#CBD5E1] transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold">
                        <Icon size={20} />
                      </div>
                      <span className="text-[11px] font-mono text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                        {article.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] leading-snug group-hover:text-[#4F46E5] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs font-bold text-[#4F46E5] mt-1">{article.author}</p>
                      <p className="text-[11px] text-[#64748B]">{article.role}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {article.summary}
                    </p>

                    <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                      <span className="text-[10px] font-mono uppercase text-[#64748B] block">Measured Impact:</span>
                      <span className="text-xs font-bold text-[#0F172A]">{article.keyMetric}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#F1F5F9] mt-6">
                    <Link href={article.link} className="block">
                      <Button variant="dark" size="sm" className="w-full font-bold text-xs justify-center gap-1.5">
                        Inspect Builder Portfolio <ArrowRight size={13} />
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── 4. INCUBATOR & RECRUITER PARTNERSHIP CORNER ── */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[#4F46E5] font-bold">
              Institutional &amp; Venture Scouting
            </span>
            <h3 className="text-2xl font-black text-[#0F172A]">
              Are You an Incubator, Tech Firm, or University?
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              We partner directly with university startup incubators, venture scout networks, and tech recruiting teams to spotlight the highest-performing student innovators with verified engineering portfolios.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a href="mailto:contact@thedoers.app?subject=Partnership Inquiry from Incubator/Company">
              <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold shadow-xs">
                Inquire for Partnerships →
              </Button>
            </a>
            <Link href="/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold">
                Submit Your Project
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
