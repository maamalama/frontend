import shared from '../shared.module.css'
import indexStyles from './index.module.css'

const Whitelists = () => {
  return (
    <main className={`${shared.column} ${indexStyles.main}`}>
      <header className={shared.content_header}>
        <h1 className={shared.content_header__title}>Whitelists</h1>
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

export default Whitelists
