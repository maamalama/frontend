import React from 'react'
import { AddFilter } from '../components/AddFilter'
import Chart from '../components/Charts'
import { HoldsNFT } from '../components/HoldsNFT'
import { OwnsCrypto } from '../components/OwnsTokens'
import { TradedOpenSea } from '../components/TradedOpenSea'
import { useFilters } from '../hooks/useFilters'
import styles from './index.module.css'

const Index = () => {
  const filters = useFilters((state) => state.filters)

  return (
    <div>
      <h1 className={styles.heading}>On-chain user analytics</h1>
      <h2 className={styles.subheading}>Some cool slogan</h2>
      <h3>Filter</h3>
      {JSON.stringify(filters)}
      <div className={styles.list}>
        {filters.map((filter) => {
          switch (filter.type) {
            case 'erc20':
              return <OwnsCrypto filter={filter} />
            case 'nft':
              return <HoldsNFT filter={filter} />
            case 'opensea':
              return <TradedOpenSea filter={filter} />
          }
        })}
        <AddFilter />
      </div>
    </div>
  )
}

export default Index
