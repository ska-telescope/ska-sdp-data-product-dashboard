import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { Box, Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";
import RefreshIcon from "@mui/icons-material/Refresh";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import DataProductsTable from "../DataProductsTable/DataProductsTable";
import DownloadCard from "../DownloadCard/DownloadCard";
import MetaDataComponent from "../MetaDataComponent/MetaDataComponent";
import SearchForDataProduct from "../../services/SearchForDataProduct/SearchForDataProduct";
import ListAllDataProducts from "../../services/ListAllDataProducts/ListAllDataProducts";
import GetAPIStatus from "../../services/GetAPIStatus/GetAPIStatus";
import MetaData from "../../services/MetaData/MetaData";
import { MockDPL } from "../../services/Mocking/mockDataProductList";
import { MockMeta } from "../../services/Mocking/mockMetaData";
import { DATA_LOCAL } from "../../utils/constants";

const DEF_START_DATE = "1970-01-01";
const DEF_END_DATE = "2070-12-31";
const DEF_WILDCARD = "*";
const REACT_APP_API_REFRESH_RATE = process.env.REACT_APP_API_REFRESH_RATE;

const DataProductDashboard = () => {
  const { t } = useTranslation('dpd');
  const [updating, setUpdating] = React.useState(false);
  const [dataProducts, setDataProductsData] = React.useState({data:[]});
  const [metaData, setMetaData] = React.useState(null);
  const [oldFilename] = React.useState(null);
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
  const [newDataAvailable, updateNewDataAvailable] = React.useState(null);
  const [dataStoreLastModifiedTime, setDataStoreLastModifiedTime] = React.useState(null);
  const [initFlag, setInitFlag] = React.useState(true);

  async function CheckFornewData() {
    const results = await GetAPIStatus()
    updateCanSearch(results.data.Search_enabled)
    setDataStoreLastModifiedTime(results.data.Date_modified)
  }

  async function PeriodicAPIStatusCheck() {
    React.useEffect(() => {
      if (!DATA_LOCAL) {
        CheckFornewData()
      } else {
        updateCanSearch(true)
      }
      const interval = setInterval(async () => {
        if (!DATA_LOCAL) {
          CheckFornewData()
        } else {
          updateCanSearch(true)
        }
      }, REACT_APP_API_REFRESH_RATE);
      return () => clearInterval(interval);
    }, []);
    return;
  }

  PeriodicAPIStatusCheck();

  React.useEffect(() => {
    if (!initFlag) {
      updateNewDataAvailable(true)
    }
    if ( dataStoreLastModifiedTime !== null ) {
      setInitFlag(false)
    }
  }, [dataStoreLastModifiedTime]);


  React.useEffect(() => {
    setUpdating(true);
  }, []);


  React.useEffect(() => {
    async function getDataProductList(startDateStr, endDateStr, metadataKeyStr, metadataValueStr){
      if (canSearch){
        return await SearchForDataProduct(startDateStr, endDateStr, metadataKeyStr, metadataValueStr)
      }
      else {
        return await ListAllDataProducts()
      }
    }

    async function updateSearchResults() {
      const results = (DATA_LOCAL) ? MockDPL : await getDataProductList(startDate ? startDate : DEF_START_DATE, endDate ? endDate : DEF_END_DATE, metadataKey ? metadataKey : DEF_WILDCARD, metadataValue ? metadataValue : DEF_WILDCARD);
      setDataProductsData(results);
      setUpdating(false);
      updateNewDataAvailable(false);
    }
    
    if (updating) {
      updateSearchResults();
    }    
  }, [canSearch, endDate, metadataKey, metadataValue, startDate, updating]);

  React.useEffect(() => {
    if (DATA_LOCAL && selectedFileNames?.metaDataFile?.length ) {
      setMetaData(MockMeta);
    } else {
      const metaDataFile = selectedFileNames?.metaDataFile;

      async function getMetaData() {
        const results = await MetaData(selectedFileNames?.metaDataFile);
        setMetaData(results.data);
      }

      if (metaDataFile && metaDataFile.length) {
        if (oldFilename !== metaDataFile) {
          getMetaData();
        }
      }
    }
  }, [oldFilename, selectedFileNames]);

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

  async function OnClickIndexDataProduct() {
    indexDataProduct()
    CheckFornewData(true)
  }
  
  function RenderSearchBox() {
    if (canSearch) {
      return (
        <Box m={1} sx={{ height: `280px`, width: "100%", overflowY: "auto"  }}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography data-testid={"metaDataDescription"}  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {t('label.filterOnMetaData')}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
              <Grid container direction="row" justifyContent="space-between">
                <DatePicker
                  inputFormat={t('label.date_input_format')}
                  label={t('label.startDate')}
                  onChange={(newValue) => {
                    updateStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{width: 180}}/>}
                  value={startDate}
                />
                <DatePicker
                  inputFormat={t('label.date_input_format')}
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
              <Button disabled={updating} variant="outlined" color="secondary" onClick={() => setUpdating(true)}>
                <SearchIcon />
                {t('button.search')}
              </Button>
            </CardActions>
          </Card>
        </Box>
      );
      };
    }
  

  function RenderDataStoreBox() {
    return (
      <Box m={1}>
        <Grid container spacing={1} direction="row" justifyContent="justify-left">
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={() => OnClickIndexDataProduct() }>
              <RefreshIcon />
              {t('button.indexDP')}
            </Button> 
          </Grid>
          <Grid item>    
            <Button disabled={!newDataAvailable} variant="outlined" color="secondary" onClick={() => setUpdating(true)}> 
              <CachedIcon />
              {t('button.reload')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
  
  return (
    <>
      {RenderDataStoreBox()}
      <Grid container spacing={1} direction="row" justifyContent="space-between">
          <Grid item xs={9}>
            {DataProductsTable(dataProducts.data, updating, rowClickHandler)}
          </Grid>
          <Grid item xs={3}>
            <>
              {RenderSearchBox()}
              {DownloadCard(selectedFileNames)}
              {metaData && <MetaDataComponent metaData={metaData} />}
            </>
          </Grid>
      </Grid>
    </>
  );
};

export default DataProductDashboard;