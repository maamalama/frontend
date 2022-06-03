import { AppProps } from 'next/app'
import Head from 'next/head'
import '../global.css'
import { useEffect } from 'react'
import { init } from '../models/app'
import { useStore } from 'effector-react'
import { $myNft } from '../models/me'

const App = ({ pageProps, Component }: AppProps) => {
  useEffect(init, [])

  let nft = useStore($myNft)
  if (!nft) return null // it's used as in SSR myNft is null, so that thing forces rerender of the children

  return <>
    <Head>
      <link rel="icon" href="/logo_favicon.png" type="image/png"/>
      <title>Hashscan - web3 user analytics</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default App
