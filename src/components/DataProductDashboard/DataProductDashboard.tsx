import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import RefreshIcon from '@mui/icons-material/Refresh';

import { Button, ButtonColorTypes } from '@ska-telescope/ska-gui-components';
import { ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import GetMuiDataGridConfig, { MuiColumnConfig } from '@components/DataGrid/GetMuiDataGridConfig';

import DataProductsTable from '@components/DataProductsTable/DataProductsTable';
import MetadataCard from '@components/MetadataCard/MetadataCard';
import IndexingStatus from '@components/IndexingStatus/IndexingStatus';
import { useApiStatus } from '@contexts/ApiStatusContext';
import { SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import DataproductDataGrid from '@components/DataGrid/DataGrid';
import DataAnnotationsCard from '@components/DataAnnotationsCard/DataAnnotationsCard';
import { SelectedDataProduct } from 'types/dataproducts/dataproducts';
import FeedbackButton from '@components/FeedbackButton/FeedbackButton';
import { FEEDBACK_URL } from '@utils/constants';
import SearchBox from '@components/SearchComponent/SearchComponent';

const DataProductDashboard = () => {
  // State for metadata_store_name filter
  const [dataSourceFilter, setDataSourceFilter] = React.useState('all');
  const { t } = useTranslation('dpd');
  const { t: tColumns } = useTranslation('humanreadable');
  const {
    apiRunning,
    apiIndexing,
    apiStatus,
    indexingProgress,
    dataStoreLastModifiedTime,
    refreshStatus
  } = useApiStatus();

  const availableDataSources: string[] = apiStatus?.available_data_stores ?? [];
  const [updating, setUpdating] = React.useState(false);
  const [selectedFileNames, setSelectedFileNames] = React.useState<SelectedDataProduct>({
    execution_block: '',
    relativePathName: '',
    metaDataFile: '',
    uid: '',
    metadata_store_name: ''
  });

  const [isDataLoading, setIsDataLoading] = React.useState(false);
  const [newDataAvailable, updateNewDataAvailable] = React.useState(false);
  const [previousDataStoreLastModifiedTime, setPreviousDataStoreLastModifiedTime] =
    React.useState(null);
  const [initFlag, setInitFlag] = React.useState(true);

  const [formFields, setFormFields] = React.useState([]);

  const [searchPanelOptions, setSearchPanelOptions] = React.useState({
    items: [],
    logicOperator: 'and'
  });

  const [availableColumns, setAvailableColumns] = React.useState<MuiColumnConfig[]>([]);

  // Load column metadata for the search panel field/operator selectors
  React.useEffect(() => {
    GetMuiDataGridConfig().then((config) => {
      setAvailableColumns(config.columns.filter((col) => col.filterable !== false));
    });
  }, []);

  // Get any pre filled in form values from the URL using ?key=value&key=value
  React.useEffect(() => {
    const queryString = window.location.search;

    const params = new URLSearchParams(queryString);

    // Handle all search options, including legacy date-range params.
    // Legacy: ?start_date=YYYY-MM-DD / ?end_date=YYYY-MM-DD  →  date_created onOrAfter/before rows
    // Current: ?key=value  →  key contains value rows
    const localSearch: Array<{ field: string; operator: string; value: string }> = [];
    params.forEach((value, key) => {
      if (key === 'start_date') {
        localSearch.push({ field: 'date_created', operator: 'onOrAfter', value });
      } else if (key === 'end_date') {
        localSearch.push({ field: 'date_created', operator: 'before', value });
      } else {
        localSearch.push({ field: key, operator: 'contains', value });
      }
    });

    if (localSearch.length > 0) {
      // Putting search options before any current form options
      setFormFields(
        (URLParamFunction: Array<{ field: string; operator: string; value: string }>) => {
          // Only add items that don't already exist (check by field name)
          const existingFields = URLParamFunction.map((f) => f.field);
          const newItems = localSearch.filter((item) => !existingFields.includes(item.field));
          return [...newItems, ...URLParamFunction];
        }
      );
    }
  }, []);

  // Monitor dataStoreLastModifiedTime for changes to enable reload button
  React.useEffect(() => {
    if (
      dataStoreLastModifiedTime &&
      dataStoreLastModifiedTime !== previousDataStoreLastModifiedTime
    ) {
      if (!initFlag) {
        updateNewDataAvailable(true);
      }
      setPreviousDataStoreLastModifiedTime(dataStoreLastModifiedTime);
      setInitFlag(false);
    }
  }, [dataStoreLastModifiedTime, previousDataStoreLastModifiedTime, initFlag]);

  // Auto-reload when new data becomes available
  React.useEffect(() => {
    if (newDataAvailable) {
      setUpdating(true);
    }
  }, [newDataAvailable]);

  React.useEffect(() => {
    // Add metadata_store_name filter if not 'all'
    let items = [...formFields];
    if (dataSourceFilter && dataSourceFilter !== 'all') {
      items = items.filter((item) => item.field !== 'metadata_store_name');
      items.push({ field: 'metadata_store_name', operator: 'equals', value: dataSourceFilter });
    }
    setSearchPanelOptions({
      items,
      logicOperator: 'and'
    });
  }, [formFields, dataSourceFilter]);

  React.useEffect(() => {
    // Reset updating flag after filter changes have been applied
    // This allows the DataGrid to detect the change and refetch
    if (updating) {
      const timer = setTimeout(() => {
        setUpdating(false);
        updateNewDataAvailable(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [updating, searchPanelOptions]);

  const handleRowClick = () => {
    const selectedDataProduct = localStorage.getItem('selectedDataProduct');
    const selectedFileNames = selectedDataProduct ? JSON.parse(selectedDataProduct) : null;
    setSelectedFileNames(selectedFileNames);
  };

  // Memoize the DataGrid to prevent unnecessary re-renders
  const dataGridComponent = (
    <DataproductDataGrid
      handleSelectedNode={handleRowClick}
      searchPanelOptions={searchPanelOptions}
      updating={updating}
      isIndexing={apiIndexing}
      indexingProgress={indexingProgress}
      onLoadingChange={setIsDataLoading}
    />
  );

  async function indexDataProduct() {
    const apiUrl = SKA_DATAPRODUCT_API_URL;
    try {
      return await axios.get(`${apiUrl}/reindexdataproducts`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    } catch (e) {
      return t('error.API_NOT_AVAILABLE');
    }
  }

  async function OnClickIndexDataProduct() {
    indexDataProduct();
    refreshStatus();
  }

  function RenderDataStoreBox() {
    return (
      <Box m={1}>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="justify-left"
          alignItems="center"
        >
          <Grid item>
            <FormControl
              size="small"
              sx={{
                minWidth: 180,
                bgcolor: 'background.paper',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'text.disabled' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary' },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'text.primary',
                  borderWidth: 1
                }
              }}
            >
              <InputLabel id="data-source-select-label">{t('label.metadataStore')}</InputLabel>
              <Select
                labelId="data-source-select-label"
                id="data-source-select"
                value={dataSourceFilter}
                label={t('label.metadataStore')}
                onChange={(e) => setDataSourceFilter(e.target.value as string)}
              >
                <MenuItem value="all">{t('label.all')}</MenuItem>
                {availableDataSources.map((ds: string) => (
                  <MenuItem key={ds} value={ds}>
                    {ds}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              testId="IndexDataProductsButton"
              color={ButtonColorTypes.Secondary}
              disabled={apiIndexing}
              icon={<RefreshIcon />}
              label={t('button.indexDP')}
              onClick={() => OnClickIndexDataProduct()}
              toolTip="Re-index all the data product files found on the storage volume. The resulting index is updated in the memory of the backend API."
              variant={ButtonVariantTypes.Outlined}
            />
          </Grid>
          <Grid item>
            <Button
              testId="ReloadDataProductsButton"
              color={ButtonColorTypes.Secondary}
              disabled={!newDataAvailable}
              icon={<CachedIcon />}
              label={t('button.reload')}
              onClick={() => setUpdating(true)}
              toolTip="Load the latest index from the backend API, update the index in the browser and reloads the data product table."
              variant={ButtonVariantTypes.Outlined}
            />
          </Grid>
          <Grid item>
            <IndexingStatus isLoading={isDataLoading} />
          </Grid>
          <Grid item sx={{ ml: 'auto' }}>
            <FeedbackButton href={FEEDBACK_URL} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%' }}>
      {RenderDataStoreBox()}
      <Box sx={{ height: '100%' }}>
        {SearchBox(t, tColumns, availableColumns, formFields, setFormFields)}
      </Box>
      <Grid
        sx={{ height: '100%' }}
        container
        spacing={1}
        direction="row"
        justifyContent="space-between"
      >
        <Grid item xs={8}>
          {DataProductsTable(updating, apiRunning, dataGridComponent, indexingProgress)}
        </Grid>
        <Grid item xs={4}>
          <>
            <MetadataCard {...selectedFileNames} />
            {DataAnnotationsCard(selectedFileNames)}
          </>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataProductDashboard;
