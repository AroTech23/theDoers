import Link from 'next/link'
import Button from '@/components/ui/Button'
import DoerCard from '@/components/doers/DoerCard'
import Badge from '@/components/ui/Badge'
import { Search, ArrowRight } from 'lucide-react'
import { User } from '@/types'

// Mock featured doers — replace with Supabase query later
const featuredDoers: (User & { skills: { name: string }[] })[] = [
  {
    id: '1', email: '', full_name: 'Jane Doe', username: 'janedoe',
    role: 'doer', status: 'approved', is_featured: true, created_at: '',
    program: 'B.S. Interactive Design', year: 'Senior',
    bio: 'Building tools for student creators',
    skills: [{ name: 'Product Design' }, { name: 'Figma' }],
  },
  {
    id: '2', email: '', full_name: 'Marcus Vance', username: 'marcusvance',
    role: 'doer', status: 'approved', is_featured: true, created_at: '',
    program: 'B.S. Computer Science', year: 'Junior',
    bio: 'Machine learning enthusiast and backend tinkerer',
    skills: [{ name: 'Python' }, { name: 'Node.js' }],
  },
  {
    id: '3', email: '', full_name: 'Alex Rivera', username: 'alexrivera',
    role: 'doer', status: 'approved', is_featured: true, created_at: '',
    program: 'B.A. UX Research', year: 'Senior',
    bio: 'Prototyping delightful, human-centered products',
    skills: [{ name: 'Figma' }, { name: 'Research' }],
  },
  {
    id: '4', email: '', full_name: 'Priya Shah', username: 'priyashah',
    role: 'doer', status: 'approved', is_featured: true, created_at: '',
    program: 'B.S. Data Science', year: 'Sophomore',
    bio: 'Turning messy datasets into clear stories',
    skills: [{ name: 'Python' }, { name: 'SQL' }],
  },
]

const popularSkills = [
  'Web Development', 'Mobile Development', 'AI / Machine Learning',
  'UI/UX', 'Cybersecurity', 'Data Science', 'Business', 'IoT',
]

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: Copy */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-5xl font-bold text-[#111827] leading-tight">
                We Are the Doers
              </h1>
              <p className="mt-4 text-lg text-[#6B7280]">
                Meet ethically skilled IT engineers and innovators.
              </p>
            </div>

            {/* Search bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
              <input
                type="text"
                placeholder="Search Doers by name, skill, or program..."
                className="w-full pl-10 pr-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent bg-white"
              />
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <Link href="/doers">
                <Button variant="primary" size="lg">Explore Doers</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg">Become a Doer</Button>
              </Link>
            </div>
          </div>

          {/* Right: Floating cards preview */}
          <div className="hidden md:flex flex-col gap-4 items-end">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm w-64">
              <div className="w-full h-28 bg-[#F3F4F6] rounded-lg mb-3" />
              <p className="font-semibold text-[#111827] text-sm">Marcus Vance</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-[#4F46E5] flex items-center justify-center text-white text-xs font-bold">MV</div>
                <span className="text-xs text-[#6B7280]">B.S. Computer Science</span>
              </div>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm w-56 self-start ml-8">
              <p className="font-semibold text-[#111827] text-sm">EcoTrack: Carbon Footprint Analyzer</p>
              <Badge label="React" className="mt-2" />
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-[#4F46E5] flex items-center justify-center text-white text-xs font-bold">JD</div>
                <span className="text-xs text-[#6B7280]">Jane Doe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Doers ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-[#111827]">Featured Doers</h2>
          <Link href="/doers" className="flex items-center gap-1 text-sm font-medium text-[#4F46E5] hover:text-[#3730A3] transition-colors">
            View All Doers <ArrowRight size={16} />
          </Link>
        </div>
        <p className="text-[#6B7280] mb-8">Meet students building, creating, and solving real problems.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredDoers.map((doer) => (
            <DoerCard key={doer.id} doer={doer} />
          ))}
        </div>
      </section>

      {/* ── Explore by Skill ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <h2 className="text-3xl font-bold text-[#111827] mb-2">Explore by Skill</h2>
        <p className="text-[#6B7280] mb-6">Find Doers based on what they know and what they can do.</p>

        <div className="flex flex-wrap gap-2">
          {popularSkills.map((skill) => (
            <Link key={skill} href={`/doers?skill=${encodeURIComponent(skill)}`}>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white transition-colors cursor-pointer">
                {skill}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="mx-6 mb-16 rounded-2xl bg-[#F9FAFB] py-16 px-8 text-center max-w-7xl md:mx-auto w-[calc(100%-48px)]">
        <h2 className="text-3xl font-bold text-[#111827] mb-3">
          Ready to Show What You Can Do?
        </h2>
        <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
          Create your Doer profile, showcase your skills, and let your work speak for you.
        </p>
        <Link href="/register">
          <Button variant="primary" size="lg">Become a Doer</Button>
        </Link>
      </section>

    </div>
  )
}
