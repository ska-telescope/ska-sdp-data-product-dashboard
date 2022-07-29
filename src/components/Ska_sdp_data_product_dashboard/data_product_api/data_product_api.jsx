import React from 'react';

function DataProductFetcher() {
  const [fileList, setFileList] = React.useState([]);

  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
  const apiPort = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_PORT;

  async function fetchFileList() {
    fetch(`${apiUrl}:${apiPort}/filelist`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setFileList(data.filelist);
      });
  }

  if (fileList.length === 0) {
    fetchFileList();
  }

  return fileList;
}

export default DataProductFetcher;
