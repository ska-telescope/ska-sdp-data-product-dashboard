import React from 'react';
import renderer from "react-test-renderer"
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { wait } from '@testing-library/react'
import { act } from '@testing-library/react';
import axios from 'axios';
import DataProductDashboard from './DataProductDashboard';
import mockFilesTree from '../../services/Mocking/mockFilesTree';

jest.mock('axios');

beforeEach(() => {
});

afterEach(() => {
  cleanup();
});

describe('Data Product Dashboard', () => {
  it('renders', () => {
    axios.get.mockResolvedValue(mockFilesTree);
    render(<DataProductDashboard />);
  });

  it('renders treeview', async () => {
    axios.get.mockResolvedValue(mockFilesTree);
    render(<DataProductDashboard />);
    const treeViewComponent = await waitFor(() => {screen.findAllByRole('treeitem')});
    // screen.debug()
    // expect(treeViewComponent).toBeInTheDocument
    // expect(treeViewComponent.length).toBe(3)
    waitFor(() => {
      expect(screen.getByRole('TreeView')).toBeTruthy();
      expect(screen.getAllByRole('TreeItem').length).toBe(3);
    });
    // await waitFor(() => {expect(treeViewComponent).toBeInTheDocument });
    // await waitFor(() => {expect(treeViewComponent.length).toBe(3)});
  });

//Button only render after file selection
  // it('renders button', async () => {
  //   axios.get.mockResolvedValue(mockFilesTree);
  //   render(<DataProductDashboard />);
  //   const button = await waitFor(() => {screen.getByRole('button')});
  //   await waitFor(() => {expect(button).toBeTruthy()});
  //     await waitFor(() => {expect(button).toHaveTextContent('DOWNLOAD')});
  // });
});

test('If No Data Message show if Call is Failure', async () => {
  axios.get.mockRejectedValueOnce(new Error('Network Error'));

  render(<DataProductDashboard />);
  waitFor(()=> {
    expect(screen.getByText('SDP Data API not available')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeInTheDocument();
  });
});

