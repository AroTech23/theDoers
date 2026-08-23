export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface Project {
  id: string
  doer_id: string
  title: string
  description: string
  category: string
  image_url?: string
  market?: string
  tags: string[]
  github_url?: string
  live_url?: string
  doc_url?: string
  created_at: string
  problem?: string
  current_state?: string
  desired_state?: string
  process?: ProcessStep[]
  solution?: string
  result?: string
  key_metric?: {
    value: string
    description: string
  }
  screenshots?: string[]
  doer?: {
    full_name: string
    username: string
    avatar_url?: string
    program?: string
    year?: string
    bio?: string
  }
}
