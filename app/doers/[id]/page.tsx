import { notFound } from 'next/navigation'
import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProjectCard from '@/components/projects/ProjectCard'
import { ArrowLeft, Globe, Code2, Share2, Edit3, User, Mail, FolderKanban } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { MOCK_DOERS, MOCK_PROJECTS } from '@/lib/mockData'

interface DoerProfilePageProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DoerProfilePage({ params, searchParams }: DoerProfilePageProps) {
  const { id } = await params
  const sParams = searchParams ? await searchParams : {}
  const fromDashboard = sParams?.from === 'dashboard'

  const supabase = await createClient()

  // 1. Fetch Doer Profile from Supabase (by username or by UUID id)
  let dbDoer: any = null
  
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  
  if (isUUID) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    dbDoer = data
  } else {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('username', id)
      .maybeSingle()
    dbDoer = data
  }

  // Fallback to mock data if id matches mock
  const mockFallback = MOCK_DOERS.find(d => d.id === id || d.username?.toLowerCase() === id.toLowerCase())

  const doer = dbDoer || mockFallback

  if (!doer) {
    return notFound()
  }

  // 2. Fetch Doer's real published projects
  let publishedProjects: any[] = []
  let doerSkills: string[] = []

  if (dbDoer) {
    const { data: projectsData } = await supabase
      .from('projects')
      .select('*')
      .eq('doer_id', dbDoer.id)
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    publishedProjects = projectsData || []

    const { data: skillsData } = await supabase
      .from('doer_skills')
      .select('skill:skills(name)')
      .eq('doer_id', dbDoer.id)

    if (skillsData) {
      doerSkills = skillsData.map((s: any) => s.skill?.name).filter(Boolean)
    }
  } else {
    publishedProjects = MOCK_PROJECTS.slice(0, 3)
    doerSkills = ['Python', 'React', 'TypeScript', 'Machine Learning']
  }

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

      {/* ── 2. HERO PROFILE SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-4">
        
        {/* Left Side (7 Cols): Name, Title, Academic, Bio, CTA & Social Links */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
              {doer.full_name}
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-[#4F46E5] mt-2">
              {doer.headline || 'Student Engineer & Innovator'}
            </h2>
            <p className="text-sm font-medium text-[#6B7280] mt-1">
              {doer.program || 'Engineering'} · {doer.year || 'Year 3'}
            </p>
          </div>

          <p className="text-base text-[#4B5563] leading-relaxed max-w-xl">
            {doer.bio || 'Software developer passionate about engineering high-impact tools and solving real-world challenges with code.'}
          </p>

          {/* Primary CTA */}
          <div className="pt-1">
            <a href={`mailto:${doer.email || 'student@university.edu'}`}>
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

        {/* Right Side (5 Cols): Clean Avatar Container */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] flex items-center justify-center text-white text-6xl md:text-7xl font-extrabold tracking-tight">
            <Avatar name={doer.full_name} imageUrl={doer.avatar_url} size="lg" className="w-full h-full text-6xl md:text-7xl" />
          </div>
        </div>
      </div>

      {/* ── 3. SKILLS & AREAS OF INTEREST ── */}
      <div className="flex flex-col gap-4 border-t border-[#E5E7EB] pt-8">
        <h3 className="text-xl font-bold text-[#111827]">Skills &amp; Technologies</h3>
        <div className="flex flex-wrap gap-2.5">
          {doerSkills.length > 0 ? (
            doerSkills.map((skillName) => (
              <Badge
                key={skillName}
                label={skillName}
                className="bg-white border border-[#E5E7EB] text-[#374151] px-4 py-2 rounded-xl text-sm font-semibold shadow-2xs hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
              />
            ))
          ) : (
            <span className="text-xs text-[#94A3B8] italic">No skills listed yet.</span>
          )}
        </div>
      </div>

      {/* ── 4. FEATURED PROJECTS SECTION ── */}
      <div className="flex flex-col gap-6 border-t border-[#E5E7EB] pt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#111827]">
            Projects by {doer.full_name} ({publishedProjects.length})
          </h3>
        </div>

        {publishedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} authorId={doer.username || doer.id} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-[#CBD5E1] p-12 text-center flex flex-col items-center gap-3">
            <FolderKanban size={32} className="text-[#4F46E5]" />
            <h4 className="text-lg font-bold text-[#0F172A]">No published projects yet</h4>
            <p className="text-xs text-[#64748B] max-w-sm">
              This student has not published any engineering case studies yet.
            </p>
          </div>
        )}
      </div>

    </div>
  )
}
