import { Skill } from './skill'
import { Project } from './project'

// Doer / User types
export type UserRole = 'visitor' | 'doer' | 'admin'
export type UserStatus = 'pending' | 'approved' | 'rejected'

export interface User {
  id: string
  email: string
  full_name: string
  username: string
  avatar_url?: string
  role: UserRole
  status: UserStatus
  program?: string
  year?: string
  bio?: string
  github_url?: string
  linkedin_url?: string
  portfolio_url?: string
  is_featured: boolean
  created_at: string
}

export interface Doer extends User {
  skills: Skill[]
  projects: Project[]
}
