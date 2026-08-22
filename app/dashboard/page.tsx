'use client'

import { useState } from 'react'
import { MOCK_DOERS, MOCK_PROJECTS, MOCK_SKILLS } from '@/lib/mockData'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProjectCard from '@/components/projects/ProjectCard'
import {
  User,
  Plus,
  Trash2,
  Check,
  Eye,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Search,
  Globe,
  Share2,
  Code2,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

export default function DoerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'create_project' | 'profile' | 'settings'>('overview')
  const [projectFilter, setProjectFilter] = useState<'all' | 'published' | 'drafts'>('all')
  const [projectSearch, setProjectSearch] = useState('')
  const [projects, setProjects] = useState(
    MOCK_PROJECTS.map((p, idx) => ({
      ...p,
      status: idx % 2 === 0 ? 'Published' : 'Draft',
      market: 'Global EdTech',
      problem: 'Inefficient study sessions with scattered learning materials across formats.',
      current_state: 'Disjointed notes without semantic tags.',
      process: '1. User research, 2. NLP pipeline prototype, 3. Next.js app, 4. Beta test.',
      desired_state: 'Centralized smart concept extraction.',
      result: '40% reduction in preparation time.'
    }))
  )
  const currentDoer = MOCK_DOERS[0] // Alex Chen

  // ── 4-STEP CREATE PROJECT WIZARD STATES ──
  const [createStep, setCreateStep] = useState(1)
  const [projName, setProjName] = useState('')
  const [projDesc, setProjDesc] = useState('')
  const [projCategory, setProjCategory] = useState('AI / Machine Learning')
  const [projMarket, setProjMarket] = useState('EdTech & Education')

  // Step 2: Story
  const [projProblem, setProjProblem] = useState('')
  const [projCurrentState, setProjCurrentState] = useState('')
  const [projProcess, setProjProcess] = useState('')
  const [projDesiredState, setProjDesiredState] = useState('')
  const [projResult, setProjResult] = useState('')

  // Step 3: Visuals & Resources
  const [projSkills, setProjSkills] = useState('Python, React, NLP')
  const [projLiveUrl, setProjLiveUrl] = useState('')
  const [projGithubUrl, setProjGithubUrl] = useState('')

  const handleFinishCreateProject = (status: 'Published' | 'Draft') => {
    const newProject = {
      id: `p-${Date.now()}`,
      doer_id: currentDoer.id,
      title: projName || 'Untitled Innovation Project',
      category: projCategory,
      description: projDesc || 'Innovative software solution solving community and student challenges.',
      tags: projSkills.split(',').map((t) => t.trim()).filter(Boolean),
      created_at: new Date().toISOString(),
      live_url: projLiveUrl || undefined,
      github_url: projGithubUrl || undefined,
      status: status,
      market: projMarket,
      problem: projProblem,
      current_state: projCurrentState,
      process: projProcess,
      desired_state: projDesiredState,
      result: projResult
    }

    setProjects([newProject, ...projects])
    setActiveTab('projects')
    setCreateStep(1)
    // Reset inputs
    setProjName('')
    setProjDesc('')
    setProjProblem('')
    setProjLiveUrl('')
    setProjGithubUrl('')
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  // Filtered projects list in "My Projects" tab
  const displayedProjects = projects.filter((p) => {
    const matchesFilter =
      projectFilter === 'all'
        ? true
        : projectFilter === 'published'
        ? p.status === 'Published'
        : p.status === 'Draft'

    const matchesSearch =
      projectSearch === '' ||
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(projectSearch.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col md:flex-row gap-8">
      {/* ── LEFT SIDEBAR NAVIGATION ── */}
      <aside className="w-full md:w-64 flex flex-col gap-3 shrink-0">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
          <Avatar name={currentDoer.full_name} size="lg" className="w-16 h-16 text-lg mb-2" />
          <h3 className="font-bold text-[#111827] text-base">{currentDoer.full_name}</h3>
          <span className="text-xs text-[#6B7280]">{currentDoer.program}</span>

          <div className="mt-2.5 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DEF7EC] text-[#03543F]">
            ✓ Approved Doer
          </div>

          <Link href={`/doers/${currentDoer.username || currentDoer.id}?from=dashboard`} className="mt-4 w-full">
            <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
              <Eye size={14} /> View My Public Profile
            </Button>
          </Link>
        </div>

        {/* Clean Sidebar Nav buttons without emoji icons */}
        <nav className="bg-white border border-[#E5E7EB] rounded-2xl p-2.5 flex flex-col gap-1 shadow-sm text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#4F46E5] text-white'
                : 'text-[#4B5563] hover:bg-[#F3F4F6]'
            }`}
          >
            Dashboard Overview
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#4F46E5] text-white'
                : 'text-[#4B5563] hover:bg-[#F3F4F6]'
            }`}
          >
            <span>My Projects</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'projects' ? 'bg-white/20 text-white' : 'bg-[#F3F4F6] text-[#374151]'}`}>
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('create_project'); setCreateStep(1); }}
            className={`text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'create_project'
                ? 'bg-[#4F46E5] text-white'
                : 'text-[#4F46E5] bg-[#EEF2FF] hover:bg-[#E0E7FF]'
            }`}
          >
            Create New Project
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#4F46E5] text-white'
                : 'text-[#4B5563] hover:bg-[#F3F4F6]'
            }`}
          >
            Edit Profile
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#4F46E5] text-white'
                : 'text-[#4B5563] hover:bg-[#F3F4F6]'
            }`}
          >
            Account &amp; Settings
          </button>
        </nav>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1">
        {/* 1. DASHBOARD OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#111827]">Welcome back, {currentDoer.full_name}!</h1>
                <p className="text-xs text-[#6B7280]">Manage your student portfolio and projects.</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => { setActiveTab('create_project'); setCreateStep(1); }}
                className="gap-1.5"
              >
                <Plus size={16} /> Create Project
              </Button>
            </div>

            {/* Profile Completion Bar (Frame 12) */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#111827]">Profile Completion</span>
                <span className="font-extrabold text-[#4F46E5]">85%</span>
              </div>
              <div className="w-full bg-[#F3F4F6] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#4F46E5] h-full w-[85%]" />
              </div>
              <p className="text-[11px] text-[#6B7280] mt-2">
                Add 1 more project story to reach 100% profile optimization.
              </p>
            </div>

            {/* Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
                <span className="text-xs font-semibold text-[#6B7280] uppercase">Total Projects</span>
                <p className="text-3xl font-extrabold text-[#111827] mt-2">{projects.length}</p>
                <span className="text-xs text-[#4F46E5] font-medium mt-1 inline-block">
                  {projects.filter(p => p.status === 'Published').length} Published · {projects.filter(p => p.status === 'Draft').length} Drafts
                </span>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
                <span className="text-xs font-semibold text-[#6B7280] uppercase">Skills Tagged</span>
                <p className="text-3xl font-extrabold text-[#111827] mt-2">{currentDoer.skills.length}</p>
                <span className="text-xs text-[#6B7280] mt-1 inline-block">Verified on profile</span>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
                <span className="text-xs font-semibold text-[#6B7280] uppercase">Profile Status</span>
                <p className="text-lg font-bold text-[#059669] mt-3 flex items-center gap-1.5">
                  <Check size={18} /> Publicly Active
                </p>
                <span className="text-xs text-[#6B7280] mt-1 inline-block">Appears in search</span>
              </div>
            </div>

            {/* Recent Projects Table on Overview */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#111827]">Recent Projects</h3>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-xs font-semibold text-[#4F46E5] hover:underline"
                >
                  Manage All Projects →
                </button>
              </div>

              <div className="divide-y divide-[#F3F4F6]">
                {projects.slice(0, 3).map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#111827]">{p.title}</h4>
                      <p className="text-xs text-[#6B7280]">{p.category} · Status: <span className="font-semibold text-[#4F46E5]">{p.status}</span></p>
                    </div>
                    <Link href={`/projects/${p.id}?from=dashboard`}>
                      <Button variant="ghost" size="sm">View Public</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. MY PROJECTS (With All / Published / Drafts tabs & Search) */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#111827]">My Projects</h1>
                <p className="text-xs text-[#6B7280]">Manage your published and draft projects.</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => { setActiveTab('create_project'); setCreateStep(1); }}
                className="gap-1.5"
              >
                <Plus size={16} /> Create Project
              </Button>
            </div>

            {/* Sub-tabs: All / Published / Drafts + Search bar */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex bg-[#F3F4F6] p-1 rounded-xl w-full sm:w-auto">
                <button
                  onClick={() => setProjectFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    projectFilter === 'all' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'
                  }`}
                >
                  All ({projects.length})
                </button>
                <button
                  onClick={() => setProjectFilter('published')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    projectFilter === 'published' ? 'bg-white text-[#4F46E5] shadow-sm' : 'text-[#6B7280]'
                  }`}
                >
                  Published ({projects.filter(p => p.status === 'Published').length})
                </button>
                <button
                  onClick={() => setProjectFilter('drafts')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    projectFilter === 'drafts' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#6B7280]'
                  }`}
                >
                  Drafts ({projects.filter(p => p.status === 'Draft').length})
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={14} />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Search my projects..."
                  className="w-full pl-8 pr-3 py-1.5 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayedProjects.map((p) => (
                <div key={p.id} className="relative group bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm flex flex-col">
                  {/* Status Banner */}
                  <div className="px-4 py-2 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between text-xs">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'Published'
                          ? 'bg-[#EEF2FF] text-[#4F46E5]'
                          : 'bg-[#F3F4F6] text-[#6B7280]'
                      }`}
                    >
                      ● {p.status}
                    </span>
                    <span className="text-[10px] text-[#9CA3AF]">Market: {p.market}</span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5]">
                      {p.category}
                    </span>
                    <h3 className="font-bold text-[#111827] text-base leading-snug">{p.title}</h3>
                    <p className="text-xs text-[#6B7280] line-clamp-3">{p.description}</p>

                    <div className="flex flex-wrap gap-1 mt-auto pt-2">
                      {p.tags.map((t) => (
                        <Badge key={t} label={t} className="text-[10px]" />
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-3 bg-[#F9FAFB] border-t border-[#E5E7EB] flex items-center justify-between">
                    <Link href={`/projects/${p.id}?from=dashboard`} className="text-xs font-bold text-[#4F46E5] hover:underline">
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-1 text-[#EF4444] hover:bg-[#FEE2E2] rounded-md transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. CREATE PROJECT (4-STEP WIZARD matching Frames 15-18) */}
        {createStep > 0 && activeTab === 'create_project' && (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                  CREATE PROJECT — STEP {createStep} OF 4
                </span>
                <span className="text-xs text-[#6B7280]">
                  {createStep === 1 && 'Project Basics'}
                  {createStep === 2 && 'Project Story'}
                  {createStep === 3 && 'Visuals & Resources'}
                  {createStep === 4 && 'Review & Publish'}
                </span>
              </div>
              <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#4F46E5] h-full transition-all duration-300"
                  style={{ width: `${(createStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: BASICS */}
            {createStep === 1 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-[#111827]">Step 1 — Project Basics</h2>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Project Name</label>
                  <input
                    type="text"
                    required
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                    placeholder="e.g. AI-Powered Study Assistant"
                    className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">Category</label>
                    <select
                      value={projCategory}
                      onChange={(e) => setProjCategory(e.target.value)}
                      className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    >
                      <option value="AI / Machine Learning">AI / Machine Learning</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="IoT">IoT</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">Project Market</label>
                    <input
                      type="text"
                      value={projMarket}
                      onChange={(e) => setProjMarket(e.target.value)}
                      placeholder="e.g. EdTech & Education"
                      className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Short Description</label>
                  <textarea
                    rows={3}
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    placeholder="An intelligent application designed to help students..."
                    className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button variant="primary" size="md" onClick={() => setCreateStep(2)}>
                    Next: Project Story <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: PROJECT STORY */}
            {createStep === 2 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-[#111827]">Step 2 — Project Story</h2>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">1. The Problem</label>
                  <textarea
                    rows={2}
                    value={projProblem}
                    onChange={(e) => setProjProblem(e.target.value)}
                    placeholder="What real obstacle or challenge were users facing?"
                    className="w-full px-3.5 py-2 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">2. Current State</label>
                  <textarea
                    rows={2}
                    value={projCurrentState}
                    onChange={(e) => setProjCurrentState(e.target.value)}
                    placeholder="How was this handled before your project?"
                    className="w-full px-3.5 py-2 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">3. Process &amp; Engineering</label>
                  <textarea
                    rows={2}
                    value={projProcess}
                    onChange={(e) => setProjProcess(e.target.value)}
                    placeholder="Research, analysis, prototyping steps, and testing..."
                    className="w-full px-3.5 py-2 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">4. Desired State &amp; Solution</label>
                  <textarea
                    rows={2}
                    value={projDesiredState}
                    onChange={(e) => setProjDesiredState(e.target.value)}
                    placeholder="How does your solution achieve the goal?"
                    className="w-full px-3.5 py-2 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">5. Key Result (Metric)</label>
                  <input
                    type="text"
                    value={projResult}
                    onChange={(e) => setProjResult(e.target.value)}
                    placeholder="e.g. 40% reduction in preparation time"
                    className="w-full px-3.5 py-2 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div className="pt-2 flex justify-between">
                  <Button variant="outline" size="md" onClick={() => setCreateStep(1)}>
                    <ArrowLeft size={16} className="mr-1" /> Back
                  </Button>
                  <Button variant="primary" size="md" onClick={() => setCreateStep(3)}>
                    Next: Visuals &amp; Resources <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: VISUALS & RESOURCES */}
            {createStep === 3 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-[#111827]">Step 3 — Visuals &amp; Resources</h2>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Skills / Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={projSkills}
                    onChange={(e) => setProjSkills(e.target.value)}
                    placeholder="Python, React, NLP, PyTorch"
                    className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">Live Demo URL</label>
                    <input
                      type="url"
                      value={projLiveUrl}
                      onChange={(e) => setProjLiveUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">GitHub Repository</label>
                    <input
                      type="url"
                      value={projGithubUrl}
                      onChange={(e) => setProjGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <Button variant="outline" size="md" onClick={() => setCreateStep(2)}>
                    <ArrowLeft size={16} className="mr-1" /> Back
                  </Button>
                  <Button variant="primary" size="md" onClick={() => setCreateStep(4)}>
                    Next: Review &amp; Publish <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & PUBLISH */}
            {createStep === 4 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold text-[#111827]">Step 4 — Review &amp; Publish</h2>
                  <p className="text-xs text-[#6B7280] mt-1">Review your engineering project details.</p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5 text-xs flex flex-col gap-3">
                  <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                    <span className="text-[#6B7280]">Project Name:</span>
                    <span className="font-bold text-[#111827]">{projName || 'AI-Powered Study Assistant'}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                    <span className="text-[#6B7280]">Category &amp; Market:</span>
                    <span className="font-bold text-[#4F46E5]">{projCategory} · {projMarket}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                    <span className="text-[#6B7280]">Technologies:</span>
                    <span className="font-bold text-[#111827]">{projSkills}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Case Study Summary:</span>
                    <span className="font-bold text-[#111827]">{projResult || '40% reduction in preparation time'}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-between">
                  <Button variant="outline" size="md" onClick={() => setCreateStep(3)}>
                    <ArrowLeft size={16} className="mr-1" /> Edit
                  </Button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleFinishCreateProject('Draft')}
                      className="px-4 py-2 border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] text-[#111827] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Save as Draft
                    </button>
                    <Button variant="primary" size="md" onClick={() => handleFinishCreateProject('Published')}>
                      Publish to Profile
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. MY PROFILE (Personal, Academic, About, Skills, Social Links) */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-[#111827]">Edit Profile</h2>
              <p className="text-xs text-[#6B7280]">Update your personal, academic, and portfolio links.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Full Name</label>
                <input
                  type="text"
                  defaultValue={currentDoer.full_name}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Program</label>
                  <input
                    type="text"
                    defaultValue={currentDoer.program}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Year of Study</label>
                  <input
                    type="text"
                    defaultValue={currentDoer.year}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">About Bio</label>
                <textarea
                  rows={3}
                  defaultValue={currentDoer.bio}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Portfolio Link</label>
                  <input
                    type="url"
                    defaultValue={currentDoer.portfolio_url}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">GitHub URL</label>
                  <input
                    type="url"
                    defaultValue={currentDoer.github_url}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">LinkedIn URL</label>
                  <input
                    type="url"
                    defaultValue={currentDoer.linkedin_url}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="primary" size="md">Save Profile Changes</Button>
              </div>
            </div>
          </div>
        )}

        {/* 5. ACCOUNT / SETTINGS (Account Info, Password, Actions) */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-[#111827]">Account &amp; Security Settings</h2>
              <p className="text-xs text-[#6B7280]">Manage your login email, credentials, and notifications.</p>
            </div>

            <div className="flex flex-col gap-5 text-xs">
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">Account Email</label>
                <input
                  type="email"
                  defaultValue="alex.chen@university.edu"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#374151] mb-1.5">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#374151] mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button variant="primary" size="sm">Update Password</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
