import React from 'react';
import Link from 'next/link';
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
  Image as ImageIcon 
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import ProjectCard from '@/components/projects/ProjectCard';
import { MOCK_PROJECTS, MOCK_DOERS } from '@/lib/mockData';

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

  // Fetch project & author from mockData
  const project = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0];
  const doer = MOCK_DOERS.find(d => d.id === project.doer_id || d.username === fromProfile || d.id === fromProfile) || MOCK_DOERS[0];
  const moreProjects = MOCK_PROJECTS.filter(p => p.id !== project.id).slice(0, 3);

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

        {/* ── 2. PROJECT HEADER (Title, Category, Description, Author Meta, PDF Download) ── */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 lg:p-10 shadow-xs mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <Badge 
              label={project.category} 
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

            {/* Quick CTAs + Download PDF */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* PDF Document Download Button */}
              <a 
                href={`#`} 
                onClick={undefined}
                download={`${project.title.toLowerCase().replace(/\s+/g, '-')}-documentation.pdf`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] border border-[#C7D2FE] rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
                title="Download Project Case Study Documentation (PDF)"
              >
                <Download size={15} /> Download PDF
              </a>

              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none">
                  <Button variant="primary" size="md" className="w-full gap-2 font-bold shadow-xs">
                    <ExternalLink size={15} /> View Live Demo
                  </Button>
                </a>
              )}
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none">
                  <Button variant="outline" size="md" className="w-full gap-2 font-bold">
                    <Code2 size={15} /> View GitHub
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── 3. MAIN CASE STUDY CONTENT + SIDEBAR ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Case Study Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Visual Cover / System Architecture Banner */}
            <div className="aspect-video bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#312E81] rounded-3xl p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-sm border border-[#E2E8F0]">
              <div className="absolute inset-0 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  Technical Architecture
                </span>
                <span className="text-xs text-white/60 font-mono">theDoers Verified</span>
              </div>

              <div className="relative z-10 text-center py-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-3 text-white border border-white/20">
                  <Layers size={28} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">{project.title}</h3>
                <p className="text-xs text-white/70 mt-1">{project.category}</p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] text-white/60 pt-4 border-t border-white/10">
                <span>Production Architecture</span>
                <span>{project.tags.slice(0, 3).join(' • ')}</span>
              </div>
            </div>

            {/* 1. The Problem */}
            {project.problem && (
              <section className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4 text-[#EF4444]">
                  <AlertCircle size={22} />
                  <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">The Problem</h2>
                </div>
                <div className="text-sm sm:text-base text-[#334155] leading-relaxed">
                  <p>{project.problem}</p>
                </div>

                {project.current_state && (
                  <div className="mt-6 p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                      Current State &amp; Inefficiencies
                    </h4>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {project.current_state}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* 2. Process / Engineering Steps */}
            {project.process && project.process.length > 0 && (
              <section className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs">
                <div className="flex items-center gap-2.5 mb-6 text-[#4F46E5]">
                  <Layers size={22} />
                  <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Engineering Process</h2>
                </div>
                
                <div className="space-y-6">
                  {project.process.map((step) => (
                    <div key={step.step} className="flex gap-4 items-start p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#4F46E5] font-extrabold text-sm flex items-center justify-center border border-[#C7D2FE]">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-[#0F172A] mb-1">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. The Solution */}
            {project.solution && (
              <section className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4 text-[#10B981]">
                  <CheckCircle2 size={22} />
                  <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">The Solution</h2>
                </div>
                <div className="text-sm sm:text-base text-[#334155] leading-relaxed mb-6">
                  <p>{project.solution}</p>
                </div>

                {project.desired_state && (
                  <div className="p-5 bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#059669] mb-1.5">
                      Target Outcome Achieved
                    </h4>
                    <p className="text-xs sm:text-sm text-[#065F46] leading-relaxed">
                      {project.desired_state}
                    </p>
                  </div>
                )}

                {/* Solution Preview Frame */}
                <div className="w-full h-64 bg-[#EEF2FF] rounded-2xl border border-[#E0E7FF] flex flex-col items-center justify-center text-[#4F46E5]/40 gap-2">
                  <ImageIcon size={48} />
                  <span className="text-xs font-bold tracking-wider uppercase text-[#4F46E5]">Solution Interactive Showcase</span>
                </div>
              </section>
            )}

            {/* 4. Results & Key Impact Metric */}
            {project.result && (
              <section className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4 text-[#4F46E5]">
                  <Sparkles size={22} />
                  <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">The Result &amp; Impact</h2>
                </div>
                <div className="text-sm sm:text-base text-[#334155] leading-relaxed mb-6">
                  <p>{project.result}</p>
                </div>

                {project.key_metric && (
                  <div className="bg-gradient-to-r from-[#EEF2FF] to-[#F5F3FF] border border-[#C7D2FE] rounded-2xl p-6 flex items-center gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xs border border-[#E0E7FF] text-[#4F46E5]">
                      <TrendingUp size={28} />
                    </div>
                    <div>
                      <div className="text-3xl font-extrabold text-[#4F46E5] tracking-tight">
                        {project.key_metric.value}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#3730A3] mt-0.5">
                        {project.key_metric.description}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

          </div>

          {/* Right Sidebar Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Project Specs Card */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5">Category</h3>
                <p className="font-bold text-sm text-[#0F172A]">{project.category}</p>
              </div>

              {project.market && (
                <div>
                  <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5">Market / Space</h3>
                  <p className="font-bold text-sm text-[#0F172A]">{project.market}</p>
                </div>
              )}

              <div>
                <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2.5">Technologies &amp; Stack</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      label={tag} 
                      className="bg-[#F1F5F9] text-[#334155] text-xs font-medium px-2.5 py-1 rounded-lg border border-[#E2E8F0]" 
                    />
                  ))}
                </div>
              </div>

              {/* Project Resources with PDF download */}
              <div>
                <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">Project Resources</h3>
                <div className="space-y-2">
                  <a 
                    href={`#`} 
                    className="flex items-center text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] p-2 rounded-xl hover:bg-[#EEF2FF] transition-colors group"
                  >
                    <Download size={14} className="mr-2.5 text-[#4F46E5]" /> Download Case Study PDF
                  </a>
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] p-2 rounded-xl hover:bg-[#EEF2FF] transition-colors group">
                      <ExternalLink size={14} className="mr-2.5 text-[#4F46E5]" /> Live Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] p-2 rounded-xl hover:bg-[#EEF2FF] transition-colors group">
                      <Code2 size={14} className="mr-2.5 text-[#4F46E5]" /> GitHub Repository
                    </a>
                  )}
                  {project.doc_url && (
                    <a href={project.doc_url} target="_blank" rel="noreferrer" className="flex items-center text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] p-2 rounded-xl hover:bg-[#EEF2FF] transition-colors group">
                      <FileText size={14} className="mr-2.5 text-[#4F46E5]" /> Project Documentation
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* About Student Card */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs text-center flex flex-col items-center">
              <Avatar name={doer.full_name} imageUrl={doer.avatar_url} size="lg" className="w-20 h-20 shadow-xs mb-3" />
              <h4 className="text-lg font-bold text-[#0F172A]">{doer.full_name}</h4>
              <p className="text-xs font-bold text-[#4F46E5] mt-0.5">{doer.program} · {doer.year}</p>
              
              <p className="text-xs text-[#64748B] my-4 line-clamp-3 leading-relaxed">
                {doer.bio}
              </p>
              
              <Link href={`/doers/${doer.username || doer.id}`} className="w-full">
                <Button variant="outline" size="sm" className="w-full font-bold text-xs py-2">
                  View Full Portfolio ↗
                </Button>
              </Link>
            </div>

          </div>

        </div>

        {/* ── 4. MORE PROJECTS FROM THE SAME DOER (3-Column Grid) ── */}
        <div className="mt-20 pt-12 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                More from {doer.full_name}
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">Explore additional engineering case studies by this student.</p>
            </div>
            <Link 
              href={`/doers/${doer.username || doer.id}`}
              className="text-xs font-bold text-[#4F46E5] hover:underline"
            >
              View all ({MOCK_PROJECTS.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreProjects.map((p) => (
              <ProjectCard key={p.id} project={p} authorId={doer.username || doer.id} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
