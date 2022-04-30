import { useMemo, useState } from 'react'
import { AddFilter } from '../components/AddFilter'
import { HoldsNFT } from '../components/HoldsNFT'
import { OwnsCrypto } from '../components/OwnsTokens'
import { useFilters } from '../hooks/useFilters'
import { fetchHoldings } from '../lib/fetchHoldings'
import styles from '../shared.module.css'
import indexStyles from './index.module.css'
import { Table } from '../components/Table'
import { TableData } from '../lib/types'
import { Column } from 'react-table'

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

  const columns = useMemo(
    (): Column<TableData[0]>[] => [{
      Header: 'Token',
      accessor: (row) => row.token.address // accessor is the "key" in the data,
    }, {
      Header: 'Holders',
      accessor: 'holders'
    }, {
      Header: 'Share',
      accessor: 'share',
      Cell: ({ value }) => `${value.toFixed(2)}%`
    }],
    []
  )

  return (
    <main className={`${styles.column} ${indexStyles.main}`}>
      <div className={styles.column} style={{ gap: '10px', marginBottom: '45px' }}>
        <h3 className={indexStyles.h3}>Filter users</h3>
        <div className={indexStyles.list}>
          {filters.map((filter) => {
            switch (filter.type) {
              case 'erc20':
                return <OwnsCrypto key={filter.id} filter={filter}/>
              case 'nft':
                return <HoldsNFT key={filter.id} filter={filter}/>
            }
          })}
        </div>

        <div className={styles.row} style={{ justifyContent: 'space-between' }}>
          <AddFilter/>
          <button className={indexStyles.queryButton} onClick={() => {
            fetchAllData()
          }}>
            Query
          </button>
        </div>
      </div>
      <Table {...{ error, isLoading, data, columns }} />
    </main>
  )
}

export default Holdings
