import axios from 'axios';
import SearchForDataProduct from './SearchForDataProduct';
import mockFilesTree from '../Mocking/mockFilesTree';

jest.mock('axios');

describe('SearchForDataProduct LIVE passing', () => {
  it('Passes', async () => {
    const data = { data: mockFilesTree };
    axios.post.mockResolvedValueOnce(data);
    const fileList = await SearchForDataProduct();
    expect(fileList.data).toEqual(mockFilesTree);
  });
});

describe('SearchForDataProduct LIVE failing', () => {
  it('Fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const fileList = await SearchForDataProduct();
    expect(fileList).toEqual('error.API_UNKNOWN_ERROR');
  });
});
