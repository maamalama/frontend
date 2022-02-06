import React, { useMemo, useState } from 'react'
import { AddFilter } from '../components/AddFilter'
import { HoldsNFT } from '../components/HoldsNFT'
import { OwnsCrypto } from '../components/OwnsTokens'
import { useFilters } from '../hooks/useFilters'
import indexStyles from './index.module.css'
import shared from '../shared.module.css'
import dynamic from 'next/dynamic'
import { Select } from '../components/Select'
import { events } from '../data/events'
import { CurrentValue } from '../components/select/CurrentValue'
import { SelectOption } from '../components/select/Option'
import { fetchChart } from '../lib/fetchChart'

const Chart = dynamic(() => import('../components/Charts'), { ssr: false })

const styles = { ...indexStyles, ...shared }

const Index = () => {
  const filters = useFilters((state) => state.filters)
  const [chartData, setChartData] = useState<{ value: number; time: string }[]>()
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.heading}>On-chain user analytics</h1>
      </header>
      {/* {JSON.stringify(filters, null, 2)} */}
      <main className={`${styles.column}`} style={{ gap: '45px', paddingTop: '35px' }}>
        <div className={styles.column} style={{ gap: '16px' }}>
          <h3 className={styles.h3}>Filter users</h3>
          <div className={styles.list}>
            {filters.map((filter) => {
              switch (filter.type) {
                case 'erc20':
                  return <OwnsCrypto filter={filter} />
                case 'nft':
                  return <HoldsNFT filter={filter} />
              }
            })}
          </div>
          <div className={shared.row} style={{ justifyContent: 'space-between' }}>
            <AddFilter />
            <button
              className={indexStyles.queryButton}
              onClick={() => {
                setLoading(true)
                fetchChart(filters)
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
        </div>
        <div className={styles.column} style={{ gap: '16px' }}>
          <h3 className={styles.h3}>Events</h3>
          <Select
            placeholder="Select event"
            options={events}
            components={{ SingleValue: CurrentValue, Option: SelectOption }}
          />
        </div>
        <Chart isLoading={isLoading} entries={chartData} error={error} />
      </main>
    </>
  )
}

export default Index
