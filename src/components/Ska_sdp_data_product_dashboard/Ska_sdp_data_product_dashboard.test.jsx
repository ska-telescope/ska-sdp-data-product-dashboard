import React from 'react';
import { shallow } from 'enzyme';
import Ska_sdp_data_product_dashboard from './Ska_sdp_data_product_dashboard';

describe('Login Component', () => {
  it('renders without crashing', () => {
    shallow(<Ska_sdp_data_product_dashboard />);
  });
});
