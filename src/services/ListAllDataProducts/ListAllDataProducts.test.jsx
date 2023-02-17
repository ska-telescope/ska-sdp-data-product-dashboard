import axios from 'axios';
import ListAllDataProducts from './ListAllDataProducts';
import mockFilesTree from '../Mocking/mockFilesTree';

const NO_DATA = 'API unreachable, SDP data not available'

jest.mock('axios');

describe('data_product_api_DataProductList LIVE passing', () => {
  it('Passes', async () => {
    const data = { data: mockFilesTree };
    axios.post.mockResolvedValueOnce(data);
    const fileList = await ListAllDataProducts();
    expect(fileList.data).toEqual(mockFilesTree);
  });
});

describe('data_product_api_DataProductList LIVE failing', () => {
  it('Fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const fileList = await ListAllDataProducts();
    expect(fileList).toEqual(NO_DATA);
  });
});
