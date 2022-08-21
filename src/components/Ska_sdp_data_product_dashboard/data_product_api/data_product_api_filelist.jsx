import React from 'react';
import axios from 'axios';

async function DataProductFileList() {
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
  const apiPort = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_PORT;
  // const [jsonFilesTree, setJsonFilesTree] = React.useState([]);

  function pupulateFilesTree(fileList) {
    const useDummyData = JSON.parse(process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA);
    let newFileTree;
    const dummyFilesTree = {
      id: 'root',
      name: 'SDP Data API not available',
      relativefilename: '.',
      type: 'directory',
      children: [
        {
          id: 1,
          name: 'Moc tree file.txt',
          relativefilename: 'testfile.txt',
          type: 'file'
        }
      ]
    };
    const revievedJsonFilesTree = fileList;
    if (revievedJsonFilesTree.length !== 0) {
      newFileTree =
        useDummyData || revievedJsonFilesTree === null ? dummyFilesTree : revievedJsonFilesTree;
    }
    return newFileTree;
  }

  async function fetchFileList() {
    try {
      const data = await axios.get(`${apiUrl}:${apiPort}/filelist`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const awaitedFileTree = pupulateFilesTree(data.data);
      return awaitedFileTree;
    } catch (e) {
      console.error('Catch error', e);
      return null;
    }
  }
  return fetchFileList();
}

export default DataProductFileList;
