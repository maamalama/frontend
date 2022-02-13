import { useEffect, useState } from 'react'
import { ERC20Token, tokens } from '../data/tokens'
import { Filter, useFilters } from '../hooks/useFilters'
import { useLazyEffect } from '../hooks/useLazyEffect'
import { FilterUI } from './FilterUI'
import styles from './Filter.module.css'

export const OwnsCrypto = ({ filter }: { filter: Filter }) => {
  const editFilter = useFilters((state) => state.editFilter)
  const [amount, setAmount] = useState('1')

  const [erc20Token, setErc20Token] = useState<ERC20Token>(tokens[0])

  useLazyEffect(() => {
    editFilter({
      ...erc20Token,
      type: 'erc20',
      id: filter.id,
      amount
    })
  }, [erc20Token, amount])

  useLazyEffect(() => {
    const defaultToken = tokens.find((token) => token.address === filter.address)

    setErc20Token(defaultToken)
  }, [filter])

  return (
    <FilterUI
      value={erc20Token}
      options={tokens}
      onChange={(v) => {
        setErc20Token(v)
      }}
      containerStyles={{ maxWidth: '330px' }}
      filterId={filter.id}
      actionText="own"
      childrenAfter={
        <>
          {' '}
          <input
            value={amount}
            minLength={1}
            min={0}
            onChange={(e) => setAmount(e.currentTarget.value)}
            className={styles.input}
          />
          {erc20Token.symbol}
        </>
      }
    />
  )
}
