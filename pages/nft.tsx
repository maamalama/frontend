import { useEffect, useMemo, useState } from 'react'
import { CollectionOfNFT } from '../components/CollectionOfNFT'
import css from './nft.module.css'
import indexStyles from './index.module.css'
import sharedStyles from '../shared.module.css'
import { fetchNFTs, NftToErc20Holding, NftHolder, fetchNftAnalytics } from '../lib/fetchNFTs'
import { Collection } from '../data/collections'
import { Column } from 'react-table'
import { Table } from '../components/Table'
import { TableData } from '../lib/types'
import { ProgressBar } from '../components/ProgressBar'

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

    fetchNftAnalytics(nftCollection)
      .then(setData)
      .catch(err => setError(err?.message))
      .finally(() => setLoading(false))
  }

  const holdingsColumns = useMemo(
    (): Column<NftToErc20Holding>[] => [{
      Header: 'Token',
      accessor: (row) => row.token, // accessor is the "key" in the data,
      Cell: ({ value }) => (
        <div className={css.holdingsTokenCell}>
          <div className={css.holdingsIcon} style={{ backgroundImage: `url(${value.logo})` }}/>
          <a href={`https://etherscan.io/token/${value.address}`} className={css.inTableLink}>{value.name}</a>
        </div>
      ),
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
      Header: 'Address',
      accessor: (row) => row.address, // accessor is the "key" in the data,
      Cell: ({ value }) => (
        <a href={`https://etherscan.io/address/${value}`} className={css.inTableLink}>{value}</a>
      )
    }, {
      Header: 'Amount',
      accessor: 'amount'
    }, {
      Header: 'Net worth',
      accessor: (row) => prettyNetWorth(row.total_balance_usd) || '—'
    }],
    []
  )

  return (
    <main className={`${sharedStyles.column} ${indexStyles.main}`}>
      <div className={sharedStyles.column} style={{ gap: '10px', marginBottom: '45px' }}>
        <h3 className={indexStyles.h4}>Choose NFT collection</h3>
        <div className={`${indexStyles.list} ${css.container}`}>
          <CollectionOfNFT nfts={nftList} onClick={col => fetchAllData(col.address)}/>
        </div>

        {isLoading && <div className={css.container}><ProgressBar color="black" /></div>}

        {data && !isLoading && !error &&
          <div className={indexStyles.list}>
            <h4 className={indexStyles.h4}>Token Stats</h4>

            <div className={css.platesArray}>
              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>total holders</div>
                  <h3 className={css.plateValue}>{data.stats.holdersTotal}</h3>
                </article>
              </div>

              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>avg net worth</div>
                  <h3 className={css.plateValue}>
                    {prettyNetWorth(data.stats.avgNetWorthInUsd) || formatBigNum(data.stats.avgNetWorthInUsd)}
                  </h3>
                </article>
              </div>

              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>median portfolio value</div>
                  <h3 className={css.plateValue}>
                    ${Math.trunc(data.stats.medianPortfolioValueInUsd).toLocaleString()}
                  </h3>
                </article>
              </div>
            </div>

            <h4 className={indexStyles.h4}>Holders</h4>
            <div className={`${sharedStyles.row} ${sharedStyles.container} ${css.container}`}>
              <Table {...{ error, isLoading, data: data.holders as TableData, columns: holdersColumns as Column<TableData[0]>[] }} />
            </div>

            <h4 className={indexStyles.h4}>Top Token Holdings</h4>
            <div className={`${sharedStyles.row} ${sharedStyles.container} ${css.container}`}>
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
  return `$${formatBigNum(amountInUsd)}`
}

function formatBigNum(amountInUsd: number): string {
  console.log(amountInUsd)
  let subs = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
  let uppers = `${Math.log10(amountInUsd) | 0}`.split('').map(ch => subs[ch] ?? ch).join('')
  return `10${uppers}`
}

export default NftAnalyticsPage
