import { USE_LOCAL_DATA, SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';
import mockDataGridRowsData from '@services/Mocking/mockDataGridRowsData';

interface GetMuiDataGridRowsResponse {
  DataGridRowsData: [];
}

const GetMuiDataGridRows = async (
  muiDataGridFilterModel: Record<string, string | number> = {},
  token: string = ""
): Promise<GetMuiDataGridRowsResponse> => {
  // Define the API endpoint URL
  const apiUrl: string = SKA_SDP_DATAPRODUCT_API_URL;
  const URL_LIST: string = '/filterdataproducts';
  const headers = new Headers();
  const bearer = `Bearer ${token}`;
  headers.append('Authorization', bearer);
  console.log("muiDataGridFilterModel")
  console.log(JSON.stringify(muiDataGridFilterModel))

  try {
    // Check if using local mock data
    if (USE_LOCAL_DATA) {
      console.log('USE_LOCAL_DATA: Loading mockDataGridRowsData');
      return mockDataGridRowsData as GetMuiDataGridRowsResponse; // Type assertion for local data
    }

    // Send POST request to backend with muiDataGridFilterModel
    const response = await fetch(`${apiUrl}${URL_LIST}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(muiDataGridFilterModel)
    });

    const DataGridRowsData = await response.json();

    if (!DataGridRowsData) {
      console.error('Data product search API response is empty or undefined');
      return { DataGridRowsData: [] } as GetMuiDataGridRowsResponse; // Return empty object on error
    }
    return { DataGridRowsData };
  } catch (error) {
    console.error('Error fetching data product search results from the API');
    return { DataGridRowsData: [] } as GetMuiDataGridRowsResponse; // Return empty object on error
  }
};

export default GetMuiDataGridRows;
