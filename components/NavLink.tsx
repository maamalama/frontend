import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import css from './AdminPanel.module.css'

export const NavLink = ({ href, children, icon }) => {
  const router = useRouter()
  let isActive = router.pathname.includes(href)

  return <Link href={href}>
    <a className={`${css.nav_block__item} ${isActive && css.nav_block__item__active}`}>
      <div className={css.nav_block__item__icon}>{icon(isActive ? '#2684FF' : '#D6DADE')}</div>
      <div className={css.nav_block__item__label}>{children}</div>
    </a>
  </Link>
}
