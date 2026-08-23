'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { 
  Target, 
  Users, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  Code2, 
  Globe2, 
  Compass, 
  ArrowRight, 
  GraduationCap, 
  ExternalLink,
  Plus,
  LayoutDashboard
} from 'lucide-react';

export default function AboutUsPage() {
  const [authRole, setAuthRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthRole(localStorage.getItem('thedoers_auth_role'));
    }
  }, []);

  const isDoer = authRole === 'doer';
  const isAdmin = authRole === 'admin';

  const founders = [
    {
      name: 'Arnold Ngong',
      role: 'Co-Founder & Lead Systems Architect',
      program: 'B.S. Software Engineering & AI',
      bio: 'Passionate about distributed web architectures, high-performance backends, and bridging real engineering talent with global opportunities.',
      initials: 'AN',
      avatarBg: 'bg-[#4F46E5]',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Kofi Mensah',
      role: 'Co-Founder & Head of Product & UX',
      program: 'B.S. Interactive Design & HCI',
      bio: 'Focused on creating frictionless, human-centered digital experiences and design systems that let student projects shine.',
      initials: 'KM',
      avatarBg: 'bg-[#0284C7]',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Emmanuel Adeyemi',
      role: 'Co-Founder & Platform Operations',
      program: 'B.S. Computer Science & Cloud Systems',
      bio: 'Dedicated to community growth, university tech partnerships, and building verified verification standards for ethical student builders.',
      initials: 'EA',
      avatarBg: 'bg-[#7C3AED]',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-6">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 flex flex-col gap-16">
        
        {/* Previous / Back Navigation */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors bg-[#EEF2FF] px-3.5 py-1.5 rounded-xl shadow-2xs"
          >
            <ArrowLeft size={14} /> Back to Homepage
          </Link>
        </div>

        {/* ── 1. HERO MANIFESTO ── */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-xs font-bold text-[#4F46E5] shadow-2xs">
            <Sparkles size={14} /> Our Mission &amp; Purpose
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Proof of Work Over <br />
            <span className="text-[#4F46E5]">Paper Resumes</span>
          </h1>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            theDoers is the dedicated discovery and engineering showcase platform built for student tech innovators. 
            We empower computer science, software engineering, and design students to showcase what they actually build.
          </p>
        </div>

        {/* ── 2. OUR ORIGIN & WHY WE BUILT THIS ── */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">The Genesis Story</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Built by Students, for the Next Generation of Builders.
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              As student engineers, we noticed a painful gap in traditional recruitment: students spend hundreds of hours designing complex algorithms, deploying full-stack architectures, and soldering IoT circuits, only for their work to be flattened into a single-line bullet point on an ignored resume.
            </p>
            <p className="text-sm text-[#475569] leading-relaxed">
              We built <strong className="text-[#0F172A]">theDoers</strong> to give every ambitious student a structured, engineering-first canvas where their technical problem-solving, architectural decisions, live demos, and source code take center stage.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <Code2 size={24} className="text-[#4F46E5]" />
              <h4 className="font-bold text-[#0F172A] text-sm">Deep Case Studies</h4>
              <p className="text-xs text-[#64748B]">Problem, process, and verified impact metrics.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <ShieldCheck size={24} className="text-[#10B981]" />
              <h4 className="font-bold text-[#0F172A] text-sm">Ethical Standards</h4>
              <p className="text-xs text-[#64748B]">Zero fluff, verified deliverables, and authentic student creators.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <Globe2 size={24} className="text-[#0284C7]" />
              <h4 className="font-bold text-[#0F172A] text-sm">Public Discovery</h4>
              <p className="text-xs text-[#64748B]">Shareable portfolio URLs designed for high-impact viewing.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <Users size={24} className="text-[#8B5CF6]" />
              <h4 className="font-bold text-[#0F172A] text-sm">Peer Community</h4>
              <p className="text-xs text-[#64748B]">Collaborate across engineering and design disciplines.</p>
            </div>
          </div>
        </div>

        {/* ── 3. THREE CORE PILLARS ── */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">Our Core Pillars</h2>
            <p className="text-xs sm:text-sm text-[#64748B]">The guiding architectural principles behind everything we design.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold">01</div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">The Engineering Story</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  A great project is more than just a screenshot. We highlight the entire journey: from identifying inefficiencies, to technical challenges overcome, to measured results.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#DEF7EC] text-[#03543F] flex items-center justify-center font-bold">02</div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">Verified Proof of Competence</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  No gatekeeping and no exaggeration. Every case study links out to functional prototypes, source repositories, and comprehensive architectural PDFs.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF5FF] text-[#7C3AED] flex items-center justify-center font-bold">03</div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">Universal Access &amp; Spotlight</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Whether you are in your 1st year or final year, our directory elevates exceptional work regardless of pedigree, putting merit first.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. MEET THE FOUNDERS ── */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">The Creators</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">Meet the Founders</h2>
            <p className="text-xs sm:text-sm text-[#64748B]">Three tech students building the platform they wished existed when starting out.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder) => (
              <div key={founder.name} className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs flex flex-col items-center text-center justify-between hover:border-[#CBD5E1] transition-all group">
                <div className="flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-full ${founder.avatarBg} text-white flex items-center justify-center text-xl font-extrabold mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                    {founder.initials}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{founder.name}</h3>
                  <p className="text-xs font-bold text-[#4F46E5] mt-0.5">{founder.role}</p>
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-[11px] font-semibold text-[#64748B] mt-2.5">
                    <GraduationCap size={13} className="text-[#4F46E5]" /> {founder.program}
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed mt-4">
                    {founder.bio}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-[#F1F5F9] w-full justify-center text-[#64748B] text-xs font-semibold mt-6">
                  <a href={founder.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg transition-colors border border-[#E2E8F0]">
                    <Code2 size={13} /> GitHub
                  </a>
                  <a href={founder.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 hover:text-[#4F46E5] hover:bg-[#EEF2FF] rounded-lg transition-colors border border-[#E2E8F0]">
                    <ExternalLink size={13} /> LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. PLATFORM METRICS ── */}
        <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#312E81] rounded-3xl p-8 lg:p-12 text-white shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">250+</div>
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wider mt-1">Student Builders</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#38BDF8]">130+</div>
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wider mt-1">Published Projects</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#4ADE80]">15+</div>
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wider mt-1">Tech Disciplines</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#C084FC]">100%</div>
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wider mt-1">Verified Case Studies</div>
            </div>
          </div>
        </div>

        {/* ── 6. ROLE-AWARE DUAL CALL TO ACTION ── */}
        <div className="rounded-3xl bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-[#E2E8F0] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
              {isDoer ? 'Keep growing your public footprint' : 'Ready to showcase your engineering work?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-lg leading-relaxed">
              {isDoer 
                ? 'Add your newest project breakdown, update your architecture diagrams, or refine your measurable results.'
                : 'Join the growing network of student developers, designers, and AI creators. Publish your case studies in minutes.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isDoer ? (
              <>
                <Link href="/dashboard/projects/new">
                  <Button variant="primary" size="lg" className="font-bold shadow-xs gap-2">
                    <Plus size={16} /> Add New Project
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="font-bold border-[#E2E8F0]">
                    <LayoutDashboard size={16} /> My Dashboard
                  </Button>
                </Link>
              </>
            ) : isAdmin ? (
              <Link href="/admin">
                <Button variant="primary" size="lg" className="font-bold shadow-xs gap-2">
                  <ShieldCheck size={16} /> Admin Command Center
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button variant="primary" size="lg" className="font-bold shadow-xs">
                    Become a Doer <ArrowRight size={15} className="ml-1" />
                  </Button>
                </Link>
                <Link href="/doers">
                  <Button variant="outline" size="lg" className="font-bold">
                    Explore Directory
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
