import { useMemo } from "react";
import Link from "next/link";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import tableStyles from "../styles/ProductList.module.css";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state,
    setGlobalFilter, 
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 15,
      }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
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
          {page.map(
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
      <div className={tableStyles.pagination}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <span>{`Page ${state.pageIndex + 1} of ${pageCount == 0 ? 1 : pageCount}`}</span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
      </div>
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