import css from './[address].module.css'
import { useRouter } from 'next/router'
import { useStoreMap } from 'effector-react'
import { $nfts } from '../../models/me/myNfts'

const Address = () => {
  let router = useRouter()
  let address = globalThis.window
    ? window.location.pathname.slice(1 + window.location.pathname.lastIndexOf('/'))
    : router.query.address

  let nft = useStoreMap($nfts, nfts => nfts.find(n => n.address == address) ?? null)

  if (!nft) return (
    <main className={css.main}>
      Such NFT doesn't exist in our database.
    </main>
  )

  return (
    <main className={css.main}>
      <div className={css.logo}>#hashscan</div>
      <div className={css.card}>
        <img className={css.img} src={nft.logo} height={80} width={80} alt="logo"/>
        <div className={css.profile}>Connect holder profile</div>
        <div className={css.desc}>Connect {nft.name} holder profile to be enrolled to whitelists, giveaways and future partnerships</div>

        <div className={css.connectLayout} style={{ marginTop: '32px' }}>
          <div className={css.name}><img src={'/cryptos/eth.svg'} width={24} height={24} alt=""/>&nbsp;&nbsp;Wallet</div>
          <div className={css.space}/>
          <div className={css.connectedWallet}>jackqack.eth</div>
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

export default Address
