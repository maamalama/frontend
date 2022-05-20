import indexStyles from './index.module.css'
import shared from '../shared.module.css'
import css from './holders.module.css'
import { useEffect, useMemo, useState } from 'react'
import { Column } from 'react-table'
import { TableData } from '../lib/types'
import { useRouter } from 'next/router'
import { BASE_URL } from '../data/constants'
import { UsersTable } from '../components/UsersTable'

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

  const [holders, setHolders] = useState<any[]>([])
  const [error, setError] = useState<string>()
  const [isLoading, setLoading] = useState(false)

  const address = '0x026224a2940bfe258d0dbe947919b62fe321f042'

  const fetchAllData = async (nftCollection) => {
    setHolders(null)
    setLoading(true)

    await Promise.all([
      fetch(`${BASE_URL}/nft/holders?token=${nftCollection}`).then(res => res.json()),
      fetch(`https://randomuser.me/api/?results=30&seed=${nftCollection}&noinfo&inc=picture,username,login`).then(res => res.json()),
    ])
      .then(([holders, { results: users }]) => {
        let list = [
          { domain: 'samx.eth', twitter: 'samx', discord: 'sx#2401', isFav: true },
          { domain: 'xamgore.eth', twitter: 'xamgore', discord: 'xamgore#2401', isFav: true },
          { domain: null, discord: null, twitter: null, isFav: false },
          { domain: null, discord: 'sx#2401', twitter: null, isFav: false },
          { domain: null, discord: null, twitter: 'samx', isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
          { domain: null, twitter: null, isFav: false },
        ]

        setHolders(holders.slice(0, 12).map((h, idx) => ({
          ...h, ...{
            icon: users?.[idx]?.picture?.thumbnail,
            discord: users?.[idx]?.login?.username?.replace(/(\d+)/, '#$1'),
            firstBought: Date.now() - (Math.random() * 1000 * 3600 * 24 * 7 | 0)
          }, ...list[idx]
        })))
      })
      .catch(err => setError(err?.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { address && fetchAllData(address) }, [address])

  const holdersColumns = useMemo(
    (): Column<any>[] => [
      {
        Header: <span style={{paddingLeft: '80px'}}>Address</span>,
        id: 'address',
        accessor: (row) => row, // accessor is the "key" in the data,
        Cell: ({ value: { icon, domain = null, address, isFav } }) => (
          <div className={css.holdingsTokenCell}>
            <div className={css.starIcon} style={{ [isFav && 'backgroundImage']: `url('/star-active.svg')` }}/>
            <div className={css.holdingsIcon} style={{ backgroundImage: `url(${icon})` }}/>
            <a href={`https://etherscan.io/address/${address}`} className={css.inTableLink}>{domain || address}</a>
          </div>
        )
      },
      {
        Header: 'Twitter',
        accessor: (row) => row.twitter,
        Cell: ({ value }) => value ? (
          <a href={`https://twitter.com/${value}`}>@{value}</a>
        ) : null,
      },
      {
        Header: 'Discord',
        accessor: (row) => row.discord,
      },
      {
        Header: 'Tokens',
        accessor: 'amount'
      },
      {
        Header: 'Net worth',
        accessor: (row) => prettyNetWorth(row.total_balance_usd) || '—'
      },
      {
        Header: 'First bought',
        accessor: row => formatRelative(row.firstBought),
      },
      {
        Header: 'Links',
        accessor: row => row.address,
        Cell: ({ value }) => (
          <a href={`https://opensea.io/${value}`}><img src="https://opensea.io/static/images/logos/opensea.svg" width={22} height={22}/></a>
        )
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

        <UsersTable {...{ error, isLoading, data: holders as TableData, columns: holdersColumns as Column<TableData[0]>[] }} />
      </main>
    </div>
  )
}

export default Holders

function prettyNetWorth(amountInUsd: number): string {
  let digits = Math.log10(amountInUsd)

  let f = ([num, suffix]: [number, string]) => `$${Math.trunc(num).toLocaleString()}${suffix}`

  if (digits <= 7) return f([amountInUsd, '']) // 2'159'000 -> $2'159'000
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

function formatRelative(date: number): string {
  let diff = Math.abs(Date.now() - date) / 1000 / 3600 | 0
  if (diff < 1) return 'recently'
  if (diff === 1) return `1 hour ago`
  if (diff < 24) return `${diff} hours ago`
  diff = diff / 24 | 0
  if (diff == 1) return `1 day ago`
  if (diff < 30) return `${diff} days ago`
  return `meh`
}
