import { SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';

interface GetMuiDataGridRowsResponse {
  DataGridRowsData: [];
}

const GetMuiDataGridRows = async (
  muiDataGridFilterModel: Record<string, string | number> = {}
): Promise<GetMuiDataGridRowsResponse> => {
  // Define the API endpoint URL
  const apiUrl: string = SKA_SDP_DATAPRODUCT_API_URL;
  const URL_LIST: string = '/filterdataproducts';

  try {
    // Send POST request to backend with muiDataGridFilterModel
    const response = await fetch(`${apiUrl}${URL_LIST}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
