import React from 'react';

import { Grid } from '@mui/material';

import DataProductsTable from '../DataProductsTable/DataProductsTable';
import DownloadCard from '../DownloadCard/DownloadCard';
import MetaDataComponent from '../MetaDataComponent/MetaDataComponent';
import FetchDataProductList from '../../services/FetchDataProductList/FetchDataProductList';
import MetaData from '../../services/MetaData/MetaData';

import { Box, Button, Card, CardActions, CardContent, Typography, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
  }, []);

  async function updateSearchResults() {
    const results = await FetchDataProductList(startDate, endDate, metadataKey, metadataValue);
    console.log(results)
    setJsonDataProducts(results);
  }

  React.useEffect(() => {
    setOldFilename(selectedFileNames.metaDataFile);
  }, [selectedFileNames, metaData]);

  const rowClickHandler = (data) => {
    console.log("rowClickHandler()", data);     // TODO: Remove when done
    setSelectedFileNames({
      fileName: data.row.execution_block,
      relativeFileName: data.row.dataproduct_file,
      metaDataFile: data.row.metadata_file
    });
  };

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

  function RenderSerachBox() {
  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Filter data products based on metadata:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              value={startDate}
              onChange={(newValue) => {
                updateStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                updateEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              id="outlined"
              label="Key"
              defaultValue={metadataKey}
              onChange={(newValue) => {
                updateMetadataKey(newValue);
              }}
            />
            <TextField
              id="outlined"
              label="Value"
              defaultValue={metadataValue}
              onChange={(newValue) => {
                updateMetadataValue(newValue);
              }}
            />      
          </LocalizationProvider>
  
        </CardContent>
        <CardActions>
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
          {RenderSerachBox()}
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
