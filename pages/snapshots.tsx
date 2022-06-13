import css from './snapshots.module.css'
import styles from '../shared.module.css'
import indexStyles from './index.module.css'
import { Header } from '../components/Header'
import { AdminPanel } from '../components/AdminPanel'
import { useStore } from 'effector-react'
import { $snapshots, Snapshot } from '../models/nft'
import { $myNft } from '../models/me'
import { Column, useTable } from 'react-table'
import { useMemo } from 'react'
import { addSnapshot } from '../models/nft/snapshots'
import { format } from 'date-fns'
import { sha256 } from '../lib/sha256'
import { ProgressBar } from '../components/ProgressBar'
import { ExternalLink } from 'react-external-link'
import { BASE_URL } from '../data/constants'

const Snapshots = () => {
  let snapshots = useStore($snapshots)
  let myNft = useStore($myNft)

  async function onSnapshotCreate() {
    let blockNumber = Number(window.prompt('Enter the block number, we\'ll gather all holders'))
    if (!blockNumber) return

    let id = snapshots.length + 1
    let name = `${myNft.name} ${id}`
    let nfts = [myNft.address]

    addSnapshot({
      id,
      nfts,
      created_at: new Date(),
      title: name.slice(0, 1).toUpperCase() + name.slice(1),
      filters: null,
      block: blockNumber,
      holders_count: null,
      externalId: await sha256(nfts.join() + id.toString()),
    })

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

  function onTitleChange(e, id) {
    console.log(e.target.textContent, id)
  }

  const columns = useMemo(
    (): Column<Snapshot>[] => [
      {
        Header: '#',
        accessor: (row) => `${row.id}.`,
      },
      {
        Header: 'Title',
        accessor: (row) => (
          <span className={css.title} onBlur={e => onTitleChange(e, row.id)} contentEditable={true} onClick={e => e.stopPropagation()} suppressContentEditableWarning={true}
            title="This title will be shown to NFT holders">
            {row.title}
          </span>
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
        accessor: (row) => row.holders_count ?? <ProgressBar size="21px"/>,
      },
      {
        Header: 'Block',
        accessor: (row) => row.block > 0 && <ExternalLink href={`https://etherscan.io/block/${row.block}`}>{row.block}</ExternalLink>,
      },
      {
        Header: 'Link',
        accessor: (row) => {
          let url = `${BASE_URL}/snapshots/get?id=${row.id}&format=txt`
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
