import { useState } from 'react'
import Select from 'react-select'
import { collections } from '../data/collections'
import { tokens } from '../data/tokens'
import { FilterType, useFilters } from '../hooks/useFilters'
import styles from './Filter.module.css'

type Options = { label: string; value: FilterType }

const options: Options[] = [
  { label: 'Holds NFTs', value: 'nft' },
  { label: 'Owns ERC-20 tokens', value: 'erc20' },
  { label: 'Sold on OpenSea', value: 'opensea' }
]

export const AddFilter = () => {
  const addFilter = useFilters((state) => state.addFilter)

  const [currentOption, setCurrentOption] = useState<Options>(options[0])

  return (
    <div className={styles.row} style={{ width: '100%', maxWidth: '530px' }}>
      <Select
        onChange={(v) => setCurrentOption(v)}
        defaultValue={options[0]}
        styles={{ container: (style) => ({ ...style, width: '100%' }) }}
        options={options}
      />
      <button
        className={styles.plusButton}
        onClick={() => {
          if (currentOption.value === 'nft') {
            addFilter({
              ...collections[0],
              amount: '0',
              type: 'nft'
            })
          } else if (currentOption.value === 'erc20') {
            addFilter({
              ...tokens[0],
              amount: '0',
              type: 'erc20'
            })
          } else if (currentOption.value === 'opensea') {
            addFilter({ type: 'opensea', label: 'Traded on OpenSea' })
          }
        }}
      >
        +
      </button>
    </div>
  )
}
