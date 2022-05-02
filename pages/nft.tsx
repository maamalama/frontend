import { useEffect, useMemo, useState } from 'react'
import { CollectionOfNFT } from '../components/CollectionOfNFT'
import css from './nft.module.css'
import indexStyles from './index.module.css'
import sharedStyles from '../shared.module.css'
import { fetchNFTs, fetchNftStats, fetchNftHolders, fetchNftHoldings, NftToErc20Holding, NftHolder } from '../lib/fetchNFTs'
import { Collection } from '../data/collections'
import { Column } from 'react-table'
import { Table } from '../components/Table'
import { TableData } from '../lib/types'

const NftAnalyticsPage = () => {
  const [data, setData] = useState<{ stats: any, holders: any, holdings: any }>()
  const [nftList, setNftList] = useState<Collection[]>([])
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    fetchNFTs().then(setNftList).catch(err => setError(err.message))
  }, [])

  const fetchAllData = async (nftCollection) => {
    setData(null)
    setLoading(true)

    let queries = [
      fetchNftStats(nftCollection),
      fetchNftHolders(nftCollection),
      fetchNftHoldings(nftCollection),
    ] as const

    const [stats, holders, holdings] =
      await Promise
        .all(
          queries.map(query =>
            query
              .then((json) => {
                setLoading(false)
                if (json) {
                  setError(undefined)
                  return json
                }
              })
              .catch((err) => {
                setError(err.message)
              })))

    setData({ stats, holders, holdings })
  }

  const holdingsColumns = useMemo(
    (): Column<NftToErc20Holding>[] => [{
      Header: 'Token',
      accessor: (row) => row.token.name // accessor is the "key" in the data,
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

  const holdersColumns = useMemo(
    (): Column<NftHolder>[] => [{
      Header: 'Token',
      accessor: (row) => row.address // accessor is the "key" in the data,
    }, {
      Header: 'Amount',
      accessor: 'amount'
    }, {
      Header: 'Net worth',
      accessor: (row) => prettyNetWorth(row.total_balance_usd)
    }],
    []
  )

  return (
    <main className={`${sharedStyles.column} ${indexStyles.main}`}>
      <div className={sharedStyles.column} style={{ gap: '10px', marginBottom: '45px' }}>
        <h3 className={indexStyles.h3}>Choose NFT collection</h3>
        <div className={indexStyles.list}>
          <CollectionOfNFT nfts={nftList} onClick={col => fetchAllData(col.address)}/>
        </div>

        {data && !isLoading && !error &&
          <div className={indexStyles.list}>
            <h4 className={indexStyles.h4}>Token Stats</h4>
            <div className={css.row}>
              <div className={css.plate}>
                <div className={css.box}>
                  {data.stats.holdersTotal}
                </div>
                total holders
              </div>

              <div className={css.plate}>
                <div className={css.box}>
                  {data.stats.avgNetWorthInUsd} $
                </div>
                avg net worth
              </div>

              <div className={css.plate}>
                <div className={css.box}>
                  {data.stats.medianPortfolioValueInUsd} $
                </div>
                median portfolio value
              </div>
            </div>

            <h4 className={indexStyles.h4}>Holders</h4>
            <div className={`${sharedStyles.row} ${sharedStyles.container}`}>
              <Table {...{ error, isLoading, data: data.holders as TableData, columns: holdersColumns as Column<TableData[0]>[] }} />
            </div>

            <h4 className={indexStyles.h4}>Top Token Holdings</h4>
            <div className={`${sharedStyles.row} ${sharedStyles.container}`}>
              <Table {...{ error, isLoading, data: data.holdings ?? [], columns: holdingsColumns }} />
            </div>
          </div>}

      </div>
    </main>
  )
}

function prettyNetWorth(amountInUsd: number): string {
  let digits = Math.log10(amountInUsd)

  let f = ([num, suffix]: [number, string]) => `$${Math.trunc(num).toLocaleString()}${suffix}`

  if (digits <= 4) return f([amountInUsd, '']) // 9999 -> $9999
  if (digits <= 6) return f([amountInUsd / 1000, 'k']) // 159'000 -> $159k
  if (digits <= 9) return f([amountInUsd / 1_000_000, 'b'])
  if (digits <= 12) return f([amountInUsd / 1_000_000_000, 'tn'])
  return '—'
}


export default NftAnalyticsPage
