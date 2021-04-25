import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import styles from './episode.module.scss'
import { api } from '../../../services/api'
import { convertDurationToTimeString } from '../../../utils/convertDurationToTimeString'

interface Episode {
  id: string
  title: string
  members: string
  thumbnail: string
  publishedAt: string
  duration: number
  description: string 
  durationAsString: string
  url: string
}

interface EpisodeProps {
  episode: Episode
}

export default function Episode({episode}: EpisodeProps){
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>
        <Image width={760} height={160} src={episode.thumbnail} objectFit="cover"/>
        <button type="button">
          <img src="/play.svg" alt="Play"/>
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }}></div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limits: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const paths = data.map(episode => {
    return {
      params: episode.id
    }
  })


  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params
  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale : ptBR}),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,

  }

  return {
    props: {
      episode
    },
    revalidate: 60*60*24 //24hrs
  }
}