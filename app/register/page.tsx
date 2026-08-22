'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { MOCK_SKILLS } from '@/lib/mockData'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  User,
  BookOpen,
  Calendar,
  Globe,
  Share2,
  Code2,
  FileCheck
} from 'lucide-react'

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1: Account
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Step 2: Profile
  const [fullName, setFullName] = useState('')
  const [program, setProgram] = useState('Computer Science')
  const [year, setYear] = useState('Year 3')
  const [headline, setHeadline] = useState('')
  const [bio, setBio] = useState('')

  // Step 3: Skills & Links
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python', 'React'])
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')

  const toggleSkill = (skillName: string) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skillName))
    } else {
      setSelectedSkills([...selectedSkills, skillName])
    }
  }

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Step Indicator Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
            STEP {currentStep} OF 4
          </span>
          <span className="text-xs text-[#6B7280]">
            {currentStep === 1 && 'Account Credentials'}
            {currentStep === 2 && 'Academic & Bio Details'}
            {currentStep === 3 && 'Skills & Professional Links'}
            {currentStep === 4 && 'Review & Complete'}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#4F46E5] h-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
        {/* ── STEP 1: ACCOUNT ── */}
        {currentStep === 1 && (
          <form onSubmit={nextStep} className="flex flex-col gap-5">
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-[#111827]">Step 1 — Create Your Account</h1>
              <p className="text-xs text-[#6B7280] mt-1">Set up your login credentials.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">Student Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full mt-4 gap-2">
              Continue to Step 2 <ArrowRight size={16} />
            </Button>
          </form>
        )}

        {/* ── STEP 2: PROFILE ── */}
        {currentStep === 2 && (
          <form onSubmit={nextStep} className="flex flex-col gap-5">
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-[#111827]">Step 2 — Profile &amp; Academic Info</h1>
              <p className="text-xs text-[#6B7280] mt-1">Tell us who you are and what you study.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Program</label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Interactive Design">Interactive Design</option>
                  <option value="Data Science">Data Science</option>
                  <option value="UX Design">UX Design</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Year of Study</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                >
                  <option value="Year 1">Year 1</option>
                  <option value="Year 2">Year 2</option>
                  <option value="Year 3">Year 3</option>
                  <option value="Year 4">Year 4</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">Profile Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Software Engineering student interested in AI and developer tools"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">About Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Briefly describe your passion, hackathons, open source work, or what you build..."
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" size="lg" onClick={prevStep} className="gap-2">
                <ArrowLeft size={16} /> Back
              </Button>
              <Button type="submit" variant="primary" size="lg" className="flex-1 gap-2">
                Continue to Step 3 <ArrowRight size={16} />
              </Button>
            </div>
          </form>
        )}

        {/* ── STEP 3: SKILLS & LINKS ── */}
        {currentStep === 3 && (
          <form onSubmit={nextStep} className="flex flex-col gap-5">
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-[#111827]">Step 3 — Skills &amp; Professional Links</h1>
              <p className="text-xs text-[#6B7280] mt-1">Select your skills and connect your profiles.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-2">Select Your Top Skills</label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1 border border-[#F3F4F6] rounded-xl">
                {MOCK_SKILLS.map((skill) => {
                  const isSelected = selectedSkills.includes(skill.name)
                  return (
                    <button
                      type="button"
                      key={skill.id}
                      onClick={() => toggleSkill(skill.name)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#4F46E5] text-white'
                          : 'bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB]'
                      }`}
                    >
                      {skill.name} {isSelected ? '✓' : '+'}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">Portfolio / Website Link</label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://yourname.dev"
                  className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">GitHub URL</label>
                <div className="relative">
                  <Code2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">LinkedIn URL</label>
                <div className="relative">
                  <Share2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" size="lg" onClick={prevStep} className="gap-2">
                <ArrowLeft size={16} /> Back
              </Button>
              <Button type="submit" variant="primary" size="lg" className="flex-1 gap-2">
                Review Application <ArrowRight size={16} />
              </Button>
            </div>
          </form>
        )}

        {/* ── STEP 4: REVIEW & COMPLETE ── */}
        {currentStep === 4 && (
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-[#EEF2FF] text-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-3">
                <FileCheck size={32} />
              </div>
              <h1 className="text-2xl font-bold text-[#111827]">Step 4 — Review &amp; Submit</h1>
              <p className="text-xs text-[#6B7280] mt-1">Check your profile details before sending for admin approval.</p>
            </div>

            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5 text-xs flex flex-col gap-3">
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">Full Name:</span>
                <span className="font-bold text-[#111827]">{fullName || 'Alex Chen'}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">Email:</span>
                <span className="font-bold text-[#111827]">{email || 'student@university.edu'}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">Program &amp; Year:</span>
                <span className="font-bold text-[#111827]">{program} · {year}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">Skills Selected:</span>
                <span className="font-bold text-[#4F46E5]">{selectedSkills.join(', ') || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Status on Submit:</span>
                <span className="font-bold text-[#D97706]">● Pending Admin Approval</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" size="lg" onClick={prevStep} className="gap-2">
                <ArrowLeft size={16} /> Edit Details
              </Button>
              <Link href="/dashboard" className="flex-1">
                <Button variant="primary" size="lg" className="w-full gap-2">
                  <CheckCircle2 size={16} /> Submit &amp; Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
