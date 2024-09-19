import axios from 'axios';
import { USE_LOCAL_DATA, SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import MockLayout from '@services/Mocking/mockLayout';

const GetLayout = async () => {
  const apiUrl = SKA_DATAPRODUCT_API_URL;
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
      console.error('API response is empty or undefined');
      return MockLayout;
    }
    return result;
  } catch (error) {
    console.error('Error fetching layout from the API');
    return MockLayout;
  }
};

export default GetLayout;
