import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MOCK_DOERS, MOCK_PROJECTS } from '@/lib/mockData'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProjectCard from '@/components/projects/ProjectCard'
import { ArrowLeft, Globe, Code2, Share2, Edit3, User, Mail } from 'lucide-react'

interface DoerProfilePageProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DoerProfilePage({ params, searchParams }: DoerProfilePageProps) {
  const { id } = await params
  const sParams = searchParams ? await searchParams : {}
  const fromDashboard = sParams?.from === 'dashboard'

  // Lookup by id or username
  const doer = MOCK_DOERS.find(
    (d) => d.id === id || d.username?.toLowerCase() === id.toLowerCase()
  ) || MOCK_DOERS[0]

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-12">
      {/* ── 1. TOP BAR NAVIGATION ── */}
      <div className="flex items-center justify-between">
        <div>
          {fromDashboard ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors bg-[#EEF2FF] px-3.5 py-2 rounded-xl"
            >
              <ArrowLeft size={16} /> Back to My Dashboard
            </Link>
          ) : (
            <Link
              href="/doers"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              <ArrowLeft size={16} /> Back to Doers
            </Link>
          )}
        </div>

        {fromDashboard && (
          <Link href="/dashboard/profile">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold shadow-2xs">
              <Edit3 size={14} /> Edit Portfolio
            </Button>
          </Link>
        )}
      </div>

      {/* ── 2. HERO PROFILE SECTION (Matching Public Doer Profile — Hi-Fi) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-4">
        
        {/* Left Side (7 Cols): Name, Title, Academic, Bio, CTA & Social Links */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
              {doer.full_name}
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-[#4F46E5] mt-2">
              Software Engineer &amp; AI Builder
            </h2>
            <p className="text-sm font-medium text-[#6B7280] mt-1">
              {doer.program} · {doer.year}
            </p>
          </div>

          <p className="text-base text-[#4B5563] leading-relaxed max-w-xl">
            Software developer interested in artificial intelligence, educational technology, and building tools that make complex information easier to understand.
          </p>

          {/* Primary CTA */}
          <div className="pt-1">
            <a href={`mailto:${doer.email || 'alex.chen@university.edu'}`}>
              <Button variant="primary" size="md" className="gap-2 px-6 py-2.5 rounded-xl font-bold shadow-sm">
                <Mail size={16} /> Get in Touch
              </Button>
            </a>
          </div>

          {/* Social Links with Icons */}
          <div className="flex items-center gap-6 pt-2 flex-wrap text-sm font-medium text-[#111827]">
            {doer.linkedin_url && (
              <a
                href={doer.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#4B5563] hover:text-[#4F46E5] transition-colors"
              >
                <Share2 size={16} /> LinkedIn
              </a>
            )}
            {doer.github_url && (
              <a
                href={doer.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#4B5563] hover:text-[#4F46E5] transition-colors"
              >
                <Code2 size={16} /> GitHub
              </a>
            )}
            {doer.portfolio_url && (
              <a
                href={doer.portfolio_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#4B5563] hover:text-[#4F46E5] transition-colors"
              >
                <Globe size={16} /> Personal Website
              </a>
            )}
          </div>
        </div>

        {/* Right Side (5 Cols): Giant Circular Avatar Illustration with Active Badge */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Giant Circular Container */}
            <div className="w-full h-full rounded-full bg-[#F0F4F8] flex items-center justify-center relative shadow-inner overflow-hidden">
              {doer.avatar_url ? (
                <img
                  src={doer.avatar_url}
                  alt={doer.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={120} className="text-[#94A3B8] stroke-[1.25]" />
              )}
            </div>

            {/* Active Doer Status Pill on bottom right of avatar */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#4F46E5] text-white shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#86EFAC] animate-pulse"></span>
                Active Doer
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ── 3. ABOUT & SKILLS (Side-by-Side Clean Layout) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 border-t border-[#E5E7EB]">
        
        {/* About (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-[#111827]">About</h2>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            I&apos;m a passionate computer science doer with a focus on practical applications of emerging technologies. My academic journey has been driven by a curiosity to understand not just how systems work, but how they can be optimized to solve real-world problems.
          </p>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            Beyond coursework, I actively participate in hackathons and open-source contributions. I believe in writing clean, maintainable code and am always eager to learn new frameworks and methodologies to improve my development workflow.
          </p>
        </div>

        {/* Skills (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-[#111827]">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {doer.skills.map((s) => (
              <Badge
                key={s.name}
                label={s.name}
                className="text-xs px-3.5 py-1.5 bg-[#F3F4F6] text-[#374151] font-medium rounded-lg"
              />
            ))}
          </div>
        </div>

      </div>

      {/* ── 4. PROJECTS BY DOER (3-Column Grid) ── */}
      <div className="pt-6 border-t border-[#E5E7EB]">
        <h2 className="text-2xl font-bold text-[#111827] mb-8">
          Projects by {doer.full_name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
