import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Target, Users, Sparkles, CheckCircle2 } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">About the Platform</span>
        <h1 className="text-4xl font-extrabold text-[#111827] mt-2">Connecting Student Talent With The World</h1>
        <p className="text-[#6B7280] text-base mt-3 leading-relaxed">
          theDoers is a specialized showcase ecosystem designed to bridge the gap between academic learning and real-world impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 bg-[#EEF2FF] text-[#4F46E5] rounded-xl flex items-center justify-center">
            <Target size={20} />
          </div>
          <h3 className="font-bold text-lg text-[#111827]">Proof of Work</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            We focus on what students can actually build. Live projects, verified code repositories, and practical problem-solving.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 bg-[#EEF2FF] text-[#4F46E5] rounded-xl flex items-center justify-center">
            <Users size={20} />
          </div>
          <h3 className="font-bold text-lg text-[#111827]">Vetted Community</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Every Doer profile is reviewed by administrators to maintain a high-trust, spam-free directory of ethical technologists.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 bg-[#EEF2FF] text-[#4F46E5] rounded-xl flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <h3 className="font-bold text-lg text-[#111827]">Instant Discovery</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Filter and find specific skills across AI, IoT, Web, Mobile, and Cybersecurity to discover your next team collaborator.
          </p>
        </div>
      </div>

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-[#111827]">Are you a student in IT or Design?</h3>
          <p className="text-sm text-[#6B7280] mt-1">Join the community and publish your portfolio in minutes.</p>
        </div>
        <Link href="/register">
          <Button variant="primary" size="lg">Become a Doer</Button>
        </Link>
      </div>
    </div>
  )
}
