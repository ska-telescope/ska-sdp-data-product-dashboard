import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DownloadCard from '../DataProductDashboard/DownloadCard';
import { onDownloadClick } from '../../services/DataProduct/DataProductDownload'

jest.mock('../../services/DataProduct/DataProductDownload', () => ({
        ...jest.requireActual('../../services/DataProduct/DataProductDownload'),
        onDownloadClick: jest.fn()
    }));


test("Download Card renders correctly", async () => {
    const selectedFileNames = { "fileName": "testfile1.txt" }
    render(<DownloadCard {...selectedFileNames} />);
    waitFor(() => {
        expect(screen.findAllByText(/testfile1.txt/i)).toBeTruthy();
        expect(screen.getByRole('button')).toBeTruthy();
        expect(screen.getByRole('button')).toHaveTextContent('DOWNLOAD');
    });
});

test("Download Button is Clicked and File Downloaded", () => {
    const selectedFileNames = { "fileName": "testfile1.txt" };
    render(<DownloadCard {...selectedFileNames} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onDownloadClick).toHaveBeenCalled();
});
