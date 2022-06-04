import css from './[address].module.css'
import { useRouter } from 'next/router'
import { useStore, useStoreMap } from 'effector-react'
import { $nfts, $nftsIsLoading, Nft } from '../../models/me'
import { WagmiConfig, createClient, useAccount, useEnsName, useConnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { BASE_URL } from '../../data/constants'
import { useEffect, useState } from 'react'
import { verifyMessage } from 'ethers/lib/utils'

const wagmiClient = createClient({
  autoConnect: false,
})

const Connect = () => {
  let router = useRouter()
  let address = globalThis.window
    ? window.location.pathname.slice(1 + window.location.pathname.lastIndexOf('/'))
    : router.query.address

  let nft = useStoreMap($nfts, nfts => nfts.find(n => n.address == address) ?? {} as Nft)
  let isLoading = useStore($nftsIsLoading)

  const [twitter, setTwitter] = useState(null)

  const { data: account } = useAccount()
  const { data: ensName } = useEnsName({ address: account?.address })
  const { connectAsync, isConnecting } = useConnect({
    connector: new InjectedConnector(),
  })

  const { isLoading: isSignLoading, signMessage, isSuccess } = useSignMessage({
    message: JSON.stringify(twitter),
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data)
      console.log({ data, variables })
    },
  })

  useEffect(() => {
    const handleEvent = event => {
      const { data } = event
      if (data?.from === 'connect2') {
        event.source.close()
        window.focus()
        setTwitter(data.twitter)
      }
    }

    window.addEventListener('message', handleEvent, false)
    return function cleanup() {
      window.removeEventListener('message', handleEvent)
    }
  })

  const connectTwitter = async () => {
    let url = `${BASE_URL}/profile/twitter`
    popupCenter({ url, title: 'Auth', w: 360, h: 420 })
  }

  if (!nft && !isLoading) return (
    <main className={css.main}>
      Such NFT doesn't exist in our database.
    </main>
  )

  return (
    <main className={css.main}>
      <div className={css.logo}>#hashscan</div>
      <div className={css.card}>
        <img className={css.img} src={nft.logo} height={80} width={80} alt=""/>
        <div className={css.profile}>Connect holder profile</div>
        <div className={css.desc}>Connect holder profile to be enrolled to whitelists, giveaways and future partnerships{nft.name ? ` with ${nft.name}` : ''}</div>

        <div className={css.connectLayout} style={{ marginTop: '32px' }}>
          <div className={css.name}><img src={'/cryptos/eth.svg'} width={24} height={24} alt=""/>&nbsp;&nbsp;Wallet</div>
          <div className={css.space}/>
          {account
            ? <div className={css.connected}>{ensName ?? (account.address?.slice(0, 6) + '…' + account.address?.slice(-4))}</div>
            : <div className={css.connect} onClick={() => !isConnecting && connectAsync()}>Connect</div>
          }
        </div>
        <div className={css.connectDivider}/>

        <div className={css.connectLayout}>
          <div className={css.name}><img src={'/twitter.png'} width={24} height={24} alt=""/>&nbsp;&nbsp;Twitter</div>
          <div className={css.space}/>
          {twitter
            ? <div className={css.connected}>{twitter.screen_name}</div>
            : <div className={css.connect} onClick={() => connectTwitter()}>Connect</div>
          }
        </div>
        <div className={css.connectDivider}/>

        <div className={css.connectLayout}>
          <div className={css.name}><img src={'/discord.ico'} width={24} height={24} alt=""/>&nbsp;&nbsp;Discord (optional)</div>
          <div className={css.space}/>
          <div className={css.connect}>Connect</div>
        </div>

        <div className={css.space}/>
        {isSuccess
          ? <div className={css.save} onClick={() => signMessage()}>Saved!</div>
          : <div className={css.save} onClick={() => signMessage()}>Save {isSignLoading ? '(loading)' : ''}</div>
        }
      </div>
    </main>
  )
}

const WalletWrapper = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <Connect/>
    </WagmiConfig>
  )
}

function popupCenter({ url, title, w, h }) {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

  const systemZoom = width / window.screen.availWidth
  const left = (width - w) / 2 / systemZoom + dualScreenLeft
  const top = (height - h) / 2 / systemZoom + dualScreenTop
  const newWindow = window.open(url, title,
    `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
  )

  if (window.focus) newWindow.focus()
  return newWindow
}

export default WalletWrapper
