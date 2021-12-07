import { useMemo } from "react";
import { useRouter } from "next/router";
import { useTable, useGlobalFilter } from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import employeeStyles from "../styles/EmployeeList.module.css";

function formatDate(date) {
  const dateFormat = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, dateFormat).split('/').join('-');
}

const EmployeeTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <br/>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps({
                  style: { 
                    minWidth: column.minWidth, 
                    width: column.width 
                  },
                })}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (<td {...cell.getCellProps({
                      style: {
                        minWidth: cell.column.minWidth,
                        width: cell.column.width,
                      },
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                  )})}
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    </>
  );
};

const EmployeeList = ({ employees }) => {
  const router = useRouter();

  const columns = useMemo(() => [
    {
      Header: 'Employees',
      columns: [
        {
          Header: 'ID',
          accessor: 'user_id',
          minWidth: 80,
          width: 80,
        },
        {
          Header: 'Name',
          accessor: 'name',
        },
        {
          Header: 'Date of Birth',
          accessor: row => formatDate(row.birth_date),
          minWidth: 100,
          width: 100,
        },
        {
          Header: 'Hire Date',
          accessor: row => formatDate(row.hire_date),
          minWidth: 100,
          width: 100,
        },
      ],
    },
  ],[]);

  return (
    <>
      <div className={employeeStyles.table}>
        <EmployeeTable columns={columns} data={employees} />
        <div className={employeeStyles.btncontainer}>
          <button
            className={employeeStyles.btn}
            onClick={() => {
              router.push('/employees/new');
            }}
          >
            Add New Employee
          </button>
        </div>
      </div>
    </>
  );
};
 
export default EmployeeList;