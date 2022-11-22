import axios from 'axios';
import DataProductFileList from './DataProductFileList';
import mockFilesTree from '../Mocking/mockFilesTree';

jest.mock('axios');

describe('data_product_api_filelist LIVE passing', () => {
  it('Passes', async () => {
    const data = { data: mockFilesTree };
    axios.get.mockResolvedValueOnce(data);
    const fileList = await DataProductFileList();
    expect(fileList.data).toEqual(mockFilesTree);
  });
});

describe('data_product_api_filelist LIVE failing', () => {
  it('Fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const fileList = await DataProductFileList();
    const noData = 'API unreachable, SDP data not available'
    expect(fileList).toEqual(noData);
  });
});
