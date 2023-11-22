import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import CachedIcon from "@mui/icons-material/Cached";
import RefreshIcon from "@mui/icons-material/Refresh";

import { Button, DateEntry, TextEntry } from "@ska-telescope/ska-gui-components";

import DataProductsTable from "../DataProductsTable/DataProductsTable";
import DownloadCard from "../DownloadCard/DownloadCard";
import SearchForDataProduct from "../../services/SearchForDataProduct/SearchForDataProduct";
import ListAllDataProducts from "../../services/ListAllDataProducts/ListAllDataProducts";
import GetAPIStatus from "../../services/GetAPIStatus/GetAPIStatus";
import MetaData from "../../services/MetaData/MetaData";
import { API_REFRESH_RATE, SKA_SDP_DATAPRODUCT_API_URL } from "../../utils/constants";

const DEF_START_DATE = "1970-01-01";
const DEF_END_DATE = "2070-12-31";
const DEF_WILDCARD = "*";


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
  const [apiRunning, updateApiRunning] = React.useState(false);
  const [newDataAvailable, updateNewDataAvailable] = React.useState(null);
  const [dataStoreLastModifiedTime, setDataStoreLastModifiedTime] = React.useState(null);
  const [initFlag, setInitFlag] = React.useState(true);

  const [formFields, setFormFields] = React.useState([
    { keyPair: '', valuePair: '' },
  ])

  async function CheckForNewData() {
    const results = await GetAPIStatus()
    if (results?.data) {
      updateApiRunning(results.data.API_running)
      updateCanSearch(results.data.Search_enabled)
      setDataStoreLastModifiedTime(results.data.Date_modified)
    } else {
      updateCanSearch(false)
      setDataStoreLastModifiedTime(null)
    }
  }

  async function PeriodicAPIStatusCheck() {
    React.useEffect(() => {
      CheckForNewData()
      const interval = setInterval(async () => {
        CheckForNewData()
      }, API_REFRESH_RATE);
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
        console.log(startDateStr, endDateStr, formFields)
        return await SearchForDataProduct(startDateStr, endDateStr, metadataKeyStr, metadataValueStr)
      }
      else {
        return await ListAllDataProducts()
      }
    }

    async function updateSearchResults() {
      const results = await getDataProductList(startDate ? startDate : DEF_START_DATE, endDate ? endDate : DEF_END_DATE, metadataKey ? metadataKey : DEF_WILDCARD, metadataValue ? metadataValue : DEF_WILDCARD);
      setDataProductsData(results);
      setUpdating(false);
      updateNewDataAvailable(false);
    }
    
    if (updating) {
      updateSearchResults();
    }    
  }, [canSearch, endDate, metadataKey, metadataValue, startDate, updating]);

  React.useEffect(() => {
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
  }, [oldFilename, selectedFileNames]);

  const rowClickHandler = (data) => {
    setSelectedFileNames({
      fileName: data.row.execution_block,
      relativePathName: data.row.dataproduct_file,
      metaDataFile: data.row.metadata_file
    });
  };

  async function indexDataProduct() {
    const apiUrl = SKA_SDP_DATAPRODUCT_API_URL;
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

    
  
    const handleKeyPairChange = (event, index) => {
      let data = [...formFields];
      data[index]["keyPair"] = event;
      setFormFields(data);
    }

    const handleValuePairChange = (event, index) => {
      let data = [...formFields];
      data[index]["valuePair"] = event;
      setFormFields(data);
    }
  
    const addFields = () => {
      let object = {
        keyPair: '',
        valuePair: ''
      }
  
      setFormFields([...formFields, object])
    }
  
    const removeFields = (index) => {
      let data = [...formFields];
      data.splice(index, 1)
      setFormFields(data)
    }

    if (canSearch) {

      return (
        <Box m={1}>
          <Card variant="outlined" sx={{ maxHeight: '80vh', overflow: 'auto' }}>
            <CardContent>
              <Typography data-testid={"metaDataDescription"}  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {t('prompt.filter')}
              </Typography>
              <Grid container direction="row" spacing={1} justifyContent="space-between" alignItems="center">
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

                {/* <form onSubmit={submit}> */}
                        {formFields.map((form, index) => {
                          return (
                            // <div key={index}>
                            <>
                              <Grid item xs={12}>
                              <TextEntry
                                name='keyPair'
                                label={t('label.key')}
                                setValue={event => handleKeyPairChange(event, index)}
                                value={form.keyPair}
                              />
                              </Grid>
                              
                              <Grid item xs={12}>
                              <TextEntry
                                name='valuePair'
                                label={t('label.value')}
                                setValue={event => handleValuePairChange(event, index)}
                                value={form.valuePair}
                              />
                              </Grid>

                              <Grid item xs={-4} >
                              <Button 
                              color="secondary"
                              disabled={updating}
                              icon={<IndeterminateCheckBoxOutlinedIcon />}
                              label="Remove"
                              onClick={() => removeFields(index)} 
                              toolTip="Remove Key/Value pair"
                              variant="outlined"
                              />
                              </Grid>
                              </>
                            // </div>                            
                          )
                        })}
                      {/* </form> */}

                      <Grid item xs={4}>
                      <Button 
                      color="secondary"
                      disabled={updating}
                      icon={<LibraryAddOutlinedIcon />}
                      label="Add"
                      onClick={addFields}
                      toolTip="Add Key/Value pair"
                      variant="outlined"
                      />
                      </Grid>
              </Grid>

              <br/>
    
              <Grid item xs={4}>
                <Button
                  color="secondary"
                  disabled={updating}
                  icon={<SearchIcon />}
                  label={t('button.search')}
                  onClick={() => setUpdating(true)}
                  toolTip="Submit search"
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
            {DataProductsTable(dataProducts.data, updating, apiRunning, rowClickHandler)}
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