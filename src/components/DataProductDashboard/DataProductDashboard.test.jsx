import React from 'react';
import { shallow } from 'enzyme';
import { cleanup } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import DataProductDashboard from './DataProductDashboard';



let container = null;
beforeEach(() => {
  process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = 'true';
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = 'false';
  cleanup();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
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

