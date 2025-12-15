import axios from 'axios';

import { USE_LOCAL_DATA, SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import MockStatus from '@services/Mocking/mockStatus';

export const GetAPIStatus = async () => {
  const apiUrl = SKA_DATAPRODUCT_API_URL;
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
      console.error('API status response is empty or undefined');
      throw new Error('API status response is empty');
    }
    return result;
  } catch (error) {
    console.error('Error fetching status of the API:', error);
    throw error; // Re-throw the error so it can be caught by the component
  }
};
