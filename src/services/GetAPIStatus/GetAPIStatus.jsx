import axios from 'axios';
import { useTranslation } from 'react-i18next';

const GetAPIStatus = async () => {
  const { t } = useTranslation();
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
    return (typeof result === "undefined") ? t("error.API_UNKNOWN_ERROR") : result;

  } catch(e) {
    return t("error.API_NOT_AVAILABLE");
  }
}

export default GetAPIStatus