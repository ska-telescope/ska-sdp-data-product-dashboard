import axios from 'axios';
import { USE_LOCAL_DATA, SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';
import MockDPL from '@services/Mocking/mockDataProductList';

/**
 * Fetches data products based on search criteria.
 *
 * This function searches for data products within a specified date range and filters them based on provided metadata.
 *
 * @param {string} startDate - The start date of the search window in YYYY-MM-DD format.
 * @param {string} endDate - The end date of the search window in YYYY-MM-DD format.
 * @param {string | string[] | { keyPair: string; valuePair: string }[]} metadata_key -
 *        The metadata key(s) to filter by. Can be a single string, an array of strings, or an object with keyPair and valuePair properties.
 * @param {string} metadata_value - The value to match against the provided metadata key(s). (Optional)
 *
 * @returns {Promise<DataProductSearchResponse>} - A promise that resolves to an object containing the search results
 *        or an empty object if data is unavailable.
 */
interface DataProductSearchResponse {
  // Add any expected properties from the API response here
}

const SearchForDataProduct = async (
  startDate: string,
  endDate: string,
  metadata_key: string | string[] | { keyPair: string; valuePair: string },
  metadata_value?: string
): Promise<DataProductSearchResponse> => {
  // Define the API endpoint URL
  const apiUrl: string = SKA_SDP_DATAPRODUCT_API_URL;
  const URL_LIST: string = '/dataproductsearch';

  // Prepare the request body with search parameters
  const bodyParameters: {
    start_date: string;
    end_date: string;
    key_pair: string;
  } = {
    start_date: startDate,
    end_date: endDate,
    key_pair: metadata_key + ':' + metadata_value
  };

  // Set up the headers for the API request
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  // Check if using local mock data
  if (USE_LOCAL_DATA) {
    console.log('USE_LOCAL_DATA: Loading MockDPL');
    return MockDPL as DataProductSearchResponse; // Type assertion for local data
  }

  // Make the API call using axios
  try {
    const result = await axios.post(`${apiUrl}${URL_LIST}`, bodyParameters, config);
    if (!result || !result.data) {
      console.error('Data product search API response is empty or undefined');
      return {} as DataProductSearchResponse; // Return empty object on error
    }
    return result;
  } catch (error) {
    console.error('Error fetching data product search results from the API');
    return {} as DataProductSearchResponse; // Return empty object on error
  }
};

export default SearchForDataProduct;
