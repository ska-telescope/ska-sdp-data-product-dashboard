import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";
import RefreshIcon from "@mui/icons-material/Refresh";

import { Button, DateEntry, TextEntry } from "@ska-telescope/ska-gui-components";

import DataProductsTable from "../DataProductsTable/DataProductsTable";
import DownloadCard from "../DownloadCard/DownloadCard";
import SearchForDataProduct from "../../services/SearchForDataProduct/SearchForDataProduct";
import ListAllDataProducts from "../../services/ListAllDataProducts/ListAllDataProducts";
import GetAPIStatus from "../../services/GetAPIStatus/GetAPIStatus";
import MetaData from "../../services/MetaData/MetaData";
import MockDPL from "../../services/Mocking/mockDataProductList";
import MockMeta from "../../services/Mocking/mockMetaData";
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
  const [startDate, updateStartDate] = React.useState('');
  const [endDate, updateEndDate] = React.useState('');
  const [metadataKey, updateMetadataKey] = React.useState('');
  const [metadataValue, updateMetadataValue] = React.useState('');
  const [canSearch, updateCanSearch] = React.useState(false);
  const [newDataAvailable, updateNewDataAvailable] = React.useState(null);
  const [dataStoreLastModifiedTime, setDataStoreLastModifiedTime] = React.useState(null);
  const [initFlag, setInitFlag] = React.useState(true);

  async function CheckForNewData() {
    const results = await GetAPIStatus()
    if (results?.data) {
      updateCanSearch(results.data.Search_enabled)
      setDataStoreLastModifiedTime(results.data.Date_modified)
    } else {
      updateCanSearch(false)
      setDataStoreLastModifiedTime(null)
    }
  }

  async function PeriodicAPIStatusCheck() {
    React.useEffect(() => {
      if (!DATA_LOCAL) {
        CheckForNewData()
      } else {
        updateCanSearch(true)
      }
      const interval = setInterval(async () => {
        if (!DATA_LOCAL) {
          CheckForNewData()
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
  }, [initFlag, dataStoreLastModifiedTime]);


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
    CheckForNewData(true)
  }
  
  function RenderSearchBox() {
    if (canSearch) {
      return (
        <Box m={1}>
          <Card variant="outlined" >
            <CardContent>
              <Typography data-testid={"metaDataDescription"}  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {t('prompt.filter')}
              </Typography>
              <Grid container direction="row" spacing={1} justifyContent="space-between">
                <Grid item xs={12} md={6}>
                  <DateEntry 
                    label={t('label.startDate')}
                    setValue={(e) => updateStartDate(e)}
                    value={startDate} 
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DateEntry 
                    label={t('label.endDate')}
                    setValue={(e) => updateEndDate(e)}
                    value={endDate} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextEntry
                      label={t('label.key')}
                      setValue={(e) => updateMetadataKey(e.target.value)}
                      value={metadataKey}
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextEntry
                    label={t('label.value')}
                    setValue={(e) => updateMetadataValue(e.target.value)}
                    value={metadataValue}
                  />
                </Grid>
              </Grid> 
              <Grid item xs={4}>
                <Button
                  color="secondary"
                  disabled={updating}
                  icon={<SearchIcon />}
                  label={t('button.search')}
                  onClick={() => setUpdating(true)}
                  toolTip=""
                  variant="outlined"
                />
              </Grid>
            </CardContent>
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
            <Button
              color="secondary"
              icon={<RefreshIcon />}
              label={t('button.indexDP')}
              onClick={() => OnClickIndexDataProduct()}
              toolTip=""
              variant="outlined"
            />
          </Grid>
          <Grid item>    
            <Button
              color="secondary"
              disabled={!newDataAvailable}
              icon={<CachedIcon />}
              label={t('button.reload')}
              onClick={() => setUpdating(true)}
              toolTip=""
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
  
  return (
    <Box sx={{ height: '100%' }}>
      {RenderDataStoreBox()}
      <Grid sx={{ height: '100%'}} container spacing={1} direction="row" justifyContent="space-between"  >
          <Grid item xs={9}>
            {DataProductsTable(dataProducts.data, updating, rowClickHandler)}
          </Grid>
          <Grid item xs={3}>
            <>
              {RenderSearchBox()}
              {DownloadCard(selectedFileNames, metaData)}
            </>
          </Grid>
      </Grid>
    </Box>
  );
};

export default DataProductDashboard;