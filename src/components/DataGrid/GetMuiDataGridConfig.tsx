import axios from 'axios';
import { USE_LOCAL_DATA, SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';
import mockMuiDataGridConfig from '@services/Mocking/mockMuiDataGridConfig';

interface GetMuiDataGridConfigResponse {
  columns: [];
}

const GetMuiDataGridConfig = async (): Promise<GetMuiDataGridConfigResponse> => {
  // Define the API endpoint URL
  const apiUrl: string = SKA_SDP_DATAPRODUCT_API_URL;
  const URL_LIST: string = '/muidatagridconfig';

  // Set up the headers for the API request
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  // Check if using local mock data
  if (USE_LOCAL_DATA) {
    console.log('USE_LOCAL_DATA: Loading mockMuiDataGridConfig');
    return mockMuiDataGridConfig as unknown as GetMuiDataGridConfigResponse; // Type assertion for local data
  }

  // Make the API call using axios
  try {
    const result = await axios.get(`${apiUrl}${URL_LIST}`, config);
    if (!result || !result.data) {
      console.error('Data product search API response is empty or undefined');
      return { columns: [] } as GetMuiDataGridConfigResponse; // Return empty object on error
    }
    return result.data;
  } catch (error) {
    console.error('Error fetching data product search results from the API');
    return { columns: [] } as GetMuiDataGridConfigResponse; // Return empty object on error
  }
};

export default GetMuiDataGridConfig;
