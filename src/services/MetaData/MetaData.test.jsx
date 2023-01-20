import axios from 'axios';
import MetaData from './MetaData';
import mockData from '../Mocking/mockMetaData';

jest.mock('axios');

describe('data_product_api_MetaData LIVE passing', () => {
  it('Passes', async () => {
    const data = { data: mockData };
    axios.post.mockResolvedValueOnce(data);
    const inData = await MetaData();
    expect(inData.data).toEqual(mockData);
  });
});

describe('data_product_api_MetaData LIVE failing', () => {
  it('Fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    const fileList = await MetaData();
    const noData = 'API unreachable, SDP Data Product MetaData is not currently available'
    expect(fileList).toEqual(noData);
  });
});
