import indexStyles from './index.module.css'
import shared from '../shared.module.css'
import css from './holders.module.css'
import search from '../public/search.svg'
import { useEffect, useMemo, useState } from 'react'
import { Column } from 'react-table'
import { fetchNftAnalytics, NftHolder, randomify } from '../lib/fetchNFTs'
import { ProgressBar } from '../components/ProgressBar'
import { Table } from '../components/Table'
import { TableData } from '../lib/types'
import { useRouter } from 'next/router'

const Holders = () => {
  let router = useRouter()

  useEffect(() => {
    if (router.route && !router.route.includes('holders')) {
      router.push('/holders')
    }
  }, [router.route])

  let nft = {
    icon: 'https://etherscan.io/token/images/lobsterdao_32.png',
    name: 'lobsterdao',
  }

  const [data, setData] = useState<{ token: any, protocols: any, networks: any, stats: any, holders: any, holdings: any, nftHoldings: any }>()
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  const address = '0x026224a2940bfe258d0dbe947919b62fe321f042'

  const fetchAllData = async (nftCollection) => {
    setData(null)
    setLoading(true)

    fetchNftAnalytics(nftCollection)
      .then(d => setData(randomify(nftCollection, d)))
      .catch(err => setError(err?.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { address && fetchAllData(address) }, [address])

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
    <div className={`${shared.column} ${indexStyles.main}`}>
      <header className={shared.content_header}>
        <h1 className={shared.content_header__title}>Holders</h1>
        <div className={shared.content_header__chain}>
          <span className={shared.content_header__chain_icon} style={{ backgroundImage: `url(${nft.icon})` }}/>
          {nft.name}
        </div>
      </header>

      <main className={css.content}>
        <div className={css.search_bar}>
          <img src={'/search.svg'} width={32} height={32} className={css.search_icon} alt=""/>
          <input type="text" placeholder="Search by address or ENS" className={css.search_input}/>
        </div>

        <div className={css.actions_panel}>
          <div>1684 holders</div>
          <div className={css.actions_panel__action}>
            <img src={'/inbox-mail.svg'} width={20} height={20} alt=""/>
            Export
          </div>
        </div>

        <Table {...{ error, isLoading, data: data?.holders as TableData, columns: holdersColumns as Column<TableData[0]>[] }} />
      </main>
    </div>
  )
}

export default Holders

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
