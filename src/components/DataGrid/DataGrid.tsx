import * as React from 'react';
import { DataGrid, GridFilterModel } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import GetMuiDataGridConfig from './GetMuiDataGridConfig';
import GetMuiDataGridRows from './GetMuiDataGridRows';
import { shellSize } from '@utils/constants';

export default function DataproductDataGrid(
  handleSelectedNode: (data: any) => void,
  searchPanelOptions: {}
) {
  const [muiConfigData, setMuiConfigData] = React.useState({
    columns: []
  });
  const [muiDataGridFilterModel, setMuiDataGridFilterModel] = React.useState({});
  const [dataFilterModel, setDataFilterModel] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const [tableHeight, setTableHeight] = React.useState(window.innerHeight - shellSize());

  React.useEffect(() => {
    function handleResize() {
      setTableHeight(window.innerHeight - shellSize());
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {
    setMuiDataGridFilterModel({
      filterModel: { ...filterModel }
    });
  }, []);

  React.useEffect(() => {
    setDataFilterModel({
      ...muiDataGridFilterModel,
      searchPanelOptions: { ...searchPanelOptions }
    });
  }, [searchPanelOptions, muiDataGridFilterModel]);

  const fetchData = React.useCallback(async () => {
    const response = await GetMuiDataGridConfig();
    setMuiConfigData(response);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependency on fetchData to ensure it runs only once

  const fetchRowData = React.useCallback(async () => {
    const response = await GetMuiDataGridRows(dataFilterModel);
    if (response.DataGridRowsData) {
      setRows(response.DataGridRowsData);
    }
  }, [dataFilterModel]); // Refetch data on muiDataGridFilterModel change

  React.useEffect(() => {
    fetchRowData();
  }, [fetchRowData, dataFilterModel]);

  const isLoading = false;

  return (
    <Box data-testid={'availableData'} m={1} sx={{ backgroundColor: 'secondary.contrastText' }}>
      <DataGrid
        {...muiConfigData}
        rows={rows}
        filterMode="server"
        onFilterModelChange={onFilterChange}
        onRowClick={handleSelectedNode}
        loading={isLoading}
        rowHeight={35}
        style={{ height: tableHeight!, width: '100%' }}
      />
    </Box>
  );
}
