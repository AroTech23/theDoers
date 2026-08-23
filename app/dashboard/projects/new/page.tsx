'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Cloud, 
  Check, 
  Upload, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  X, 
  FileText, 
  Image as ImageIcon, 
  Code2, 
  ExternalLink, 
  Save, 
  Sparkles,
  Layers,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Download
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const STEPS = [
  'Project Basics',
  'Project Story',
  'Visuals & Resources',
  'Review & Publish'
];

export default function CreateProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Basics
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [category, setCategory] = useState('AI / Machine Learning');
  const [market, setMarket] = useState('Education / EdTech');
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript', 'Node.js']);
  const [tagInput, setTagInput] = useState('');
  
  // Step 2: Story
  const [problem, setProblem] = useState('');
  const [currentState, setCurrentState] = useState('');
  const [desiredState, setDesiredState] = useState('');
  const [solution, setSolution] = useState('');
  const [result, setResult] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [metricDesc, setMetricDesc] = useState('');
  const [processSteps, setProcessSteps] = useState([
    { id: 1, title: 'Architecture & System Design', description: 'Defined the system boundaries, data flow, and core technology stack.' }
  ]);
  
  // Step 3: Visuals & Resources
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [hasPdfUploaded, setHasPdfUploaded] = useState(true);
  const [pdfFileName, setPdfFileName] = useState('project-architecture-documentation.pdf');

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() && tags.length < 10) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addProcessStep = () => {
    setProcessSteps([
      ...processSteps, 
      { id: Date.now(), title: '', description: '' }
    ]);
  };

  const removeProcessStep = (id: number) => {
    if (processSteps.length > 1) {
      setProcessSteps(processSteps.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28 pt-6">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        {/* Header & Status */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard/projects" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors bg-white border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl shadow-2xs">
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#64748B] bg-white border border-[#E2E8F0] px-3 py-1.5 rounded-xl shadow-2xs">
            <Cloud size={14} className="text-[#4F46E5]" />
            <span>Draft · Saved automatically</span>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Create Project Case Study</h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">Structure your project story, engineering process, and verifiable deliverables.</p>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute left-0 top-1/2 w-full h-0.5 bg-[#E2E8F0] -z-10 transform -translate-y-1/2" />
          {STEPS.map((step, index) => {
            const stepNum = index + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <div key={stepNum} className="flex flex-col items-center bg-[#F8FAFC] px-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold mb-1.5 transition-all shadow-2xs ${
                  isActive ? 'bg-[#4F46E5] text-white ring-4 ring-[#EEF2FF]' : 
                  isCompleted ? 'bg-[#0F172A] text-white' : 
                  'bg-white border border-[#CBD5E1] text-[#64748B]'
                }`}>
                  {isCompleted ? <Check size={16} /> : stepNum}
                </div>
                <span className={`text-xs font-semibold ${isActive ? 'text-[#4F46E5] font-bold' : isCompleted ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── STEP 1: PROJECT BASICS ── */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-xs space-y-6">
            <div className="border-b border-[#F1F5F9] pb-4">
              <h2 className="text-xl font-bold text-[#0F172A]">1. Project Basics</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Start with a strong title, category, and descriptive summary.</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Project Title *</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AI-Powered Study Assistant" 
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                />
                <p className="text-[11px] text-[#64748B] mt-1">Keep it short, clear, and descriptive.</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">Short Description *</label>
                  <span className="text-[11px] text-[#64748B]">{shortDescription.length}/160</span>
                </div>
                <textarea 
                  rows={3} 
                  maxLength={160}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="A one or two sentence overview of what this project does and why it matters..." 
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                ></textarea>
                <p className="text-[11px] text-[#64748B] mt-0.5">This appears on project cards across the platform and home page.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Category *</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
                  >
                    <option>AI / Machine Learning</option>
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>IoT & Embedded</option>
                    <option>Data Science</option>
                    <option>Cybersecurity</option>
                    <option>UI/UX Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Market / Space *</label>
                  <select 
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
                  >
                    <option>Education / EdTech</option>
                    <option>Smart Home / IoT</option>
                    <option>Finance / FinTech</option>
                    <option>Health / MedTech</option>
                    <option>Transportation / Mobility</option>
                    <option>Environment / Sustainability</option>
                    <option>Business Intelligence</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Skills &amp; Technologies *</label>
                <div className="p-2.5 flex flex-wrap gap-2 rounded-xl border border-[#E2E8F0] focus-within:ring-2 focus-within:ring-[#4F46E5] bg-white">
                  {tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
                      {tag}
                      <button type="button" onClick={() => removeTag(i)} className="ml-1.5 text-[#4F46E5] hover:text-[#3730A3]">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder="Type skill & press Enter (e.g. Python, Docker)"
                    className="flex-1 min-w-[150px] outline-none text-[#0F172A] text-xs py-1"
                  />
                </div>
                <p className="text-[11px] text-[#64748B] mt-1">Add up to 10 tags representing your tech stack.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Project Cover Image *</label>
                <div className="flex justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-8 hover:bg-[#EEF2FF]/40 hover:border-[#4F46E5] transition-all cursor-pointer">
                  <div className="text-center flex flex-col items-center">
                    <Upload className="h-10 w-10 text-[#4F46E5] mb-2" />
                    <span className="text-xs font-bold text-[#4F46E5]">Click to upload project cover image</span>
                    <p className="text-[11px] text-[#64748B] mt-1">JPG, PNG or WEBP · 16:9 recommended · Max 10 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: THE PROJECT STORY (Framework: Problem, Process, Solution, Result) ── */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-xs space-y-6">
            <div className="border-b border-[#F1F5F9] pb-4">
              <h2 className="text-xl font-bold text-[#0F172A]">2. Project Story &amp; Case Study</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Tell the engineering story behind your work so recruiters understand your thought process.</p>
              
              <div className="flex flex-wrap gap-2 text-xs font-bold text-[#64748B] mt-4 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                <span className="text-[#EF4444]">1. Problem</span> → 
                <span>2. Current State</span> → 
                <span className="text-[#4F46E5]">3. Process</span> → 
                <span className="text-[#10B981]">4. Solution</span> → 
                <span className="text-[#7C3AED]">5. Result &amp; Metrics</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#EF4444] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <AlertCircle size={14} /> The Problem *
                </label>
                <textarea 
                  rows={3} 
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Describe the real friction or inefficiency you identified before writing any code..."
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5">
                  Current State &amp; Inefficiencies (Optional)
                </label>
                <textarea 
                  rows={2} 
                  value={currentState}
                  onChange={(e) => setCurrentState(e.target.value)}
                  placeholder="How were people or systems handling this problem previously?"
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                ></textarea>
              </div>

              {/* Engineering Process Steps */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#4F46E5] uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={14} /> Engineering Process (Step by Step) *
                </label>
                <p className="text-[11px] text-[#64748B]">Break down the key implementation stages of your build.</p>

                <div className="space-y-3">
                  {processSteps.map((step, index) => (
                    <div key={step.id} className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] relative space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#4F46E5] uppercase tracking-wider">Step {index + 1}</span>
                        {processSteps.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeProcessStep(step.id)}
                            className="text-[#94A3B8] hover:text-red-600 transition-colors p-1"
                            title="Remove step"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <input 
                        type="text" 
                        value={step.title}
                        onChange={(e) => {
                          const updated = [...processSteps];
                          updated[index].title = e.target.value;
                          setProcessSteps(updated);
                        }}
                        placeholder="Stage title (e.g. Data Pipeline & Embedding Index)" 
                        className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white" 
                      />
                      <textarea 
                        rows={2} 
                        value={step.description}
                        onChange={(e) => {
                          const updated = [...processSteps];
                          updated[index].description = e.target.value;
                          setProcessSteps(updated);
                        }}
                        placeholder="Explain what tools you chose and what was implemented in this stage..." 
                        className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
                      ></textarea>
                    </div>
                  ))}
                </div>

                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs font-bold border-dashed border-[#CBD5E1] text-[#4F46E5] hover:bg-[#EEF2FF]"
                  onClick={addProcessStep}
                >
                  + Add Another Process Step
                </Button>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#10B981] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> The Solution *
                </label>
                <textarea 
                  rows={3} 
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="Focus on what you built, the key architecture decisions, and why it solves the core problem..."
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5">
                  Target Outcome Achieved (Optional)
                </label>
                <textarea 
                  rows={2} 
                  value={desiredState}
                  onChange={(e) => setDesiredState(e.target.value)}
                  placeholder="What was the intended target state once the solution was deployed?"
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7C3AED] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles size={14} /> The Result &amp; Impact
                </label>
                <textarea 
                  rows={2} 
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  placeholder="What were the outcomes, feedback, user test results, or learnings?"
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                ></textarea>
              </div>

              {/* Key Result Metric */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-[#4F46E5]" /> Key Result Metric (Optional)
                </label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={metricValue}
                    onChange={(e) => setMetricValue(e.target.value)}
                    placeholder="Metric Value (e.g. 40%, 28ms, 5K Users)" 
                    className="w-1/3 rounded-xl border border-[#E2E8F0] px-4 py-2 text-xs font-bold text-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                  />
                  <input 
                    type="text" 
                    value={metricDesc}
                    onChange={(e) => setMetricDesc(e.target.value)}
                    placeholder="Metric description (e.g. Reduction in exam prep time)" 
                    className="flex-1 rounded-xl border border-[#E2E8F0] px-4 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: VISUALS, LIVE DEMO, CODE & PDF ATTACHMENT ── */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-xs space-y-6">
            <div className="border-b border-[#F1F5F9] pb-4">
              <h2 className="text-xl font-bold text-[#0F172A]">3. Visuals &amp; Resources</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Add project links, source repositories, screenshots, and downloadable documentation.</p>
            </div>

            <div className="space-y-6">
              {/* Project Links */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">Project Deliverables &amp; Links</label>
                
                <div>
                  <span className="text-[11px] font-bold text-[#64748B] block mb-1">Live Interactive Demo URL</span>
                  <div className="relative">
                    <ExternalLink size={15} className="absolute left-3.5 top-3 text-[#94A3B8]" />
                    <input 
                      type="url" 
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://myproject-demo.com" 
                      className="w-full rounded-xl border border-[#E2E8F0] pl-10 pr-4 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#64748B] block mb-1">GitHub / Code Repository URL</span>
                  <div className="relative">
                    <Code2 size={15} className="absolute left-3.5 top-3 text-[#94A3B8]" />
                    <input 
                      type="url" 
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username/project" 
                      className="w-full rounded-xl border border-[#E2E8F0] pl-10 pr-4 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#64748B] block mb-1">Public Documentation URL (Optional)</span>
                  <div className="relative">
                    <FileText size={15} className="absolute left-3.5 top-3 text-[#94A3B8]" />
                    <input 
                      type="url" 
                      value={docUrl}
                      onChange={(e) => setDocUrl(e.target.value)}
                      placeholder="https://docs.myproject.com" 
                      className="w-full rounded-xl border border-[#E2E8F0] pl-10 pr-4 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                    />
                  </div>
                </div>
              </div>

              {/* Downloadable PDF Documentation Attachment */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Download size={14} className="text-[#4F46E5]" /> Supporting PDF Documentation
                </label>
                <div className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">{pdfFileName}</p>
                      <p className="text-[10px] text-[#64748B]">PDF Document · Generates downloadable case study</p>
                    </div>
                  </div>
                  <label className="text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-[#E2E8F0] shadow-2xs">
                    Replace PDF
                    <input type="file" accept=".pdf" className="sr-only" onChange={(e) => {
                      if (e.target.files?.[0]) setPdfFileName(e.target.files[0].name);
                    }} />
                  </label>
                </div>
                <p className="text-[11px] text-[#64748B] mt-1.5">Enables visitors to click &quot;Download PDF&quot; directly on your public case study page.</p>
              </div>

              {/* Project Screenshots */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">Project Screenshots &amp; Diagrams</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video bg-[#EEF2FF]/60 border border-[#E2E8F0] rounded-xl flex flex-col justify-center items-center text-[#4F46E5]/40 text-xs">
                      <ImageIcon size={22} />
                      <span className="text-[10px] mt-1 font-bold">Screenshot {i}</span>
                    </div>
                  ))}
                  <div className="aspect-video border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] rounded-xl flex flex-col justify-center items-center text-[#64748B] cursor-pointer hover:bg-[#EEF2FF] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all">
                    <Upload size={18} className="mb-1" />
                    <span className="text-[11px] font-bold">Add Screenshot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: REVIEW & PUBLISH ── */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-xs">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] mb-8">
                <CheckCircle2 size={24} className="text-[#059669]" />
                <div>
                  <h3 className="text-sm font-bold text-[#065F46]">Your case study structure is complete &amp; verified!</h3>
                  <p className="text-xs text-[#047857] mt-0.5">All required fields match the public case study display architecture.</p>
                </div>
              </div>

              {/* 3 Summary Review Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-[#E2E8F0] rounded-2xl p-5 bg-[#F8FAFC]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-[#0F172A]">1. Basics</span>
                    <button type="button" className="text-xs font-bold text-[#4F46E5]" onClick={() => setCurrentStep(1)}>✎ Edit</button>
                  </div>
                  <ul className="text-xs text-[#64748B] space-y-1.5">
                    <li><strong className="text-[#0F172A]">Title:</strong> {title || 'AI-Powered Study Assistant'}</li>
                    <li><strong className="text-[#0F172A]">Category:</strong> {category}</li>
                    <li><strong className="text-[#0F172A]">Market:</strong> {market}</li>
                    <li><strong className="text-[#0F172A]">Tags:</strong> {tags.join(', ')}</li>
                  </ul>
                </div>

                <div className="border border-[#E2E8F0] rounded-2xl p-5 bg-[#F8FAFC]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-[#0F172A]">2. Story Framework</span>
                    <button type="button" className="text-xs font-bold text-[#4F46E5]" onClick={() => setCurrentStep(2)}>✎ Edit</button>
                  </div>
                  <ul className="text-xs text-[#64748B] space-y-1.5">
                    <li>Problem &amp; Inefficiencies ✓</li>
                    <li>{processSteps.length} Engineering Steps ✓</li>
                    <li>Solution Architecture ✓</li>
                    <li>Results &amp; Metrics ✓</li>
                  </ul>
                </div>

                <div className="border border-[#E2E8F0] rounded-2xl p-5 bg-[#F8FAFC]">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-[#0F172A]">3. Deliverables</span>
                    <button type="button" className="text-xs font-bold text-[#4F46E5]" onClick={() => setCurrentStep(3)}>✎ Edit</button>
                  </div>
                  <ul className="text-xs text-[#64748B] space-y-1.5">
                    <li>Live Demo URL ✓</li>
                    <li>GitHub Repository ✓</li>
                    <li>Downloadable PDF ✓</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Ready to Publish */}
            <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-3xl p-6 text-center space-y-2">
              <h3 className="text-base font-bold text-[#1E1B4B]">Ready to publish to the network?</h3>
              <p className="text-xs text-[#4338CA] max-w-lg mx-auto">
                Once published, your case study will be visible on your public portfolio (<code className="font-mono text-[#312E81]">/doers/alexchen</code>) and indexed across theDoers directory.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-6 py-4 z-40 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <Button 
              type="button"
              variant="ghost" 
              onClick={handleBack} 
              disabled={currentStep === 1} 
              className={currentStep === 1 ? 'invisible' : 'text-[#64748B]'}
            >
              ← Back
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" className="border-[#E2E8F0] text-[#0F172A] gap-1.5 text-xs font-bold">
              <Save size={14} /> Save Draft
            </Button>
            {currentStep < 4 ? (
              <Button type="button" variant="primary" className="font-bold text-xs shadow-xs" onClick={handleNext}>
                Continue to {STEPS[currentStep]} →
              </Button>
            ) : (
              <Link href="/dashboard/projects">
                <Button type="button" variant="primary" className="font-bold text-xs shadow-xs bg-[#10B981] hover:bg-[#059669]">
                  Publish Project 🚀
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
