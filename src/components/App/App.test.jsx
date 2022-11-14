import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = true;
  });

  afterEach(() => {
    process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = false;
    cleanup();
  });
  
  it('renders without crashing', () => {
    render(<App />);
  });
});
