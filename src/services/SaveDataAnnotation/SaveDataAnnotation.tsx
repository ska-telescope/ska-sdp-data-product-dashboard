import axios from 'axios';
import { SKA_DATAPRODUCT_API_URL } from '@utils/constants';

async function saveDataAnnotations(
  token: string = '',
  annotationText: string,
  uuid: string,
  annotationID?: number
) {
  const bearer = `Bearer ${token}`;
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: bearer
    }
  };

  let payload: object = {
    data_product_uuid: uuid,
    annotation_text: annotationText
  };

  if (annotationID) {
    payload = {
      ...payload,
      annotation_id: annotationID
    };
  }
  try {
    return await axios.post(`${SKA_DATAPRODUCT_API_URL}/annotation`, payload, config);
  } catch (error) {
    throw new Error('Error Saving Data Annotation');
  }
}

export default saveDataAnnotations;
