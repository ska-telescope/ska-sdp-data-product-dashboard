import axios from 'axios';
import { USE_LOCAL_DATA, SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';
import MockMeta from '@services/Mocking/mockMetaData';

function isWindows(): boolean {
  return window.navigator.userAgent.indexOf('Windows') !== -1;
}

async function getMetaData(inData: string) {
  console.log("inData:")
  console.log(inData)
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  function flipSlash(inData: string | any[]) {
    let outData = '';
    const len = inData ? inData.length : 0;
    for (var i = 0; i < len; i++) {
      outData += inData[i] === '\\' ? '/' : inData[i];
    }
    return outData;
  }

  function setExecutionBlock(inData: string) {
    const testValue = isWindows() ? '\\' : '/';
    return inData.substring(inData.lastIndexOf(testValue) + 1);
  }

  function setParamData(inData: any) {
    return isWindows() ? flipSlash(inData) : inData;
  }

  async function fetchMetaDataFromDPDAPI() {
    const paramData = setParamData(inData);
    const executionBlock = inData ? setExecutionBlock(inData) : '';
    const apiUrl = SKA_SDP_DATAPRODUCT_API_URL;
    const params = {
      execution_block: executionBlock,
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
