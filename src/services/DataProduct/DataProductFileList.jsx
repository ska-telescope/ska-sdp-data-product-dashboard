import axios from 'axios';

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
  return fetchFileList();
}

export default DataProductFileList;
