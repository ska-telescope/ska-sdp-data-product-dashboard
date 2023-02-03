import * as React from 'react';

import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "execution_block", headerName: "execution_block", width: 250 },
  { field: "interface", headerName: "interface", width: 400 }
];

const DataProductsTable = (jsonDataProducts, handleSelectedNode) => {
  console.log("DataProductsTable", jsonDataProducts);

  // if jsonDataProducts contains no data, display a warning instead
  if (jsonDataProducts === null){
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

  // TODO: dynamically build the columns array based on the contents of jsonDataProducts?


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