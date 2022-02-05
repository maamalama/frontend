import React, { useMemo, useState } from 'react'
import { parseUnits } from '@ethersproject/units'
import { AddFilter } from '../components/AddFilter'
import { HoldsNFT } from '../components/HoldsNFT'
import { OwnsCrypto } from '../components/OwnsTokens'
import { TradedOpenSea } from '../components/TradedOpenSea'
import { useFilters } from '../hooks/useFilters'
import indexStyles from './index.module.css'
import shared from '../shared.module.css'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('../components/Charts'), { ssr: false })

const styles = { ...indexStyles, ...shared }

const BASE_URL = 'https://awake-api.vercel.app/api'

const Index = () => {
  const filters = useFilters((state) => state.filters)
  const [chartData, setChartData] = useState<{ amount: number; time: string }[]>()
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.heading}>On-chain user analytics</h1>
        <h2 className={styles.subheading}>Query Ethereum users by condition</h2>
      </header>
      <main className={`${styles.column}`} style={{ gap: '20px' }}>
        <h3 style={{ margin: 0 }}>Filter users, who</h3>
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
        </div>
        <div className={shared.row} style={{ justifyContent: 'space-between' }}>
          <AddFilter />
          <button
            className={indexStyles.queryButton}
            onClick={() => {
              setLoading(true)
              const amounts = filters
                .map((x) => (x.type == 'erc20' ? parseUnits(x.amount, x.decimals).toString() : x.amount))
                .join(',')

              const addresses = filters.map((x) => x.address).join(',')
              const networks = filters.map((x) => x.chainId).join(',')

              fetch(`${BASE_URL}/users?tokens=${addresses}&amounts=${amounts}&days=90&network=${networks}`)
                .then((res) => {
                  if (res.status !== 200) {
                    return setError(res.statusText)
                  } else return res.json()
                })
                .then((json) => {
                  setLoading(false)
                  if (json) {
                    setChartData(json)
                  }
                })
                .catch((err) => setError(err.message))
            }}
          >
            Query
          </button>
        </div>
        <Chart isLoading={isLoading} entries={chartData} error={error} />
      </main>
    </>
  )
}

export default Index
