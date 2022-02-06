import React, { useMemo, useState } from 'react'
import { AddFilter } from '../components/AddFilter'
import { HoldsNFT } from '../components/HoldsNFT'
import { OwnsCrypto } from '../components/OwnsTokens'
import { useFilters } from '../hooks/useFilters'
import indexStyles from './index.module.css'
import shared from '../shared.module.css'
import dynamic from 'next/dynamic'
import { Select } from '../components/Select'
import { EventInfo, events } from '../data/events'
import { CurrentValue } from '../components/select/CurrentValue'
import { SelectOption } from '../components/select/Option'
import { fetchChart } from '../lib/fetchFilters'
import { useLazyEffect } from '../hooks/useLazyEffect'
import { fetchEvent } from '../lib/fetchEvent'
import { ChartData } from '../lib/types'

const Chart = dynamic(() => import('../components/Charts'), { ssr: false })

const styles = { ...indexStyles, ...shared }

const Index = () => {
  const filters = useFilters((state) => state.filters)
  const [chartData, setChartData] = useState<ChartData>()
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)
  const [event, setEvent] = useState<EventInfo>()

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.heading}>On-chain user analytics</h1>
      </header>
      {/* {JSON.stringify(filters, null, 2)} */}
      <main className={`${styles.column}`} style={{ gap: '45px' }}>
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

          <AddFilter />
        </div>
        <div className={styles.column} style={{ gap: '16px' }}>
          <h3 className={styles.h3}>Events</h3>
          <Select
            onChange={(event: EventInfo) => setEvent(event)}
            placeholder="Select event"
            options={events}
            components={{ SingleValue: CurrentValue, Option: SelectOption }}
          />
        </div>

        <button
          className={indexStyles.queryButton}
          onClick={() => {
            setLoading(true)

            const res: Promise<Response> = event ? fetchEvent(filters, event) : fetchChart(filters)

            res
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

        <Chart isLoading={isLoading} entries={chartData} error={error} />
      </main>
    </>
  )
}

export default Index
