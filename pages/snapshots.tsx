import css from './snapshots.module.css'
import styles from '../shared.module.css'
import indexStyles from './index.module.css'
import { Header } from '../components/Header'
import { AdminPanel } from '../components/AdminPanel'
import { useStore } from 'effector-react'
import { $snapshots, Snapshot } from '../models/nft'
import { $myNftAddress } from '../models/me'
import { Column, useTable } from 'react-table'
import { useMemo } from 'react'
import { addSnapshot } from '../models/nft/snapshots'
import { getName } from 'ikea-name-generator'
import { format } from 'date-fns'
import { sha256 } from '../lib/sha256'

const Snapshots = () => {
  let snapshots = useStore($snapshots)
  let myNftAddress = useStore($myNftAddress)

  async function onSnapshotCreate() {
    let blockNumber = Number(window.prompt('Enter the block number, we\'ll take all the holders'))
    if (!blockNumber) return

    let id = snapshots.length + 1
    let nfts = [myNftAddress]

    let name = getName()
    addSnapshot({
      id,
      nfts,
      created_at: new Date(),
      title: name.slice(0, 1).toUpperCase() + name.slice(1),
      filters: [],
      block: blockNumber,
      holders_count: Math.random() * 100 | 0,
      externalId: await sha256(nfts.join() + id.toString()),
    })
  }

  const columns = useMemo(
    (): Column<Snapshot>[] => [
      {
        Header: '#',
        accessor: (row) => `${row.id}.`,
      },
      {
        Header: 'Title',
        accessor: (row) => <span className={css.title} contentEditable={true} onClick={e => e.stopPropagation()}>{row.title}</span>,
      },
      {
        Header: 'Date',
        accessor: (row) => <span title={row.created_at.toLocaleString()}>{format(row.created_at, 'dd MMM yyyy')}</span>,
      },
      // {
      //   Header: 'NFT',
      //   accessor: (row) =>
      //     row.nfts
      //       .map((address) => nfts.find(n => n.address === address)?.name)
      //       .join(','),
      // },
      {
        Header: 'Holders',
        accessor: (row) => `${row.holders_count}`,
      },
      {
        Header: 'Block',
        accessor: (row) => `${row.block}`,
      },
      {
        Header: 'Link',
        accessor: (row) => {
          let url = row.externalId ? `https://app.hashscan.xyz/list/${row.externalId}` : '#'
          return <a href={url} title="Copy link" target="_blank" rel="noopener noreferrer" className={css.link}/>
        }
      },
      {
        Header: 'Filters',
        accessor: (row) => (
          <div className={css.filters}>
            {row.filters.map(f => <span className={css.filter_tag} children={f}/>)}
          </div>
        )
      },
    ],
    [snapshots],
  )

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } = useTable({ data: snapshots || [], columns })

  return (
    <AdminPanel>
      <main className={`${styles.column} ${indexStyles.main}`}>
        <Header title="Snapshots"/>

        <div className={css.page_content}>
          <div className={css.actions_panel}>
            <div className={css.actions_panel__action} onClick={onSnapshotCreate}>
              <img src={'/plus-add.svg'} width={20} height={20} alt=""/>
              Create snapshot
            </div>
          </div>

          <div style={{ padding: '0 16px' }}>
            <table className={css.table} {...getTableProps()}>
              <thead className={css.thead}>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) =>
                    <th className={css.th} {...column.getHeaderProps()} children={column.render('Header')}/>)}
                </tr>
              ))}
              </thead>
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
          </div>
        </div>
      </main>
    </AdminPanel>
  )
}

export default Snapshots
