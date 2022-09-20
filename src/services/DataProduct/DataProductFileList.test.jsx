import axios from 'axios';
import { cleanup } from '@testing-library/react';
import DataProductFileList from './DataProductFileList';
import mockFilesTree from '../Mocking/mockFilesTree';

jest.mock('axios');

describe('data_product_api_filelist MOCK', () => {
  beforeEach(() => {
    process.env.SKA_SDP_DATA_PRODUCT_DUMMY_DATA = true;
  });

  afterEach(() => {
    process.env.SKA_SDP_DATA_PRODUCT_DUMMY_DATA = false;
    cleanup();
  });

  it('Retrieves user data', async () => {
    const fileList = await DataProductFileList();
    expect(fileList).toEqual(mockFilesTree);
  });
});

describe('data_product_api_filelist LIVE passing', () => {
  beforeEach(() => {
    process.env.SKA_SDP_DATA_PRODUCT_DUMMY_DATA = false;
  });

  it('Passes', async () => {
    const data = { data: mockFilesTree };
    axios.get.mockResolvedValueOnce(data);
    await expect(DataProductFileList()).resolves.toEqual(mockFilesTree);
  });
});

describe('data_product_api_filelist LIVE failing', () => {
  beforeEach(() => {
    process.env.SKA_SDP_DATA_PRODUCT_DUMMY_DATA = false;
  });

  it('Fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const fileList = await DataProductFileList();
    const noData = 'SDP Data API not available'
    expect(fileList).toEqual(noData);
  });
});
