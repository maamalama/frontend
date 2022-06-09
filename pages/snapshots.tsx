import css from './snapshots.module.css'
import styles from '../shared.module.css'
import indexStyles from './index.module.css'
import { Header } from '../components/Header'
import { AdminPanel } from '../components/AdminPanel'
import { useStore } from 'effector-react'
import { $snapshots, Snapshot } from '../models/nft'
import { $nfts } from '../models/me'
import { Column, useTable } from 'react-table'
import { useMemo } from 'react'

const Snapshots = () => {
  let snapshots = useStore($snapshots)
  let nfts = useStore($nfts)

  console.log({ snapshots, nfts })

  const columns = useMemo(
    (): Column<Snapshot>[] => [
      {
        Header: 'Title',
        accessor: (row) => `${row.id}. ${row.title}`,
      },
      {
        Header: 'Created',
        accessor: (row) => row.created_at.toLocaleString(),
      },
      {
        Header: 'Nfts',
        accessor: (row) =>
          row.nfts
            .map((address) => nfts.find(n => n.address === address)?.name)
            .join(','),
      },
      {
        Header: 'Block',
        accessor: (row) => `block ${row.block}`,
      },
      {
        Header: 'Holders',
        accessor: (row) => `holders ${row.holders_count}`,
      },
      {
        Header: 'Filters',
        accessor: (row) =>
          Object.entries(row.filters).map(([field, val]) => field +
            Object.entries(val).map(([op, val]) => `${op === '$gte' ? ' ≽ ' : ''}${val}`).join(' ')
          ).join(', ')
      }
    ],
    [snapshots],
  )

  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({ data: snapshots || [], columns })

  return (
    <AdminPanel>
      <main className={`${styles.column} ${indexStyles.main}`}>
        <Header title="Snapshots"/>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', height: '40%' }}>
          <table className={css.table} {...getTableProps()}>
            <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) =>
                    <td className={css.td} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  )}
                </tr>
              )
            })}
            </tbody>
          </table>
          {/*{snapshots.map((sn, id) => (*/}
          {/*  <div>{id}. {sn.title} ({sn.created_at.toLocaleString()}) / at [{sn.block}] block / {sn.holders_count} holders / {sn.nfts.join(' ')} /*/}
          {/*    filters: {JSON.stringify(sn.filters) ?? 'none'}</div>*/}
          {/*))}*/}
        </div>
      </main>
    </AdminPanel>
  )
}

export default Snapshots
