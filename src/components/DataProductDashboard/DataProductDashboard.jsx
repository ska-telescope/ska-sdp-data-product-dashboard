import React from 'react';

import { Grid } from '@mui/material';

import DataProductsTable from '../DataProductsTable/DataProductsTable';
import DownloadCard from '../DownloadCard/DownloadCard';
import MetaDataComponent from '../MetaDataComponent/MetaDataComponent';
import FetchDataProductList from '../../services/FetchDataProductList/FetchDataProductList';
import MetaData from '../../services/MetaData/MetaData';

const DataProductDashboard = () => {
  const [jsonDataProducts, setJsonDataProducts] = React.useState([]);
  const [metaData, setMetaData] = React.useState(null);
  const [oldFilename, setOldFilename] = React.useState(null);
  const [selectedFileNames, setSelectedFileNames] = React.useState({
    fileName: '',
    relativeFileName: '',
    metaDataFile: ''
  });

  React.useEffect(() => {
    async function getJsonDataProducts() {
      const results = await FetchDataProductList();
      setJsonDataProducts(results);
    }
    
    getJsonDataProducts();
  }, []);

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

  return (
    <>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={9}>
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
