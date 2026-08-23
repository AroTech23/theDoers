import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  ExternalLink, 
  Code2, 
  FileText, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Sparkles,
  Image as ImageIcon,
  LayoutGrid,
  Maximize2
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import ProjectCard from '@/components/projects/ProjectCard';
import { createClient } from '@/lib/supabase/server';
import { MOCK_PROJECTS } from '@/lib/mockData';

export default async function ProjectDetailsPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const id = resolvedParams.id;
  const from = resolvedSearchParams?.from;
  const fromProfile = resolvedSearchParams?.fromProfile;

  const supabase = await createClient();

  // 1. Fetch live Project from Supabase
  const { data: dbProject } = await supabase
    .from('projects')
    .select('*, doer:users(*)')
    .eq('id', id)
    .maybeSingle();

  // Fallback to mockData if id is from mock data (e.g. p1, p2, etc.)
  const mockFallback = MOCK_PROJECTS.find(p => p.id === id);

  const project = dbProject || (mockFallback ? {
    ...mockFallback,
    doer: {
      id: mockFallback.doer_id,
      full_name: 'Alex Chen',
      username: 'alexchen',
      program: 'Computer Science',
      year: 'Year 3',
      bio: 'Software Engineering student interested in AI and distributed systems.',
      avatar_url: null
    }
  } : null);

  if (!project) {
    return notFound();
  }

  const doer = project.doer || {
    id: project.doer_id,
    full_name: 'Student Engineer',
    username: 'doer',
    program: 'Engineering',
    year: 'Year 3',
    bio: 'Ethical IT Engineer',
    avatar_url: null
  };

  // 2. Fetch more projects by this student
  let moreProjects: any[] = [];
  if (dbProject) {
    const { data: siblingProjects } = await supabase
      .from('projects')
      .select('*')
      .eq('doer_id', project.doer_id)
      .neq('id', project.id)
      .eq('status', 'published')
      .limit(3);
    moreProjects = siblingProjects || [];
  } else {
    moreProjects = MOCK_PROJECTS.filter(p => p.id !== project.id).slice(0, 3);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-6">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
        
        {/* ── 1. RELIABLE BACK NAVIGATION ── */}
        <div className="mb-6">
          {from === 'dashboard' ? (
            <Link 
              href="/dashboard/projects" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors bg-white border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl shadow-2xs"
            >
              <ArrowLeft size={14} /> Back to My Dashboard Projects
            </Link>
          ) : (
            <Link 
              href={`/doers/${fromProfile || doer.username || doer.id}`} 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors bg-[#EEF2FF] px-3.5 py-1.5 rounded-xl shadow-2xs"
            >
              <ArrowLeft size={14} /> Back to {doer.full_name}&apos;s Profile
            </Link>
          )}
        </div>

        {/* ── 2. PROJECT HEADER (Title, Category, Description, Author Meta) ── */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 lg:p-10 shadow-xs mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <Badge 
              label={project.category || 'General Engineering'} 
              className="text-[#4F46E5] bg-[#EEF2FF] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg" 
            />
            {project.market && (
              <Badge 
                label={project.market} 
                className="text-[#334155] bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg" 
              />
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4 leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#64748B] max-w-4xl leading-relaxed mb-8">
            {project.description}
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[#F1F5F9]">
            {/* Author */}
            <div className="flex items-center gap-4">
              <Link href={`/doers/${doer.username || doer.id}`} className="hover:opacity-85 transition-opacity">
                <Avatar name={doer.full_name} imageUrl={doer.avatar_url} size="md" className="w-12 h-12 shadow-2xs" />
              </Link>
              <div>
                <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Built by</p>
                <Link href={`/doers/${doer.username || doer.id}`} className="font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors text-base">
                  {doer.full_name}
                </Link>
                <p className="text-xs text-[#64748B] mt-0.5">{doer.program} · {doer.year}</p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3">
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 font-bold text-xs">
                    <Code2 size={15} /> Source Code
                  </Button>
                </a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noreferrer">
                  <Button variant="primary" size="sm" className="gap-2 font-bold text-xs shadow-xs">
                    <ExternalLink size={15} /> Live Interactive Demo
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── 3. TWO-COLUMN BALANCED CASE STUDY LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Problem, Architecture, Process, Solution, Metrics, Screenshots (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Cover Image Banner */}
            {project.image_url && (
              <div className="rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-xs aspect-video bg-slate-100">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Section 1: The Problem */}
            {project.problem && (
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center">
                    <AlertCircle size={18} />
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A]">The Problem</h2>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed whitespace-pre-line">
                  {project.problem}
                </p>

                {(project.current_state || project.desired_state) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#F1F5F9]">
                    {project.current_state && (
                      <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                        <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">Baseline State</span>
                        <p className="text-xs text-[#334155] leading-relaxed">{project.current_state}</p>
                      </div>
                    )}
                    {project.desired_state && (
                      <div className="p-4 rounded-2xl bg-[#EEF2FF] border border-[#C7D2FE]">
                        <span className="text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider block mb-1">Desired Outcome</span>
                        <p className="text-xs text-[#312E81] leading-relaxed">{project.desired_state}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Section 2: Engineering Process Steps */}
            {project.process_steps && project.process_steps.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                    <Layers size={18} />
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Engineering Process &amp; Architecture</h2>
                </div>

                <div className="space-y-4">
                  {project.process_steps.map((step: any, idx: number) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#0F172A] text-white text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h3 className="text-sm font-bold text-[#0F172A]">{step.title}</h3>
                      </div>
                      <p className="text-xs text-[#64748B] leading-relaxed pl-8">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: The Solution */}
            {project.solution && (
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                    <CheckCircle2 size={18} />
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A]">The Solution</h2>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed whitespace-pre-line">
                  {project.solution}
                </p>
              </div>
            )}

            {/* Section 4: Key Results & Quantified Impact */}
            {(project.result || project.key_metric) && (
              <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-3xl p-8 shadow-md">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp size={20} className="text-[#10B981]" />
                  <h2 className="text-xl font-bold text-white">Results &amp; Impact</h2>
                </div>

                {project.key_metric && (
                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="text-4xl sm:text-5xl font-extrabold text-[#10B981] tracking-tight">
                      {project.key_metric.value}
                    </div>
                    <div className="text-sm text-[#E2E8F0] font-medium leading-relaxed">
                      {project.key_metric.label || project.key_metric.description}
                    </div>
                  </div>
                )}

                {project.result && (
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                    {project.result}
                  </p>
                )}
              </div>
            )}

            {/* Section 5: Project Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF5FF] text-[#9333EA] flex items-center justify-center">
                    <LayoutGrid size={18} />
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Project Gallery &amp; Screenshots</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {project.screenshots.map((img: string, i: number) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-[#E2E8F0] aspect-video bg-slate-100 shadow-2xs hover:shadow-md transition-shadow group">
                      <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Sidebar with Meta & Author Bio (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Tech Stack Card */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Technologies &amp; Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags && project.tags.map((tag: string) => (
                  <Badge 
                    key={tag} 
                    label={tag} 
                    className="bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] font-bold text-xs px-2.5 py-1 rounded-lg" 
                  />
                ))}
              </div>
            </div>

            {/* Deliverables & Links */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                Project Deliverables
              </h3>
              
              {project.github_url && (
                <a 
                  href={project.github_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] hover:bg-[#EEF2FF] hover:border-[#C7D2FE] transition-colors"
                >
                  <span className="flex items-center gap-2"><Code2 size={16} className="text-[#4F46E5]" /> GitHub Repository</span>
                  <ExternalLink size={13} className="text-[#94A3B8]" />
                </a>
              )}

              {project.live_url && (
                <a 
                  href={project.live_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] hover:bg-[#EEF2FF] hover:border-[#C7D2FE] transition-colors"
                >
                  <span className="flex items-center gap-2"><ExternalLink size={16} className="text-[#10B981]" /> Live Demo</span>
                  <ExternalLink size={13} className="text-[#94A3B8]" />
                </a>
              )}

              {project.doc_url && (
                <a 
                  href={project.doc_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] hover:bg-[#EEF2FF] hover:border-[#C7D2FE] transition-colors"
                >
                  <span className="flex items-center gap-2"><FileText size={16} className="text-[#4F46E5]" /> Documentation / PDF</span>
                  <ExternalLink size={13} className="text-[#94A3B8]" />
                </a>
              )}
            </div>

            {/* Author Profile Summary */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                About the Student
              </h3>
              
              <div className="flex items-center gap-3">
                <Avatar name={doer.full_name} imageUrl={doer.avatar_url} size="lg" className="w-14 h-14" />
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm">{doer.full_name}</h4>
                  <p className="text-xs text-[#64748B]">{doer.program} · {doer.year}</p>
                </div>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">
                {doer.bio || doer.headline || 'Software engineering student passionate about building impactful technical solutions.'}
              </p>

              <div className="pt-2">
                <Link href={`/doers/${doer.username || doer.id}`}>
                  <Button variant="outline" size="sm" className="w-full font-bold text-xs">
                    View Full Portfolio ↗
                  </Button>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* ── 4. MORE PROJECTS BY THIS DOER ── */}
        {moreProjects.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#E2E8F0]">
            <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mb-6">
              More from {doer.full_name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {moreProjects.map((p) => (
                <ProjectCard key={p.id} project={p} authorId={doer.username || doer.id} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
