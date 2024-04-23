import axios from 'axios';
import { USE_LOCAL_DATA, SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';
import MockLayout from '../Mocking/mockLayout';

const GetLayout = async () => {
  const apiUrl = SKA_SDP_DATAPRODUCT_API_URL;
  const URL_LIST = '/layout';
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (USE_LOCAL_DATA) {
    console.log('USE_LOCAL_DATA: Loading MockLayout');
    return MockLayout;
  }

  try {
    const result = await axios.get(`${apiUrl}${URL_LIST}`, config);
    if (!result || !result.data) {
      throw new Error('API response is empty or undefined');
    }
    return result;
  } catch (error) {
    throw new Error('Error fetching layout data from the API');
  }
};

export default GetLayout;
