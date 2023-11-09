import React from 'react';
import { useTranslation } from 'react-i18next';
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
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    // TODO: get the up/down arrow working with:
    // {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    // instead of:
    // {open ? "up" : "down"}

    // TODO: use handleSelectedNode? to allow rows to be selected

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
            {row.execution_block}
          </TableCell>
          <TableCell align="right">{row['config.processing_block']}</TableCell>
          <TableCell align="right">{row['context.observer']}</TableCell>
          <TableCell align="right">{row['context.intent']}</TableCell>
          <TableCell align="right">{row['context.notes']}</TableCell>
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
                      <TableCell>CRC</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Path</TableCell>
                      <TableCell align="right">Size</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Download</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.files.map((fileRow) => (
                      <TableRow key={fileRow.crc}>
                        <TableCell component="th" scope="row">
                          {fileRow.crc}
                        </TableCell>
                        <TableCell>{fileRow.description}</TableCell>
                        <TableCell>{fileRow.path}</TableCell>
                        <TableCell align="right">{fileRow.size}</TableCell>
                        <TableCell align="right">{fileRow.status}</TableCell>
                        <TableCell align="right"><a href="">link</a></TableCell>
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

  /* DEBUG */
  console.log("jsonDataProducts", jsonDataProducts);

  const rows = [];
  for (let i = 0 ; i < jsonDataProducts.length ; i++){
    const json = jsonDataProducts[i];

    // DEBUG: if no files list sent from the api, add a dummy placeholder
    if (!json.hasOwnProperty('files')){
      json.files = [{
        crc: "2a890fbe",
        description: "This is test file 3",
        path: "ska-sub-system/scan_id_1/pb_id_1/TestDataFile1.txt",
        size: 19,
        status: "done"
      }];
    }

    rows.push(json);
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
      <Box data-testid={"availableData"} m={1}>
        <TableContainer component={Paper} height={tableHeight()}>
          <Table aria-label="collapsible table" >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Execution Block</TableCell>
                <TableCell align="right">Processing Block</TableCell>
                <TableCell align="right">Observer</TableCell>
                <TableCell align="right">Intent</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.execution_block} row={row} />
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
