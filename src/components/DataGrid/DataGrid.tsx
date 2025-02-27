import React from 'react';
import { DataGrid, GridFilterModel, GridColDef } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import { Box } from '@mui/material';
import GetMuiDataGridConfig from './GetMuiDataGridConfig';
import GetMuiDataGridRows from '../../services/GetMuiDataGridRows/GetMuiDataGridRows';
import useAxiosClient from '@services/AxiosClient/AxiosClient';
import { shellSize, SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import {
  Button,
  ButtonColorTypes,
  ButtonVariantTypes,
  ButtonIcons,
  ButtonSizeTypes
} from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import dataProductDownloadStream from '@services/GetDownloadStream/GetDownloadStream';

export default function DataproductDataGrid(
  handleSelectedNode: () => void,
  searchPanelOptions: {},
  updating: boolean
) {
  const [muiConfigData, setMuiConfigData] = React.useState({
    columns: []
  });
  const [muiDataGridFilterModel, setMuiDataGridFilterModel] = React.useState({});
  const [dataFilterModel, setDataFilterModel] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const [tableHeight, setTableHeight] = React.useState(window.innerHeight - shellSize());
  const { t } = useTranslation('dpd');
  const authAxiosClient = useAxiosClient(SKA_DATAPRODUCT_API_URL);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await GetMuiDataGridRows(authAxiosClient, dataFilterModel);
      setRows(result.DataGridRowsData);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFilterModel, updating]);

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

  const handleRowClick = (params: {
    row: { id: any; execution_block: any; dataproduct_file: any; metadata_file: any; uid: any ; data_store: any };
  }) => {
    const saveData = () => {
      localStorage.setItem(
        'selectedDataProduct',
        JSON.stringify({
          execution_block: params.row.execution_block,
          relativePathName: params.row.dataproduct_file,
          metaDataFile: params.row.metadata_file,
          uid: params.row.uid,
          data_store: params.row.data_store
        })
      );
    };
    saveData();
    handleSelectedNode();
  };

  const columns: GridColDef[] = [
    {
      field: 'download',
      headerName: 'Download',
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const onClick = () => {
          dataProductDownloadStream({
            execution_block: params.row.execution_block,
            relativePathName: params.row.dataproduct_file,
            metaDataFile: params.row.metadata_file,
            uid: params.row.uid
          });
        };

        
        if ((params.row.data_store !== 'dlm') && (params.row.dataproduct_file !== 'None')) {
          return (
            <Button
              testId="downloadButton"
              color={ButtonColorTypes.Secondary}
              icon={<DownloadIcon />}
              label={t('button.download')}
              onClick={onClick}
              toolTip={t('toolTip.button.dataProductAvailable')}
              variant={ButtonVariantTypes.Outlined}
              size={ButtonSizeTypes.Small}
            />
          );
        } else {
          return (
            <Button
              testId="unavailableDownloadButton"
              color={ButtonColorTypes.Secondary}
              icon={ButtonIcons.Download}
              label={t('button.download')}
              onClick={onClick}
              toolTip={t('toolTip.button.dataProductNotAvailable')}
              variant={ButtonVariantTypes.Outlined}
              disabled={true}
              size={ButtonSizeTypes.Small}
            />
          );
        }
      }
    }
  ];

  const fetchData = React.useCallback(async () => {
    const response = await GetMuiDataGridConfig();
    const newData = {
      columns: [...columns, ...response.columns]
    };
    setMuiConfigData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependency on fetchData to ensure it runs only once

  const isLoading = false;

  return (
    <Box data-testid={'availableData'} m={1} sx={{ backgroundColor: 'secondary.contrastText' }}>
      <DataGrid
        {...muiConfigData}
        rows={rows}
        filterMode="server"
        onFilterModelChange={onFilterChange}
        onRowClick={handleRowClick}
        loading={isLoading}
        rowHeight={35}
        style={{ height: tableHeight!, width: '100%' }}
        sx={{
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'primary.dark',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.dark',
              color: 'primary.contrastText'
            }
          }
        }}
      />
    </Box>
  );
}
