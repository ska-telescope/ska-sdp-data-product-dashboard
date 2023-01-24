import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import DataProductDashboard from './DataProductDashboard';
import MockData from '../../services/Mocking/mockFilesTree';
import mockFilesTree from '../../services/Mocking/mockFilesTree';

jest.mock('axios');

beforeEach(() => {
});

afterEach(() => {
  cleanup();
});

describe('Data Product Dashboard', () => {

  test('Checking that mocking data is shown', () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<DataProductDashboard />);
    waitFor(()=> {
      expect(screen.getByText('SDP Data API not available')).toBeInTheDocument();
      expect(screen.getByRole('button')).not.toBeInTheDocument();
    });
  });

  test('If No Data Message show if Call is Failure', () => {
    const data = MockData;
    axios.get.mockRejectedValueOnce(data);

    render(<DataProductDashboard />);
    waitFor(()=> {
      expect(screen.getByText('SDP Data API not available')).toBeInTheDocument();
      expect(screen.getByRole('button')).not.toBeInTheDocument();
    });
  });

  test('renders treeview', async () => {
    axios.get.mockResolvedValue(mockFilesTree);
    render(<DataProductDashboard />);
    await waitFor(() => {expect(screen.getByText('Mocked Data Products')).toBeInTheDocument()});    
  });


  test('If No Data Message show if Call is Failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));
    render(<DataProductDashboard />);
    await waitFor(() => {expect(screen.getByText('SDP Data API not available')).toBeInTheDocument()});
  });

});

