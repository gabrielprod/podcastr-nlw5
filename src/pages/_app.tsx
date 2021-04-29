import '../styles/global.scss'

import Header from '../components/Header'
import styles from '../styles/app.module.scss'
import Player from '../components/Player'
import { PlayerContextProvider } from '../context/PlayerContext'

function MyApp({ Component, pageProps }) {
 

  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header/>
          <Component {...pageProps} />
        </main>
        <Player/>
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
