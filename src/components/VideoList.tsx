import { Video } from '../types'

interface VideoListProps {
  videos: Video[]
  currentVideoId: string
  onVideoSelect: (video: Video) => void
}

export default function VideoList({ videos, currentVideoId, onVideoSelect }: VideoListProps) {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-3">
      {videos.map((video) => (
        <div
          key={video.id}
          className={`flex space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
            video.id === currentVideoId 
              ? 'bg-gray-800' 
              : 'hover:bg-gray-900'
          }`}
          onClick={() => onVideoSelect(video)}
        >
          <div className="relative w-40 h-24 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
              {formatDuration(video.duration)}
            </div>
            {video.id === currentVideoId && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className={`text-sm font-medium line-clamp-2 ${
              video.id === currentVideoId ? 'text-blue-400' : 'text-white'
            }`}>
              {video.title}
            </h4>
            <p className="text-gray-400 text-xs mt-1">{video.category}</p>
            {video.id === currentVideoId && (
              <p className="text-blue-400 text-xs mt-1">Now playing</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
