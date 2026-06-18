import React from 'react';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { ThemeProvider } from '@mui/material';
import theme from '@services/theme/theme';

interface TestProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps components under test with the providers required by the application.
 * Use this in unit tests instead of mounting providers manually.
 */
const TestProvider = ({ children }: TestProviderProps) => (
  <StoreProvider>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </StoreProvider>
);

export default TestProvider;
