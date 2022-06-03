import { AppProps } from 'next/app'
import Head from 'next/head'
import '../global.css'
import { useEffect } from 'react'
import { init } from '../models/app'

const App = ({ pageProps, Component }: AppProps) => {
  useEffect(init, [])
  return <>
    <Head>
      <link rel="icon" href="/logo_favicon.png" type="image/png"/>
      <title>Hashscan - web3 user analytics</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default App
