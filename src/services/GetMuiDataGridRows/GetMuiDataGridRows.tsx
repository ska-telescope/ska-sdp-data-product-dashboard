import { USE_LOCAL_DATA } from '@utils/constants';
import mockDataGridRowsData from '@services/Mocking/mockDataGridRowsData';
import useAxiosClient from '@services/AxiosClient/AxiosClient';

interface GetMuiDataGridRowsResponse {
  DataGridRowsData: [];
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
  maxRetries: number = 3
): Promise<GetMuiDataGridRowsResponse> => {
  const ENDPOINT: string = '/filterdataproducts';
  const RETRY_DELAY_MS = 2000; // 2 seconds between retries

  // Check if using local mock data
  if (USE_LOCAL_DATA) {
    console.log('USE_LOCAL_DATA: Loading mockDataGridRowsData');
    return mockDataGridRowsData as GetMuiDataGridRowsResponse;
  }

  try {
    const response = await authAxiosClient.post(ENDPOINT, JSON.stringify(muiDataGridFilterModel));
    const DataGridRowsData = response.data;

    if (!DataGridRowsData) {
      console.error('Data product search API response is empty or undefined');
      return { DataGridRowsData: [] } as GetMuiDataGridRowsResponse;
    }
    return { DataGridRowsData };
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
      return GetMuiDataGridRows(authAxiosClient, muiDataGridFilterModel, retryCount + 1, maxRetries);
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
