import { cleanup } from '@testing-library/react';
import DataProductFileList from './data_product_api_filelist';

process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = 'true';

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

it('renders user data', async () => {
  const originalValue = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA;
  process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = 'true';
  const fileList = await DataProductFileList();
  process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = originalValue;

  expect(fileList).toMatchSnapshot();
});
