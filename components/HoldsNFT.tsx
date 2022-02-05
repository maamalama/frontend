import { useState } from 'react'
import { Collection, collections } from '../data/collections'
import { Filter, useFilters } from '../hooks/useFilters'
import { useLazyEffect } from '../hooks/useLazyEffect'
import { FilterUI } from './FilterUI'
import styles from './Filter.module.css'

export const HoldsNFT = ({ filter }: { filter: Filter }) => {
  const editFilter = useFilters((state) => state.editFilter)

  const removeFilter = useFilters((state) => state.removeFilter)

  const defaultCollection = collections.find((collection) => collection.address === filter.address)
  const [amount, setAmount] = useState('1')
  const [collection, setCollection] = useState<Collection>(defaultCollection)

  useLazyEffect(() => {
    editFilter({
      type: 'nft',
      id: filter.id,
      amount,
      address: collection.address,
      chainId: collection.chainId,
      label: collection.label
    })
  }, [collection, amount])

  return (
    <FilterUI
      defaultValue={collections[0]}
      options={collections}
      containerStyles={{ maxWidth: '350px' }}
      onChange={(v) => {
        setCollection(v)
      }}
      childrenAfter={
        <>
          <div>NFTs</div>
          <button className={styles.deleteButton} onClick={() => removeFilter(filter.id)}>
            ✖
          </button>
        </>
      }
    >
      holds{' '}
      <input
        value={amount}
        minLength={1}
        onChange={(e) => setAmount(e.currentTarget.value)}
        style={{ width: '6rem' }}
        className={styles.input}
      />
    </FilterUI>
  )
}
