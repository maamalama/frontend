import css from './[address].module.css'
import { useRouter } from 'next/router'
import { useStore, useStoreMap } from 'effector-react'
import { $nfts, $nftsIsLoading, Nft } from '../../models/me'
import { WagmiConfig, createClient, useAccount, useEnsName, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const wagmiClient = createClient({
  autoConnect: true,
})

const Connect = () => {
  let router = useRouter()
  let address = globalThis.window
    ? window.location.pathname.slice(1 + window.location.pathname.lastIndexOf('/'))
    : router.query.address

  let nft = useStoreMap($nfts, nfts => nfts.find(n => n.address == address) ?? {} as Nft)
  let isLoading = useStore($nftsIsLoading)

  const { data: account } = useAccount()
  const { data: ensName } = useEnsName({ address: account?.address })
  const { connectAsync, isConnecting } = useConnect({
    connector: new InjectedConnector(),
  })

  if (!nft && !isLoading) return (
    <main className={css.main}>
      Such NFT doesn't exist in our database. </main>
  )

  return (
    <main className={css.main}>
      <div className={css.logo}>#hashscan</div>
      <div className={css.card}>
        <img className={css.img} src={nft.logo} height={80} width={80} alt=""/>
        <div className={css.profile}>Connect holder profile</div>
        <div className={css.desc}>Connect {nft.name} holder profile to be enrolled to whitelists, giveaways and future partnerships</div>

        <div className={css.connectLayout} style={{ marginTop: '32px' }}>
          <div className={css.name}><img src={'/cryptos/eth.svg'} width={24} height={24} alt=""/>&nbsp;&nbsp;Wallet</div>
          <div className={css.space}/>
          {account
            ? <div className={css.connectedWallet}>{ensName ?? (account.address?.slice(0, 6) + '…' + account.address?.slice(-4))}</div>
            : <div className={css.connect} onClick={() => !isConnecting && connectAsync()}>Connect</div>
          }
        </div>
        <div className={css.connectDivider}/>

        <div className={css.connectLayout}>
          <div className={css.name}><img src={'/twitter.png'} width={24} height={24} alt=""/>&nbsp;&nbsp;{'Twitter (optional)'}</div>
          <div className={css.space}/>
          <div className={css.connect}>Connect</div>
        </div>
        <div className={css.connectDivider}/>

        <div className={css.connectLayout}>
          <div className={css.name}><img src={'/discord.ico'} width={24} height={24} alt=""/>&nbsp;&nbsp;Discord</div>
          <div className={css.space}/>
          <div className={css.connect}>Connect</div>
        </div>

        <div className={css.space}/>
        <div className={css.save}>Save</div>
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

export default WalletWrapper
