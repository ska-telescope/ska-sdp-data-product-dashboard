import axios from 'axios';

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
    const apiUrl = process.env.REACT_APP_SKA_SDP_DATAPRODUCT_API_URL;
    const params = {
      "relativePathName": paramData,
      "fileName": fileName
    };

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
  return fetchMetaData();
}

export default MetaData;
