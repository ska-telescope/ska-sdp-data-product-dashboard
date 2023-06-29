import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { Box, Button, Card, CardActions, CardContent, Grid, Typography, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import DataProductsTable from '../DataProductsTable/DataProductsTable';
import DownloadCard from '../DownloadCard/DownloadCard';
import MetaDataComponent from '../MetaDataComponent/MetaDataComponent';
import SearchForDataProduct from '../../services/SearchForDataProduct/SearchForDataProduct';
import ListAllDataProducts from '../../services/ListAllDataProducts/ListAllDataProducts';
import GetAPIStatus from '../../services/GetAPIStatus/GetAPIStatus';
import MetaData from '../../services/MetaData/MetaData';
import Constants from '../../constants/constants';

const DEF_START_DATE = "1970-01-01"; 
const DEF_END_DATE = "2070-12-31";
const DEF_WILDCARD = "*";

const DataProductDashboard = () => {
  const { t } = useTranslation();
  const [jsonDataProducts, setJsonDataProducts] = React.useState({data:[]});
  const [metaData, setMetaData] = React.useState(null);
  const [oldFilename, setOldFilename] = React.useState(null);
  const [selectedFileNames, setSelectedFileNames] = React.useState({
    fileName: '',
    relativePathName: '',
    metaDataFile: ''
  });
  const [startDate, updateStartDate] = React.useState(null);
  const [endDate, updateEndDate] = React.useState(null);
  const [metadataKey, updateMetadataKey] = React.useState(null);
  const [metadataValue, updateMetadataValue] = React.useState(null);
  const [canSearch, updateCanSearch] = React.useState(false);

  async function UpdateAPIStatus() {
    const results = await GetAPIStatus()
    updateCanSearch(results.data.Search_enabled)
  }
  UpdateAPIStatus()

  async function getDataProductList(startDateStr, endDateStr, metadataKeyStr, metadataValueStr){
    if (canSearch){
      const results = await SearchForDataProduct(startDateStr, endDateStr, metadataKeyStr, metadataValueStr);
      return results
    }
    else {
      const results = await ListAllDataProducts();
      return results
    }
  }

  React.useEffect(() => {
    updateSearchResults();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateSearchResults() {
    const startDateStr = startDate ? startDate : DEF_START_DATE;
    const endDateStr = endDate ? endDate : DEF_END_DATE;
    const metadataKeyStr = metadataKey ? metadataKey : DEF_WILDCARD;
    const metadataValueStr = metadataValue ? metadataValue : DEF_WILDCARD;
    const results = await getDataProductList(startDateStr, endDateStr, metadataKeyStr, metadataValueStr);
    setJsonDataProducts(results);
  }

  React.useEffect(() => {
    setOldFilename(selectedFileNames.metaDataFile);
  }, [selectedFileNames, metaData]);

  const rowClickHandler = (data) => {
    setSelectedFileNames({
      fileName: data.row.execution_block,
      relativePathName: data.row.dataproduct_file,
      metaDataFile: data.row.metadata_file
    });
  };

  async function indexDataProduct() {
    const apiUrl = process.env.REACT_APP_SKA_SDP_DATAPRODUCT_API_URL;
    try {
      return await axios.get(`${apiUrl}/reindexdataproducts`,  {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    } catch (e) {
      return t('error.API_NOT_AVAILABLE');
    }
  }

  async function getMetaData() {
    const results = await MetaData(selectedFileNames?.metaDataFile);
    setMetaData(results.data);
  }

   function RenderMetaData() {
    if ( displayData() && metaData ) {
      return (
        <MetaDataComponent metaData={metaData} />
      );
    }
  }

  const displayData = () => {
    let result = false;
    const metaDataFile = selectedFileNames?.metaDataFile;

    if (metaDataFile && metaDataFile.length) {
      result = true;
      if (oldFilename !== metaDataFile) {
        getMetaData();
      }
    }
    return result;
  }

  function RenderSearchBox() {
    if (canSearch) {
      return (
        <Box m={1} sx={{ height: `280px`, width: "100%", overflowY: "auto"  }}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {t('prompt.filterOnMetaData')}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
              <Grid container direction="row" justifyContent="space-between">
                <DatePicker
                  inputFormat={t('date_input_format')}
                  label={t('label.startDate')}
                  onChange={(newValue) => {
                    updateStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{width: 180}}/>}
                  value={startDate}
                />
                <DatePicker
                  inputFormat={t('date_input_format')}
                  label={t('label.endDate')}
                  onChange={(newValue) => {
                    updateEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{width: 180}}/>}
                  value={endDate}
                />
                <TextField
                  id="keyValue"
                  label={t('label.key')}
                  style = {{width: 300}}
                  defaultValue={metadataKey}
                  onChange={(newValue) => {
                    updateMetadataKey(newValue.target.value);
                  }}
                />
                <TextField
                  id="valueValue"
                  label={t('label.value')}
                  style = {{width: 500}}
                  defaultValue={metadataValue}
                  onChange={(newValue) => {
                    updateMetadataValue(newValue.target.value);
                  }}
                />   
                </Grid>
              </LocalizationProvider>
      
            </CardContent>
            <CardActions>
              <Button variant="outlined" color="secondary" onClick={() => updateSearchResults()}>
                <SearchIcon />
                {t('button.search')}
              </Button>
            </CardActions>
          </Card>
        </Box>
      );
      };
    }
  

  function RenderDatatStoreBox() {
    return (
      <Box m={1} sx={{ height: Constants.DATA_STORE_BOX_HEIGHT, width: "100%", overflowY: "auto"  }}>
        <Card variant="outlined" sx={{ minWidth: 275 }}>
          <CardActions>
            <Button variant="outlined" color="secondary" onClick={() => indexDataProduct()}>
              <RefreshIcon />
              {t('button.indexDP')}
            </Button>      
            <Button variant="outlined" color="secondary" onClick={() => updateSearchResults()}>
              <CachedIcon />
              {t('button.reload')}
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
    }

  
  return (
    <>
      <Grid container spacing={1} direction="row" justifyContent="space-between">
        <Grid item xs={9}>
          {RenderDatatStoreBox()}
          {DataProductsTable(jsonDataProducts.data, rowClickHandler)}
        </Grid>
        <Grid item xs={3}>
          <>
            {RenderSearchBox()}
            {DownloadCard(selectedFileNames)}
            {RenderMetaData()}
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default DataProductDashboard;