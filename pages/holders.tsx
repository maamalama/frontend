import indexStyles from './index.module.css'
import shared from '../shared.module.css'
import css from './holders.module.css'
import { useEffect, useMemo, useState } from 'react'
import { Column } from 'react-table'
import { TableData } from '../lib/types'
import { useRouter } from 'next/router'
import { BASE_URL } from '../data/constants'
import { UsersTable } from '../components/UsersTable'
import { TagLabel } from '../components/TagLabel'
import { Pagination } from '../components/Pagination'
import { useStore } from 'effector-react'
import { $currentNft, $holders, fetchHoldersFx, openHoldersPage } from '../lib/store'
import { Header } from '../components/Header'
import { restore } from 'effector'
import { format } from 'date-fns'

const Holders = () => {
  useEffect(openHoldersPage, [])

  let router = useRouter()

  useEffect(() => {
    if (router.route && !router.route.includes('holders')) {
      router.push('/holders')
    }
  }, [router.route])

  const holders = useStore($holders)
  const isLoading = useStore(fetchHoldersFx.pending)
  const error = useStore(restore(fetchHoldersFx.failData, null))

  const [search, setSearch] = useState<string>('')

  const [filters, setFilters] = useState<Record<string, { name: string, isActive: boolean, predicate: (h: any) => boolean }>>({
    _1m_net_worth: {
      name: '$1m net worth',
      isActive: false,
      predicate: h => h.total_balance_usd > 1_000_000,
    },
    joined_last_week: {
      name: 'Joined last week',
      isActive: false,
      predicate: h => Date.now() - 1000 * 3600 * 24 * 7 < h.first_transfer * 1000,
    },
    at_least_10_tokens: {
      name: 'At least 10 tokens',
      isActive: false,
      predicate: h => h.amount >= 10,
    },
    has_ens: {
      name: 'With ENS',
      isActive: false,
      predicate: h => !!h.domain,
    }
  })

  let activeFilters = Object.values(filters).filter(f => f.isActive).map(f => f.predicate)
  let filteredHolders =
    holders?.filter(h =>
      activeFilters.every(p => p(h)) &&
      (h.address.includes(search) || h.domain?.includes(search)))

  let rowsPerPage = 12
  const [page, setPage] = useState<number>(0)
  let paginatedHolders = filteredHolders?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

  useEffect(function resetPageOnFiltersChange() {
    setPage(0)
  }, [filters])

  const holdersColumns = useMemo(
    (): Column<any>[] => [
      {
        Header: <span style={{ paddingLeft: '80px' }}>Address</span>,
        id: 'address',
        accessor: (row) => row, // accessor is the "key" in the data,
        Cell: ({ value: { logo, domain = null, address, isFav } }) => (
          <div className={css.holdingsTokenCell}>
            <div className={css.starIcon} style={{ [isFav && 'backgroundImage']: `url('/star-active.svg')` }}/>
            <div className={css.holdingsIcon} style={{ backgroundImage: `url(${logo})` }}/>
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
        id: 'amount',
        accessor: row => row,
        Cell: ({ value: { amount, tokens } }) => (
          <div className={css.tokens}>
            <div className={css.tokens_counter}>{amount}</div>
            {tokens.slice(0, 3).map(tok => <div key={tok} className={css.token} style={{ backgroundImage: `url(${tok})` }}/>)}
          </div>
        )
      },
      {
        Header: 'Net worth',
        accessor: (row) => prettyNetWorth(row.total_balance_usd) || '—'
      },
      {
        Header: 'First bought',
        accessor: row => row.first_transfer
          ? (
            <span title={new Date(row.first_transfer * 1000).toLocaleString()}>
              {formatRelative(row.first_transfer * 1000)}
            </span>
          )
          : null,
      },
      {
        Header: 'Links',
        accessor: row => row.address,
        Cell: ({ value }) => (
          <a href={`https://opensea.io/${value}`}><img src="https://opensea.io/static/images/logos/opensea.svg" width={19} height={19}/></a>
        )
      }],
    []
  )

  return (
    <div className={`${shared.column} ${indexStyles.main}`}>
      <Header title="Holders"/>

      <main className={`${css.content} ${shared.page_content}`}>
        <div className={css.search_bar}>
          <img src={'/search.svg'} width={32} height={32} className={css.search_icon} alt=""/>
          <input type="text" placeholder="Search by address or ENS" className={css.search_input} onChange={e => setSearch(e.target.value)} value={search}/>
        </div>

        <div className={css.filters_panel}>
          {Object.entries(filters).map(([key, f]) =>
            <TagLabel key={key} isActive={f.isActive} onClick={() => setFilters({ ...filters, [key]: { ...f, isActive: !f.isActive } })} children={f.name}/>
          )}
        </div>

        <div className={css.actions_panel}>
          {holders?.length && <div>
            {activeFilters.length
              ? `${filteredHolders.length} of ${holders.length} holders (${Math.round((filteredHolders.length / holders.length) * 100)}%)`
              : `${holders.length} holders`
            }</div>}

          <div className={css.actions_panel__action}>
            <img src={'/inbox-mail.svg'} width={20} height={20} alt=""/>
            Export
          </div>
        </div>

        <div style={{minHeight: '610px' }}>
          <UsersTable {...{ error, isLoading, data: paginatedHolders, columns: holdersColumns }} />
        </div>

        <Pagination page={page} total={filteredHolders?.length / rowsPerPage} onSelect={setPage}/>
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
  return format(date, 'dd MMM yyyy')
}
