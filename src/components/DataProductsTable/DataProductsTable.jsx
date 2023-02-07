import * as React from 'react';

import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "execution_block", headerName: "execution_block", width: 200 },
  { field: "dataproduct_file", headerName: "dataproduct_file", width: 300 },
  { field: "metadata_file", headerName: "metadata_file", width: 400 },
  { field: "interface", headerName: "interface", width: 400 }
];

const DataProductsTable = (jsonDataProducts, handleSelectedNode) => {
  console.log("DataProductsTable", jsonDataProducts);

  // if jsonDataProducts contains an warning string, display the warning instead
  if (typeof jsonDataProducts === "undefined" || typeof jsonDataProducts === "string"){
    return (
      <>
        <Typography sx={{ fontSize: 25, display: "flex", justifyContent: "center" }} color="error" gutterBottom>
          <WarningIcon sx={{ fontSize: "35px" }}  />
          {" "}
          {"SDP Data API not available"}
        </Typography>
      </>
    );
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={jsonDataProducts}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onRowClick={handleSelectedNode}
      />
    </div>
  );
}

export default DataProductsTable