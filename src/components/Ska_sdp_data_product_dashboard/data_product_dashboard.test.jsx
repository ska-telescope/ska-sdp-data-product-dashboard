import React from 'react';
import { shallow } from 'enzyme';
import { cleanup } from '@testing-library/react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import DataProductDashboard from './data_product_dashboard';

process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = 'true';

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe('Data Product Dashboard', () => {
  it('renders', () => {
    const wrapper = shallow(<DataProductDashboard />);
    expect(wrapper.exists());
  });

  describe('TreeView', () => {
    it('renders', () => {
      const wrapper = shallow(<DataProductDashboard />);
      expect(wrapper.find('TreeView').exists());
    });
  });

  describe('Download Button', () => {
    it('renders', () => {
      const wrapper = shallow(<DataProductDashboard />);
      expect(wrapper.find('button').exists());
      expect(wrapper.find('button').contains('DOWNLOAD'));
    });
  });
});

it('renders user data', async () => {
  const fakeFileList = {
    id: 'root',
    name: 'SDP Data API not available',
    relativefilename: '.',
    type: 'directory',
    children: [
      {
        id: 1,
        name: 'Moc tree file.txt',
        relativefilename: 'testfile.txt',
        type: 'file'
      }
    ]
  };
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeFileList)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<DataProductDashboard />, container);
  });
  expect(container).toMatchSnapshot();

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
