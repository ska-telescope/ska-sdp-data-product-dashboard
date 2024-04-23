import axios from 'axios';
import { USE_LOCAL_DATA, SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';
import MockDPL from '../Mocking/mockDataProductList';

const FetchDataProductList = async (
  startDate: string,
  endDate: string,
  metadata_key: string | string[] | { keyPair: string; valuePair: string }[],
  metadata_value: string | undefined
) => {
  const apiUrl = SKA_SDP_DATAPRODUCT_API_URL;
  const URL_LIST = '/dataproductsearch';
  const bodyParameters = {
    start_date: startDate,
    end_date: endDate,
    key_pair: metadata_key + ':' + metadata_value
  };
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (USE_LOCAL_DATA) {
    console.log('USE_LOCAL_DATA: Loading MockDPL');
    return MockDPL;
  }

  try {
    const result = await axios.post(`${apiUrl}${URL_LIST}`, bodyParameters, config);
    if (!result || !result.data) {
      throw new Error('Data product list API response is empty or undefined');
    }
    return result;
  } catch (error) {
    throw new Error('Error fetching data product list from the API');
  }
};

export default FetchDataProductList;
