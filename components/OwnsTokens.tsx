import { useEffect, useState } from 'react'
import { ERC20Token, tokens } from '../data/tokens'
import { FilterType, useFilters } from '../hooks/useFilters'
import { useLazyEffect } from '../hooks/useLazyEffect'
import { Filter } from './Filter'
import styles from './Filter.module.css'

export const OwnsCrypto = ({ filter }: { filter: FilterType }) => {
  const editFilter = useFilters((state) => state.editFilter)

  const defaultToken = tokens.find((token) => token.address === filter.address)
  const [amount, setAmount] = useState(0)
  const [erc20Token, setErc20Token] = useState<ERC20Token>(defaultToken)

  useLazyEffect(() => {
    if (erc20Token) {
      console.log(erc20Token.label)

      editFilter({
        type: 'erc20',
        id: filter.id,
        amount,
        address: erc20Token.address,
        network: erc20Token.network,
        label: erc20Token.label
      })
    }
  }, [erc20Token, amount])

  return (
    <Filter
      value={defaultToken}
      options={tokens}
      onChange={(v) => {
        setErc20Token(v)
      }}
      containerStyles={{ maxWidth: '293px' }}
    >
      {filter.id}. owns at least{' '}
      <input
        defaultValue={0}
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.valueAsNumber)}
        type="number"
        style={{ width: '6rem' }}
        className={styles.input}
      />
    </Filter>
  )
}
