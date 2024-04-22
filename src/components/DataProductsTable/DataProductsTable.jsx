import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { InfoCard, DataGrid, Progress } from '@ska-telescope/ska-gui-components';
import GetLayout from "../../services/GetLayout/GetLayout";
import { tableHeight } from "../../utils/constants";

const DataProductsTable = (jsonDataProducts, updating, apiRunning, handleSelectedNode) => {
  const { t } = useTranslation('dpd');
  const [columnInfo, setColumnInfo] = useState([]); 

  const ignore_columns_names = ["dataproduct_file", "metadata_file"];

  async function fetchData() {
    const layout = await GetLayout();
    setColumnInfo(layout?.data);
  };

  useEffect( () => { 
    fetchData();
  }, []);

  const haveData = () => {
    return (typeof jsonDataProducts === "object" && jsonDataProducts.length > 0 );
  }
  // Create Header name from column_name
  const headerText = (key) => {
    const tmp = key?.split('.');
    const lowerCaseKey = tmp[tmp?.length - 1]?.toLowerCase(); // Convert key to lowercase
    return t(lowerCaseKey, { ns: 'ivoa' });
  };
 
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

  function RenderInfo(value, msg) {
    return (
      <Box m={1} sx={{ height: '43vh', width: "100%" }}>
        <Grid data-testid={"apiAvailability"} container alignItems="center" justifyContent="center"  direction="column">
          {value === 2 && <Progress />}
          <Box mt={2}>
            <InfoCard fontSize={25} level={value} message={t(msg)} />
          </Box>
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