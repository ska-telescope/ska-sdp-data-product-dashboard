import axios from 'axios';
import { USE_LOCAL_DATA } from "../../utils/constants";
import MockDPL from '../../services/Mocking/mockDataProductList';
import { SKA_SDP_DATAPRODUCT_API_URL } from "../../utils/constants";

const FetchDataProductList = async (startDate, endDate, metadata_key, metadata_value) => {
  const apiUrl = SKA_SDP_DATAPRODUCT_API_URL;
  const URL_LIST = '/dataproductsearch';
  const bodyParameters = {
    "start_date": startDate,
    "end_date": endDate,
    "key_pair" : metadata_key+":"+metadata_value
  };
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, 
  };

  if (USE_LOCAL_DATA){
    console.log("USE_LOCAL_DATA: Loading MockDPL")
    return MockDPL;
  }

  try {
    const result = await axios.post(`${apiUrl}${URL_LIST}`, bodyParameters, config);
    return (typeof result === "undefined") ? 'error.API_UNKNOWN_ERROR' : result;
  } catch(e) {
    return "error.API_NOT_AVAILABLE";
  }
}

export default FetchDataProductList