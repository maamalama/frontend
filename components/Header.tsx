import css from './Header.module.css'
import { useStore } from 'effector-react'
import { $myNft, setMyNftAddress, $nfts } from '../models/me'
import Link from 'next/link'
import { useState } from 'react'

export const Header = ({ title }) => {
  const nft = useStore($myNft)
  const nfts = useStore($nfts)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={css.content_header}>
      <h1 className={css.content_header__title}>{title}</h1>
      <div>
        {!!nft && <div className={css.content_header__chain} onClick={() => setIsOpen(true)}>
            <span className={css.content_header__chain_icon} style={{ backgroundImage: `url(${nft.logo})` }}/>
            <Link href={''} passHref={false}><a style={{ color: 'inherit' }} onClick={() => setIsOpen(true)}>{nft.name}</a></Link>
          </div>}
        <div className={`${css.selector} ${isOpen && css.selector__shown}`}>
          {nfts?.map(nft => (
            <div key={nft.address} className={css.selector__item} onClick={() => setMyNftAddress(nft.address) && setIsOpen(false)}>
              <div className={css.content_header__chain}>
                <span className={css.content_header__chain_icon} style={{ backgroundImage: `url(${nft.logo})` }}/>
                {nft.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
