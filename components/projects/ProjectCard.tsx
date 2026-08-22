import { Project } from '@/types'
import Badge from '@/components/ui/Badge'
import { ExternalLink, Code2, ImageOff } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* Project Thumbnail / Banner */}
      <div className="w-full h-44 bg-[#F3F4F6] flex items-center justify-center border-b border-[#E5E7EB] text-[#9CA3AF]">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageOff size={32} className="opacity-40" />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        {project.category && (
          <span className="text-xs font-semibold tracking-wider text-[#4F46E5] uppercase">
            {project.category}
          </span>
        )}

        <Link href={`/projects/${project.id}`}>
          <h4 className="text-lg font-bold text-[#111827] hover:text-[#4F46E5] transition-colors leading-snug">
            {project.title}
          </h4>
        </Link>

        <p className="text-sm text-[#6B7280] flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} label={tag} />
            ))}
          </div>
        )}

        {/* Action Links */}
        {(project.github_url || project.live_url) && (
          <div className="flex items-center gap-4 pt-3 mt-auto border-t border-[#F3F4F6] text-xs font-medium text-[#6B7280]">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-[#111827] transition-colors"
              >
                <Code2 size={14} /> Code
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-[#4F46E5] transition-colors"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
