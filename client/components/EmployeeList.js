import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useTable, useGlobalFilter } from "react-table";
import { server } from "../config";
import { GlobalFilter } from "./GlobalFilter";
import employeeStyles from "../styles/EmployeeList.module.css";

function formatDate(date) {
  const dateFormat = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, dateFormat).split('/').join('-');
}

const EmployeeTable = ({ columns, data, selectedUser, setSelectedUser }) => {
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
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th key={i} {...column.getHeaderProps({
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
                <tr key={i} {...row.getRowProps({
                  onClick: () => {
                    if (row.original.user_id == selectedUser.id) {
                      setSelectedUser({
                        id: null,
                        name: null,
                      });
                    } else {
                      setSelectedUser({
                        id: row.original.user_id,
                        name: row.original.name,
                      });
                    }
                  }
                })}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td key={i} {...cell.getCellProps({
                        style: {
                          minWidth: cell.column.minWidth,
                          width: cell.column.width,
                        }}
                      )
                    }
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

const EmployeeList = ({ user, employees }) => {
  const router = useRouter();

  const [selectedUser, setSelectedUser] = useState({
    id: null,
    name: null,
  });

  const handleDelete = async () => {
    const body = { userId: selectedUser.id };

    const deletedUser = await fetch(`${server}/api/employees/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => response.json());

    if (deletedUser.success) {
      router.reload();
    }
  };

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
        <EmployeeTable 
          columns={columns} 
          data={employees} 
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser} 
        />
        <div 
          className={employeeStyles.selecteduser}
          style={{
            opacity: selectedUser.id == null ? 0 : 100
          }}  
        >
          <span>Selected: </span>
          <p>
            {'\u00A0'} {selectedUser.id} - {selectedUser.name}
          </p>
        </div>
        <div className={employeeStyles.btncontainer}>
          <button
            className={employeeStyles.btn}
            onClick={() => {
              router.push('/employees/new');
            }}
          >
            Add New Employee
          </button>
          <button
            className={employeeStyles.btn}
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this employee?')) {
                handleDelete();
              }
            }}
            disabled={(selectedUser.id == null) || (selectedUser.id == user.userId)}
          >
            Delete Employee
          </button>
        </div>
      </div>
    </>
  );
};
 
export default EmployeeList;