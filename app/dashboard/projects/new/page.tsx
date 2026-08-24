'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Loader2,
  Plus,
  Eye,
  Camera
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/client';

const STEPS = [
  'Project Basics',
  'Project Story',
  'Visuals & Screenshots',
  'Live Card Preview & Publish'
];

function CreateProjectWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const supabase = createClient();

  const coverInputRef = useRef<HTMLInputElement>(null);
  const screenshotInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingScreenshots, setUploadingScreenshots] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Step 1: Basics
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [category, setCategory] = useState('IoT & Embedded');
  const [market, setMarket] = useState('Environment / Sustainability');
  const [tags, setTags] = useState<string[]>(['Rust', 'ESP32', 'Next.js', 'PostgreSQL']);
  const [tagInput, setTagInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  // Step 2: Story
  const [problem, setProblem] = useState('');
  const [currentState, setCurrentState] = useState('');
  const [desiredState, setDesiredState] = useState('');
  const [solution, setSolution] = useState('');
  const [result, setResult] = useState('');
  const [metricValue, setMetricValue] = useState('38.5%');
  const [metricDesc, setMetricDesc] = useState('Reduction in off-peak electrical waste');
  const [processSteps, setProcessSteps] = useState([
    { id: 1, title: 'Hardware Sensor & Microcontroller Prototyping', description: 'Calibrated non-invasive CT current sensors with ESP32 microcontrollers sampling at 1kHz.' },
    { id: 2, title: 'Edge Firmware in Rust', description: 'Wrote memory-safe firmware to compute True-RMS power and publish compressed telemetry over MQTT.' },
    { id: 3, title: 'Full-Stack Telemetry Dashboard', description: 'Constructed high-frequency time-series charts in Next.js with WebSocket streaming and PostgreSQL storage.' }
  ]);
  
  // Step 3: Visuals, Screenshots & Resources
  const [screenshots, setScreenshots] = useState<string[]>([
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
  ]);
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [docUrl, setDocUrl] = useState('');

  // Load existing project if in edit mode
  useEffect(() => {
    async function loadProjectForEdit() {
      if (!editId) return;
      try {
        setLoading(true);
        const { data: project } = await supabase
          .from('projects')
          .select('*')
          .eq('id', editId)
          .maybeSingle();

        if (project) {
          setTitle(project.title || '');
          setShortDescription(project.description || '');
          setCategory(project.category || 'IoT & Embedded');
          setMarket(project.market || 'Environment / Sustainability');
          setTags(project.tags || []);
          setImageUrl(project.image_url || '');
          setProblem(project.problem || '');
          setCurrentState(project.current_state || '');
          setDesiredState(project.desired_state || '');
          setSolution(project.solution || '');
          setResult(project.result || '');
          if (project.key_metric) {
            setMetricValue(project.key_metric.value || '');
            setMetricDesc(project.key_metric.label || '');
          }
          if (project.process_steps && Array.isArray(project.process_steps)) {
            setProcessSteps(project.process_steps);
          }
          if (project.screenshots && Array.isArray(project.screenshots)) {
            setScreenshots(project.screenshots);
          }
          setLiveUrl(project.live_url || '');
          setGithubUrl(project.github_url || '');
          setDocUrl(project.doc_url || '');
        }
      } catch (err) {
        console.error('Error loading project for edit:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProjectForEdit();
  }, [editId, supabase]);

  const handleNext = () => {
    setErrorMessage(null);
    if (currentStep === 1) {
      if (!title.trim() || !shortDescription.trim()) {
        setErrorMessage('Please fill in the project title and short description.');
        return;
      }
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setErrorMessage(null);
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

  // ── LOCAL COMPUTER FILE UPLOADS (SUPABASE STORAGE) ──
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingCover(true);
      setErrorMessage(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `cover_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('projects')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) {
        // Fallback to local Data URL preview if bucket policy hasn't been run yet
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) setImageUrl(event.target.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath);
        setImageUrl(publicUrl);
      }
    } catch (err: any) {
      console.error('Cover upload error:', err);
    } finally {
      setUploadingCover(false);
    }
  };

  const handleScreenshotsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploadingScreenshots(true);
      const newUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        if (screenshots.length + newUrls.length >= 6) break;
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `screenshot_${Date.now()}_${i}.${fileExt}`;
        const filePath = `screenshots/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, file, { cacheControl: '3600', upsert: true });

        if (uploadError) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              setScreenshots(prev => [...prev, event.target!.result as string]);
            }
          };
          reader.readAsDataURL(file);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('projects')
            .getPublicUrl(filePath);
          newUrls.push(publicUrl);
        }
      }

      if (newUrls.length > 0) {
        setScreenshots(prev => [...prev, ...newUrls]);
      }
    } catch (err: any) {
      console.error('Screenshot upload error:', err);
    } finally {
      setUploadingScreenshots(false);
    }
  };

  const removeScreenshot = (indexToRemove: number) => {
    setScreenshots(screenshots.filter((_, index) => index !== indexToRemove));
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

  const updateProcessStep = (id: number, field: 'title' | 'description', value: string) => {
    setProcessSteps(processSteps.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSaveProject = async (targetStatus: 'published' | 'draft') => {
    setSaving(true);
    setErrorMessage(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to create a project.');

      const projectData = {
        doer_id: user.id,
        title: title.trim() || 'Untitled Project',
        description: shortDescription.trim() || 'No description provided.',
        category,
        market,
        tags,
        image_url: imageUrl.trim() || null,
        problem: problem.trim() || null,
        current_state: currentState.trim() || null,
        desired_state: desiredState.trim() || null,
        solution: solution.trim() || null,
        result: result.trim() || null,
        key_metric: metricValue ? { value: metricValue, label: metricDesc } : null,
        process_steps: processSteps,
        screenshots: screenshots,
        live_url: liveUrl.trim() || null,
        github_url: githubUrl.trim() || null,
        doc_url: docUrl.trim() || null,
        status: targetStatus
      };

      if (editId) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert(projectData);
        if (error) throw error;
      }

      router.push('/dashboard/projects');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E2E8F0]">
          <div>
            <Link 
              href="/dashboard/projects"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors mb-1.5"
            >
              <ArrowLeft size={14} /> Back to Projects
            </Link>
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
              {editId ? 'Edit Engineering Case Study' : 'Create Engineering Case Study'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] bg-white border border-[#E2E8F0] px-3 py-1.5 rounded-xl shadow-2xs">
            <Cloud size={14} className="text-[#4F46E5]" />
            <span>Draft Auto-Save</span>
          </div>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center gap-3 text-xs font-semibold text-[#B91C1C]">
            <AlertCircle size={18} className="shrink-0 text-[#EF4444]" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Wizard Step Progress */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {STEPS.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;
            return (
              <div 
                key={step}
                onClick={() => isCompleted && setCurrentStep(stepNum)}
                className={`flex items-center gap-2 p-3 rounded-2xl border transition-all ${
                  isActive ? 'bg-white border-[#4F46E5] ring-2 ring-[#EEF2FF] shadow-xs' :
                  isCompleted ? 'bg-white border-[#CBD5E1] cursor-pointer hover:border-[#94A3B8]' :
                  'bg-[#F1F5F9] border-transparent opacity-60'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-[#4F46E5] text-white' :
                  isCompleted ? 'bg-[#0F172A] text-white' :
                  'bg-[#E2E8F0] text-[#64748B]'
                }`}>
                  {isCompleted ? <Check size={12} /> : stepNum}
                </div>
                <span className={`text-xs truncate ${isActive ? 'font-bold text-[#0F172A]' : 'font-medium text-[#64748B]'}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── STEP 1: PROJECT BASICS ── */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#F1F5F9] pb-4">
              <h2 className="text-xl font-bold text-[#0F172A]">1. Project Basics</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Start with a strong title, category, and descriptive summary.</p>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Project Title *</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Autonomous IoT Energy Monitoring & Anomaly Detection System" 
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">Short Description *</label>
                  <span className="text-[10px] text-[#64748B]">{shortDescription.length}/160</span>
                </div>
                <textarea 
                  rows={3} 
                  maxLength={160}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="An embedded sensor network and real-time dashboard that monitors university laboratory power consumption..." 
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Category *</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
                  >
                    <option>IoT &amp; Embedded</option>
                    <option>AI / Machine Learning</option>
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>Data Science</option>
                    <option>Cybersecurity</option>
                    <option>Cloud Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Market / Problem Space *</label>
                  <select 
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] bg-white"
                  >
                    <option>Environment / Sustainability</option>
                    <option>Education / EdTech</option>
                    <option>Smart Home / IoT</option>
                    <option>Finance / FinTech</option>
                    <option>Health / MedTech</option>
                    <option>Transportation / Mobility</option>
                    <option>Business Intelligence</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Skills &amp; Technologies Used ({tags.length}/10)</label>
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
                    placeholder="Type technology & press Enter (e.g. Rust, ESP32)..."
                    className="flex-1 min-w-[160px] outline-none text-[#0F172A] text-xs py-1"
                  />
                </div>
              </div>

              {/* Cover Image Upload (From Local Computer or URL) */}
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                  Project Cover Image *
                </label>
                
                {/* Hidden Local File Input */}
                <input 
                  type="file" 
                  ref={coverInputRef}
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleCoverUpload}
                  className="hidden" 
                />

                {imageUrl ? (
                  <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] aspect-video max-h-56 bg-slate-100 group">
                    <img src={imageUrl} alt="Cover preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        className="px-3.5 py-1.5 bg-white text-[#0F172A] text-xs font-bold rounded-xl shadow-xs hover:bg-[#F8FAFC]"
                      >
                        Change Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageUrl('')}
                        className="px-3.5 py-1.5 bg-[#EF4444] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#DC2626]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => coverInputRef.current?.click()}
                    className="flex justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-8 hover:bg-[#EEF2FF]/40 hover:border-[#4F46E5] transition-all cursor-pointer text-center"
                  >
                    <div className="flex flex-col items-center">
                      {uploadingCover ? (
                        <Loader2 size={32} className="animate-spin text-[#4F46E5] mb-2" />
                      ) : (
                        <Upload className="h-8 w-8 text-[#4F46E5] mb-2" />
                      )}
                      <span className="text-xs font-bold text-[#4F46E5]">
                        {uploadingCover ? 'Uploading Cover...' : 'Click to upload cover from your computer'}
                      </span>
                      <p className="text-[11px] text-[#64748B] mt-1">PNG, JPG or WEBP · 16:9 recommended</p>
                    </div>
                  </div>
                )}

                {/* Optional Direct URL Input */}
                <div className="mt-2.5">
                  <input 
                    type="url" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or paste an image URL directly..." 
                    className="w-full rounded-xl border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: PROJECT STORY ── */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#F1F5F9] pb-4">
              <h2 className="text-xl font-bold text-[#0F172A]">2. The Engineering Story</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Structure your problem-to-solution narrative for engineering recruiters.</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">The Problem *</label>
                <textarea 
                  rows={3} 
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="What specific engineering friction, latency bottleneck, or real-world problem did you set out to solve?" 
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Current / Baseline State</label>
                  <textarea 
                    rows={2} 
                    value={currentState}
                    onChange={(e) => setCurrentState(e.target.value)}
                    placeholder="How was this handled previously before your tool?" 
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Desired State / Goal</label>
                  <textarea 
                    rows={2} 
                    value={desiredState}
                    onChange={(e) => setDesiredState(e.target.value)}
                    placeholder="What target speed, accuracy, or metric did you aim for?" 
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                  />
                </div>
              </div>

              {/* Dynamic Process Steps */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">Engineering Process Steps</label>
                  <button type="button" onClick={addProcessStep} className="text-xs font-bold text-[#4F46E5] hover:underline cursor-pointer">
                    + Add Step
                  </button>
                </div>
                <div className="space-y-3">
                  {processSteps.map((step, idx) => (
                    <div key={step.id} className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#4F46E5]">Step {idx + 1}</span>
                        {processSteps.length > 1 && (
                          <button type="button" onClick={() => removeProcessStep(step.id)} className="text-[#94A3B8] hover:text-[#EF4444]">
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                      <input 
                        type="text"
                        placeholder="Step Title (e.g. Edge Firmware in Rust)"
                        value={step.title}
                        onChange={(e) => updateProcessStep(step.id, 'title', e.target.value)}
                        className="w-full rounded-xl border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                      />
                      <textarea 
                        rows={2}
                        placeholder="Describe what you engineered in this phase..."
                        value={step.description}
                        onChange={(e) => updateProcessStep(step.id, 'description', e.target.value)}
                        className="w-full rounded-xl border border-[#E2E8F0] px-3 py-1.5 text-xs text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">The Solution *</label>
                <textarea 
                  rows={3} 
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="Explain how your solution works under the hood..." 
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Key Metric Value</label>
                  <input 
                    type="text" 
                    value={metricValue}
                    onChange={(e) => setMetricValue(e.target.value)}
                    placeholder="e.g. 38.5%" 
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">Key Metric Label</label>
                  <input 
                    type="text" 
                    value={metricDesc}
                    onChange={(e) => setMetricDesc(e.target.value)}
                    placeholder="e.g. Reduction in off-peak laboratory electrical waste" 
                    className="w-full rounded-xl border border-[#E2E8F0] px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: VISUALS, SCREENSHOTS & RESOURCES ── */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#F1F5F9] pb-4">
              <h2 className="text-xl font-bold text-[#0F172A]">3. Screenshots &amp; External Resources</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Upload project screenshots directly from your computer or provide repository links.</p>
            </div>

            {/* Screenshots Gallery Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Project Screenshots ({screenshots.length}/6)
                </label>
                <button
                  type="button"
                  onClick={() => screenshotInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4F46E5] text-white text-xs font-bold rounded-xl hover:bg-[#4338CA] shadow-2xs transition-colors cursor-pointer"
                >
                  <Upload size={13} /> Upload from Computer
                </button>
              </div>

              {/* Hidden Local Screenshots Input */}
              <input 
                type="file" 
                ref={screenshotInputRef}
                multiple
                accept="image/png, image/jpeg, image/webp"
                onChange={handleScreenshotsUpload}
                className="hidden" 
              />
              
              {/* Screenshots Grid Preview */}
              {screenshots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
                  {screenshots.map((src, i) => (
                    <div key={i} className="relative group rounded-xl overflow-hidden border border-[#E2E8F0] aspect-video bg-slate-100">
                      <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeScreenshot(i)}
                        className="absolute top-1.5 right-1.5 p-1 bg-[#EF4444] text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  onClick={() => screenshotInputRef.current?.click()}
                  className="p-8 border-2 border-dashed border-[#CBD5E1] rounded-2xl text-center bg-[#F8FAFC] hover:bg-[#EEF2FF]/40 hover:border-[#4F46E5] transition-all cursor-pointer"
                >
                  <Camera size={28} className="mx-auto text-[#4F46E5] mb-2" />
                  <p className="text-xs font-bold text-[#4F46E5]">
                    {uploadingScreenshots ? 'Uploading Screenshots...' : 'Click to upload screenshot images'}
                  </p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Add UI previews, terminal outputs, or system diagrams</p>
                </div>
              )}

              <p className="text-[11px] text-[#64748B]">These screenshots will appear in the detailed case study page gallery.</p>
            </div>

            <div className="border-t border-[#F1F5F9] pt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Code2 size={14} /> GitHub Repository URL
                </label>
                <input 
                  type="url" 
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/project-repo" 
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <ExternalLink size={14} /> Live Interactive Demo URL
                </label>
                <input 
                  type="url" 
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://my-app.vercel.app" 
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FileText size={14} /> Architecture Docs / PDF Link
                </label>
                <input 
                  type="url" 
                  value={docUrl}
                  onChange={(e) => setDocUrl(e.target.value)}
                  placeholder="https://docs.google.com/... or PDF link" 
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" 
                />
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: LIVE PUBLIC CARD PREVIEW & PUBLISH ── */}
        {currentStep === 4 && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#F1F5F9] pb-4">
              <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <Eye size={20} className="text-[#4F46E5]" /> 4. Live Public Card Preview
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                This is exactly how your project card will appear to recruiters and visitors on your public portfolio.
              </p>
            </div>

            {/* Live Pixel-Perfect Public Project Card Preview */}
            <div className="max-w-md mx-auto my-4">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden flex flex-col shadow-md hover:border-[#CBD5E1] transition-all">
                {/* Project Thumbnail / Banner */}
                <div className="w-full h-44 bg-[#EEF2FF] border-b border-[#E2E8F0] overflow-hidden relative">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={title || 'Project Preview'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#4F46E5]/40">
                      <ImageIcon size={36} />
                      <span className="text-[11px] font-bold mt-1 text-[#4F46E5]/60">Default Banner</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 gap-3">
                  {category && (
                    <span className="text-[11px] font-bold tracking-wider text-[#4F46E5] uppercase">
                      {category}
                    </span>
                  )}

                  <h4 className="text-lg font-bold text-[#0F172A] leading-snug">
                    {title || 'Untitled Project'}
                  </h4>

                  <p className="text-xs text-[#64748B] flex-1 line-clamp-3 leading-relaxed">
                    {shortDescription || 'No description provided.'}
                  </p>

                  {/* Tags */}
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F1F5F9]">
                      {tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} label={tag} className="text-[10px] bg-[#F1F5F9] text-[#334155] px-2.5 py-0.5 rounded-md font-semibold" />
                      ))}
                      {tags.length > 3 && (
                        <span className="text-[10px] text-[#94A3B8] font-semibold self-center">
                          +{tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Case Study Details Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-[#F1F5F9]">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[#64748B] block mb-1">Story Narrative:</span>
                <strong className="text-[#0F172A]">{processSteps.length} Engineering Steps Included</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[#64748B] block mb-1">Gallery &amp; Screenshots:</span>
                <strong className="text-[#0F172A]">{screenshots.length} Screenshots Attached</strong>
              </div>
            </div>

            {/* Ready Card */}
            <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-4 text-center">
              <p className="text-xs font-semibold text-[#4338CA]">
                Publishing will make this case study immediately visible on your public portfolio page.
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
            <Button 
              type="button" 
              variant="outline" 
              isLoading={saving}
              onClick={() => handleSaveProject('draft')}
              className="border-[#E2E8F0] text-[#0F172A] gap-1.5 text-xs font-bold"
            >
              <Save size={14} /> Save Draft
            </Button>

            {currentStep < 4 ? (
              <Button type="button" variant="primary" className="font-bold text-xs shadow-xs" onClick={handleNext}>
                Continue to {STEPS[currentStep]} →
              </Button>
            ) : (
              <Button 
                type="button" 
                variant="primary" 
                isLoading={saving}
                onClick={() => handleSaveProject('published')}
                className="font-bold text-xs shadow-xs bg-[#10B981] hover:bg-[#059669]"
              >
                Publish Project 🚀
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateProjectPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><Loader2 size={32} className="animate-spin text-[#4F46E5]" /></div>}>
      <CreateProjectWizard />
    </Suspense>
  );
}
