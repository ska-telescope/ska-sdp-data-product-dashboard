import axios from 'axios';
import { SKA_DATAPRODUCT_API_URL } from '@utils/constants';

async function saveDataAnnotations(
  annotationText: string,
  userPrincipalName: string,
  uuid?: string,
  annotationID?: number
) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  const currentTimestamp = new Date().toISOString();

  let payload: object = {
    annotation_text: annotationText,
    user_principal_name: userPrincipalName,
    data_product_uuid: uuid,
    timestamp_modified: currentTimestamp
  };

  if (annotationID) {
    payload = {
      ...payload,
      annotation_id: annotationID
    };
  } else {
    payload = {
      ...payload,
      timestamp_created: currentTimestamp
    };
  }

  try {
    return await axios.post(`${SKA_DATAPRODUCT_API_URL}/annotation`, config, payload);
  } catch (error) {
    throw new Error('Error Saving Data Annotation');
  }
}

export default saveDataAnnotations;
