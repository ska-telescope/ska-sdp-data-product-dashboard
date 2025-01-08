import axios from 'axios';
import { USE_LOCAL_DATA, SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import MockDataAnnotations from '@services/Mocking/mockDataAnnotations';

async function getDataAnnotations(uuid: string) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (USE_LOCAL_DATA) {
    console.log('USE_LOCAL_DATA: Loading MockDataAnnotations');
    return MockDataAnnotations;
  }

  try {
    const result = await axios.get(`${SKA_DATAPRODUCT_API_URL}/annotations/${uuid}`, config);
    if(result.status === 202){
      return result.data.message;
    }
    return result.data;
  } catch (error) {
    throw new Error('Error fetching data product list from the API');
  }
}

export default getDataAnnotations;
