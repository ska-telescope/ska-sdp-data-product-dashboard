import axios from 'axios';

async function DataProductList() {
  async function fetchDataProductList() {
    const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
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