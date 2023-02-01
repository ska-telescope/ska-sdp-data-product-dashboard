import axios from 'axios';

async function DataProductList() {
  async function FetchDataProductList() {
    const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
    const URL_LIST = '/dataproductlist';

    try {
      return await axios.get(`${apiUrl}${URL_LIST}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    } catch (e) {
      return "API unreachable, SDP data not available";
    }
  }
  return FetchDataProductList();
}
export default DataProductList;