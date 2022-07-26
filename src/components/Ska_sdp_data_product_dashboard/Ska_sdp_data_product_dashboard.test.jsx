import React from 'react';
import { shallow } from 'enzyme';
import DataProductDashboard from './Ska_sdp_data_product_dashboard';

describe('Login Component', () => {
  it('renders without crashing', () => {
    shallow(<DataProductDashboard />);
  });
});
