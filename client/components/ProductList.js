import { useMemo } from "react";
import Link from "next/link";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import tableStyles from "../styles/ProductList.module.css";

const Table = ({ columns, data }) => {
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
    useGlobalFilter,
    useSortBy,
  );

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <br/>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ` ${String.fromCharCode("9660")}`
                        : ` ${String.fromCharCode("9650")}`
                      : ''}
                  </span>
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
                <Link key={row.original.id} href={`/product/${row.original.id}`}>
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (<td {...cell.getCellProps()}>{cell.render('Cell')}</td>)
                    })}
                  </tr>
                </Link>
              )}
          )}
        </tbody>
      </table>
    </>
  );
}

const ProductList = ({ inventory }) => {
  const columns = useMemo(() => [
    {
      Header: 'Inventory',
      columns: [
        {
          Header: 'Name',
          accessor: 'name',
        },
        {
          Header: 'Description',
          accessor: 'description',
        },
        {
          Header: 'Category',
          accessor: 'category',
        },
        {
          Header: 'In Stock',
          accessor: 'count',
        },
      ],
    },
  ],[]);

  return (
    <>
      <div className={tableStyles.table}>
        <Table columns={columns} data={inventory} />
      </div>
    </>
  );
};

export default ProductList;