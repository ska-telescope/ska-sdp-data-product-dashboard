import axios from 'axios';
import { DATA_LOCAL } from "../../utils/constants";
import MockStatus from '../../services/Mocking/mockStatus';

const GetAPIStatus = async () => {
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATAPRODUCT_API_URL;
  const URL_LIST = '/status';
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, 
  };

  if (DATA_LOCAL){
    console.log("DATA_LOCAL: Loading MockStatus")
    return MockStatus;
  }

  try {
    const result = await axios.get(`${apiUrl}${URL_LIST}`, config);
    return (typeof result === "undefined") ? 'error.API_UNKNOWN_ERROR' :  result;
  } catch(e) {
    return 'error.API_NOT_AVAILABLE';
  }
}

export default GetAPIStatus