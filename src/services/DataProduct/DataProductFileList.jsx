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
      const noData = 'API unreachable, SDP data not available';
      return noData;
    }
  }
  return (JSON.parse(process.env.SKA_SDP_DATA_PRODUCT_DUMMY_DATA) ? {data:mockFilesTree, status:200} : fetchFileList());
}

export default DataProductFileList;
