import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import RefreshIcon from '@mui/icons-material/Refresh';

import { Button, DateEntry, TextEntry, ButtonColorTypes } from '@ska-telescope/ska-gui-components';
import { ButtonVariantTypes } from '@ska-telescope/ska-gui-components';

import DataProductsTable from '@components/DataProductsTable/DataProductsTable';
import MetadataCard from '@components/MetadataCard/MetadataCard';
import { GetAPIStatus } from '@services/GetAPIStatus/GetAPIStatus';
import { API_REFRESH_RATE, SKA_DATAPRODUCT_API_URL, FILTERCARDHEIGHT } from '@utils/constants';
import DataproductDataGrid from '@components/DataGrid/DataGrid';
import DataAnnotationsCard from '@components/DataAnnotationsCard/DataAnnotationsCard';
import { SelectedDataProduct } from 'types/dataproducts/dataproducts';

const DataProductDashboard = () => {
  const { t } = useTranslation('dpd');
  const [updating, setUpdating] = React.useState(false);
  const [selectedFileNames, setSelectedFileNames] = React.useState<SelectedDataProduct>({
    execution_block: '',
    relativePathName: '',
    metaDataFile: '',
    uid: '',
    data_store: ''
  });

  const [apiRunning, updateApiRunning] = React.useState(false);
  const [apiIndexing, updateApiIndexing] = React.useState(false);
  const [indexingProgress, setIndexingProgress] = React.useState<any>(null);
  const [newDataAvailable, updateNewDataAvailable] = React.useState(false);
  const [dataStoreLastModifiedTime, setDataStoreLastModifiedTime] = React.useState(null);
  const [previousDataStoreLastModifiedTime, setPreviousDataStoreLastModifiedTime] = React.useState(null);
  const [initFlag, setInitFlag] = React.useState(true);

  const DEF_START_DATE = '1970-01-01';
  const DEF_END_DATE = '2070-12-31';
  const [startDate, updateStartDate] = React.useState('');
  const [endDate, updateEndDate] = React.useState('');
  const [formFields, setFormFields] = React.useState([
    { field: '', operator: 'contains', value: '' }
  ]);

  const [searchPanelOptions, setSearchPanelOptions] = React.useState({
    items: [
      {
        field: 'date_created',
        operator: 'greaterThan',
        value: DEF_START_DATE
      },
      {
        field: 'date_created',
        operator: 'lessThan',
        value: DEF_END_DATE
      }
    ],
    logicOperator: 'and'
  });

  async function CheckForNewData() {
    const results = await GetAPIStatus();
    if (results?.data) {
      updateApiRunning(results.data?.api_running ?? false);
      updateApiIndexing(results.data.metadata_store_status.indexing);
      setIndexingProgress(results.data?.indexing_progress || null);
      const newTimestamp = results.data.metadata_store_status?.last_metadata_update_time;
      
      // Only update if timestamp actually changed (debouncing)
      if (newTimestamp !== dataStoreLastModifiedTime) {
        setDataStoreLastModifiedTime(newTimestamp);
      }
    } else {
      setDataStoreLastModifiedTime(null);
      setIndexingProgress(null);
    }
  }

  async function PeriodicAPIStatusCheck() {
    React.useEffect(() => {
      CheckForNewData();
      const interval = setInterval(async () => {
        CheckForNewData();
      }, API_REFRESH_RATE);
      return () => clearInterval(interval);
    }, []);
    return;
  }

  PeriodicAPIStatusCheck();

  // Debounced effect: Only trigger data refresh when timestamp actually changes
  React.useEffect(() => {
    if (dataStoreLastModifiedTime !== null && 
        dataStoreLastModifiedTime !== previousDataStoreLastModifiedTime) {
      if (!initFlag) {
        updateNewDataAvailable(true);
      }
      setPreviousDataStoreLastModifiedTime(dataStoreLastModifiedTime);
      setInitFlag(false);
    }
  }, [dataStoreLastModifiedTime, previousDataStoreLastModifiedTime, initFlag]);

  React.useEffect(() => {
    setUpdating(true);
  }, [newDataAvailable]);

  React.useEffect(() => {
    setSearchPanelOptions({
      items: [
        ...formFields,
        {
          field: 'date_created',
          operator: 'greaterThan',
          value: startDate
        },
        {
          field: 'date_created',
          operator: 'lessThan',
          value: endDate
        }
      ],
      logicOperator: 'and'
    });
  }, [startDate, endDate, formFields]);

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
  const dataGridComponent = React.useMemo(
    () => (
      <DataproductDataGrid
        handleSelectedNode={handleRowClick}
        searchPanelOptions={searchPanelOptions}
        updating={updating}
        isIndexing={apiIndexing}
        indexingProgress={indexingProgress}
      />
    ),
    [searchPanelOptions, updating, apiIndexing, indexingProgress]
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
    updateApiIndexing(true);
    indexDataProduct();
    CheckForNewData();
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

              {formFields.map((form, index) => {
                return (
                  <>
                    <Grid item xs={12}>
                      <TextEntry
                        ariaTitle="field"
                        testId="DateEntryKeyPair"
                        label={t('label.key')}
                        setValue={(event: any) => handleKeyPairChange(event, index)}
                        value={form.field}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextEntry
                        ariaTitle="value"
                        testId="DateEntryValuePair"
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
                  </>
                );
              })}

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
        <Grid container spacing={1} direction="row" justifyContent="justify-left">
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
