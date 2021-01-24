import React, { useMemo } from 'react';
import { CellProps, Column, Row, useTable } from 'react-table';
import { UserData } from '../pages/Info/Info';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

export type DataTableProps = {
  projectsData: UserData[];
};

export interface Data {
  title: string;
  captured: string;
  priority: string;
  area: string;
  isService: string;
}

const useStyles = makeStyles(theme => ({
  table: {
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
  }
}));

const DataTable: React.FC<DataTableProps> = ({ projectsData }) => {
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

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table
      {...getTableProps()}
      className={classes.table}
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr className={classes.headlineRow} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                className={classes.headlineItem}
                {...column.getHeaderProps()}
              >
                <Typography variant="h6">
                  {column.render('Header')}
                </Typography>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                let redBackground = false;
                let greenBackground = false;
                if(cell.column.Header === 'Score') {
                  if(cell.value > 90) {
                    greenBackground = true;
                  } else if (cell.value < 70) {
                    redBackground = true;
                  }
                }
                return (
                  <td
                    {...cell.getCellProps()}
                    className={`${classes.cell} ${redBackground && classes.cellRed} ${greenBackground && classes.cellGreen}`}
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
