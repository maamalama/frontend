import { ReactNode } from 'react'
import css from './Pagination.module.css'

type ButtonProps = {
  page: number
  children: ReactNode,
  onClick: (page: number) => any,
  className?: string,
}

const Button = ({ page, children, onClick, className }: ButtonProps) => {
  return <span className={`${css.pagination__button} ${className}`} onClick={() => onClick(page)}>{children}</span>
}

export const Pagination = ({ page, total, onSelect }) => {
  if (total === 0) return null

  let hasLeft = page !== 0
  let hasRight = page !== total - 1
  // (<< < 5 слева)?, текущую, (5 справа > >>)?

  if (page === 0) {
    '1 2 3 4 5 6 > >>'
  }

  return (
    <div className={css.pagination}>
      {hasLeft && <>
        <Button page={0} onClick={onSelect}>{'≪'}</Button>
        <Button page={page - 1} onClick={onSelect}>{'<'}</Button>
        {range(Math.max(0, page - 5), Math.max(0, page - 1))
          .map(i => <Button key={i} page={i} onClick={onSelect}>{i + 1}</Button>)}
      </>}

      <Button page={page} className={css.pagination__active} onClick={onSelect}>{page + 1}</Button>

      {hasRight && <>
        {range(Math.min(total - 1, page + 1), Math.min(total - 1, page + 5))
          .map(i => <Button key={i} page={i} onClick={onSelect}>{i + 1}</Button>)}
        <Button page={page + 1} onClick={onSelect}>{'>'}</Button>
        <Button page={total - 1} onClick={onSelect}>{'≫'}</Button>
      </>}
    </div>
  )
}

function range(incFrom, incTo) {
  if (incTo < incFrom) return []
  let length = incTo - incFrom + 1
  return Array.from({ length }, (_, i) => incFrom + i)
}
