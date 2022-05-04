import { AppProps } from 'next/app'
import Head from 'next/head'
import { ExternalLink } from 'react-external-link'
import '../global.css'
import styles from './_app.module.css'
import shared from '../shared.module.css'
import Link from 'next/link'
import { NavLink } from '../components/NavLink'

const App = ({ pageProps, Component }: AppProps) => (
  <>
    <Head>
      <link rel="icon" href="/logo_favicon.png" type="image/png"/>
      <title>Hashscan - web3 user analytics</title>
    </Head>
    <nav className={styles.nav}>
      <div className={styles.header}>
        <Link href="/">
          <a style={{ textDecoration: 'none' }}>
            <div className={shared.column}>
              <h1 className={styles.heading}>Hashscan</h1>
              <h2 className={styles.subheading}>web3 user analytics</h2>
            </div>
          </a>
        </Link>
      </div>

      <div className={styles.nav_block}>
        <NavLink href="/nft" className={styles.nav_block__item} activeClassName={styles.active}>NFT analytics</NavLink>
        <NavLink href="/events" className={styles.nav_block__item} activeClassName={styles.active}>Users & events</NavLink>
        <NavLink href="/holdings" className={styles.nav_block__item} activeClassName={styles.active}>Holdings</NavLink>
      </div>
      <div>{/* filler */}</div>
      <footer className={styles.footer}>
        <div style={{ margin: '12px 0' }}>
          <ExternalLink className={styles.signUpLink} href="https://vey568uwvva.typeform.com/to/S5EG2s8Y">
            Subscribe for updates
          </ExternalLink>
        </div>
        <div>
          We're open for partnerships,<br/>
          find us on <ExternalLink href="https://twitter.com/jackqack">Twitter</ExternalLink>
        </div>
      </footer>
    </nav>
    <div className={styles.content}>
      <Component {...pageProps} />
    </div>
  </>
)

export default App
