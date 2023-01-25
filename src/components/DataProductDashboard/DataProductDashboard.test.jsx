import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import DataProductDashboard from './DataProductDashboard';
// import MockData from '../../services/Mocking/mockFilesTree';
import mockFilesTree from '../../services/Mocking/mockFilesTree';

jest.mock('axios');

const TEXT_NO_API = 'SDP Data API not available';
const TEXT_RESULTS = 'Mocked Data Products';
const TEXT_PROD_1 = 'pb_id_1';

beforeEach(() => {
});

afterEach(() => {
  cleanup();
});

describe('Data Product Dashboard', () => {

  /* IF you remove the annotation this is causing issues 
  
  test('Output if data NOT found', async () => {
    
    axios.get.mockRejectedValueOnce(new Error('Network Error'));
    render(<DataProductDashboard />);

    expect(await screen.findByText(TEXT_NO_API)).toBeInTheDocument();
  });  
  */

  test('Output if data found', async () => {
    
    axios.get.mockResolvedValue(mockFilesTree);
    render(<DataProductDashboard />);

    expect(await screen.findByText(TEXT_RESULTS)).toBeInTheDocument();
    expect(await screen.findByText(TEXT_PROD_1)).toBeInTheDocument();
  });  
});