import { useEffect, useState } from 'react'
import { Collection, collections } from '../data/collections'
import { Filter, useFilters } from '../hooks/useFilters'
import { useLazyEffect } from '../hooks/useLazyEffect'
import { FilterUI } from './FilterUI'
import styles from './Filter.module.css'

export const HoldsNFT = ({ filter }: { filter: Filter }) => {
  const editFilter = useFilters((state) => state.editFilter)

  const [amount, setAmount] = useState('1')

  const [collection, setCollection] = useState<Collection>(collections[0])

  useLazyEffect(() => {
    editFilter({
      ...collection,
      type: 'nft',
      id: filter.id,
      amount
    })
  }, [collection, amount])

  useLazyEffect(() => {
    const defaultCollection = collections.find((token) => token.address === filter.address)
    setCollection(defaultCollection)
  }, [filter])

  return (
    <FilterUI
      value={collection}
      options={collections}
      containerStyles={{ maxWidth: '350px' }}
      onChange={(v) => {
        setCollection(v)
      }}
      filterId={filter.id}
      actionText="hold"
      childrenAfter={
        <>
          <input
            value={amount}
            minLength={1}
            onChange={(e) => setAmount(e.currentTarget.value)}
            style={{ width: '6rem' }}
            className={styles.input}
          />
          <div>NFTs</div>
        </>
      }
    />
  )
}
