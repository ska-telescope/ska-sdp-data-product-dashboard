import axios from 'axios';
import FetchDataProductList from './FetchDataProductList';
import mockFilesTree from '../Mocking/mockFilesTree';

jest.mock('axios');

describe('data_product_api_DataProductList LIVE passing', () => {
  it('Passes', async () => {
    const data = { data: mockFilesTree };
    axios.post.mockResolvedValueOnce(data);
    const fileList = await FetchDataProductList();
    expect(fileList.data).toEqual(mockFilesTree);
  });
});

describe('data_product_api_DataProductList LIVE failing', () => {
  it('Fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const fileList = await FetchDataProductList();
    const noData = 'API unreachable, SDP data not available'
    expect(fileList).toEqual(noData);
  });
});
