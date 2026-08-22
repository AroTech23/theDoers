'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Cloud, Check, Upload, ArrowUp, ArrowDown, MoreHorizontal, X, File, FileText, Image as ImageIcon, Code2, Globe, Link as LinkIcon } from 'lucide-react';
import Button from '@/components/ui/Button';

const STEPS = [
  'Project Basics',
  'Project Story',
  'Visuals & Resources',
  'Review & Publish'
];

export default function CreateProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  const [processSteps, setProcessSteps] = useState([
    { id: 1, title: '', description: '' }
  ]);
  
  const [links, setLinks] = useState([
    { id: 1, type: 'GitHub Repository', url: '' }
  ]);

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() && tags.length < 10) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-[#6B7280] hover:text-[#111827] mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <div className="flex justify-between items-end mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">Create Project</h1>
          <div className="flex items-center text-sm text-[#6B7280]">
            <Cloud className="w-4 h-4 mr-1.5" />
            Draft · Saved just now
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 w-full h-0.5 bg-[#E5E7EB] -z-10 transform -translate-y-1/2" />
          {STEPS.map((step, index) => {
            const stepNum = index + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <div key={stepNum} className="flex flex-col items-center bg-[#F9FAFB] px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 border-2 ${
                  isActive ? 'bg-[#111827] border-[#111827] text-white' : 
                  isCompleted ? 'bg-[#111827] border-[#111827] text-white' : 
                  'bg-white border-[#E5E7EB] text-[#6B7280]'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                <span className={`text-sm ${isActive ? 'font-bold text-[#111827]' : 'font-medium text-[#6B7280]'}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#111827]">Project Basics</h2>
              <p className="text-[#6B7280] mt-1">Start by giving your project a clear identity...</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Project Title *</label>
                <input type="text" className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                <p className="text-xs text-[#6B7280] mt-1">Keep it short, clear, and descriptive.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Short Description *</label>
                <textarea rows={3} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"></textarea>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-[#6B7280]">This will appear on project cards.</p>
                  <span className="text-xs text-[#6B7280]">0/160</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1">Category *</label>
                  <select className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]">
                    <option>AI / Machine Learning</option>
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>IoT</option>
                    <option>Data Science</option>
                    <option>Cybersecurity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1">Market *</label>
                  <select className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]">
                    <option>Education / EdTech</option>
                    <option>Smart Home / IoT</option>
                    <option>Finance / FinTech</option>
                    <option>Health / MedTech</option>
                    <option>Transportation / Mobility</option>
                    <option>Environment / Sustainability</option>
                    <option>Business Intelligence</option>
                  </select>
                  <p className="text-xs text-[#6B7280] mt-1">Select the market or problem space this project addresses.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Skills & Technologies *</label>
                <div className="p-2 flex flex-wrap gap-2 rounded-xl border border-[#E5E7EB] focus-within:ring-2 focus-within:ring-[#4F46E5]">
                  {tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-[#EEF2FF] text-[#4F46E5]">
                      {tag}
                      <button type="button" onClick={() => removeTag(i)} className="ml-1.5 inline-flex items-center justify-center text-[#4F46E5] hover:text-[#3730A3]">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder="Type and press Enter"
                    className="flex-1 min-w-[120px] outline-none text-[#111827] bg-transparent text-sm py-1"
                  />
                </div>
                <p className="text-xs text-[#6B7280] mt-1">Add up to 10 tags that describe the tech stack or skills used.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Project Cover Image *</label>
                <div className="mt-2 flex justify-center rounded-xl border-2 border-dashed border-[#E5E7EB] bg-[#F9FAFB] px-6 py-10">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-[#6B7280]" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-[#6B7280]">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-[#4F46E5] focus-within:outline-none hover:text-[#3730A3]">
                        <span>Click to upload or drag and drop</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-[#6B7280]">JPG, PNG or WEBP · Max 10 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#111827]">Project Story</h2>
              <p className="text-[#6B7280] mt-1">Tell the story behind your project — the problem you identified, how you approached it, what you built, and what changed.</p>
              
              <div className="flex flex-wrap gap-2 text-sm text-[#6B7280] mt-6 bg-[#F9FAFB] p-4 rounded-xl">
                <span className="font-bold text-[#111827]">Problem</span> → 
                <span>Current State</span> → 
                <span>Process</span> → 
                <span>Desired State</span> → 
                <span>Solution</span> → 
                <span>Result</span>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">The Problem *</label>
                <textarea rows={4} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"></textarea>
                <p className="text-xs text-[#6B7280] mt-1">Focus on the real problem rather than immediately describing your solution.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Current State</label>
                <textarea rows={3} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"></textarea>
                <p className="text-xs text-[#6B7280] mt-1">Help visitors understand what needed to change.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-4">Process</label>
                <div className="space-y-4">
                  {processSteps.map((step, index) => (
                    <div key={step.id} className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] relative">
                      <div className="absolute right-4 top-4 flex items-center space-x-1 text-[#6B7280]">
                        <button className="p-1 hover:bg-[#E5E7EB] rounded"><ArrowUp className="w-4 h-4" /></button>
                        <button className="p-1 hover:bg-[#E5E7EB] rounded"><ArrowDown className="w-4 h-4" /></button>
                        <button className="p-1 hover:bg-[#E5E7EB] rounded"><MoreHorizontal className="w-4 h-4" /></button>
                      </div>
                      <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2 block">Step {index + 1}</span>
                      <input type="text" placeholder="Step Title" className="w-full mb-3 rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                      <textarea rows={2} placeholder="Description" className="w-full rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"></textarea>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full text-[#4F46E5] border-[#4F46E5] hover:bg-[#EEF2FF]" onClick={() => setProcessSteps([...processSteps, { id: Date.now(), title: '', description: '' }])}>
                  + Add Process Step
                </Button>
                <p className="text-xs text-[#6B7280] mt-2">Break down the key steps you followed while working on the project.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Desired State</label>
                <textarea rows={3} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"></textarea>
                <p className="text-xs text-[#6B7280] mt-1">Explain the target state before describing the final solution.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">The Solution *</label>
                <textarea rows={4} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"></textarea>
                <p className="text-xs text-[#6B7280] mt-1">Focus on what you created and why it solves the problem.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">The Result</label>
                <textarea rows={3} className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"></textarea>
                <p className="text-xs text-[#6B7280] mt-1">Results can be measurable outcomes or meaningful qualitative improvements.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1">Key Result / Metric (Optional)</label>
                <div className="flex gap-4">
                  <input type="text" placeholder="Value (e.g. '40%')" className="w-1/3 rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                  <input type="text" placeholder="Description (e.g. 'Reduction in study preparation time')" className="flex-1 rounded-xl border border-[#E5E7EB] px-4 py-2 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#111827]">Visuals & Resources</h2>
              <p className="text-[#6B7280] mt-1">Show your project in action and add resources that help visitors explore your work.</p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2 flex justify-between">
                  <span>Project Screenshots</span>
                  <span className="text-[#6B7280] font-normal">3 of 10 screenshots</span>
                </label>
                <p className="text-xs text-[#6B7280] mb-4">Drag to reorder screenshots</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video bg-[#E5E7EB] rounded-xl flex justify-center items-center relative group cursor-grab">
                      <ImageIcon className="text-[#9CA3AF] w-8 h-8" />
                      <button className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 shadow">
                        <X className="w-3 h-3 text-[#111827]" />
                      </button>
                    </div>
                  ))}
                  <div className="aspect-video border-2 border-dashed border-[#E5E7EB] bg-[#F9FAFB] rounded-xl flex flex-col justify-center items-center text-[#6B7280] cursor-pointer hover:bg-[#EEF2FF] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors">
                    <Upload className="w-6 h-6 mb-2" />
                    <span className="text-xs font-medium">Upload</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-[#4F46E5] border-[#4F46E5] hover:bg-[#EEF2FF]">
                  + Add More Screenshots
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">Supporting Document (Optional)</label>
                <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mr-3">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#111827]">project-architecture-v2.pdf</p>
                      <p className="text-xs text-[#6B7280]">2.4 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="text-sm font-medium text-[#4F46E5]">Replace</button>
                    <button className="text-[#6B7280] hover:text-[#111827]"><MoreHorizontal className="w-5 h-5" /></button>
                  </div>
                </div>
                <p className="text-xs text-[#6B7280] mt-2">Add a PDF if visitors need more detailed project documentation.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">Project Links (Optional)</label>
                <div className="space-y-3 mb-4">
                  {links.map((link, index) => (
                    <div key={link.id} className="flex gap-3">
                      <select className="w-48 rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]">
                        <option>GitHub Repository</option>
                        <option>Live Demo</option>
                        <option>Documentation</option>
                        <option>Other</option>
                      </select>
                      <input type="text" placeholder="https://" className="flex-1 rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                      <button className="text-[#6B7280] hover:text-red-500 p-2"><X className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full text-[#4F46E5] border-[#4F46E5] hover:bg-[#EEF2FF]" onClick={() => setLinks([...links, { id: Date.now(), type: 'GitHub Repository', url: '' }])}>
                  + Add Another Link
                </Button>
                <p className="text-xs text-[#6B7280] mt-2">Add links where visitors can explore your project further.</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#111827]">Review & Publish</h2>
                <p className="text-[#6B7280] mt-1">Review your project before making it public. You can return to any section to make changes.</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start mb-8">
                <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-green-800">Your project is ready to publish</h3>
                  <p className="text-sm text-green-700 mt-0.5">All required information has been completed.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-[#E5E7EB] rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center font-bold text-[#111827]">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Project Basics
                    </div>
                    <button className="text-sm text-[#4F46E5] font-medium" onClick={() => setCurrentStep(1)}>✎ Edit</button>
                  </div>
                  <ul className="text-sm text-[#6B7280] space-y-2">
                    <li><span className="text-[#111827] font-medium">Title:</span> My Awesome Project</li>
                    <li><span className="text-[#111827] font-medium">Category:</span> AI / Machine Learning</li>
                    <li><span className="text-[#111827] font-medium">Skills:</span> React, Python, TF</li>
                    <li><span className="text-[#111827] font-medium">Status:</span> Cover image added</li>
                  </ul>
                </div>

                <div className="border border-[#E5E7EB] rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center font-bold text-[#111827]">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Project Story
                    </div>
                    <button className="text-sm text-[#4F46E5] font-medium" onClick={() => setCurrentStep(2)}>✎ Edit</button>
                  </div>
                  <ul className="text-sm text-[#6B7280] space-y-2">
                    <li>Problem / Desired State ✓</li>
                    <li>Current State ✓</li>
                    <li>Solution / Process ✓</li>
                    <li>Result ✓</li>
                    <li><span className="text-[#111827] font-medium">Key Result:</span> 40% reduction</li>
                  </ul>
                </div>

                <div className="border border-[#E5E7EB] rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center font-bold text-[#111827]">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Visuals & Resources
                    </div>
                    <button className="text-sm text-[#4F46E5] font-medium" onClick={() => setCurrentStep(3)}>✎ Edit</button>
                  </div>
                  <ul className="text-sm text-[#6B7280] space-y-2">
                    <li>3 Screenshots</li>
                    <li>1 Supporting Document</li>
                    <li>2 Project Links</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 text-center">
              <h3 className="text-lg font-bold text-[#111827] mb-4">Project Preview</h3>
              <div className="max-w-md mx-auto border border-[#E5E7EB] rounded-2xl overflow-hidden mb-6 text-left">
                <div className="aspect-video bg-[#E5E7EB]"></div>
                <div className="p-5">
                  <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider mb-2 block">AI / MACHINE LEARNING</span>
                  <h4 className="text-lg font-bold text-[#111827] mb-2">My Awesome Project</h4>
                  <p className="text-sm text-[#6B7280] line-clamp-2 mb-4">This is a short description of the awesome project that will show up on cards.</p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <span className="px-2 py-1 bg-[#F3F4F6] text-[#4B5563] text-xs font-medium rounded-md">React</span>
                    <span className="px-2 py-1 bg-[#F3F4F6] text-[#4B5563] text-xs font-medium rounded-md">Python</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
                    <span className="text-sm text-[#111827] font-medium">Alex Chen</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="text-[#111827]">👁 Preview Full Project</Button>
            </div>

            <div className="bg-[#EEF2FF] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-bold text-[#111827] mb-2">Ready to publish?</h3>
              <p className="text-[#6B7280] text-sm">Publishing will make your project visible on your public portfolio and across theDoers network.</p>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-4 py-4 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1} className={currentStep === 1 ? 'invisible' : 'text-[#6B7280]'}>
              ← Back
            </Button>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-[#E5E7EB] text-[#111827]">
              <File className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            {currentStep < 4 ? (
              <Button className="bg-[#1F2937] hover:bg-gray-800 text-white" onClick={handleNext}>
                Continue to {STEPS[currentStep]} →
              </Button>
            ) : (
              <Button className="bg-[#1F2937] hover:bg-gray-800 text-white">
                Publish Project 🚀
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
