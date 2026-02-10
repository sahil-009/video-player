export interface Video {
  id: string
  title: string
  duration: number // in seconds
  thumbnail: string
  videoUrl: string
  category: string
}

export interface VideoCategory {
  name: string
  videos: Video[]
}
