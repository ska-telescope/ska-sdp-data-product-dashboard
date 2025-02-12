import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { USE_LOCAL_DATA, SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import MockStatus from '@services/Mocking/mockStatus';

export const GetAPIStatus = async () => {
  const apiUrl = SKA_DATAPRODUCT_API_URL;
  const URL_LIST = '/status';
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  const APIOfflineStatus = {
    data: {
      api_running: false,
      last_metadata_update_time: '1970-01-01T00:00:00.000000',
      api_version: 'Data product API unreachable',
      metadata_store_status: {
        last_metadata_update_time: '2024-10-15T13:08:06.126363',
        indexing: false
      }
    }
  };

  if (USE_LOCAL_DATA) {
    return MockStatus;
  }

  try {
    const result = await axios.get(`${apiUrl}${URL_LIST}`, config);
    if (!result || !result.data) {
      console.error('API status response is empty or undefined');
      return APIOfflineStatus;
    }
    return result;
  } catch (error) {
    console.error('Error fetching status of the API');
    return APIOfflineStatus;
  }
};

export async function GetVersionNumber() {
  const { t } = useTranslation('dpd');
  const [apiVersion, setAPIVersion] = React.useState('LOCAL');
  const results = await GetAPIStatus();
  setAPIVersion(
    results?.data?.api_version ? results.data.api_version : t('error.API_NOT_AVAILABLE')
  );

  return apiVersion;
}
