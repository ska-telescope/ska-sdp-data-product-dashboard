import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import DataProductDashboard from './DataProductDashboard';

jest.mock('axios');

beforeEach(() => {
  process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = 'true';
});

afterEach(() => {
  process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA = 'false';
  cleanup();
});

describe('Data Product Dashboard', () => {
  it('renders', () => {
    render(<DataProductDashboard />);
  });

  it('renders treeview', () => {
    render(<DataProductDashboard />);
    waitFor(() => {
      expect(screen.getByRole('TreeView')).toBeTruthy();
      expect(screen.getAllByRole('TreeItem').length).toBe(3);
    });
  });

  it('renders button', () => {
    render(<DataProductDashboard />);
    waitFor(() => {
      expect(screen.getByRole('button')).toBeTruthy();
      expect(screen.getByRole('button')).toHaveTextContent('DOWNLOAD');
    });
  });
});

test('If No Data Message show if Call is Failure', () => {
  axios.get.mockRejectedValueOnce(new Error('Network Error'));

  render(<DataProductDashboard />);
  waitFor(()=> {
    expect(screen.getByText('SDP Data API not available')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeInTheDocument();
  });
});

