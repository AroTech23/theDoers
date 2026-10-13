import { notFound } from 'next/navigation'
import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import DoerBadge from '@/components/ui/DoerBadge'
import ContactActionGroup from '@/components/doers/ContactActionGroup'
import ProjectCard from '@/components/projects/ProjectCard'
import { ArrowLeft, Edit3, FolderKanban } from 'lucide-react'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 w-full flex flex-col gap-10">
      {/* ── 1. TOP BAR NAVIGATION ── */}
      <div className="flex items-center justify-between">
        <div>
          {fromDashboard ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors bg-[#EEF2FF] px-3.5 py-1.5 rounded-xl shadow-2xs"
            >
              <ArrowLeft size={15} /> Back to My Dashboard
            </Link>
          ) : (
            <Link
              href="/doers"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              <ArrowLeft size={15} /> Back to Doers
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-2">
        
        {/* Left Side (7 Cols): Name, Badge, Title, Academic, Bio, Outbound Telemetry Group */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <DoerBadge variant="compact" />
              <span className="text-xs font-mono text-[#64748B] uppercase">ID: DOER-{doer.id.slice(0, 6)}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight">
              {doer.full_name}
            </h1>

            <h2 className="text-lg sm:text-xl font-bold text-[#4F46E5]">
              {doer.headline || 'Student Engineer & Systems Builder'}
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-[#64748B]">
              {doer.program || 'Engineering'} · {doer.year || 'Student'}
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl">
            {doer.bio || 'Software developer passionate about engineering high-impact tools and solving real-world challenges with code.'}
          </p>

          {/* Interactive Contact & Telemetry Action Group */}
          <ContactActionGroup
            doerId={doer.id}
            doerName={doer.full_name}
            email={doer.email}
            linkedinUrl={doer.linkedin_url}
            githubUrl={doer.github_url}
            portfolioUrl={doer.portfolio_url}
            whatsappUrl={doer.whatsapp_url}
            seekingGoal="both"
          />
        </div>

        {/* Right Side (5 Cols): Clean Avatar Container with Movement Badge */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-4">
          <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl border border-[#E2E8F0] shadow-md bg-white p-2 flex items-center justify-center">
            <Avatar 
              name={doer.full_name} 
              imageUrl={doer.avatar_url} 
              size="lg" 
              className="w-full h-full text-5xl sm:text-6xl rounded-2xl" 
            />
          </div>
        </div>
      </div>

      {/* ── 3. SKILLS & AREAS OF INTEREST ── */}
      <div className="flex flex-col gap-3 border-t border-[#E2E8F0] pt-6">
        <h3 className="text-lg font-bold text-[#0F172A]">Skills &amp; Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {doerSkills.length > 0 ? (
            doerSkills.map((skillName) => (
              <Badge
                key={skillName}
                label={skillName}
                className="bg-white border border-[#E2E8F0] text-[#334155] px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-2xs hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
              />
            ))
          ) : (
            <span className="text-xs text-[#94A3B8] italic">No skills listed yet.</span>
          )}
        </div>
      </div>

      {/* ── 4. GITHUB / LINKEDIN EMBEDDABLE BADGE WIDGET ── */}
      <div className="border-t border-[#E2E8F0] pt-6">
        <DoerBadge 
          variant="markdown" 
          username={doer.username || doer.id} 
          name={doer.full_name} 
        />
      </div>

      {/* ── 5. FEATURED PROJECTS SECTION ── */}
      <div className="flex flex-col gap-6 border-t border-[#E2E8F0] pt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
            Case Studies by {doer.full_name} ({publishedProjects.length})
          </h3>
        </div>

        {publishedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {publishedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} authorId={doer.username || doer.id} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-[#CBD5E1] p-10 text-center flex flex-col items-center gap-3">
            <FolderKanban size={32} className="text-[#4F46E5]" />
            <h4 className="text-base font-bold text-[#0F172A]">No published projects yet</h4>
            <p className="text-xs text-[#64748B] max-w-sm">
              This student has not published any engineering case studies yet.
            </p>
          </div>
        )}
      </div>

    </div>
  )
}
