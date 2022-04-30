import { AppProps } from 'next/app'
import Head from 'next/head'
import { ExternalLink } from 'react-external-link'
import '../global.css'
import styles from './_app.module.css'
import shared from '../shared.module.css'
import Link from 'next/link'

const App = ({ pageProps, Component }: AppProps) => (
  <>
    <Head>
      <link rel="icon" href="/logo_favicon.png" type="image/png" />
      <title>Hashscan - web3 user analytics</title>
    </Head>
    <nav className={styles.nav}>
      <Link href="/">
        <a style={{ textDecoration: 'none' }}>
          <div className={shared.column}>
            <h1 className={styles.heading}>Hashscan</h1>
            <h2 className={styles.subheading}>web3 user analytics</h2>
          </div>
        </a>
      </Link>
      <Link href="/events">Users & events</Link>
      <Link href="/holdings">Holdings</Link>
      <Link href="/nft">NFT analytics</Link>
      <ExternalLink className={styles.signUpLink} href="https://vey568uwvva.typeform.com/to/S5EG2s8Y">
        Subscribe for updates
      </ExternalLink>
    </nav>
    <Component {...pageProps} />
    <footer className={styles.footer}>
      We're open for partnerships, find us on <ExternalLink href="https://twitter.com/jackqack">Twitter</ExternalLink>
    </footer>
  </>
)

export default App
