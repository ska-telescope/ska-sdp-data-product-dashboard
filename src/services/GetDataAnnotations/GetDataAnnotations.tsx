import { USE_LOCAL_DATA } from '@utils/constants';
import MockDataAnnotations from '@services/Mocking/mockDataAnnotations';
import useAxiosClient from '@services/AxiosClient/AxiosClient';
import { AxiosResponse } from 'axios';

const getDataAnnotations = async (
  authAxiosClient: ReturnType<typeof useAxiosClient>,
  uid: string = ''
): Promise<AxiosResponse> => {
  const ENDPOINT: string = `/annotations/${uid}`;

  // Check if using local mock data
  if (USE_LOCAL_DATA) {
    console.log('USE_LOCAL_DATA: Loading mockDataGridRowsData');
    return MockDataAnnotations;
  }

  try {
    const response = await authAxiosClient.get(ENDPOINT);
    return response;
  } catch (error: any) {
    console.error('Error in getDataAnnotations:', error);

    if (error.response) {
      // Server error
      throw error.response; // Re-throw the AxiosResponse error for the caller to handle
    } else if (error.request) {
      // Request error (no response)
      throw new Error('No response received from the server'); // Re-throw a custom error
    } else {
      // Client-side error
      throw error; // Re-throw the original error
    }
  }
};

export default getDataAnnotations;
