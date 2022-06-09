import { useMemo } from 'react'
import css from './nft/shared.module.css'
import indexStyles from './index.module.css'
import shared from '../shared.module.css'
import { Column } from 'react-table'
import { Table } from '../components/Table'
import { ProgressBar } from '../components/ProgressBar'
import { Header } from '../components/Header'
import { useStore } from 'effector-react'
import { $myNft } from '../models/me'
import { $stats, $metrics, $networks, $erc20Holdings, $nftHoldings, $protocols, NftHolding, ProtocolStat } from '../models/nft'
import { AdminPanel } from '../components/AdminPanel'

const NftAnalyticsPage = () => {
  const nft = useStore($myNft)

  const stats = useStore($stats)
  const metrics = useStore($metrics)
  const protocols = useStore($protocols)
  const networks = useStore($networks)
  const nftHoldings = useStore($nftHoldings)
  const erc20Holdings = useStore($erc20Holdings)

  const toPercent = (num: number) => stats.data && ((num / stats.data.total * 100).toFixed(0) + '%')

  const holdingsColumns = useMemo(
    (): Column<NftHolding>[] => [{
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
      Header: 'Users',
      accessor: (row) =>
        stats
          ? `${row.users_in_total} (${Math.round(row.users_in_total / stats.data?.total * 100)}%)`
          : `${row.users_in_total}`,
    }],
    [stats.data?.total]
  )

  const networksColumns = useMemo(
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
      accessor: (row) => `${row.users_last_month} (${Math.round(row.users_last_month / stats.data?.total * 100)}%)`,
    }, {
      Header: 'In total',
      accessor: (row) => `${row.users_in_total} (${Math.round(row.users_in_total / stats.data?.total * 100)}%)`,
    }],
    [stats.data?.total]
  )

  let loader = isLoading => isLoading && <div><ProgressBar color="black"/></div>

  return (
    <AdminPanel>
      <main className={`${shared.column} ${indexStyles.main}`}>
        <Header title="Analytics"/>

        <div className={`${shared.column} ${shared.page_content}`} style={{ gap: '10px', marginBottom: '45px', marginTop: '16px' }}>

          <div className={indexStyles.list}>
            <h4 className={indexStyles.h4}>Social stats</h4>
            <div className={`${css.container} ${css.social_media_stats}`}>
              {/*<div><img src={'/discord.ico'} width={18} height={18}/>&nbsp;&nbsp;2,408 members</div>*/}
              {/*<div>*/}
              {/*  <img src={'/discord.ico'} width={15} height={15}/> <a href={'/connect'} style={{ color: '#2684FF' }}>Connect Discord to view analytics</a>*/}
              {/*</div>*/}
              <div><img src={'/twitter.png'} width={18} height={18}/>&nbsp;&nbsp;14,213 followers / <a href={`/connect/${nft.address}`} style={{ color: '#2684FF' }}>connect</a></div>
            </div>

            <h4 className={indexStyles.h4}>Token Stats</h4>
            <div className={css.platesArray}>
              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>total holders</div>
                  <h3 className={css.plateValue}>{loader(stats.isLoading) || stats.data?.total}</h3>
                </article>
              </div>

              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>avg net worth</div>
                  <h3 className={css.plateValue}>
                    {loader(metrics.isLoading) || (prettyNetWorth(metrics.data.avgNetWorthInUsd) || formatBigNum(metrics.data.avgNetWorthInUsd))}
                  </h3>
                </article>
              </div>

              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>median portfolio value</div>
                  <h3 className={css.plateValue}>
                    {loader(metrics.isLoading) || (Number.isFinite(metrics.data.medianPortfolioValueInUsd) ? `$${Math.trunc(metrics.data.medianPortfolioValueInUsd).toLocaleString()}` : 'undefined')}
                  </h3>
                </article>
              </div>

              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>last day</div>
                  <h3 className={css.plateValue}>
                    {loader(stats.isLoading) || toPercent(stats.data.active_1d)}
                  </h3>
                  <div className={css.plateSubValue}>
                    {stats.data?.active_1d}
                  </div>
                </article>
              </div>

              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>last week</div>
                  <h3 className={css.plateValue}>
                    {loader(stats.isLoading) || toPercent(stats.data.active_7d)}
                  </h3>
                  <div className={css.plateSubValue}>
                    {stats.data.active_7d}
                  </div>
                </article>
              </div>

              <div className={css.plate}>
                <article className={css.plateContent}>
                  <div className={css.plateTitle}>last month</div>
                  <h3 className={css.plateValue}>
                    {loader(stats.isLoading) || toPercent(stats.data.active_30d)}
                  </h3>
                  <div className={css.plateSubValue}>
                    {stats.data.active_30d}
                  </div>
                </article>
              </div>
            </div>

            <div className={`${shared.row}`}>
              <div className={css.splitTables}>
                <div>
                  <h4 className={`${indexStyles.h4} ${css.container} ${css.pb4}`} style={{ marginTop: 0 }}>Top NFT Holdings</h4>
                  <Table {...{ error: nftHoldings.error, isLoading: nftHoldings.isLoading, data: nftHoldings.data, columns: holdingsColumns }} />
                </div>
                <div>
                  <h4 className={`${indexStyles.h4} ${css.container} ${css.pb4}`} style={{ marginTop: 0 }}>Top Token Holdings</h4>
                  <Table {...{ error: erc20Holdings.error, isLoading: erc20Holdings.isLoading, data: erc20Holdings.data, columns: holdingsColumns }} />
                </div>
              </div>
            </div>

            <div className={`${shared.row}`}>
              <div className={css.splitTables}>
                <div>
                  <h4 className={`${indexStyles.h4} ${css.container} ${css.pb4}`} style={{ marginTop: 0 }}>Used Protocols</h4>
                  <Table {...{ error: protocols.error, isLoading: protocols.isLoading, data: protocols.data, columns: protocolsColumns }} />
                </div>
                <div>
                  <h4 className={`${indexStyles.h4} ${css.container} ${css.pb4}`} style={{ marginTop: 0 }}>Used Networks</h4>
                  <Table {...{ error: networks.error, isLoading: networks.isLoading, data: networks.data, columns: networksColumns }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </AdminPanel>
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
  let subs = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
  let uppers = `${Math.log10(amountInUsd) | 0}`.split('').map(ch => subs[ch] ?? ch).join('')
  return `10${uppers}`
}

export default NftAnalyticsPage
