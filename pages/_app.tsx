import { AppProps } from 'next/app'
import Head from 'next/head'
import { ExternalLink } from 'react-external-link'
import '../global.css'
import styles from './_app.module.css'
import shared from '../shared.module.css'
import Link from 'next/link'
import { NavLink } from '../components/NavLink'
import { useRouter } from 'next/router'
import Connect from './connect'
import { useEffect } from 'react'
import { fetchAuthorNFTsFx } from '../lib/store'

const App = ({ pageProps, Component }: AppProps) => {
  useEffect(() => { fetchAuthorNFTsFx({}) }, [])

  const holders = color => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.9">
      <path d="M21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM21 19H3V5H13V9H21V19Z" fill={color}/>
    </g>
  </svg>

  const analytics = color => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.8954 9H11.1046C10.4945 9 10 9.49453 10 10.1046V19.8954C10 20.5055 10.4945 21 11.1046 21H12.8954C13.5055 21 14 20.5055 14 19.8954V10.1046C14 9.49453 13.5055 9 12.8954 9Z"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path
      d="M19.8954 3H18.1046C17.4945 3 17 3.49453 17 4.10456V19.8954C17 20.5055 17.4945 21 18.1046 21H19.8954C20.5055 21 21 20.5055 21 19.8954V4.10456C21 3.49453 20.5055 3 19.8954 3Z"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 21C6.10457 21 7 20.1046 7 19C7 17.8954 6.10457 17 5 17C3.89543 17 3 17.8954 3 19C3 20.1046 3.89543 21 5 21Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round"/>
  </svg>

  const giveaways = color => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.9">
      <path fillRule="evenodd" clipRule="evenodd" d="M20 8H4C3.448 8 3 8.448 3 9V11C3 11.552 3.448 12 4 12H20C20.552 12 21 11.552 21 11V9C21 8.448 20.552 8 20 8Z" stroke={color}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 21V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.6961 6.612C14.6181 7.734 12.9211 8 12.0991 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.0991 8C12.0991 8 11.6051 4.884 12.8201 3.62" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.696 6.61199C16.49 5.78599 16.49 4.44599 15.696 3.61999C14.902 2.79399 13.615 2.79399 12.821 3.61999" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        strokeLinejoin="round"/>
      <path d="M8.30396 6.612C9.38196 7.734 11.079 8 11.901 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.9009 8C11.9009 8 12.3949 4.884 11.1799 3.62" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.304 6.61199C7.51 5.78599 7.51 4.44599 8.304 3.61999C9.098 2.79399 10.385 2.79399 11.179 3.61999" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        strokeLinejoin="round"/>
      <path d="M19 12V20C19 20.552 18.552 21 18 21H6C5.448 21 5 20.552 5 20V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>

  const snapshots = color => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.9">
      <path
        d="M14.8792 10.1678C16.4363 11.7248 16.4363 14.2492 14.8792 15.8063C13.3222 17.3633 10.7978 17.3633 9.24076 15.8063C7.68374 14.2492 7.68374 11.7248 9.24076 10.1678C10.7978 8.61078 13.3222 8.61078 14.8792 10.1678"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path
        d="M21 9V18C21 19.105 20.105 20 19 20H5C3.895 20 3 19.105 3 18V9C3 7.895 3.895 7 5 7H7L8.462 4.496C8.641 4.189 8.97 4 9.326 4H14.63C14.981 4 15.306 4.184 15.487 4.484L17 7H19C20.105 7 21 7.895 21 9Z"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>

  const router = useRouter()
  const isConnectPage = router.route.includes('connect')

  if (isConnectPage) {
    return <>
      <Head>
        <link rel="icon" href="/logo_favicon.png" type="image/png"/>
        <title>Hashscan - web3 user analytics</title>
      </Head>
      <Connect {...pageProps}/>
    </>
  }

  return <>
    <Head>
      <link rel="icon" href="/logo_favicon.png" type="image/png"/>
      <title>Hashscan - web3 user analytics</title>
    </Head>
    <nav className={styles.nav}>
      <div className={styles.header}>
        <Link href="/">
          <a style={{ textDecoration: 'none' }}>
            <div className={shared.column}>
              <h1 className={styles.heading}>#hashscan</h1>
            </div>
          </a>
        </Link>
      </div>

      <div className={styles.nav_block}>
        <NavLink href="/holders" icon={holders}>Holders</NavLink>
        <NavLink href="/analytics" icon={analytics}>Analytics</NavLink>
        <NavLink href="/snapshots" icon={snapshots}>Snapshots</NavLink>
        <NavLink href="/whitelists" icon={giveaways}>Whitelists</NavLink>
      </div>
      <div>{/* filler */}</div>
      <footer className={styles.footer}></footer>
    </nav>
    <div className={styles.content}>
      <Component {...pageProps} />
    </div>
  </>
}

export default App
