import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import DoerBadge from '@/components/ui/DoerBadge'
import { User } from '@/types'
import { ArrowRight, FolderKanban } from 'lucide-react'

interface DoerCardProps {
  doer: User & { skills?: { name: string }[]; projects_count?: number }
}

export default function DoerCard({ doer }: DoerCardProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:border-[#CBD5E1] hover:shadow-md transition-all duration-200 group relative">
      
      {/* Verified Movement Badge on top right */}
      <div className="absolute top-4 right-4">
        <DoerBadge variant="compact" />
      </div>

      {/* Avatar Container */}
      <div className="pt-2">
        <div className="relative">
          <Avatar 
            name={doer.full_name} 
            imageUrl={doer.avatar_url} 
            size="lg" 
            className="w-20 h-20 text-xl font-extrabold shadow-xs group-hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Name & Academic Credentials */}
      <div>
        <h3 className="font-extrabold text-[#0F172A] text-lg tracking-tight group-hover:text-[#4F46E5] transition-colors">
          {doer.full_name}
        </h3>
        <p className="text-xs font-semibold text-[#64748B] mt-0.5">
          {doer.headline || (doer.program ? `${doer.program} · ${doer.year || 'Student'}` : 'Software Engineer')}
        </p>
      </div>

      {/* Bio / Proof-of-Work Summary */}
      {doer.bio && (
        <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed px-1">
          {doer.bio}
        </p>
      )}

      {/* Skills Chips */}
      {doer.skills && doer.skills.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 w-full">
          {doer.skills.slice(0, 3).map((skill) => (
            <Badge 
              key={skill.name} 
              label={skill.name} 
              className="text-[11px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] font-medium px-2.5 py-1"
            />
          ))}
          {doer.skills.length > 3 && (
            <span className="text-[10px] font-bold text-[#94A3B8] self-center">
              +{doer.skills.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* High-Contrast Editorial "View Profile" CTA (Upgraded from faint gray) */}
      <div className="w-full mt-auto pt-3 border-t border-[#F1F5F9]">
        <Link href={`/doers/${doer.username || doer.id}`} className="w-full block">
          <Button 
            variant="dark" 
            size="md" 
            className="w-full font-bold text-xs sm:text-sm bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-xs rounded-xl flex items-center justify-center gap-2 group-hover:bg-[#4F46E5] transition-colors"
          >
            <span>View Profile</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
