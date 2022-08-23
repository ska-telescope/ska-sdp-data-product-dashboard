import axios from 'axios';
import { cleanup } from '@testing-library/react';
import DataProductFileList from './data_product_api_filelist';
import mockFilesTree from '../../../mockFilesTreeStructure';

jest.mock('axios');

describe('data_product_api_filelist MOCK', () => {
  beforeEach(() => {
    process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = true;
  });

  afterEach(() => {
    process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = false;
    cleanup();
  });

  it('Retrieves user data', async () => {
    const fileList = await DataProductFileList();
    expect(fileList).toEqual(mockFilesTree);
  });
});

describe('data_product_api_filelist LIVE PASS', () => {
  it('Retrieves user data', async () => {
    axios.get.mockResolvedValueOnce(mockFilesTree);

    const fileList = await DataProductFileList();
    expect(fileList).toEqual(mockFilesTree);
  });
});

describe('data_product_api_filelist LIVE FAIL', () => {
  it('Retrieves empty data', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const fileList = await DataProductFileList();
    expect(fileList).toEqual([]);
  });
});
