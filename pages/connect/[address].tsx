import css from './[address].module.css'
import { useRouter } from 'next/router'
import { useStore, useStoreMap } from 'effector-react'
import { $nfts, $nftsIsLoading, Nft, sendProfile } from '../../models/me'
import { WagmiConfig, createClient, useAccount, useEnsName, useConnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { BASE_URL } from '../../data/constants'
import { useEffect, useState } from 'react'

const wagmiClient = createClient({
  autoConnect: false,
})

const Row = ({ icon, title, isDisabled = false, isConnected = false, onConnect, children }) => {
  return (
    <div className={css.connectLayout}>
      <div className={css.name}><img src={icon} width={24} height={24} alt=""/>&nbsp;&nbsp;{title}</div>
      <div className={css.space}/>
      <div className={`${css.connect} ${isConnected && css.connected} ${isDisabled && css.disabled}`} onClick={() => !isConnected && !isDisabled && onConnect()}>
        {children}
      </div>
    </div>
  )
}

const Connect = () => {
  let router = useRouter()
  let address = globalThis.window
    ? window.location.pathname.slice(1 + window.location.pathname.lastIndexOf('/'))
    : router.query.address as string

  let nft = useStoreMap($nfts, nfts => nfts.find(n => n.address == address) ?? {} as Nft)
  let isLoading = useStore($nftsIsLoading)

  const { connectAsync, isDisconnected, status } = useConnect({
    connector: new InjectedConnector(),
  })
  const { data: account } = useAccount()
  const { data: ensName } = useEnsName({ address: account?.address })

  const [twitter, setTwitter] = useState(null)

  const payload = { nft: address, holder: account?.address, twitter }
  const { isLoading: isSignLoading, signMessageAsync, isSuccess } = useSignMessage({
    message: JSON.stringify(payload),
    async onSuccess(signature, variables) {
      await sendProfile({ signature, payload })
    },
  })

  useEffect(() => {
    const handleEvent = event => {
      const { data } = event
      if (data?.from === 'twitter') {
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

  const connectTwitter = () => {
    let url = `${BASE_URL}/profile/twitter`
    popupCenter({ url, title: 'Auth', w: 360, h: 420 })
  }

  if (!nft && !isLoading) {
    return <main className={css.main}>Such NFT doesn't exist in our database.</main>
  }

  return (
    <main className={css.main}>
      <div className={css.logo}>#hashscan</div>
      <div className={css.card}>
        <img className={css.img} src={nft.logo} height={80} width={80} alt=""/>
        <div className={css.profile}>Connect holder profile</div>
        <div className={css.desc}>Connect holder profile to be enrolled to whitelists, giveaways and future partnerships{nft.name ? ` with ${nft.name}` : ''}</div>

        <Row icon="/cryptos/eth.svg" title="Wallet" isConnected={!!account} onConnect={() => connectAsync().catch(() => {})}>
          {account
            ? ensName ?? (account.address?.slice(0, 6) + '…' + account.address?.slice(-4))
            : (isDisconnected ? 'Connect' : status.slice(0, 1).toUpperCase() + status.slice(1))
          }
        </Row>

        <div className={css.connectDivider}/>

        <Row icon="/twitter.png" title="Twitter" isConnected={twitter} onConnect={connectTwitter}>
          {twitter ? twitter?.screen_name : 'Connect'}
        </Row>

        <div className={css.connectDivider}/>

        <Row icon="/discord.ico" title="Discord (optional)" onConnect={() => {}} isDisabled={true}>
          Connect
        </Row>

        <div className={css.space}/>
        {isSuccess
          ? <div className={css.save} onClick={() => signMessageAsync().catch(() => {})}>Saved!</div>
          : <div className={css.save} onClick={() => signMessageAsync().catch(() => {})}>Save {isSignLoading ? '(loading)' : ''}</div>
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
