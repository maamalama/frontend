import styles from '../shared.module.css'
import indexStyles from './index.module.css'
import shared from '../shared.module.css'

const Holders = () => {
  return (
    <main className={`${styles.column} ${indexStyles.main}`}>
      <header className={shared.content_header}>
        <h1 className={shared.content_header__title}>Holders</h1>
        <div className={shared.content_header__chain}>
          <span className={shared.content_header__chain_icon} style={{backgroundImage: 'url(https://etherscan.io/token/images/lobsterdao_32.png)'}}/>
          lobsterdao
        </div>
      </header>

    </main>
  )
}

export default Holders
