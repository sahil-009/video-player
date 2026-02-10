import { Video } from '../types'
import { Play } from 'lucide-react'

interface VideoCardProps {
  video: Video
  onSelect: (video: Video) => void
  isPlaying: boolean
  variant?: 'grid' | 'row'
}

export default function VideoCard({ video, onSelect, isPlaying, variant = 'grid' }: VideoCardProps) {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const isRow = variant === 'row'

  return (
    <div
      className={`cursor-pointer group transition-transform duration-200 active:scale-[0.98] ${isRow ? 'hover:scale-[1.03]' : 'hover:scale-105'
        }`}
      onClick={() => onSelect(video)}
    >
      <div
        className={`relative bg-gray-800 overflow-hidden ${isRow ? 'w-64 sm:w-72 aspect-video rounded-md' : 'aspect-video rounded-lg'
          }`}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
          {formatDuration(video.duration)}
        </div>
        {isPlaying && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-white fill-current" />
            </div>
          </div>
        )}
      </div>
      <div className={`${isRow ? 'mt-2 w-64 sm:w-72' : 'mt-2'}`}>
        <h3 className="text-sm font-medium line-clamp-2 text-white group-hover:text-white/90 transition-colors">
          {video.title}
        </h3>
        {!isRow && (
          <div className="mt-1">
            <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
              {video.category}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
