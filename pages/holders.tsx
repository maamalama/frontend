import indexStyles from './index.module.css'
import shared from '../shared.module.css'
import css from './holders.module.css'
import search from '../public/search.svg'

const Holders = () => {
  let nft = {
    icon: 'https://etherscan.io/token/images/lobsterdao_32.png',
    name: 'lobsterdao',
  }

  return (
    <div className={`${shared.column} ${indexStyles.main}`}>
      <header className={shared.content_header}>
        <h1 className={shared.content_header__title}>Holders</h1>
        <div className={shared.content_header__chain}>
          <span className={shared.content_header__chain_icon} style={{ backgroundImage: `url(${nft.icon})` }}/>
          {nft.name}
        </div>
      </header>

      <main className={css.content}>
        <div className={css.search_bar}>
          <img src={'/search.svg'} width={32} height={32} className={css.search_icon} alt=""/>
          <input type="text" placeholder="Search by address or ENS" className={css.search_input}/>
        </div>
      </main>
    </div>
  )
}

export default Holders
