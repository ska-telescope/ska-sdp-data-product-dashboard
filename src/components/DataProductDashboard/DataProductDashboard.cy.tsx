import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '@services/theme/theme';
import { DOWNLOAD_ID, PROD_1, PROD_2, TEST_DATA_FILE_1, TEXT_NO_API } from '@utils/constants';
import DataProductDashboard from '@components/DataProductDashboard/DataProductDashboard';
import MockStatusAPINotRunning from '@services/Mocking/mockStatusAPINotRunning';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import AuthProvider from '@components/Auth/AuthContext';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<DataProductDashboard />', () => {
  for (const theTheme of THEME) {
    it('Theme ' + theTheme + ': Renders correctly when data is unavailable', () => {
      const stub = cy.stub().resolves(MockStatusAPINotRunning);
      cy.window().then((win) => (win.GetAPIStatus = stub));
      cy.mount(
        <StoreProvider>
          <AuthProvider>
            <React.StrictMode>
              <ThemeProvider theme={theme(theTheme)}>
                <CssBaseline />
                <DataProductDashboard data-testid="DataProductDashboardId" />
              </ThemeProvider>
            </React.StrictMode>
          </AuthProvider>
        </StoreProvider>
      );
      cy.findByTestId('apiAvailability').contains(TEXT_NO_API).should('be.visible');
    });

    it('Theme ' + theTheme + ': Renders correctly when data is available', () => {
      cy.mount(
        <StoreProvider>
          <AuthProvider>
            <React.StrictMode>
              <ThemeProvider theme={theme(theTheme)}>
                <CssBaseline />
                <DataProductDashboard data-testid="DataProductDashboardId" />
              </ThemeProvider>
            </React.StrictMode>
          </AuthProvider>
        </StoreProvider>
      );

      cy.findByTestId('availableData').contains(PROD_1).should('be.visible');
      cy.findByTestId('availableData').contains(PROD_2).should('be.visible');
    });

    it('Theme ' + theTheme + ': Data is available for download on Data Product Dashboard', () => {
      cy.mount(
        <StoreProvider>
          <AuthProvider>
            <React.StrictMode>
              <ThemeProvider theme={theme(theTheme)}>
                <CssBaseline />
                <DataProductDashboard data-testid="DataProductDashboardId" />
              </ThemeProvider>
            </React.StrictMode>
          </AuthProvider>
        </StoreProvider>
      );
      cy.findByTestId('availableData').contains(PROD_1).click();
      cy.findByTestId(DOWNLOAD_ID).click();
      cy.readFile('cypress/data/' + TEST_DATA_FILE_1).should('contain', 'This is test file 1');
    });

    it('Theme ' + theTheme + ': Data products re-index endpoint is called', () => {
      cy.mount(
        <StoreProvider>
          <AuthProvider>
            <React.StrictMode>
              <ThemeProvider theme={theme(theTheme)}>
                <CssBaseline />
                <DataProductDashboard data-testid="DataProductDashboardId" />
              </ThemeProvider>
            </React.StrictMode>
          </AuthProvider>
        </StoreProvider>
      );
      cy.findByTestId('RefreshIcon').click();
    });

    it('Theme ' + theTheme + ': Data products reload endpoint is called', () => {
      cy.mount(
        <StoreProvider>
          <AuthProvider>
            <React.StrictMode>
              <ThemeProvider theme={theme(theTheme)}>
                <CssBaseline />
                <DataProductDashboard data-testid="DataProductDashboardId" />
              </ThemeProvider>
            </React.StrictMode>
          </AuthProvider>
        </StoreProvider>
      );
      cy.findByTestId('CachedIcon').invoke('css', 'pointer-events', 'auto');
      cy.findByTestId('CachedIcon').invoke('prop', 'disabled', false);
      cy.findByTestId('CachedIcon').click();
    });
  }
});
