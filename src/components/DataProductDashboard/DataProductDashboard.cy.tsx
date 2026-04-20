import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '@services/theme/theme';
import { DOWNLOAD_ID, PROD_1, PROD_2, TEST_DATA_FILE_1, TEXT_NO_API } from '@utils/constants';
import DataProductDashboard from '@components/DataProductDashboard/DataProductDashboard';
import MockStatusAPINotRunning from '@services/Mocking/mockStatusAPINotRunning';
import MockStatus from '@services/Mocking/mockStatus';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import { AuthProvider } from '@ska-telescope/ska-login-page';
import { ApiStatusProvider } from '@contexts/ApiStatusContext';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<DataProductDashboard />', () => {
  for (const theTheme of THEME) {
    it('Theme ' + theTheme + ': Renders correctly when data is unavailable', () => {
      cy.mount(
        <StoreProvider>
          <AuthProvider
            MSENTRA_CLIENT_ID={'MSENTRA_CLIENT_ID'}
            MSENTRA_TENANT_ID={'MSENTRA_TENANT_ID'}
            MSENTRA_REDIRECT_URI={'MSENTRA_REDIRECT_URI'}
          >
            <ApiStatusProvider getStatus={() => Promise.resolve(MockStatusAPINotRunning)}>
              <React.StrictMode>
                <ThemeProvider theme={theme(theTheme)}>
                  <CssBaseline />
                  <DataProductDashboard data-testid="DataProductDashboardId" />
                </ThemeProvider>
              </React.StrictMode>
            </ApiStatusProvider>
          </AuthProvider>
        </StoreProvider>
      );
      cy.findByTestId('apiAvailability').contains(TEXT_NO_API).should('be.visible');
    });

    it('Theme ' + theTheme + ': Renders correctly when data is available', () => {
      cy.mount(
        <StoreProvider>
          <AuthProvider
            MSENTRA_CLIENT_ID={'MSENTRA_CLIENT_ID'}
            MSENTRA_TENANT_ID={'MSENTRA_TENANT_ID'}
            MSENTRA_REDIRECT_URI={'MSENTRA_REDIRECT_URI'}
          >
            <ApiStatusProvider getStatus={() => Promise.resolve(MockStatus)}>
              <React.StrictMode>
                <ThemeProvider theme={theme(theTheme)}>
                  <CssBaseline />
                  <DataProductDashboard data-testid="DataProductDashboardId" />
                </ThemeProvider>
              </React.StrictMode>
            </ApiStatusProvider>
          </AuthProvider>
        </StoreProvider>
      );

      cy.findByTestId('availableData').contains(PROD_1).should('be.visible');
      cy.findByTestId('availableData').contains(PROD_2).should('be.visible');
    });

    it('Theme ' + theTheme + ': Data is available for download on Data Product Dashboard', () => {
      cy.mount(
        <StoreProvider>
          <AuthProvider
            MSENTRA_CLIENT_ID={'MSENTRA_CLIENT_ID'}
            MSENTRA_TENANT_ID={'MSENTRA_TENANT_ID'}
            MSENTRA_REDIRECT_URI={'MSENTRA_REDIRECT_URI'}
          >
            <ApiStatusProvider getStatus={() => Promise.resolve(MockStatus)}>
              <React.StrictMode>
                <ThemeProvider theme={theme(theTheme)}>
                  <CssBaseline />
                  <DataProductDashboard data-testid="DataProductDashboardId" />
                </ThemeProvider>
              </React.StrictMode>
            </ApiStatusProvider>
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
          <AuthProvider
            MSENTRA_CLIENT_ID={'MSENTRA_CLIENT_ID'}
            MSENTRA_TENANT_ID={'MSENTRA_TENANT_ID'}
            MSENTRA_REDIRECT_URI={'MSENTRA_REDIRECT_URI'}
          >
            <ApiStatusProvider>
              <React.StrictMode>
                <ThemeProvider theme={theme(theTheme)}>
                  <CssBaseline />
                  <DataProductDashboard data-testid="DataProductDashboardId" />
                </ThemeProvider>
              </React.StrictMode>
            </ApiStatusProvider>
          </AuthProvider>
        </StoreProvider>
      );
      cy.findByTestId('RefreshIcon').click();
    });

    it('Theme ' + theTheme + ': Data products reload endpoint is called', () => {
      cy.mount(
        <StoreProvider>
          <AuthProvider
            MSENTRA_CLIENT_ID={'MSENTRA_CLIENT_ID'}
            MSENTRA_TENANT_ID={'MSENTRA_TENANT_ID'}
            MSENTRA_REDIRECT_URI={'MSENTRA_REDIRECT_URI'}
          >
            <ApiStatusProvider>
              <React.StrictMode>
                <ThemeProvider theme={theme(theTheme)}>
                  <CssBaseline />
                  <DataProductDashboard data-testid="DataProductDashboardId" />
                </ThemeProvider>
              </React.StrictMode>
            </ApiStatusProvider>
          </AuthProvider>
        </StoreProvider>
      );
      cy.findByTestId('CachedIcon').invoke('css', 'pointer-events', 'auto');
      cy.findByTestId('CachedIcon').invoke('prop', 'disabled', false);
      cy.findByTestId('CachedIcon').click();
    });
  }
});

// ===========================================================================
// UI-DASH: search-related behaviour tests (theme-independent)
// ===========================================================================

const mountDashboard = (apiStatus = MockStatus) =>
  cy.mount(
    <StoreProvider>
      <AuthProvider
        MSENTRA_CLIENT_ID={'MSENTRA_CLIENT_ID'}
        MSENTRA_TENANT_ID={'MSENTRA_TENANT_ID'}
        MSENTRA_REDIRECT_URI={'MSENTRA_REDIRECT_URI'}
      >
        <ApiStatusProvider getStatus={() => Promise.resolve(apiStatus)}>
          <React.StrictMode>
            <ThemeProvider theme={theme(THEME_DARK)}>
              <CssBaseline />
              <DataProductDashboard data-testid="DataProductDashboardId" />
            </ThemeProvider>
          </React.StrictMode>
        </ApiStatusProvider>
      </AuthProvider>
    </StoreProvider>
  );

describe('<DataProductDashboard /> search behaviour', () => {
  it('UI-DASH-1: renders the data grid when the API is available', () => {
    mountDashboard();
    // The availability container should be present and not show the no-API message
    cy.findByTestId('availableData').should('exist');
  });

  it('UI-DASH-2: shows the first mock product in the data grid', () => {
    mountDashboard();
    cy.findByTestId('availableData').contains(PROD_1).should('be.visible');
  });

  it('UI-DASH-3: shows the second mock product in the data grid', () => {
    mountDashboard();
    cy.findByTestId('availableData').contains(PROD_2).should('be.visible');
  });

  it('UI-DASH-4: shows the no-API message when the API is unavailable', () => {
    mountDashboard(MockStatusAPINotRunning);
    cy.findByTestId('apiAvailability').contains(TEXT_NO_API).should('be.visible');
  });

  it('UI-DASH-5: re-index button is present and clickable when API is available', () => {
    mountDashboard();
    cy.findByTestId('RefreshIcon').should('exist').click();
  });

  it('UI-DASH-6: download button appears after selecting a product', () => {
    mountDashboard();
    cy.findByTestId('availableData').contains(PROD_1).click();
    cy.findByTestId(DOWNLOAD_ID).should('exist');
  });

  it('UI-DASH-7: downloaded file contains expected content', () => {
    mountDashboard();
    cy.findByTestId('availableData').contains(PROD_1).click();
    cy.findByTestId(DOWNLOAD_ID).click();
    cy.readFile('cypress/data/' + TEST_DATA_FILE_1).should('contain', 'This is test file 1');
  });
});
