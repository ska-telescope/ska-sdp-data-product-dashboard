import axios from 'axios';
import { USE_LOCAL_DATA, SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import mockMuiDataGridConfig from '@services/Mocking/mockMuiDataGridConfig';

/** A single filter operator entry as returned by the API. */
export interface MuiFilterOperator {
  value: string;
  requiresFilterValue?: boolean;
}

/**
 * Full column definition returned by `GET /muidatagridconfig`.
 *
 * The enriched response adds `type` and `filterable` so the frontend can
 * drive field autocomplete and value-input type without any additional API
 * calls.  Filter operators are derived on the frontend from `type` via MUI
 * factory helpers in `columnOperators.ts`.
 */
export interface MuiColumnConfig {
  field: string;
  headerName: string;
  width: number;
  hide: boolean;
  /**
   * MUI column type.  Must be one of MUI DataGrid's recognised column types
   * so that the column definition can be passed directly to the DataGrid.
   */
  type?: 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions';
  filterable: boolean;
}

interface GetMuiDataGridConfigResponse {
  columns: MuiColumnConfig[];
}

const GetMuiDataGridConfig = async (): Promise<GetMuiDataGridConfigResponse> => {
  // Define the API endpoint URL
  const apiUrl: string = SKA_DATAPRODUCT_API_URL;
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
