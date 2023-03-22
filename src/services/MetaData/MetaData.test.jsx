import axios from 'axios';
import MetaData from './MetaData';
import mockData from '../Mocking/mockMetaData';

jest.mock('axios');

// eslint-disable-next-line no-useless-escape
const dummyPathName = 'product\eb_id_1\ska-sub-system\scan_id_1\pb_id_1\ska-data-product.yaml';

describe('dataproduct_api_MetaData LIVE passing', () => {
  it('Passes', async () => {
    const data = { data: mockData };
    axios.post.mockResolvedValueOnce(data);
    const inData = await MetaData(dummyPathName);
    expect(inData.data).toEqual(mockData);
  });
});

describe('dataproduct_api_MetaData LIVE failing', () => {
  it('Fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    const fileList = await MetaData();
    expect(fileList).toEqual('error.API_NO_META_DATA');
  });
});
