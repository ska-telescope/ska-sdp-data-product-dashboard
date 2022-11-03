import axios from 'axios';
import mockFilesTree from '../Mocking/mockFilesTree';

async function DataProductFileList() {
  async function fetchFileList() {
    const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
    try {
      return await axios.get(`${apiUrl}/filelist`, {
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
  console.log(JSON.parse(process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA))
  return (JSON.parse(process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA) ? {data:mockFilesTree, status:200} : fetchFileList());
}

export default DataProductFileList;
