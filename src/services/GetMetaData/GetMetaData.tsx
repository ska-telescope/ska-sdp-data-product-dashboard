import axios from 'axios';
import { USE_LOCAL_DATA, SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';
import MockMeta from '@services/Mocking/mockMetaData';

function isWindows(): boolean {
  return window.navigator.userAgent.indexOf('Windows') !== -1;
}

async function getMetaData(inData: string) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  function setExecutionBlock(inData: string) {
    const testValue = isWindows() ? '\\' : '/';
    return inData.substring(inData.lastIndexOf(testValue) + 1);
  }

  async function fetchMetaDataFromDPDAPI() {
    const executionBlock = inData ? setExecutionBlock(inData) : '';
    const apiUrl = SKA_SDP_DATAPRODUCT_API_URL;
    const params = {
      execution_block: executionBlock
    };

    if (USE_LOCAL_DATA) {
      console.log('USE_LOCAL_DATA: Loading MockMeta');
      return MockMeta;
    }

    try {
      const result = await axios.post(`${apiUrl}/dataproductmetadata`, params, config);
      if (!result || !result.data) {
        throw new Error('Data product list API response is empty or undefined');
      }
      return result.data;
    } catch (error) {
      throw new Error('Error fetching data product list from the API');
    }
  }
  return fetchMetaDataFromDPDAPI();
}

export default getMetaData;
