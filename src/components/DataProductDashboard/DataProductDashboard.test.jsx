import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
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
    render(<DataProductDashboard />);
  });

  describe('TreeView', () => {
    it('renders', () => {
      render(<DataProductDashboard />);
      waitFor(() => {
        expect(screen.getByRole('TreeView')).toBeTruthy();
      });
      
    });
  });

  describe('Download Button', () => {
    it('renders', () => {
      render(<DataProductDashboard />);
      waitFor(() => {
        expect(screen.getByRole('button')).toBeTruthy();
        expect(screen.getByRole('button')).toHaveTextContent('DOWNLOAD');
      });
    });
  });
});

