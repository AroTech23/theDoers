import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { User } from '@/types'

interface DoerCardProps {
  doer: User & { skills?: { name: string }[] }
}

export default function DoerCard({ doer }: DoerCardProps) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
      <Avatar name={doer.full_name} imageUrl={doer.avatar_url} size="lg" />

      <div>
        <h3 className="font-semibold text-[#111827] text-base">{doer.full_name}</h3>
        <p className="text-sm text-[#6B7280] mt-0.5">
          {doer.program}
          {doer.year ? ` · ${doer.year}` : ''}
        </p>
      </div>

      {doer.bio && (
        <p className="text-sm text-[#6B7280] line-clamp-2">{doer.bio}</p>
      )}

      {doer.skills && doer.skills.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5">
          {doer.skills.slice(0, 3).map((skill) => (
            <Badge key={skill.name} label={skill.name} />
          ))}
        </div>
      )}

      <Link href={`/doers/${doer.username || doer.id}`} className="w-full mt-auto">
        <Button variant="outline" size="md" className="w-full">
          View Profile
        </Button>
      </Link>
    </div>
  )
}
