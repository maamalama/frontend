import css from './Header.module.css'
import { useStore } from 'effector-react'
import { $myNft } from '../models/me/myNft'
import Link from 'next/link'

export const Header = ({ title }) => {
  const nft = useStore($myNft)
  if (!nft) return null

  return (
    <header className={css.content_header}>
      <h1 className={css.content_header__title}>{title}</h1>
      <div className={css.content_header__chain}>
        <span className={css.content_header__chain_icon} style={{ backgroundImage: `url(${nft.logo})` }}/>
        <Link href={'/nft'}><a style={{ color: 'inherit' }}>{nft.name}</a></Link>
      </div>
    </header>
  )
}
