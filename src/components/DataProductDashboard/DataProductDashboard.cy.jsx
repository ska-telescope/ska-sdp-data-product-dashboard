import React from 'react'
import axios from 'axios';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme, THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import MockDPL from '../../services/Mocking/mockDataProductList';
import { DOWNLOAD_ID, PROD_1, PROD_2, TEST_DATA_FILE_1, TEXT_NO_API } from '../../utils/constants';
import DataProductDashboard from './DataProductDashboard';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<DataProductDashboard />', () => {
  for (const theTheme of THEME) {
    it('Theme ' + theTheme, () => {
      it('Renders correctly when data is unavailable', () => {
        cy.mount(
          <ThemeProvider theme={theme(theTheme)}>
            <CssBaseline />
            <DataProductDashboard data-testid="DataProductDashboardId" dataLocalValue='FALSE' />
          </ThemeProvider>,
        );
        cy.findByTestId("apiAvailability").contains(TEXT_NO_API).should("be.visible");
      })
    
      it('Renders correctly when data is available', () => {
        cy.stub(axios, 'get').returns(MockDPL).as('fetch')
        cy.mount(
          <ThemeProvider theme={theme(theTheme)}>
            <CssBaseline />
            <DataProductDashboard data-testid="DataProductDashboardId" dataLocalValue='TRUE' />
          </ThemeProvider>,
        );
        cy.findByTestId("availableData").contains(PROD_1).should("be.visible");
        cy.findByTestId("availableData").contains(PROD_2).should("be.visible");
      })    
    
      it('Data is available for download on Data Product Dashboard', () => {
        cy.stub(axios, 'get').returns(MockDPL).as('fetch')
        cy.mount(
          <ThemeProvider theme={theme(theTheme)}>
            <CssBaseline />
            <DataProductDashboard data-testid="DataProductDashboardId" dataLocalValue='TRUE' />
          </ThemeProvider>,
        );
        cy.findByTestId("availableData").contains("1").should("be.visible").click();
        cy.findByTestId(DOWNLOAD_ID).click()
        cy.readFile('cypress/data/' + TEST_DATA_FILE_1).should('contain', 'This is test file 1')
      })
    
      it('Data products re-index endpoint is called', () => {
        cy.stub(axios, 'get').returns("").as('fetch')
        cy.mount(
          <ThemeProvider theme={theme(theTheme)}>
            <CssBaseline />
            <DataProductDashboard data-testid="DataProductDashboardId" dataLocalValue='TRUE' />
          </ThemeProvider>,
        );
        cy.findByTestId("RefreshIcon").click()
      })
    
      it('Data products reload endpoint is called', () => {
        cy.stub(axios, 'get').returns("").as('fetch')
        cy.mount(
          <ThemeProvider theme={theme(theTheme)}>
            <CssBaseline />
            <DataProductDashboard data-testid="DataProductDashboardId" dataLocalValue='TRUE' />
          </ThemeProvider>,
        );
        cy.findByTestId("CachedIcon").invoke('css', 'pointer-events', 'auto')
        cy.findByTestId("CachedIcon").invoke('prop', 'disabled', false)
        cy.findByTestId("CachedIcon").click()
      })
    });
  }
});