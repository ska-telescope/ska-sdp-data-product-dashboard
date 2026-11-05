import React from 'react';
import { AppSettingsProvider } from '@contexts/appSettingsContext';
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
  <AppSettingsProvider>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </AppSettingsProvider>
);

export default TestProvider;
