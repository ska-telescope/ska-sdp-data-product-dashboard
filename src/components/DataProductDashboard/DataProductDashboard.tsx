import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Autocomplete,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import RefreshIcon from '@mui/icons-material/Refresh';

import { Button, DateEntry, TextEntry, ButtonColorTypes } from '@ska-telescope/ska-gui-components';
import { ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import { GridColDef } from '@mui/x-data-grid';

import DataProductsTable from '@components/DataProductsTable/DataProductsTable';
import MetadataCard from '@components/MetadataCard/MetadataCard';
import IndexingStatus from '@components/IndexingStatus/IndexingStatus';
import { useApiStatus } from '@contexts/ApiStatusContext';
import { SKA_DATAPRODUCT_API_URL, FILTERCARDHEIGHT } from '@utils/constants';
import DataproductDataGrid from '@components/DataGrid/DataGrid';
import DataAnnotationsCard from '@components/DataAnnotationsCard/DataAnnotationsCard';
import { SelectedDataProduct } from 'types/dataproducts/dataproducts';
import FeedbackButton from '@components/FeedbackButton/FeedbackButton';
import { FEEDBACK_URL } from '@utils/constants';

const DataProductDashboard = () => {
  // State for metadata_store_name filter
  const [dataSourceFilter, setDataSourceFilter] = React.useState('all');
  const { t } = useTranslation('dpd');
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

  const [startDate, updateStartDate] = React.useState('');
  const [endDate, updateEndDate] = React.useState('');
  const [formFields, setFormFields] = React.useState([
    { field: '', operator: 'contains', value: '' }
  ]);

  const [searchPanelOptions, setSearchPanelOptions] = React.useState({
    items: [],
    logicOperator: 'and'
  });

  const [availableColumns, setAvailableColumns] = React.useState<GridColDef[]>([]);

  // Get any pre filled in form values from the URL using ?key=value&key=value
  React.useEffect(() => {
    const queryString = window.location.search;

    const params = new URLSearchParams(queryString);

    // Handle all other search options
    const localSearch: Array<{ field: string; operator: string; value: string }> = [];
    params.forEach((value, key) => {
      if (key === 'start_date') {
        updateStartDate(value);
      } else if (key === 'end_date') {
        updateEndDate(value);
      } else {
        localSearch.push({
          field: key,
          operator: 'contains',
          value: value
        });
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
    } else {
      items = items.filter((item) => item.field !== 'metadata_store_name');
    }
    const dateItems: Array<{ field: string; operator: string; value: string }> = [];
    if (startDate) {
      dateItems.push({ field: 'date_created', operator: 'greaterThan', value: startDate });
    }
    if (endDate) {
      dateItems.push({ field: 'date_created', operator: 'lessThan', value: endDate });
    }
    setSearchPanelOptions({
      items: [...items, ...dateItems],
      logicOperator: 'and'
    });
  }, [startDate, endDate, formFields, dataSourceFilter]);

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
      onColumnsChange={setAvailableColumns}
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

  function RenderSearchBox() {
    const handleKeyPairChange = (event: string, index: number) => {
      let data = [...formFields];
      data[index]['field'] = event;
      setFormFields(data);
    };

    const handleValuePairChange = (event: string, index: number) => {
      let data = [...formFields];
      data[index]['operator'] = 'contains';
      data[index]['value'] = event;
      setFormFields(data);
    };

    const addFields = () => {
      let object = {
        field: '',
        operator: 'contains',
        value: ''
      };

      setFormFields([...formFields, object]);
    };

    const removeFields = (index: number) => {
      let data = [...formFields];
      data.splice(index, 1);
      setFormFields(data);
    };
    return (
      <Box m={1}>
        <Card variant="outlined" sx={{ maxHeight: FILTERCARDHEIGHT, overflow: 'auto' }}>
          <CardContent>
            <Typography
              data-testid={'metaDataDescription'}
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {t('prompt.filter')}
            </Typography>
            <Grid
              container
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={12} md={6}>
                <DateEntry
                  testId="DateEntryStartdate"
                  label={t('label.startDate')}
                  setValue={(e: React.SetStateAction<string>) => updateStartDate(e)}
                  value={startDate}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DateEntry
                  testId="DateEntryEndDate"
                  label={t('label.endDate')}
                  setValue={(e: React.SetStateAction<string>) => updateEndDate(e)}
                  value={endDate}
                />
              </Grid>

              {formFields.map(
                (form: { field: string; operator: string; value: string }, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      <Grid item xs={12} data-testid={`key-field-${index}`}>
                        <Autocomplete
                          options={availableColumns}
                          getOptionLabel={(option) => option.headerName || option.field}
                          value={availableColumns.find((col) => col.field === form.field) || null}
                          onChange={(_, newValue) => {
                            handleKeyPairChange(newValue?.field || '', index);
                          }}
                          renderInput={(params) => {
                            const { inputProps, ...rest } = params;

                            return (
                              <TextField
                                {...rest}
                                label={t('label.key')}
                                inputProps={{
                                  ...inputProps,
                                  'data-testid': 'textEntry-Key'
                                }}
                              />
                            );
                          }}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextEntry
                          ariaTitle="value"
                          label={t('label.value')}
                          setValue={(event: any) => handleValuePairChange(event, index)}
                          value={form.value}
                        />
                      </Grid>

                      <Grid item xs={-4}>
                        <Button
                          testId="RemoveKeyValuePairButton"
                          color={ButtonColorTypes.Secondary}
                          disabled={updating}
                          icon={<IndeterminateCheckBoxOutlinedIcon />}
                          label="Remove"
                          onClick={() => removeFields(index)}
                          toolTip="Remove Key/Value pair"
                          variant={ButtonVariantTypes.Outlined}
                        />
                      </Grid>
                    </React.Fragment>
                  );
                }
              )}

              <Grid item xs={4}>
                <Button
                  testId="AddKeyValuePairButton"
                  color={ButtonColorTypes.Secondary}
                  disabled={updating}
                  icon={<LibraryAddOutlinedIcon />}
                  label="Add"
                  onClick={addFields}
                  toolTip="Add Key/Value pair"
                  variant={ButtonVariantTypes.Outlined}
                />
              </Grid>
            </Grid>

            <br />

            <Grid item xs={4}>
              <Button
                testId="SubmitSearchButton"
                color={ButtonColorTypes.Secondary}
                disabled={updating}
                icon={<SearchIcon />}
                label={t('button.search')}
                onClick={() => setUpdating(true)}
                toolTip="Submit search"
                variant={ButtonVariantTypes.Outlined}
              />
            </Grid>
          </CardContent>
        </Card>
      </Box>
    );
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
      <Grid
        sx={{ height: '100%' }}
        container
        spacing={1}
        direction="row"
        justifyContent="space-between"
      >
        <Grid item xs={9}>
          {DataProductsTable(updating, apiRunning, dataGridComponent, indexingProgress)}
        </Grid>
        <Grid item xs={3}>
          <>
            {RenderSearchBox()}
            <MetadataCard {...selectedFileNames} />
            {DataAnnotationsCard(selectedFileNames)}
          </>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataProductDashboard;
