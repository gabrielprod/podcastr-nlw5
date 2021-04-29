import { useState, ReactNode, createContext, useContext  } from 'react'

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
    hasNext: boolean
    hasPrevious: boolean
    isLooping: boolean
    isShuffling: boolean
    play: (episode: Episode) => void
    playList: (episodeList: Episode[], index: number) => void
    playNext: () => void
    playPrevious: () => void
    togglePlay: () => void
    toggleLoop: () => void
    toggleShuffle: () => void
    setPlayingState: (state: boolean) => void
    clearPlayerState: () => void
}

export const PlayerContext = createContext({} as PlayerContextData)

interface PlayerContextProviderProps {
    children: ReactNode
}

export function PlayerContextProvider({children} : PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)

    function play (episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function playList (episodeList: Episode[], index:number) {
        setEpisodeList(episodeList)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping)
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    function clearPlayerState(){
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext(){
        if(isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        }else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)    
        }
    }

    function playPrevious(){
        if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    return (
        <PlayerContext.Provider 
        value={{ 
            episodeList, 
            currentEpisodeIndex, 
            isPlaying, 
            hasPrevious,
            hasNext,
            isLooping,
            isShuffling,
            toggleLoop,
            play, 
            togglePlay, 
            toggleShuffle,
            playList,
            playNext,
            playPrevious,
            setPlayingState,
            clearPlayerState }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}
