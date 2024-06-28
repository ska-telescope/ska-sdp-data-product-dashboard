import axios from 'axios';
import { SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';

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
