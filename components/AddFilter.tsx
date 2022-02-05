import { useState } from 'react'
import { collections } from '../data/collections'
import { tokens } from '../data/tokens'
import { FilterType, useFilters } from '../hooks/useFilters'
import styles1 from './Filter.module.css'
import styles2 from './AddFilter.module.css'

const styles = { ...styles1, ...styles2 }

type Options = { label: string; value: FilterType }

const options: Options[] = [
  { label: 'Holds NFTs', value: 'nft' },
  { label: 'Owns ERC-20 tokens', value: 'erc20' },
  { label: 'Sold on OpenSea', value: 'opensea' }
]

export const AddFilter = () => {
  const addFilter = useFilters((state) => state.addFilter)

  const [isExpanded, setExpanded] = useState(false)

  return (
    <div className={`${styles.row} ${styles.container}`} style={{ width: '100%', maxWidth: '530px' }}>
      <button className={styles.addFilterButton} onClick={() => setExpanded((x) => !x)}>
        Add filter
      </button>
      <div style={{ display: isExpanded ? 'flex' : 'none' }} className={styles.filterList}>
        <div style={{ fontSize: '0.8rem', color: 'gray', fontWeight: 'bold', padding: '10px' }}>Filters</div>
        {options.map((option) => (
          <button
            className={styles.filterButton}
            onClick={() => {
              if (option.value === 'nft') {
                addFilter({
                  ...collections[0],
                  amount: '0',
                  type: 'nft'
                })
              } else if (option.value === 'erc20') {
                addFilter({
                  ...tokens[0],
                  amount: '0',
                  type: 'erc20'
                })
              } else if (option.value === 'opensea') {
                addFilter({ type: 'opensea', label: 'Traded on OpenSea' })
              }
              setExpanded(false)
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
