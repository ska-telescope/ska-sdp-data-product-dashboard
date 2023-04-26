import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { InfoCard } from '@ska-telescope/ska-gui-components';
import { DataGrid } from "@mui/x-data-grid";

const DataProductsTable = (jsonDataProducts, handleSelectedNode) => {
  const { t } = useTranslation();

  const columns = [
    { field: "id", headerName: t("column.id"), width: 50 },
    { field: "execution_block", headerName: t("column.execution_block"), width: 200 },
    { field: "date_created", headerName: t("column.date_created"), width: 100 }
  ];

  const ignore_columns_names = ["dataproduct_file", "metadata_file"];

  // if jsonDataProducts contains an warning string, display the warning instead
  if (typeof jsonDataProducts === "undefined" || typeof jsonDataProducts === "string"){
    return (
      <Box m={1} sx={{ height: '43vh', width: "100%" }}>
        <Grid container alignItems="center" justifyContent="center">
          <InfoCard fontSize={25} level={1} message={t("error.API_NO_DATA")} />
        </Grid>
      </Box>
    );
  }

  // create a 'deep' copy of the columns array, to which we can add additional columns
  // for data found in jsonDataProducts
  const extendedColumns = structuredClone(columns);

  // if jsonDataProducts contains additional attributes, assume those attributes were part
  // of the user's query, and display them
  if (jsonDataProducts.length > 0){
    for (const key of Object.keys(jsonDataProducts[0])){
      // skip keys in ignore_column_names
      if (ignore_columns_names.includes(key)){
        continue;
      }

      // skip keys already in columns
      if (columns.map(a => a.field).includes(key)){
        continue;
      }

      // add new column to extendedColumns
      // TODO: headerName should be translated
      extendedColumns.push({
        field: key,
        headerName: t("column." + key),
        width: 200
      });
    }
  }

  return (
    <Box m={1} sx={{ height: '43vh', width: "100%" }}>
      <DataGrid
        rows={jsonDataProducts}
        columns={extendedColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        onRowClick={handleSelectedNode}
      />
    </Box>
  );
}

export default DataProductsTable