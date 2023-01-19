import axios from 'axios';
import mockFilesTree from '../../services/Mocking/mockFilesTree';

async function DataProductList() {
  async function fetchDataProductList() {
    const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
    if (process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA === 'true') {
      return mockFilesTree;
    }
   
    try {
      return await axios.get(`${apiUrl}/dataproductlist`, {
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
  return fetchDataProductList();
}

export default DataProductList;
