import { render, waitFor } from '@testing-library/react';
import MetaDataComponent from './MetaDataComponent';
import MockData from '../../services/Mocking/mockMetaData';

test("MetaData renders correctly", async () => {
    render(MetaDataComponent(MockData));
    waitFor(() => {

    });
});
