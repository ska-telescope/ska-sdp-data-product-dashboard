import axios from 'axios';
import mockFilesTree from '../../../mockFilesTreeStructure';

async function DataProductFileList() {
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
  const apiPort = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_PORT;

  function populateFilesTree(fileList) {
    const useMockData = JSON.parse(process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA);
    const newFileTree = useMockData || fileList.length === 0 ? mockFilesTree : fileList;
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
      return populateFilesTree(data.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Catch error', e);
      return populateFilesTree([]);
    }
  }
  return fetchFileList();
}

export default DataProductFileList;
