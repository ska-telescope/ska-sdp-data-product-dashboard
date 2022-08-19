import React from 'react';
import { shallow } from 'enzyme';
import { unmountComponentAtNode } from 'react-dom/client';
import DataProductDashboard from './data_product_dashboard';
// import { createRoot } from 'react-dom/cjs/react-dom.production.min';

process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = 'true';

describe('Data Product Dashboard', () => {
  it('renders without crashing', () => {
    shallow(<DataProductDashboard />);
  });
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
});
