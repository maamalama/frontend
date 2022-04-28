import { useRef, useState } from 'react'
import { collections } from '../data/collections'
import { tokens } from '../data/tokens'
import { FilterType, useFilters } from '../hooks/useFilters'
import styles1 from './Filter.module.css'
import styles2 from './AddFilter.module.css'
import sharedStyles from '../shared.module.css'
import { useOnClickOutside } from '../hooks/useOnClickOutside'

const styles = { ...styles1, ...styles2, ...sharedStyles }

type Options = { label: string; value: FilterType | false; caption: string }

const options: Options[] = [
  { label: 'Hold NFTs', value: 'nft', caption: 'Users who have NFT(s) in their wallet' },
  { label: 'Own ERC-20 tokens', value: 'erc20', caption: 'Users who own ERC-20 tokens' },
  { label: 'Owns ENS', value: false, caption: 'Owns ENS domain name' },
  { label: 'OpenSea trader', value: false, caption: 'Traded on OpenSea' },
  {
    label: 'Import users from CSV',
    caption: 'import users from CSV',
    value: false
  }
]

export const AddFilter = () => {
  const addFilter = useFilters((state) => state.addFilter)

  const [isExpanded, setExpanded] = useState(false)

  const ref = useRef<HTMLDivElement>()

  useOnClickOutside(ref, () => setExpanded(false))

  return (
    <div ref={ref} className={`${styles.row} ${styles.container}`} style={{ width: '100%', maxWidth: '530px' }}>
      <button className={styles.addFilterButton} onClick={() => setExpanded((x) => !x)}>
        Add filter
      </button>
      <div role="listbox" style={{ display: isExpanded ? 'flex' : 'none' }} className={styles.filterList}>
        <div style={{ fontSize: '0.8rem', color: 'gray', fontWeight: 'bold', paddingLeft: '16px', paddingTop: '12px' }}>
          Filters
        </div>
        {options.map((option, idx) => (
          <button
            key={idx}
            role="listitem"
            className={styles.filterButton}
            style={{ cursor: option.value === false ? 'not-allowed' : 'pointer' }}
            disabled={option.value === false}
            onClick={() => {
              if (option.value) {
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
                }
              }

              setExpanded(false)
            }}
          >
            {option.label} <div className={styles.caption}>{option.caption}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
