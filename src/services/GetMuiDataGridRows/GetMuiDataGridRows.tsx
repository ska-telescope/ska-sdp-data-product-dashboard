import { USE_LOCAL_DATA } from '@utils/constants';
import mockDataGridRowsData from '@services/Mocking/mockDataGridRowsData';
import useAxiosClient from '@services/AxiosClient/AxiosClient';

interface GetMuiDataGridRowsResponse {
  DataGridRowsData: [];
  total?: number;
  error?: {
    type: string;
    message: string;
    indexing?: boolean;
  };
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const GetMuiDataGridRows = async (
  authAxiosClient: ReturnType<typeof useAxiosClient>,
  muiDataGridFilterModel: Record<string, string | number> = {},
  retryCount: number = 0,
  maxRetries: number = 3,
  _useLocalData: boolean = USE_LOCAL_DATA
): Promise<GetMuiDataGridRowsResponse> => {
  const ENDPOINT: string = '/filterdataproducts';
  const RETRY_DELAY_MS = 2000; // 2 seconds between retries

  // Check if using local mock data
  if (_useLocalData) {
    console.log('USE_LOCAL_DATA: Loading mockDataGridRowsData');
    return mockDataGridRowsData as GetMuiDataGridRowsResponse;
  }

  try {
    // Extract expected fields from muiDataGridFilterModel if present
    const {
      filterModel = {},
      searchPanelOptions = {},
      sortModel = [],
      page = 0,
      pageSize = 25,
      ...rest
    } = muiDataGridFilterModel || {};

    // Compose the request body as expected by the backend
    const requestBody = {
      filterModel,
      searchPanelOptions,
      sortModel,
      page,
      pageSize,
      ...rest
    };

    const response = await authAxiosClient.post(ENDPOINT, JSON.stringify(requestBody));
    const responseData = response.data;

    // Handle paginated response format
    if (responseData && typeof responseData === 'object' && 'data' in responseData) {
      return {
        DataGridRowsData: responseData.data || [],
        total: responseData.total || 0
      } as GetMuiDataGridRowsResponse;
    }

    // Fallback for non-paginated response (backward compatibility)
    if (!responseData) {
      console.error('Data product search API response is empty or undefined');
      return { DataGridRowsData: [], total: 0 } as GetMuiDataGridRowsResponse;
    }
    return { DataGridRowsData: responseData, total: responseData.length };
  } catch (error: any) {
    console.error('Error in GetMuiDataGridRows:', error);

    // Check if it's an indexing-related error or 500 error
    const isRetryable =
      error?.response?.status === 500 ||
      error?.response?.status === 503 ||
      error?.code === 'ECONNABORTED' ||
      error?.code === 'ETIMEDOUT';

    const errorDetail = error?.response?.data?.detail;
    const isIndexing = errorDetail?.indexing || false;

    // Retry logic for transient errors during indexing
    if (isRetryable && retryCount < maxRetries) {
      console.warn(
        `Retrying request (${retryCount + 1}/${maxRetries}) after ${RETRY_DELAY_MS}ms...`,
        isIndexing ? '(API is indexing)' : ''
      );
      await delay(RETRY_DELAY_MS * (retryCount + 1)); // Exponential backoff
      return GetMuiDataGridRows(
        authAxiosClient,
        muiDataGridFilterModel,
        retryCount + 1,
        maxRetries,
        _useLocalData
      );
    }

    // Return error information for the UI to handle
    return {
      DataGridRowsData: [],
      error: {
        type: errorDetail?.error_type || 'UNKNOWN_ERROR',
        message: errorDetail?.message || error?.message || 'Failed to fetch data',
        indexing: isIndexing
      }
    } as GetMuiDataGridRowsResponse;
  }
};

export default GetMuiDataGridRows;
