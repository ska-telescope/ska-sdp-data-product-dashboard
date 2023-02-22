import axios from 'axios';

const ListAllDataProducts = async () => {
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
  const URL_LIST = '/dataproductlist';
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, 
  };

  try {
    const result = await axios.get(`${apiUrl}${URL_LIST}`, config);
    return (typeof result === "undefined") ? 'error.API_UNKNOWN_ERROR' :  result;
  } catch(e) {
    return 'error.API_NOT_AVAILABLE';
  }
}

export default ListAllDataProducts