import { Project } from '@/types'
import Badge from '@/components/ui/Badge'
import { ExternalLink, Code2, ArrowRight, Image as ImageIcon } from 'lucide-react'
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
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden flex flex-col hover:shadow-md hover:border-[#CBD5E1] transition-all group">
      {/* Clickable Project Thumbnail / Banner */}
      <Link href={projectLink} className="block w-full h-44 bg-[#EEF2FF] border-b border-[#E2E8F0] overflow-hidden relative">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#4F46E5]/40 group-hover:text-[#4F46E5]/60 transition-colors">
            <ImageIcon size={36} />
            <span className="text-[10px] font-bold uppercase tracking-wider mt-1">View Case Study</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        {project.category && (
          <span className="text-[11px] font-bold tracking-wider text-[#4F46E5] uppercase">
            {project.category}
          </span>
        )}

        <Link href={projectLink}>
          <h4 className="text-lg font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors leading-snug">
            {project.title}
          </h4>
        </Link>

        <p className="text-xs text-[#64748B] flex-1 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} label={tag} className="text-[10px] bg-[#F1F5F9] text-[#334155] px-2.5 py-0.5 rounded-md" />
            ))}
          </div>
        )}

        {/* Bottom Actions: View Case Study & Resource Links */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-[#F1F5F9] text-xs">
          <Link
            href={projectLink}
            className="inline-flex items-center gap-1 font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors"
          >
            Explore Case Study <ArrowRight size={13} />
          </Link>

          <div className="flex items-center gap-2 text-[#64748B]">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                title="View Code"
                className="p-1 hover:text-[#0F172A] transition-colors"
              >
                <Code2 size={15} />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                title="Live Demo"
                className="p-1 hover:text-[#4F46E5] transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
