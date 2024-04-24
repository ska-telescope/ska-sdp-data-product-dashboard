import axios from 'axios';
import { USE_LOCAL_DATA, SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';
import MockDPL from '@services/Mocking/mockDataProductList';

const ListAllDataProducts = async () => {
  const apiUrl = SKA_SDP_DATAPRODUCT_API_URL;
  const URL_LIST = '/dataproductlist';
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  try {
    if (USE_LOCAL_DATA) {
      console.log('USE_LOCAL_DATA: Loading MockDPL');
      return MockDPL;
    }

    const result = await axios.get(`${apiUrl}${URL_LIST}`, config).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error with dataproductlist, data:', error.response.data);
        console.log('Error with dataproductlist, status:', error.response.status);
        console.log('Error with dataproductlist, headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('Error with dataproductlist, request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error with dataproductlist, message:', error.message);
      }
      console.log('Error with dataproductlist, config:', error.config);
    });
    console.log(result);
    return typeof result === 'undefined' ? 'error.API_UNKNOWN_ERROR' : result;
  } catch (e) {
    return 'error.UNDEFINED_ERROR';
  }
};

export default ListAllDataProducts;
