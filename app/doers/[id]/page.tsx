import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MOCK_DOERS, MOCK_PROJECTS } from '@/lib/mockData'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProjectCard from '@/components/projects/ProjectCard'
import { ArrowLeft, Globe, Code2, Share2, Edit3 } from 'lucide-react'

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
    <div className="max-w-5xl mx-auto px-6 py-10 w-full flex flex-col gap-10">
      {/* Dynamic Top Bar: Contextual Back Link & Edit Portfolio Button if coming from workspace */}
      <div className="flex items-center justify-between">
        <div>
          {fromDashboard ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors bg-[#EEF2FF] px-3 py-1.5 rounded-lg"
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

        {/* When user is viewing their own portfolio from dashboard */}
        {fromDashboard && (
          <Link href="/dashboard/profile">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
              <Edit3 size={14} /> Edit Portfolio
            </Button>
          </Link>
        )}
      </div>

      {/* Profile Header Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col items-center text-center shadow-sm relative">
        <Avatar name={doer.full_name} imageUrl={doer.avatar_url} size="lg" className="w-24 h-24 text-2xl mb-4" />

        <h1 className="text-3xl font-bold text-[#111827]">{doer.full_name}</h1>
        <p className="text-base text-[#6B7280] mt-1 font-medium">
          {doer.program} {doer.year ? `· ${doer.year}` : ''}
        </p>

        {doer.bio && (
          <p className="max-w-xl text-sm text-[#4B5563] mt-3 leading-relaxed">
            {doer.bio}
          </p>
        )}

        {/* Social / External links */}
        <div className="flex items-center gap-6 mt-6 flex-wrap justify-center text-sm font-medium text-[#4F46E5]">
          {doer.portfolio_url && (
            <a
              href={doer.portfolio_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#3730A3] transition-colors"
            >
              <Globe size={16} /> Portfolio
            </a>
          )}
          {doer.github_url && (
            <a
              href={doer.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#3730A3] transition-colors"
            >
              <Code2 size={16} /> GitHub
            </a>
          )}
          {doer.linkedin_url && (
            <a
              href={doer.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#3730A3] transition-colors"
            >
              <Share2 size={16} /> LinkedIn
            </a>
          )}
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 divide-x divide-[#E5E7EB] w-full max-w-sm border border-[#E5E7EB] rounded-xl mt-8 py-3 bg-[#FAFAFA]">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#4F46E5]">{MOCK_PROJECTS.length}</span>
            <span className="text-xs text-[#6B7280]">Projects</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#4F46E5]">{doer.skills.length}</span>
            <span className="text-xs text-[#6B7280]">Skills</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-[#111827] mb-4">About</h2>
        <p className="text-sm text-[#4B5563] leading-relaxed">
          I&apos;m a passionate computer science student with a focus on practical applications of emerging technologies.
          My academic journey has been driven by a curiosity to understand not just how systems work, but how they can be
          optimized to solve real-world problems.
        </p>
        <p className="text-sm text-[#4B5563] leading-relaxed mt-3">
          Beyond coursework, I actively participate in hackathons and open-source contributions. I believe in writing clean,
          maintainable code and am always eager to learn new frameworks and methodologies to improve my development workflow.
        </p>
      </div>

      {/* Skills Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-[#111827] mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {doer.skills.map((s) => (
            <Badge
              key={s.name}
              label={s.name}
              className="text-sm px-4 py-1.5 bg-[#F3F4F6] text-[#1F2937]"
            />
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <h2 className="text-2xl font-bold text-[#111827] mb-6">
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
