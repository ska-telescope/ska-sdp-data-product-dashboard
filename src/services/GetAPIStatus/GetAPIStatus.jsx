import axios from 'axios';

const GetAPIStatus = async () => {
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
  const URL_LIST = '/status';
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, 
  };


  try {
    const result = await axios.get(`${apiUrl}${URL_LIST}`, config);

    if (typeof result === "undefined"){
      return "API unreachable due to undefined error, SDP data not available";
    } else {
      return result;
    }
  } catch(e) {
    return "API unreachable, SDP data not available";
  }
}

export default GetAPIStatus