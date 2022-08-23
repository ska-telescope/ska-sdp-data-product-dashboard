import React from 'react';
import { shallow } from 'enzyme';
import { cleanup } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import DataProductDashboard from './DataProductDashboard';

process.env.SKA_SDP_DATA_PRODUCT_DUMMY_DATA = 'true';

afterEach(() => {
  cleanup();
});

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
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
