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

  // test('renders treeview', async () => {
  //   axios.get.mockResolvedValue(mockFilesTree);
  //   render(<DataProductDashboard />);
    // await waitFor(() => {expect(screen.getByText('Mocked Data Products')).toBeInTheDocument()});    
  // });


  test('If No Data Message show if Call is Failure', async () => {
    // axios.get.mockRejectedValueOnce(new Error('Network Error'));
    render(<DataProductDashboard />);
    expect(screen.getByText('SDP Data API not available')).toBeInTheDocument();
  });

});

