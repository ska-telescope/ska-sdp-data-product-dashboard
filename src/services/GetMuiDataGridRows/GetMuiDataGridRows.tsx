import { USE_LOCAL_DATA } from '@utils/constants';
import mockDataGridRowsData from '@services/Mocking/mockDataGridRowsData';
import useAxiosClient from '@services/AxiosClient/AxiosClient';

interface GetMuiDataGridRowsResponse {
  DataGridRowsData: [];
}

const GetMuiDataGridRows = async (
  authAxiosClient: ReturnType<typeof useAxiosClient>, // Add the authAxiosClient parameter
  muiDataGridFilterModel: Record<string, string | number> = {}
): Promise<GetMuiDataGridRowsResponse> => {
  const ENDPOINT: string = '/filterdataproducts';

  // Check if using local mock data
  if (USE_LOCAL_DATA) {
    console.log('USE_LOCAL_DATA: Loading mockDataGridRowsData');
    return mockDataGridRowsData as GetMuiDataGridRowsResponse;
  }

  try {
    const response = await authAxiosClient.post(ENDPOINT, JSON.stringify(muiDataGridFilterModel));
    const DataGridRowsData = response.data; // Use response.data directly with axios

    if (!DataGridRowsData) {
      console.error('Data product search API response is empty or undefined');
      return { DataGridRowsData: [] } as GetMuiDataGridRowsResponse;
    }
    return { DataGridRowsData }; // Return the data
  } catch (error) {
    console.error('Error in GetMuiDataGridRows:', error); // Log the error for debugging
    return { DataGridRowsData: [] } as GetMuiDataGridRowsResponse;
  }
};

export default GetMuiDataGridRows;
