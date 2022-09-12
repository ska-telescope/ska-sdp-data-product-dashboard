import axios from 'axios';
import mockFilesTree from '../Mocking/mockFilesTree';

async function DataProductFileList() {
  async function fetchFileList() {
    const apiUrl = process.env.SKA_SDP_DATA_PRODUCT_API_URL;
    const apiPort = process.env.SKA_SDP_DATA_PRODUCT_API_PORT;
    try {
      return await axios.get(`${apiUrl}:${apiPort}/filelist`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      // console.error('Catch error', e);
      const noData = {
        id: 'root',
        name: 'SDP Data API not available',
        relativefilename: '',
        type: 'directory'
      };
      return noData;
    }
  }
  return JSON.parse(process.env.SKA_SDP_DATA_PRODUCT_DUMMY_DATA) ? mockFilesTree : fetchFileList();
}

export default DataProductFileList;
