export interface Project {
  id: string
  doer_id: string
  title: string
  description: string
  category: string
  image_url?: string
  tags: string[]
  github_url?: string
  live_url?: string
  created_at: string
  doer?: {
    full_name: string
    username: string
    avatar_url?: string
  }
}
