import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const NavLink = ({ href, children, className, activeClassName }) => {
  const router = useRouter()

  // let className = children.props.className || ''
  if (router.pathname.includes(href)) {
    className = `${className} ${activeClassName}`
  }

  return <Link href={href}><a className={className}>{children}</a></Link>
}
