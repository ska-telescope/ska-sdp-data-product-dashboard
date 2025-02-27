import useAxiosClient from '@services/AxiosClient/AxiosClient';
import { AxiosResponse } from 'axios';

const saveDataAnnotations = async (
  authAxiosClient: ReturnType<typeof useAxiosClient>,
  annotationText: string,
  uid: string,
  annotationID?: number
): Promise<AxiosResponse> => {
  const ENDPOINT: string = '/annotation';

  let payload: object = {
    data_product_uid: uid,
    annotation_text: annotationText
  };

  if (annotationID) {
    payload = {
      ...payload,
      annotation_id: annotationID
    };
  }

  try {
    const response = await authAxiosClient.post(ENDPOINT, payload);
    return response;
  } catch (error: any) {
    console.error('Error Saving Data Annotation:', error);

    if (error.response) {
      // Server error
      throw error.response; // Re-throw the AxiosResponse error for the caller to handle
    } else if (error.request) {
      // Request error (no response)
      throw new Error('No response received from the server'); // Re-throw a custom error
    } else {
      // Client-side error
      throw error; // Re-throw the original error
    }
  }
};

export default saveDataAnnotations;
