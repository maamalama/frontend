import styles from '../shared.module.css'
import indexStyles from './index.module.css'
import shared from '../shared.module.css'

const Snapshots = () => {
  return (
    <main className={`${styles.column} ${indexStyles.main}`}>
      <header className={shared.content_header}>
        <h1 className={shared.content_header__title}>Snapshots</h1>
        <div className={shared.content_header__chain}>
          <span className={shared.content_header__chain_icon} style={{backgroundImage: 'url(https://etherscan.io/token/images/lobsterdao_32.png)'}}/>
          lobsterdao
        </div>
      </header>

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40%' }}>
        work in progress
      </div>
    </main>
  )
}

export default Snapshots
