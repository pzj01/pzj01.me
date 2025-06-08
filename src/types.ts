export interface Post {
  title: string
  date: string
  duration: string
  tags: string
  description: string
  path: string
  music?: string
}

export interface Comment {
  id: string
  post_slug: string
  user_id: string
  username: string
  content: string
  created_at: Date
  updated_at?: Date
}

export type Position = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center'
export type MessageType = 'success' | 'error' | 'warning' | 'info'
