import axios from 'axios';
import { USE_LOCAL_DATA, SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import MockMeta from '@services/Mocking/mockMetaData';
import { SelectedDataProduct } from 'types/dataproducts/dataproducts';

async function getMetaData(selectedDataProduct: SelectedDataProduct) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  async function fetchMetaDataFromDPDAPI() {
    const apiUrl = SKA_DATAPRODUCT_API_URL;
    const params = { ...selectedDataProduct };

    if (USE_LOCAL_DATA) {
      console.log('USE_LOCAL_DATA: Loading MockMeta');
      return MockMeta;
    }

    try {
      const result = await axios.post(`${apiUrl}/dataproductmetadata`, params, config);
      if (!result || !result.data) {
        throw new Error('Data product list API response is empty or undefined');
      }
      return result.data;
    } catch (error) {
      throw new Error('Error fetching data product list from the API');
    }
  }
  return fetchMetaDataFromDPDAPI();
}

export default getMetaData;
