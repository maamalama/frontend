import { useMemo } from 'react'
import { Column, useTable } from 'react-table'
import { TableData } from '../lib/types'
import { ProgressBar } from './ProgressBar'
import styles from './Table.module.css'

interface TableProps {
  error?: unknown
  isLoading: boolean
  data: TableData
}

export const Table = ({ data, error, isLoading }: TableProps) => {
  const columns = useMemo(
    (): Column<TableData[0]>[] => [
      {
        Header: 'Token',
        accessor: (row) => row.token.address // accessor is the "key" in the data,
      },

      {
        Header: 'Holders',

        accessor: 'holders'
      },
      {
        Header: 'Share',
        accessor: 'share',
        Cell: ({ value }) => `${value.toFixed(2)}%`
      }
    ],

    []
  )

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow
  } = useTable({ data: data || [], columns })

  return (
    // apply the table props
    <div
      className={styles.container}
      style={{ border: isLoading || (!data && !error && !isLoading) ? 'var(--border)' : 'none' }}
    >
      {isLoading && (
        <div className={styles.loader}>
          <ProgressBar color="black" />
        </div>
      )}
      {!data && !error && !isLoading && <div className={styles.emptyText}>Compose filters to query user holdings</div>}
      {!isLoading && error && <div>Failed to load chart</div>}
      {!isLoading && data?.length > 1 && (
        <table className={styles.table} {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows

              headerGroups.map((headerGroup) => (
                // Apply the header row props

                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row

                    headerGroup.headers.map((column) => (
                      // Apply the header cell props

                      <th className={styles.th} {...column.getHeaderProps()}>
                        {
                          // Render the header

                          column.render('Header')
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>

          {/* Apply the table body props */}

          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows

              rows.map((row) => {
                // Prepare the row for display

                prepareRow(row)

                return (
                  // Apply the row props

                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells

                      row.cells.map((cell) => {
                        // Apply the cell props

                        return (
                          <td className={styles.td} {...cell.getCellProps()}>
                            {
                              // Render the cell contents

                              cell.render('Cell')
                            }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      )}
    </div>
  )
}
