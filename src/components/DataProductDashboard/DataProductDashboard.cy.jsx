import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../services/theme/theme';
import { DOWNLOAD_ID, PROD_1, PROD_2, TEST_DATA_FILE_1, TEXT_NO_API } from '../../utils/constants';
import DataProductDashboard from './DataProductDashboard';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<DataProductDashboard />', () => {
  for (const theTheme of THEME) {
    it('Theme ' + theTheme + ': Renders correctly when data is unavailable', () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <DataProductDashboard data-testid="DataProductDashboardId" />
        </ThemeProvider>,
      );
      cy.findByTestId("apiAvailability").contains(TEXT_NO_API).should("be.visible");
    })
  
    it('Theme ' + theTheme + ': Renders correctly when data is available', () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <DataProductDashboard data-testid="DataProductDashboardId" />
        </ThemeProvider>,
      );

      cy.findByTestId("availableData").contains(PROD_1).should("be.visible");
      cy.findByTestId("availableData").contains(PROD_2).should("be.visible");
    })    
  
    it('Theme ' + theTheme + ': Data is available for download on Data Product Dashboard', () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <DataProductDashboard data-testid="DataProductDashboardId" />
        </ThemeProvider>,
      );
      cy.findByTestId("availableData").contains("1").should("be.visible").click();
      cy.findByTestId(DOWNLOAD_ID).click()
      cy.readFile('cypress/data/' + TEST_DATA_FILE_1).should('contain', 'This is test file 1')
    })
  
    it('Theme ' + theTheme + ': Data products re-index endpoint is called', () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <DataProductDashboard data-testid="DataProductDashboardId" />
        </ThemeProvider>,
      );
      cy.findByTestId("RefreshIcon").click()
    })
  
    it('Theme ' + theTheme + ': Data products reload endpoint is called', () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <DataProductDashboard data-testid="DataProductDashboardId" />
        </ThemeProvider>,
      );
      cy.findByTestId("CachedIcon").invoke('css', 'pointer-events', 'auto')
      cy.findByTestId("CachedIcon").invoke('prop', 'disabled', false)
      cy.findByTestId("CachedIcon").click()
  });
  }
});