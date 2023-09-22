import React from 'react';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { Box, Collapse, Grid, IconButton, KeyboardArrowDownIcon, KeyboardArrowUpIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { InfoCard } from '@ska-telescope/ska-gui-components';
import { tableHeight } from "../../utils/constants";

const DataProductsTable = (jsonDataProducts, updating, apiRunning, handleSelectedNode) => {
  const { t } = useTranslation('dpd');

  const columns = [
    { field: "execution_block", headerName: t("execution_block", { ns: 'ivoa' }), width: 200 },
    { field: "date_created", headerName: t("date_created", { ns: 'ivoa' }), width: 100 }
  ];

  const ignore_columns_names = ["dataproduct_file", "metadata_file"];

  const haveData = () => {
    return (typeof jsonDataProducts === "object" && jsonDataProducts.length > 0 );
  }

  // create a 'deep' copy of the columns array, to which we can add additional columns
  // for data found in jsonDataProducts
  const extendedColumns = structuredClone(columns);

  // if jsonDataProducts contains additional attributes, assume those attributes were part
  // of the user's query, and display them
  if (haveData() && jsonDataProducts.length > 0){
    for (const dataproduct in jsonDataProducts){
      for (const key of Object.keys(jsonDataProducts[dataproduct])){
        // skip keys in ignore_column_names
        if (ignore_columns_names.includes(key)){
          continue;
        }
        // skip keys already in columns
        else if (extendedColumns.map(a => a.field).includes(key)){
          continue;
        }
        else {
          // add new column to extendedColumns
          const headerText = (key) => {
            const tmp = key.split('.');
            return t(tmp[tmp.length - 1], { ns: 'ivoa' });
          }

          extendedColumns.push({
            field: key,
            headerName: headerText(key),
            width: 200
          });
        }
      }
    }
  }
  
  function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? "up" : "down"}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Subproducts
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };


  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  ];

  function RenderInfo(value, msg) {
    return (
      <Box m={1} sx={{ height: '43vh', width: "100%" }}>
        <Grid data-testid={"apiAvailability"} container alignItems="center" justifyContent="center">
          <InfoCard fontSize={25} level={value} message={t(msg)} />
        </Grid>
      </Box>
    );
  }

  function RenderData() {
    return (
      <Box data-testid={"availableData"} m={1}>
        <TableContainer component={Paper} height={tableHeight()}>
          <Table aria-label="collapsible table" >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return (
    <>
      {apiRunning && updating && RenderInfo(2, "info.fetching")}
      {!apiRunning && RenderInfo(1, "error.API_NOT_AVAILABLE")}
      {apiRunning && !updating && !haveData() && RenderInfo(1, "error.API_NO_DATA")}
      {apiRunning && !updating && haveData() && RenderData()}
    </>
  );
}

export default DataProductsTable


/*
  function RenderData() {
    return (
      <Box data-testid={"availableData"} m={1}>
        <DataGrid
          data-testid={jsonDataProducts}
          columns={extendedColumns}
          height={tableHeight()}
          onRowClick={handleSelectedNode}
          rows={jsonDataProducts}
          width="100%"
        />
      </Box>
    );
  }
*/


// working row!
/*

<React.Fragment>
  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
    <TableCell>
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
      >
        {open ? "up" : "down"}
      </IconButton>
    </TableCell>
    <TableCell component="th" scope="row">
      cell1
    </TableCell>
    <TableCell align="right">cell2</TableCell>
    <TableCell align="right">cell3</TableCell>
    <TableCell align="right">cell4</TableCell>
    <TableCell align="right">cell5</TableCell>
  </TableRow>
  <TableRow>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            History
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Total price ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="0983470">
                <TableCell component="th" scope="row">
                  date
                </TableCell>
                <TableCell>customerId</TableCell>
                <TableCell align="right">amount</TableCell>
                <TableCell align="right">price</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  </TableRow>
</React.Fragment>

*/