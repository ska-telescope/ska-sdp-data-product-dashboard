import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { DataGrid } from "@mui/x-data-grid";

const DataProductsTable = (jsonDataProducts, handleSelectedNode) => {
  const { t } = useTranslation();

  const columns = [
    { field: "id", headerName: t("column.id"), width: 50 },
    { field: "execution_block", headerName: t("column.ex_block"), width: 200 },
    { field: "date_created", headerName: t("column.dateCreated"), width: 100 },
    { field: "interface", headerName: t("column.interface"), width: 400 }
  ];

  const ignore_columns_names = ["dataproduct_file", "metadata_file"];

  // if jsonDataProducts contains an warning string, display the warning instead
  if (typeof jsonDataProducts === "undefined" || typeof jsonDataProducts === "string"){
    return (
      <Box m={1} sx={{ height: '43vh', width: "100%" }}>
        <Card variant="outlined" >
          <Typography sx={{ fontSize: 25, display: "flex", justifyContent: "center" }} color="error" gutterBottom>
            <WarningIcon sx={{ fontSize: "35px" }}  />
            {" "}
            {t("error.API_NO_DATA")}
          </Typography>
        </Card>
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
        headerName: key,
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