import axios from 'axios';
import DataProductList from './DataProductList';
import mockFilesTree from '../Mocking/mockFilesTree';

jest.mock('axios');

describe('data_product_api_DataProductList LIVE passing', () => {
  it('Passes', async () => {
    const data = { data: mockFilesTree };
    axios.get.mockResolvedValueOnce(data);
    const fileList = await DataProductList();
    expect(fileList.data).toEqual(mockFilesTree);
  });
});

describe('data_product_api_DataProductList LIVE failing', () => {
  it('Fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const fileList = await DataProductList();
    const noData = 'API unreachable, SDP data not available'
    expect(fileList).toEqual(noData);
  });
});
