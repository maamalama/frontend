import { useEffect, useState } from 'react'
import { ERC20Token, tokens } from '../data/tokens'
import { Filter, useFilters } from '../hooks/useFilters'
import { useLazyEffect } from '../hooks/useLazyEffect'
import { FilterUI } from './FilterUI'
import styles from './Filter.module.css'

export const OwnsCrypto = ({ filter }: { filter: Filter }) => {
  const editFilter = useFilters((state) => state.editFilter)
  const removeFilter = useFilters((state) => state.removeFilter)

  const defaultToken = tokens.find((token) => token.address === filter.address)
  const [amount, setAmount] = useState('0')
  const [erc20Token, setErc20Token] = useState<ERC20Token>(defaultToken)

  useLazyEffect(() => {
    editFilter({
      type: 'erc20',
      id: filter.id,
      amount,
      address: erc20Token.address,
      chainId: erc20Token.chainId,
      label: erc20Token.label
    })
  }, [erc20Token, amount])

  return (
    <FilterUI
      value={erc20Token}
      options={tokens}
      onChange={(v) => {
        setErc20Token(v)
      }}
      containerStyles={{ maxWidth: '293px' }}
      childrenAfter={
        <button className={styles.deleteButton} onClick={() => removeFilter(filter.id)}>
          ✖
        </button>
      }
    >
      owns at least{' '}
      <input
        defaultValue={'0'}
        value={amount}
        minLength={1}
        onChange={(e) => setAmount(e.currentTarget.value)}
        type="number"
        style={{ width: '6rem' }}
        className={styles.input}
      />
    </FilterUI>
  )
}
