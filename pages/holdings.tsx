import { useState } from 'react'
import { AddFilter } from '../components/AddFilter'
import { HoldsNFT } from '../components/HoldsNFT'
import { OwnsCrypto } from '../components/OwnsTokens'
import { useFilters } from '../hooks/useFilters'
import { fetchHoldings } from '../lib/fetchHoldings'
import styles from '../shared.module.css'
import indexStyles from './index.module.css'
import { Table } from '../components/Table'
import { TableData } from '../lib/types'

const Holdings = () => {
  const filters = useFilters((state) => state.filters)
  const [data, setData] = useState<TableData>()
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  const fetchAllData = () => {
    setLoading(true)

    const res = fetchHoldings(filters)

    res
      .then((res) => {
        if (res.status !== 200) {
          return setError(res.statusText)
        } else return res.json()
      })
      .then((json) => {
        setLoading(false)
        if (json) {
          setData(json)
          setError(undefined)
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <main className={`${styles.column} ${indexStyles.main}`}>
      <div className={styles.column} style={{ gap: '10px', marginBottom: '45px' }}>
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

        <div className={styles.row} style={{ justifyContent: 'space-between' }}>
          <AddFilter />
          <button
            className={indexStyles.queryButton}
            onClick={() => {
              fetchAllData()
            }}
          >
            Query
          </button>
        </div>
      </div>
      <Table {...{ error, isLoading, data }} />
    </main>
  )
}

export default Holdings
