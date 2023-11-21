import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { DataGrid, InfoCard } from '@ska-telescope/ska-gui-components';
import { tableHeight } from "../../utils/constants";

import SKA_SDP_DATAPRODUCT_API_URL from "../../utils/constants";

const DataProductsTable = (jsonDataProducts, updating, apiRunning, handleSelectedNode) => {
  const { t } = useTranslation('dpd');

  // const columns = [
  //   { field: "execution_block", headerName: t("execution_block", { ns: 'ivoa' }), width: 200 },
  //   { field: "date_created", headerName: t("date_created", { ns: 'ivoa' }), width: 100 }
  // ];

  const ignore_columns_names = ["dataproduct_file", "metadata_file"];

  const columnInfo = fetch(`${SKA_SDP_DATAPRODUCT_API_URL}/layout`)
                        .then(response => response.json())
                        .then(json => setData(json))
                        .catch(error => console.error(error));

  const haveData = () => {
    return (typeof jsonDataProducts === "object" && jsonDataProducts.length > 0 );
  }
  // Create Header name from column_name
  const headerText = (key) => {
    const tmp = key.split('.');
    return t(tmp[tmp.length - 1], { ns: 'ivoa' });
  }
  // Create the array of column names and html from /layout call
  const extendedColumns = [];
  for (const column in columnInfo){
      extendedColumns.push({
        field: column["name"],
        headerName: headerText(column["name"]),
        width: column["width"]
      })
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