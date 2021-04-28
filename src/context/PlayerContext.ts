import { createContext } from 'react'

interface Episode {
    title: string
    members: string
    thumbnail: string
    duration: number
    url: string
}

interface PlayerContextData {
    episodeList: Array<Episode>
    currentEpisodeIndex: number
    isPlaying: boolean
    play: (episode: Episode) => void
    togglePlay: () => void
    setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as PlayerContextData)