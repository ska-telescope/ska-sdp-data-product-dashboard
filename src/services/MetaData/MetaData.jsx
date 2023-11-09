import axios from 'axios';
import { USE_LOCAL_DATA, SKA_SDP_DATAPRODUCT_API_URL } from "../../utils/constants";
import MockMeta from '../../services/Mocking/mockMetaData';

async function MetaData(inData) {

  function flipSlash(inData) {    
    let outData = '';
    const len = inData ? inData.length : 0;
    for (var i = 0; i < len; i++) { 
      outData +=(inData[i] === '\\') ? '/' : inData[i];
    }
    return outData;
  }

  function isWindows() {
    return window.navigator.userAgent.indexOf('Windows');
  }

  function setFileName(inData) {
    const testValue = isWindows() ? '\\' : '/';
    return inData.substring(inData.lastIndexOf(testValue) + 1);
  }

  function setParamData(inData) {
    return isWindows() ? flipSlash(inData) : inData;
  }

  async function fetchMetaData() {
    const paramData = setParamData(inData);
    const fileName = inData ? setFileName(inData) : '';
    const apiUrl = SKA_SDP_DATAPRODUCT_API_URL;
    const params = {
      "relativePathName": paramData,
      "fileName": fileName
    };

    if (USE_LOCAL_DATA){
      console.log("USE_LOCAL_DATA: Loading MockMeta")
      return MockMeta;
    }

    try {
      return await axios.post(`${apiUrl}/dataproductmetadata`,  params, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    } catch (e) {
      return 'error.API_NO_META_DATA';
    }
  }
  console.log(fetchMetaData())
  return fetchMetaData();
}

export default MetaData;
