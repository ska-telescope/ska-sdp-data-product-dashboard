import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { DataGrid, InfoCard } from '@ska-telescope/ska-gui-components';
import { DATA_STORE_BOX_HEIGHT, FOOTER_HEIGHT, HEADER_HEIGHT } from '../../utils/constants';

const DataProductsTable = (jsonDataProducts, updating, handleSelectedNode) => {
  const { t } = useTranslation('dpd');

  const columns = [
    { field: "execution_block", headerName: t("column.execution_block"), width: 200 },
    { field: "date_created", headerName: t("column.date_created"), width: 100 }
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
          extendedColumns.push({
            field: key,
            headerName: t("column." + key),
            width: 200
          });
        }
      }
    }
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
        <DataGrid
          data-testid={jsonDataProducts}
          columns={extendedColumns}
          height={ `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT + DATA_STORE_BOX_HEIGHT + 20 }px)`}
          onRowClick={handleSelectedNode}
          rows={jsonDataProducts}
          width="100%"
        />
      </Box>
    );
  }

  return (
    <>
      {updating && RenderInfo(2, "info.fetching")}
      {!updating && !haveData() && RenderInfo(1, "error.API_NO_DATA")}
      {!updating && haveData() && RenderData()}
    </>
  );
}

export default DataProductsTable