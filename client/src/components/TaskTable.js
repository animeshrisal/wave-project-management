import React from "react";
import { useTable } from 'react-table';


const TaskTable = (props) => {
      const data = React.useMemo(
        () => props.data,
        []
      )
    
      const columns = React.useMemo(
        () => [
          {
            Header: 'Task Name',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Status',
            accessor: 'taskStatus',
          },
          {
              Header: 'Priority',
              accessor: 'taskPriority'
          }
        ],
        []
      )

      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data,
      })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TaskTable