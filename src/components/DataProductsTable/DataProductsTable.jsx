import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, DataGrid, Grid, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { InfoCard } from '@ska-telescope/ska-gui-components';
import { tableHeight } from "../../utils/constants";

const DataProductsTable = (jsonDataProducts, updating, apiRunning, dataProductClickHandler, subProductClickHandler, isDataProductSelected, isSubProductSelected) => {
  const { t } = useTranslation('dpd');

  const ignore_columns_names = ["dataproduct_file", "metadata_file", "files", "execution_block"];

  const haveData = () => {
    return (typeof jsonDataProducts === "object" && jsonDataProducts.length > 0);
  }
  // Create Header name from column_name
  const headerText = (key) => {
    const tmp = key?.split('.');
    return t(tmp[tmp?.length - 1], { ns: 'ivoa' });
  }

  // Create the array of column names and html from /layout call
  const extendedColumns = [];
  const columnVisibilityModel = {};

  if(columnInfo !== undefined){
    for (const column of columnInfo){
        extendedColumns.push({
          field: column["name"],
          headerName: headerText(column["name"]),
          width: column["width"]
        })
    }
  }


  if (haveData() && jsonDataProducts.length > 0){
    for (const dataproduct in jsonDataProducts){
      for (const key of Object.keys(jsonDataProducts[dataproduct])){
        // skip keys in ignore_column_names
        if (ignore_columns_names.includes(key)){
          continue;
        }
        // skip keys already in columns
        else if (extendedColumns.map(a => a.headerName).includes(headerText(key))){
          const index = extendedColumns.findIndex(object => {
            return object.headerName === headerText(key);
          });
          extendedColumns[index]["field"] = key;
        }
        else {
          // add new column to extendedColumns
          extendedColumns.push({
            field: key,
            headerName: headerText(key),
            width: 200
          });
          columnVisibilityModel[key] = false;
        }
      }
    }
  }


  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(isDataProductSelected(row));

    return (
      <>
        {(
          <Modal open={open} onClose={() => setOpen(false)}>
            <Card variant="outlined" className="removeBorder:focus">
              <CardContent>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Subproducts
                  </Typography>
                  <Table size="small" aria-label="subproducts">
                    <TableHead>
                      <TableRow>
                        <TableCell>CRC</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Path</TableCell>
                        <TableCell align="right">Size (bytes)</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.files?.map((file) => (
                        <TableRow
                          hover={true}
                          key={file.path}
                          onClick={(event) => { subProductClickHandler(event, row, file) }}
                          selected={isSubProductSelected(file)}
                        >
                          <TableCell component="th" scope="row">
                            {file.crc}
                          </TableCell>
                          <TableCell>{file.description}</TableCell>
                          <TableCell>{file.path}</TableCell>
                          <TableCell align="right">{file.size}</TableCell>
                          <TableCell align="right">{file.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </CardContent>
            </Card>
          </Modal>)}
        <TableRow
          hover={true}
          sx={{ '& > *': { borderBottom: 'unset' } }}
          selected={isDataProductSelected(row)}
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" onClick={(event) => dataProductClickHandler(event, row)}>
            {row.execution_block}
          </TableCell>
          {extendedColumns.map((extendedColumn, index) => (
            <TableCell key={extendedColumn.field + index} align="right" onClick={(event) => { dataProductClickHandler(event, row) }}>{row[extendedColumn.field]}</TableCell>
          ))}
        </TableRow>
      </>
    );
  }

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
      <Box data-testid={"availableData"} m={1} sx={{ backgroundColor: 'secondary.contrastText' }}>
        <DataGrid
          data-testid={jsonDataProducts}
          initialState={{
            columns: {
              columnVisibilityModel
            },
          }}
          columns={extendedColumns}
          height={tableHeight()}
          onRowClick={handleSelectedNode}
          rows={jsonDataProducts}
          width="100%"
        />
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
