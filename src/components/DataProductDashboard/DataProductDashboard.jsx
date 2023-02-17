import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { Box, Button, Card, CardActions, CardContent, Grid, Typography, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
    relativeFileName: '',
    metaDataFile: ''
  });
  const [startDate, updateStartDate] = React.useState(null);
  const [endDate, updateEndDate] = React.useState(null);
  const [metadataKey, updateMetadataKey] = React.useState(null);
  const [metadataValue, updateMetadataValue] = React.useState(null);
  const [esAvailable, updateEsAvailable] = React.useState(false);

  async function UpdateAPIStatus() {
    const results = await GetAPIStatus()
    updateEsAvailable(results.data.Search_enabled)
  }
  UpdateAPIStatus()

  async function getDataproductList(startDateStr, endDateStr, metadataKeyStr, metadataValueStr){
    if (esAvailable){
      const results = await SearchForDataProduct(startDateStr, endDateStr, metadataKeyStr, metadataValueStr);
      return results
    }
    else {
      const results = await ListAllDataProducts();
      return results
    }
  }

  React.useEffect(() => {
    async function getJsonDataProducts() {
      const startDateStr = startDate ? startDate : DEF_START_DATE;
      const endDateStr = endDate ? endDate : DEF_END_DATE;
      const metadataKeyStr = metadataKey ? metadataKey : DEF_WILDCARD;
      const metadataValueStr = metadataValue ? metadataValue : DEF_WILDCARD;
      const results = await getDataproductList(startDateStr, endDateStr, metadataKeyStr, metadataValueStr);
      setJsonDataProducts(results);
    }
    
    getJsonDataProducts();
  }, [startDate, endDate, metadataKey, metadataValue, esAvailable]);

  async function updateSearchResults() {
    const startDateStr = startDate ? startDate : DEF_START_DATE;
    const endDateStr = endDate ? endDate : DEF_END_DATE;
    const metadataKeyStr = metadataKey ? metadataKey : DEF_WILDCARD;
    const metadataValueStr = metadataValue ? metadataValue : DEF_WILDCARD;
    const results = await getDataproductList(startDateStr, endDateStr, metadataKeyStr, metadataValueStr);
    setJsonDataProducts(results);
  }

  React.useEffect(() => {
    setOldFilename(selectedFileNames.metaDataFile);
  }, [selectedFileNames, metaData]);

  const rowClickHandler = (data) => {
    setSelectedFileNames({
      fileName: data.row.execution_block,
      relativeFileName: data.row.dataproduct_file,
      metaDataFile: data.row.metadata_file
    });
  };

  async function indexDataProduct() {
    const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
    try {
      return await axios.get(`${apiUrl}/updatesearchindex`,  {
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

  function RenderDataProductsTable(){
    return (
      DataProductsTable(jsonDataProducts.data, rowClickHandler)
    );
  }

  function RenderDownloadCard() {
    if ( selectedFileNames?.relativeFileName !== '' ) {
      return (
        DownloadCard(selectedFileNames)
      );
    }
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
    if (esAvailable) {
      return (
        <Box m={1}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {t('prompt.filterOnMetaData')}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container direction="row" justifyContent="space-between">
                <DatePicker
                  label={t('label.startDate')}
                  value={startDate}
                  onChange={(newValue) => {
                    updateStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{width: 180}}/>}
                />
                <DatePicker
                  label={t('label.endDate')}
                  value={endDate}
                  onChange={(newValue) => {
                    updateEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{width: 180}}/>}
                />
                <TextField
                  id="outlined"
                  label={t('label.key')}
                  style = {{width: 300}}
                  defaultValue={metadataKey}
                  onChange={(newValue) => {
                    updateMetadataKey(newValue.target.value);
                  }}
                />
                <TextField
                  id="outlined"
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
              <Button variant="outlined" color="secondary" onClick={() => indexDataProduct()}>
                <RefreshIcon />
                {t('button.indexDP')}
              </Button>      
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
  
  
  return (
    <>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={9}>
          {RenderSearchBox()}
          {RenderDataProductsTable()}
        </Grid>
        <Grid item xs={3}>
          <>
            {RenderDownloadCard()}
            {RenderMetaData()}
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default DataProductDashboard;
