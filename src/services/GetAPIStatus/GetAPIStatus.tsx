import axios from 'axios';
import { USE_LOCAL_DATA, SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';
import MockStatus from '@services/Mocking/mockStatus';

const GetAPIStatus = async () => {
  const apiUrl = SKA_SDP_DATAPRODUCT_API_URL;
  const URL_LIST = '/status';
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (USE_LOCAL_DATA) {
    return MockStatus;
  }

  try {
    const result = await axios.get(`${apiUrl}${URL_LIST}`, config);
    if (!result || !result.data) {
      throw new Error('API status response is empty or undefined');
    }
    return result;
  } catch (error) {
    throw new Error('Error fetching status of the API');
  }
};

export default GetAPIStatus;
