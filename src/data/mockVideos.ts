import { Video, VideoCategory } from '../types'

export const mockVideos: VideoCategory[] = [
  {
    name: 'Trending',
    videos: [
      {
        id: '1',
        title: 'Amazing Nature Documentary',
        duration: 480,
        thumbnail: 'https://picsum.photos/seed/nature1/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        category: 'Trending'
      },
      {
        id: '2',
        title: 'Tech Review Latest Smartphone',
        duration: 360,
        thumbnail: 'https://picsum.photos/seed/tech1/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        category: 'Trending'
      },
      {
        id: '3',
        title: 'Cooking Master Class',
        duration: 720,
        thumbnail: 'https://picsum.photos/seed/cooking1/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        category: 'Trending'
      }
    ]
  },
  {
    name: 'Music',
    videos: [
      {
        id: '4',
        title: 'Live Concert Performance',
        duration: 600,
        thumbnail: 'https://picsum.photos/seed/music1/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        category: 'Music'
      },
      {
        id: '5',
        title: 'Music Video Latest Hit',
        duration: 240,
        thumbnail: 'https://picsum.photos/seed/music2/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        category: 'Music'
      },
      {
        id: '6',
        title: 'Acoustic Session',
        duration: 300,
        thumbnail: 'https://picsum.photos/seed/music3/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        category: 'Music'
      }
    ]
  },
  {
    name: 'Sports',
    videos: [
      {
        id: '7',
        title: 'Championship Finals Highlights',
        duration: 480,
        thumbnail: 'https://picsum.photos/seed/sports1/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        category: 'Sports'
      },
      {
        id: '8',
        title: 'Training Session Pro Tips',
        duration: 360,
        thumbnail: 'https://picsum.photos/seed/sports2/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        category: 'Sports'
      },
      {
        id: '9',
        title: 'Extreme Sports Compilation',
        duration: 540,
        thumbnail: 'https://picsum.photos/seed/sports3/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        category: 'Sports'
      }
    ]
  },
  {
    name: 'Education',
    videos: [
      {
        id: '10',
        title: 'Science Explained Simply',
        duration: 420,
        thumbnail: 'https://picsum.photos/seed/edu1/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        category: 'Education'
      },
      {
        id: '11',
        title: 'History Documentary',
        duration: 900,
        thumbnail: 'https://picsum.photos/seed/edu2/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        category: 'Education'
      },
      {
        id: '12',
        title: 'Math Tutorial Advanced',
        duration: 600,
        thumbnail: 'https://picsum.photos/seed/edu3/320/180.jpg',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        category: 'Education'
      }
    ]
  }
]

export const getAllVideos = (): Video[] => {
  return mockVideos.flatMap(category => category.videos)
}

export const getVideoById = (id: string): Video | undefined => {
  return getAllVideos().find(video => video.id === id)
}

export const getVideosByCategory = (category: string): Video[] => {
  const categoryData = mockVideos.find(cat => cat.name === category)
  return categoryData ? categoryData.videos : []
}
