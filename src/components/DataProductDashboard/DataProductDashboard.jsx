import React from 'react';

import { Grid } from '@mui/material';

import DataProductsTable from '../DataProductsTable/DataProductsTable';
import DownloadCard from '../DownloadCard/DownloadCard';
import MetaDataComponent from '../MetaDataComponent/MetaDataComponent';
import FetchDataProductList from '../../services/FetchDataProductList/FetchDataProductList';
import MetaData from '../../services/MetaData/MetaData';
import { Box, Button, Card, CardActions, CardContent, Typography, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

const DataProductDashboard = () => {
  const [jsonDataProducts, setJsonDataProducts] = React.useState([]);
  const [metaData, setMetaData] = React.useState(null);
  const [oldFilename, setOldFilename] = React.useState(null);
  const [selectedFileNames, setSelectedFileNames] = React.useState({
    fileName: '',
    relativeFileName: '',
    metaDataFile: ''
  });
  const [startDate, updateStartDate] = React.useState("2015-01-01");
  const [endDate, updateEndDate] = React.useState("2050-12-12");
  const [metadataKey, updateMetadataKey] = React.useState("execution_block");
  const [metadataValue, updateMetadataValue] = React.useState("eb-m001-20191031-12345");

  React.useEffect(() => {
    async function getJsonDataProducts() {
      const results = await FetchDataProductList(startDate, endDate, metadataKey, metadataValue);
      setJsonDataProducts(results);
    }
    
    getJsonDataProducts();
  }, [startDate, endDate, metadataKey, metadataValue]);

  async function updateSearchResults() {
    const results = await FetchDataProductList(startDate, endDate, metadataKey, metadataValue);
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
      const noData = 'API unreachable, SDP Data Product MetaData is not currently available';
      return noData;
    }
  }

  async function getMetaData() {
    const results = await MetaData(selectedFileNames?.metaDataFile);
    setMetaData(results.data);
  }

  function RenderDataProductsTable(){
    return (
      DataProductsTable(jsonDataProducts, rowClickHandler)
    );
  }

  function RenderDownloadCard() {
    if ( selectedFileNames.relativeFileName !== '' ) {
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
  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Filter data products based on metadata:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container direction="row" justifyContent="space-between">
            <DatePicker
              label="Start date"
              value={startDate}
              onChange={(newValue) => {
                updateStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} sx={{width: 180}}/>}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                updateEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} sx={{width: 180}}/>}
            />
            <TextField
              id="outlined"
              label="Key"
              style = {{width: 300}}
              defaultValue={metadataKey}
              onChange={(newValue) => {
                updateMetadataKey(newValue.target.value);
              }}
            />
            <TextField
              id="outlined"
              label="Value"
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
            Index Data Products
          </Button>      
          <Button variant="outlined" color="secondary" onClick={() => updateSearchResults()}>
            <SearchIcon />
            Search
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
  };
  
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
