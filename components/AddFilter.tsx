import { useState } from 'react'
import Select from 'react-select'
import { collections } from '../data/collections'
import { tokens } from '../data/tokens'
import { useFilters } from '../hooks/useFilters'
import styles from './Filter.module.css'

type Options = { label: string; value: 'holds-nft' | 'owns-erc20' | 'sold-os' }

const options: Options[] = [
  { label: 'Holds NFTs', value: 'holds-nft' },
  { label: 'Owns ERC-20 tokens', value: 'owns-erc20' },
  { label: 'Sold on OpenSea', value: 'sold-os' }
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
          if (currentOption.value === 'holds-nft') {
            addFilter({
              ...collections[0],
              amount: 0,
              type: 'nft'
            })
          } else if (currentOption.value === 'owns-erc20') {
            addFilter({
              ...tokens[0],
              amount: 0,
              type: 'erc20'
            })
          }
        }}
      >
        +
      </button>
    </div>
  )
}
