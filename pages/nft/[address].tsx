import { useEffect, useMemo, useState } from 'react'
import css from './shared.module.css'
import indexStyles from '../index.module.css'
import sharedStyles from '../../shared.module.css'
import { NftToErc20Holding, NftHolder, fetchNftAnalytics, ProtocolStat, randomify } from '../../lib/fetchNFTs'
import { Column } from 'react-table'
import { Table } from '../../components/Table'
import { TableData } from '../../lib/types'
import { ProgressBar } from '../../components/ProgressBar'
import { useRouter } from 'next/router'

const NftAnalyticsPage = () => {
  const [data, setData] = useState<{ token: any, protocols: any, networks: any, stats: any, holders: any, holdings: any, nftHoldings: any }>()
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  const router = useRouter()
  const address = router.query.address

  const fetchAllData = async (nftCollection) => {
    setData(null)
    setLoading(true)

    fetchNftAnalytics(nftCollection)
      .then(d => setData(randomify(nftCollection, d)))
      .catch(err => setError(err?.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { address && fetchAllData(address) }, [address])

  const holdingsColumns = useMemo(
    (): Column<NftToErc20Holding>[] => [{
      Header: 'Token',
      accessor: (row) => row.token, // accessor is the "key" in the data,
      Cell: ({ value }) => (
        <div className={css.holdingsTokenCell}>
          <div className={css.holdingsIcon} style={{ backgroundImage: `url(${value.logo})` }}/>
          <a href={`https://etherscan.io/token/${value.address}`} className={`${css.inTableLink} ${value.name ? '' : css.addressLink}`}>
            {value.name || value.address.slice(0, 20) + '…'}
          </a>
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

  const protocolsColumns = useMemo(
    (): Column<ProtocolStat>[] => [{
      Header: 'Protocol',
      accessor: (row) => row,
      Cell: ({ value }) => (
        <div className={css.holdingsTokenCell}>
          <div className={css.holdingsIcon} style={{ backgroundImage: `url(${value.logo})` }}/>
          <a href={value.url} className={`${css.inTableLink}`}>
            {value.name}
          </a>
        </div>
      ),
    }, {
      Header: 'Last month',
      accessor: (row) => `${row.users_last_month} (${Math.round(row.users_last_month / data?.stats?.holdersTotal * 100)}%)`,
    }, {
      Header: 'In total',
      accessor: (row) => `${row.users_in_total} (${Math.round(row.users_in_total / data?.stats?.holdersTotal * 100)}%)`,
    }],
    [data?.stats?.holdersTotal]
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

  let loader = isLoading && <div><ProgressBar color="black"/></div>

  return (
    <main className={`${sharedStyles.column} ${indexStyles.main}`}>
      {data && <div className={css.holdingsTokenCell} style={{ position: 'fixed', transform: 'rotate(+90deg)', transformOrigin: 'left', top: '0', left: '256px' }}>
        <div className={css.holdingsIcon} style={{ backgroundImage: `url(${data.token.logo})` }}/>
        <a href={`https://etherscan.io/token/${data.token.address}`} className={`${css.inTableLink} ${data.token.name ? '' : css.addressLink}`}>
          {data.token.name || data.token.address.slice(0, 20) + '…'}
        </a>
      </div>}

      <div className={sharedStyles.column} style={{ gap: '10px', marginBottom: '45px' }}>
        {!error &&
          <div className={indexStyles.list}>
            {/*{data && <h4 className={indexStyles.h1}>*/}
            {/*  <img src={data.token.logo} width={36} height={36}/> {data.token.name || data.token.address}</h4>}*/}

            <h4 className={indexStyles.h4}>Token Stats</h4>
            <div className={css.platesArray}>
              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>total holders</div>
                  <h3 className={css.plateValue}>{loader || data && data.stats.holdersTotal}</h3>
                </article>
              </div>

              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>avg net worth</div>
                  <h3 className={css.plateValue}>
                    {loader || data && (prettyNetWorth(data.stats.avgNetWorthInUsd) || formatBigNum(data.stats.avgNetWorthInUsd))}
                  </h3>
                </article>
              </div>

              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>median portfolio value</div>
                  <h3 className={css.plateValue}>
                    {loader || data && `$${Math.trunc(data.stats.medianPortfolioValueInUsd).toLocaleString()}`}
                  </h3>
                </article>
              </div>
            </div>

            <h4 className={indexStyles.h4}>Active Users</h4>
            <div className={css.platesArray}>
              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>last day</div>
                  <h3 className={css.plateValue}>
                    {loader || data && ((data.stats.activity.day / data.stats.holdersTotal * 100).toFixed(0) + '%')}
                  </h3>
                  <div className={css.plateSubValue}>
                    {data && data.stats.activity.day}
                  </div>
                </article>
              </div>

              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>last week</div>
                  <h3 className={css.plateValue}>
                    {loader || data && ((data.stats.activity.week / data.stats.holdersTotal * 100).toFixed(0) + '%')}
                  </h3>
                  <div className={css.plateSubValue}>
                    {data && data.stats.activity.week}
                  </div>
                </article>
              </div>

              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>last month</div>
                  <h3 className={css.plateValue}>
                    {loader || data && ((data.stats.activity.month / data.stats.holdersTotal * 100).toFixed(0) + '%')}
                  </h3>
                  <div className={css.plateSubValue}>
                    {data && data.stats.activity.month}
                  </div>
                </article>
              </div>
            </div>

            <h4 className={indexStyles.h4}>Holders</h4>
            <div className={`${sharedStyles.row} ${sharedStyles.container} ${css.container}`}>
              {loader || data && <Table {...{ error, isLoading, data: data.holders as TableData, columns: holdersColumns as Column<TableData[0]>[] }} />}
            </div>

            <div className={`${sharedStyles.row} ${sharedStyles.container}`}>
              <div className={css.splitTables}>
                <div>
                  <h4 className={`${indexStyles.h4} ${css.container} ${css.pb4}`} style={{ marginTop: 0 }}>Used Protocols</h4>
                  {loader || data && <Table {...{ error, isLoading, data: data.protocols as any, columns: protocolsColumns as any }} />}
                </div>
                <div>
                  <h4 className={`${indexStyles.h4} ${css.container} ${css.pb4}`} style={{ marginTop: 0 }}>Used Networks</h4>
                  {loader || data && <Table {...{ error, isLoading, data: data.networks as any, columns: protocolsColumns as any }} />}
                </div>
              </div>
            </div>

            <div className={`${sharedStyles.row} ${sharedStyles.container}`}>
              <div className={css.splitTables}>
                <div>
                  <h4 className={`${indexStyles.h4} ${css.container} ${css.pb4}`} style={{ marginTop: 0 }}>Top Token Holdings</h4>
                  {loader || data && <Table {...{ error, isLoading, data: data.holdings ?? [], columns: holdingsColumns }} />}
                </div>
                <div>
                  <h4 className={`${indexStyles.h4} ${css.container} ${css.pb4}`} style={{ marginTop: 0 }}>Top NFT Holdings</h4>
                  {loader || data && <Table {...{ error, isLoading, data: data.nftHoldings ?? [], columns: holdingsColumns }} />}
                </div>
              </div>
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
