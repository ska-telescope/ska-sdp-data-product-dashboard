import axios from 'axios';

async function MetaData(inData) {

  function flipSlash(inData) {    
    let outData = '';
    const len = inData ? inData.length : 0;;
    for (var i = 0; i < len; i++) { 
      outData +=(inData[i] === '\\') ? '/' : inData[i];
    }
    return outData;
  }

  async function fetchMetaData() {
    const isWindows = window.navigator.userAgent.indexOf('Windows');
    const paramData = (isWindows) ? flipSlash(inData) : inData;
    const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
    const fileName = inData ? inData.substring(inData.lastIndexOf('\\') + 1) : '';

    const params = {
      "relativeFileName": paramData,
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
      const noData = 'API unreachable, SDP Data Product MetaData is not currently available';
      return noData;
    }
  }
  return fetchMetaData();
}

export default MetaData;
