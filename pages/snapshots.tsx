import css from './snapshots.module.css'
import styles from '../shared.module.css'
import indexStyles from './index.module.css'
import { Header } from '../components/Header'
import { AdminPanel } from '../components/AdminPanel'
import { useStore } from 'effector-react'
import { $snapshots, Snapshot } from '../models/nft'
import { Column, useTable } from 'react-table'
import { useMemo } from 'react'
import { addSnapshotAtBlock, changeSnapshotTitle } from '../models/nft/snapshots'
import { format } from 'date-fns'
import { ProgressBar } from '../components/ProgressBar'
import { ExternalLink } from 'react-external-link'
import { BASE_URL } from '../data/constants'

const Snapshots = () => {
  let snapshots = useStore($snapshots)

  async function onSnapshotCreate() {
    let blockNumber = Number(window.prompt('Enter the block number, we\'ll gather all holders'))
    if (!blockNumber) return

    addSnapshotAtBlock({ block: blockNumber })

    setTimeout(function () {
      let div = document.querySelector('[contenteditable=true]') as HTMLTextAreaElement
      div.focus()
      // let range = document.createRange()
      // range.selectNodeContents(div)
      // let sel = window.getSelection()
      // sel.removeAllRanges()
      // sel.addRange(range)
    }, 0)
  }

  const columns = useMemo(
    (): Column<Snapshot>[] => [
      {
        Header: 'Title',
        accessor: (row) => (
          <div className={css.title_wrap}>
          <span className={css.title} onBlur={e => changeSnapshotTitle({ id: row.id, title: e.target.textContent })} contentEditable={true} onClick={e => e.stopPropagation()}
            suppressContentEditableWarning={true} title="This title will be shown to NFT holders">
            {row.title}
          </span>
          </div>
        ),
      },
      {
        Header: 'Date',
        accessor: (row) => <span className={css.date} title={row.created_at.toLocaleString()}>{format(row.created_at, 'dd MMM yyyy')}</span>,
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
        accessor: (row) => row.holders_count,
      },
      {
        Header: 'Block',
        accessor: (row) => row.block > 0 && <ExternalLink href={`https://etherscan.io/block/${row.block}`}>{row.block}</ExternalLink>,
      },
      {
        Header: 'Link',
        accessor: (row) => {
          let url = `${BASE_URL}/snapshots/get?id=${row.id}&format=txt`
          return row.loading
            ? <ProgressBar size="21px"/>
            : <a href={url} title="Copy link" target="_blank" rel="noopener noreferrer" className={css.link}/>
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

          <div style={{ padding: '0 16px', overflowX: 'scroll' }}>
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
