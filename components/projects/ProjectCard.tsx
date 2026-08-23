import { Project } from '@/types'
import Badge from '@/components/ui/Badge'
import { Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
  authorId?: string
}

export default function ProjectCard({ project, authorId }: ProjectCardProps) {
  const projectLink = authorId 
    ? `/projects/${project.id}?fromProfile=${authorId}` 
    : `/projects/${project.id}`

  return (
    <Link 
      href={projectLink}
      className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden flex flex-col hover:shadow-md hover:border-[#CBD5E1] transition-all group cursor-pointer"
    >
      {/* Project Thumbnail / Banner */}
      <div className="w-full h-44 bg-[#EEF2FF] border-b border-[#E2E8F0] overflow-hidden relative">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#4F46E5]/40 group-hover:text-[#4F46E5]/70 transition-colors">
            <ImageIcon size={36} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        {project.category && (
          <span className="text-[11px] font-bold tracking-wider text-[#4F46E5] uppercase">
            {project.category}
          </span>
        )}

        <h4 className="text-lg font-bold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors leading-snug">
          {project.title}
        </h4>

        <p className="text-xs text-[#64748B] flex-1 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} label={tag} className="text-[10px] bg-[#F1F5F9] text-[#334155] px-2.5 py-0.5 rounded-md" />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
