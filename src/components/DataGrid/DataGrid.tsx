import React from 'react';
import { DataGrid, GridFilterModel, GridColDef, GridSortModel } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import { Box } from '@mui/material';
import GetMuiDataGridConfig from './GetMuiDataGridConfig';
import GetMuiDataGridRows from '../../services/GetMuiDataGridRows/GetMuiDataGridRows';
import useAxiosClient from '@services/AxiosClient/AxiosClient';
import { shellSize, SKA_DATAPRODUCT_API_URL, DATAGRID_DEFAULT_PAGE_SIZE } from '@utils/constants';
import {
  Button,
  ButtonColorTypes,
  ButtonVariantTypes,
  ButtonIcons,
  ButtonSizeTypes
} from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import dataProductDownloadStream from '@services/GetDownloadStream/GetDownloadStream';
import GetLayout from '@services/GetLayout/GetLayout';
import useLocalStorage from '@services/UseLocalStorage/UseLocalStorage';

interface DataproductDataGridProps {
  handleSelectedNode: () => void;
  searchPanelOptions: any;
  updating: boolean;
  isIndexing?: boolean;
  indexingProgress?: any;
  onLoadingChange?: (isLoading: boolean) => void;
  onColumnsChange?: (columns: GridColDef[]) => void;
}

export default function DataproductDataGrid({
  handleSelectedNode,
  searchPanelOptions,
  updating,
  isIndexing,
  indexingProgress,
  onLoadingChange,
  onColumnsChange
}: DataproductDataGridProps) {
  const [muiConfigData, setMuiConfigData] = React.useState({
    columns: []
  });
  const [muiDataGridFilterModel, setMuiDataGridFilterModel] = React.useState({});
  const [dataFilterModel, setDataFilterModel] = React.useState({});
  const [defaultColumns, setDefaultColumns] = useLocalStorage('defaultColumns', {});
  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);
  const [tableHeight, setTableHeight] = React.useState(window.innerHeight - shellSize());
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: DATAGRID_DEFAULT_PAGE_SIZE
  });
  const [rowCount, setRowCount] = React.useState(0);
  const { t } = useTranslation('dpd');
  const authAxiosClient = useAxiosClient(SKA_DATAPRODUCT_API_URL);

  // Trigger refresh when updating prop changes
  React.useEffect(() => {
    if (updating) {
      setRefreshTrigger((prev: number) => prev + 1);
    }
  }, [updating]);

  // Auto-refresh during indexing for progressive data loading
  React.useEffect(() => {
    if (isIndexing) {
      const INDEXING_REFRESH_INTERVAL = 3000; // 3 seconds
      const interval = setInterval(() => {
        setRefreshTrigger((prev: number) => prev + 1);
      }, INDEXING_REFRESH_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [isIndexing]);

  React.useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      onLoadingChange?.(true);

      try {
        const filterModelWithPagination = {
          ...dataFilterModel,
          page: paginationModel.page,
          pageSize: paginationModel.pageSize,
          sortModel: sortModel
        };
        const result = await GetMuiDataGridRows(authAxiosClient, filterModelWithPagination);

        if (!isCancelled) {
          if (Array.isArray(result.DataGridRowsData)) {
            setRows(result.DataGridRowsData);
            setRowCount(result.total ?? 0);
          }
        }
      } catch (error) {
        console.error('Error fetching data grid rows:', error);
        // Keep existing rows on error
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
          onLoadingChange?.(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFilterModel, refreshTrigger, paginationModel, sortModel]);

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
    setPaginationModel((prev: any) => ({ ...prev, page: 0 }));
    setMuiDataGridFilterModel({
      filterModel: { ...filterModel }
    });
  }, []);

  const onSortModelChange = React.useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel);
  }, []);

  React.useEffect(() => {
    setPaginationModel((prev: any) => ({ ...prev, page: 0 }));
    setDataFilterModel({
      ...muiDataGridFilterModel,
      searchPanelOptions: { ...searchPanelOptions }
    });
  }, [searchPanelOptions, muiDataGridFilterModel]);

  const handleRowClick = (params: {
    row: {
      id: any;
      execution_block: any;
      dataproduct_file: any;
      metadata_file: any;
      uid: any;
      metadata_store_name: any;
    };
  }) => {
    const saveData = () => {
      localStorage.setItem(
        'selectedDataProduct',
        JSON.stringify({
          execution_block: params.row.execution_block,
          relativePathName: params.row.dataproduct_file,
          metaDataFile: params.row.metadata_file,
          uid: params.row.uid,
          metadata_store_name: params.row.metadata_store_name
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

        const isFromDlm = String(params.row.metadata_store_name ?? '').toLowerCase() === 'dlm';
        if (!isFromDlm && params.row.dataproduct_file !== 'None') {
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
    try {
      const response = await GetMuiDataGridConfig();
      const layout = await GetLayout();

      const apiColumns = response?.columns ?? [];
      const layoutFields = layout?.data ?? [];

      // MUI DataGrid's `date` column type requires actual Date objects.
      // The API returns ISO-8601 strings, so we inject a valueGetter for
      // every date column that coerces the string to a Date at render time.
      //
      // We also strip `filterOperators` for date/dateTime columns: MUI's
      // built-in date operators include a proper date-picker InputComponent.
      // Passing our custom operator list (which has no InputComponent) would
      // override that and leave the value field blank in the filter popup.
      // The full operator list from the API is still available on `apiColumns`
      // for the search-panel autocomplete.
      const processedApiColumns = apiColumns.map((col) => {
        if (col.type === 'date' || col.type === 'dateTime') {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { filterOperators: _unused, ...rest } = col;
          return {
            ...rest,
            valueGetter: (value: string | null | undefined) => (value ? new Date(value) : null)
          };
        }
        return col;
      });

      // Merge static + API columns
      const newColumns = [...columns, ...processedApiColumns];
      const newData = { columns: newColumns };

      // Notify parent of available fields.
      // MuiColumnConfig is structurally compatible with GridColDef at runtime;
      // the cast is needed because MUI's GridColDef is a discriminated union
      // whose individual variants impose stricter type constraints than GridBaseColDef.
      onColumnsChange?.(newColumns as GridColDef[]);

      // Build visibility model
      const visibilityModel = processedApiColumns.reduce(
        (acc, col) => {
          if (defaultColumns && col.field in defaultColumns) {
            acc[col.field] = defaultColumns[col.field];
          } else if (layoutFields.length > 0) {
            acc[col.field] = layoutFields.includes(col.field);
          } else if (typeof col.hide === 'boolean') {
            acc[col.field] = !col.hide;
          } else {
            acc[col.field] = true;
          }

          return acc;
        },
        {} as Record<string, boolean>
      );

      // Only initialise if no valid saved preferences exist
      const hasValidPreferences =
        defaultColumns &&
        Object.keys(defaultColumns).some((key) =>
          processedApiColumns.some((col) => col.field === key)
        );

      if (!hasValidPreferences) {
        setDefaultColumns(visibilityModel);
      }

      setMuiConfigData(newData);
    } catch (error) {
      console.error('Error fetching DataGrid config:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependency on fetchData to ensure it runs only once

  return (
    <Box data-testid={'availableData'} m={1} sx={{ backgroundColor: 'secondary.contrastText' }}>
      <DataGrid
        {...muiConfigData}
        rows={rows}
        rowCount={rowCount}
        filterMode="server"
        sortingMode="server"
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[25, 50, 100]}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        onFilterModelChange={onFilterChange}
        getRowId={(row: { id: any }) => row.id}
        onRowClick={handleRowClick}
        loading={isLoading}
        rowHeight={35}
        style={{ height: tableHeight!, width: '100%' }}
        columnVisibilityModel={defaultColumns ?? {}}
        onColumnVisibilityModelChange={(newDefaultColumns: any) =>
          setDefaultColumns(newDefaultColumns)
        }
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
