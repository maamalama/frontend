import styles from './connect.module.css'

const Connect = () => {
  return (
    <main className={styles.main}>
      <div className={styles.logo}>#hashscan</div>
      <div className={styles.card}>
        <img className={styles.img} src="/nfts/lobs.jpg" height={80} width={80} alt="logo" />
        <div className={styles.profile}>Connect holder profile</div>
        <div className={styles.desc}>Connect lobsterdao holder profile to be enrolled to whitelists, giveaways and future partnerships</div>

        <div className={styles.connectLayout} style={{ marginTop: '32px' }}>
          <div className={styles.name}><img src={'/cryptos/eth.svg'} width={24} height={24} />&nbsp;&nbsp;Wallet</div>
          <div className={styles.space} />
          <div className={styles.connectedWallet}>jackqack.eth</div>
        </div>
        <div className={styles.connectDivider} />

        <div className={styles.connectLayout}>
          <div className={styles.name}><img src={'/twitter.png'} width={24} height={24} />&nbsp;&nbsp;{"Twitter (optional)"}</div>
          <div className={styles.space} />
          <div className={styles.connect}>Connect</div>
        </div>
        <div className={styles.connectDivider} />

        <div className={styles.connectLayout}>
          <div className={styles.name}><img src={'/discord.ico'} width={24} height={24} />&nbsp;&nbsp;Discord</div>
          <div className={styles.space} />
          <div className={styles.connect}>Connect</div>
        </div>

        <div className={styles.space} />
        <div className={styles.save}>Save</div>
      </div>
    </main>
  )
}

export default Connect
