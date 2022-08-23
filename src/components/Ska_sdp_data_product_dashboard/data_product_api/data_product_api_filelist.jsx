import axios from 'axios';
import mockFilesTree from '../../../mockFilesTreeStructure';

async function DataProductFileList() {
  async function fetchFileList() {
    const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
    const apiPort = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_PORT;
    try {
      const data = await axios.get(`${apiUrl}:${apiPort}/filelist`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return data && data.data ? data.data : [];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Catch error', e);
      return [];
    }
  }
  return JSON.parse(process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA)
    ? mockFilesTree
    : fetchFileList();
}

export default DataProductFileList;
