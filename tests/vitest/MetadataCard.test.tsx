import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import MetadataCard from '../../src/components/MetadataCard/MetadataCard';
import getMetaData from '../../src/services/GetMetaData/GetMetaData';
import { SelectedDataProduct } from '../../src/types/dataproducts/dataproducts';

vi.mock('../../src/services/GetMetaData/GetMetaData', () => ({
  default: vi.fn()
}));

const selectedDataProduct: SelectedDataProduct = {
  execution_block: 'eb-test-20260101-00001',
  relativePathName: 'eb-test-20260101-00001',
  metaDataFile: 'ska-data-product.yaml',
  uid: 'uid-1',
  metadata_store_name: 'store'
};

afterEach(() => {
  vi.mocked(getMetaData).mockReset();
});

describe('MetadataCard', () => {
  it('renders a mixed section (primitive + nested object fields) without crashing', async () => {
    // Regression test for a ReferenceError: `formatLabel is not defined` that was thrown
    // when a metadata section contained both primitive and nested-object entries.
    vi.mocked(getMetaData).mockResolvedValue({
      config: {
        image: 'my-image:latest',
        resources: { cpu: '2', memory: '4Gi' }
      }
    });

    render(<MetadataCard {...selectedDataProduct} />);

    await waitFor(() => {
      expect(screen.getByTestId('metadata-section-config')).toBeInTheDocument();
    });

    expect(screen.getByText('Config')).toBeInTheDocument();
    expect(screen.getByTestId('metadata-section-resources')).toBeInTheDocument();
    expect(screen.getByText('Config.resources')).toBeInTheDocument();
  });
});
