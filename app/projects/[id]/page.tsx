import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Code2, FileText, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import ProjectCard from '@/components/projects/ProjectCard';
import { MOCK_PROJECTS, MOCK_DOERS } from '@/lib/mockData';
import { MOCK_ADMIN_PROJECTS } from '@/lib/adminData';

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
  const from = resolvedSearchParams.from;

  // In a real app, fetch the project by ID. Here we use mock data.
  const project = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0];
  const doer = MOCK_DOERS.find(d => d.id === project.doer_id) || MOCK_DOERS[0];
  const moreProjects = MOCK_PROJECTS.filter(p => p.id !== project.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          {from === 'dashboard' ? (
            <Link href="/dashboard/projects" className="inline-flex items-center text-sm font-medium text-[#6B7280] hover:text-[#111827]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to My Dashboard Projects
            </Link>
          ) : (
            <Link href={`/doers/${doer.username || doer.id}`} className="inline-flex items-center text-sm font-medium text-[#6B7280] hover:text-[#111827]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {doer.full_name}&apos;s Profile
            </Link>
          )}
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge label={project.category} className="text-[#4F46E5] bg-[#EEF2FF] text-xs font-bold uppercase tracking-wider" />
            <Badge label="EDUCATION / EDTECH" className="text-[#6B7280] bg-white border border-[#E5E7EB] text-xs font-bold uppercase tracking-wider" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">{project.title}</h1>
          <p className="text-xl text-[#6B7280] max-w-3xl mb-8">{project.description}</p>
          
          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-[#E5E7EB]">
            <div className="flex items-center">
              <Avatar name={doer.full_name} imageUrl={doer.avatar_url} size="md" className="mr-4" />
              <div>
                <p className="text-sm text-[#6B7280]">Built by</p>
                <p className="font-bold text-[#111827]">{doer.full_name}</p>
              </div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-[#E5E7EB]"></div>
            <div>
              <p className="text-sm font-medium text-[#111827]">Computer Science, Year 3</p>
            </div>
            <div className="flex-1"></div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button className="bg-[#111827] hover:bg-gray-800 text-white flex-1 sm:flex-none">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live Demo
              </Button>
              <Button variant="outline" className="border-[#E5E7EB] text-[#111827] flex-1 sm:flex-none">
                <Code2 className="w-4 h-4 mr-2" />
                View GitHub
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Column */}
          <div className="lg:w-2/3">
            <div className="aspect-video bg-[#111827] rounded-2xl mb-12 flex items-center justify-center text-white overflow-hidden relative">
               {/* Architecture diagram banner placeholder */}
               <div className="absolute inset-0 bg-gradient-to-tr from-[#3730A3] to-[#4F46E5] opacity-20"></div>
               <div className="relative z-10 flex flex-col items-center">
                 <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm mb-4">
                   <div className="w-8 h-8 text-white">⬡</div>
                 </div>
                 <p className="font-bold tracking-widest text-white/50 uppercase text-sm">System Architecture</p>
               </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">The Problem</h2>
              <div className="prose prose-lg text-[#4B5563] max-w-none">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Current State</h2>
              <div className="prose prose-lg text-[#4B5563] max-w-none">
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Process</h2>
              <div className="space-y-6">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold flex items-center justify-center mt-1">
                      {step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#111827] mb-2">Step {step} Title</h3>
                      <p className="text-[#4B5563]">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Desired State</h2>
              <div className="prose prose-lg text-[#4B5563] max-w-none">
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">The Solution</h2>
              <div className="prose prose-lg text-[#4B5563] max-w-none mb-6">
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
              </div>
              <div className="aspect-video bg-[#E5E7EB] rounded-2xl flex items-center justify-center text-[#9CA3AF]">
                App Screenshot Placeholder
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Project Screenshots</h2>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-[4/3] bg-[#E5E7EB] rounded-xl flex items-center justify-center text-[#9CA3AF]">
                    Screenshot {i}
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">The Result</h2>
              <div className="prose prose-lg text-[#4B5563] max-w-none mb-8">
                <p>
                  Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                </p>
              </div>
              <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-8 flex items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <TrendingUp className="w-8 h-8 text-[#4F46E5]" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#4F46E5] mb-1">40%</div>
                  <div className="text-lg font-medium text-[#3730A3]">Reduction in processing time</div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Category</h3>
                    <p className="font-medium text-[#111827]">{project.category}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Market</h3>
                    <p className="font-medium text-[#111827]">Education / EdTech</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Technologies &amp; Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-[#F3F4F6] text-[#4B5563] text-sm font-medium rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">Project Resources</h3>
                    <div className="space-y-3">
                      <a href="#" className="flex items-center text-[#4F46E5] hover:text-[#3730A3] font-medium group">
                        <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] group-hover:bg-[#E0E7FF] flex items-center justify-center mr-3 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        Live Demo
                      </a>
                      <a href="#" className="flex items-center text-[#4F46E5] hover:text-[#3730A3] font-medium group">
                        <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] group-hover:bg-[#E0E7FF] flex items-center justify-center mr-3 transition-colors">
                          <Code2 className="w-4 h-4" />
                        </div>
                        GitHub Repository
                      </a>
                      <a href="#" className="flex items-center text-[#4F46E5] hover:text-[#3730A3] font-medium group">
                        <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] group-hover:bg-[#E0E7FF] flex items-center justify-center mr-3 transition-colors">
                          <FileText className="w-4 h-4" />
                        </div>
                        Documentation
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 text-center">
                <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-6 text-left">About the Student</h3>
                <Avatar name={doer.full_name} imageUrl={doer.avatar_url} size="lg" className="w-24 h-24 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-[#111827] mb-1">{doer.full_name}</h4>
                <p className="text-sm font-medium text-[#4F46E5] mb-4">{doer.program} · {doer.year}</p>
                <p className="text-sm text-[#6B7280] mb-6">
                  {doer.bio}
                </p>
                <Link href={`/doers/${doer.username || doer.id}`}>
                  <Button variant="outline" className="w-full border-[#E5E7EB] text-[#111827]">
                    View Full Portfolio
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* More Projects Section */}
        <div className="mt-20 pt-16 border-t border-[#E5E7EB]">
          <h2 className="text-2xl font-bold text-[#111827] mb-8">More from {doer.full_name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
