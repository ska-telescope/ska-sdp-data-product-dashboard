import * as React from 'react';
import { DataGrid, GridFilterModel } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import GetMuiDataGridConfig from './GetMuiDataGridConfig';
import GetMuiDataGridRows from './GetMuiDataGridRows';
import { shellSize } from '@utils/constants';

export default function DataproductDataGrid(handleSelectedNode: (data: any) => void) {
  const [muiConfigData, setMuiConfigData] = React.useState({
    columns: []
  });
  const [queryOptions, setQueryOptions] = React.useState({});
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
  }, []); // Empty dependency array ensures the effect runs only once

  const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {
    // Here you save the data you need from the filter model
    setQueryOptions({ filterModel: { ...filterModel } });
  }, []);

  const fetchData = React.useCallback(async () => {
    const response = await GetMuiDataGridConfig(); // Pass query options to GetMuiDataGridConfig
    setMuiConfigData(response);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependency on fetchData to ensure it runs only once

  // const { isLoading, rows } = useQuery(queryOptions);

  const DEF_START_DATE = '1970-01-01';
  const DEF_END_DATE = '2070-12-31';
  const DEF_FORM_FIELDS = ['*:*'];
  const [startDate, updateStartDate] = React.useState('');
  const [endDate, updateEndDate] = React.useState('');
  const [formFields, setFormFields] = React.useState([{ keyPair: '', valuePair: '' }]);

  const fetchRowData = React.useCallback(async () => {
    const response = await GetMuiDataGridRows(queryOptions); // Pass query options to GetMuiDataGridConfig
    if (response.DataGridRowsData) {
      setRows(response.DataGridRowsData);
    }
  }, [queryOptions]); // Refetch data on queryOptions change

  React.useEffect(() => {
    fetchRowData();
  }, [fetchRowData]); // Dependency on fetchData to ensure it runs only once

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
