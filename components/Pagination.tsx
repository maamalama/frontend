import { ReactNode } from 'react'
import css from './Pagination.module.css'

type ButtonProps = {
  page: number
  children: ReactNode,
  onClick?: (page: number) => any,
  className?: string,
}

const Button = ({ page, children, onClick, className }: ButtonProps) => {
  return <span className={`${css.pagination__button} ${className}`} onClick={() => onClick?.(page)}>{children}</span>
}

export const Pagination = ({ page, total, onSelect }) => {
  total = Math.max(1, Math.ceil(total || 0))

  let hasLeft = page !== 0
  let hasRight = page !== total - 1

  let first = 0, last = total - 1
  let prev = Math.max(first, page - 1)
  let next = Math.min(last, page + 1)

  // [First] [<] [Page 1 of 12] [>] [Last]
  return (
    <div className={css.pagination}>
      <Button page={first} className={hasLeft && css.pagination__active} onClick={onSelect}>First</Button>
      <Button page={prev} className={hasLeft && css.pagination__active} onClick={onSelect}>{'‹'}</Button>

      <Button page={page} className={css.pagination__button__wide}>{`Page ${page + 1} of ${total}`}</Button>

      <Button page={next} className={hasRight && css.pagination__active} onClick={onSelect}>{'›'}</Button>
      <Button page={last} className={hasRight && css.pagination__active} onClick={onSelect}>Last</Button>
    </div>
  )
}
