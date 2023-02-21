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
    { field: "interface", headerName: t("column.id"), width: 400 }  
  ];

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

  return (
    <Box m={1} sx={{ height: '43vh', width: "100%" }}>
      <DataGrid
        rows={jsonDataProducts}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onRowClick={handleSelectedNode}
      />
    </Box>
  );
}

export default DataProductsTable