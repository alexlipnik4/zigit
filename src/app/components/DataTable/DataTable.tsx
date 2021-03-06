import React, { useEffect, useMemo } from 'react';
import {
  useSortBy,
  Column,
  Row,
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
} from 'react-table';
import { UserData } from '../pages/Info/Info';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
// import { matchSorter } from 'match-sorter';

export type DataTableProps = {
  projectsData: UserData[];
  setClearance: (value: number) => void;
  setAverage: (value: number) => void;
};

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  headlineRow: {
    height: '50px',
  },
  headlineItem: {
    padding: '0 25px',
    boxShadow: '1px 2px 2px 1px #b3b2b2',
  },
  cell: {
    padding: '10px',
    boxShadow: '0px 0px 2px 1px #b3b2b2',
    // background: 'red',
  },
  cellRed: {
    background: '#da2929',
  },
  cellGreen: {
    background: '#20bb20',
  },
  cellContent: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

type GlobalFilterType = {
  preGlobalFilteredRows: Row<UserData>[];
  globalFilter: any;
  setGlobalFilter: any;
};

const GlobalFilter = (props: GlobalFilterType) => {
  const count = props.preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(props.globalFilter);
  const onChange = useAsyncDebounce(value => {
    props.setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      <TextField
        label="Search"
        value={value || ''}
        fullWidth
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
};

const DataTable: React.FC<DataTableProps> = ({
  projectsData,
  setClearance,
  setAverage,
}) => {
  const data = React.useMemo<UserData[]>(() => [...projectsData], []);
  const classes = useStyles();

  const columns = React.useMemo<Column<UserData>[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Score',
        accessor: 'score',
      },
      {
        Header: 'Duration in days',
        accessor: 'durationInDays',
      },
      {
        Header: 'Bugs count',
        accessor: 'bugsCount',
      },
      {
        Header: 'Made deadline',
        accessor: 'madeDadeline',
      },
    ],
    [],
  );

  const filterTypes = React.useMemo(
    () => ({
      text: (rows: Row<UserData>[], id: number, filterValue: any) => {
        const filter = rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });

        return filter;
      },
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
  );

  useEffect(() => {
    if (state.globalFilter) {
      let countScore = 0;
      let countSuccessful = 0;
      rows.forEach((item, i) => {
        if (item.values.madeDadeline === 'true') {
          countSuccessful++;
        }
        countScore += item.values.score;
      });
      setClearance(Math.round((countSuccessful / rows.length) * 100));
      setAverage(Math.round(countScore / rows.length));
    }
  }, [state.globalFilter]);

  return (
    <table {...getTableProps()} className={classes.table}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr
            className={classes.headlineRow}
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map(column => (
              <th
                className={classes.headlineItem}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                <Typography variant="h6">
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? '🔼' : '🔽') : ''}
                  </span>
                </Typography>
              </th>
            ))}
          </tr>
        ))}
        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: 'left',
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                let redBackground = false;
                let greenBackground = false;
                if (cell.column.Header === 'Score') {
                  if (cell.value > 90) {
                    greenBackground = true;
                  } else if (cell.value < 70) {
                    redBackground = true;
                  }
                }
                return (
                  <td
                    {...cell.getCellProps()}
                    className={`${classes.cell} ${
                      redBackground && classes.cellRed
                    } ${greenBackground && classes.cellGreen}`}
                  >
                    <Typography className={classes.cellContent} variant="body2">
                      {cell.render('Cell')}
                    </Typography>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
