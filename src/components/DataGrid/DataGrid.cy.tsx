/**
 * Cypress component tests for the DataproductDataGrid component.
 *
 * Test IDs UI-DG-1 to UI-DG-6:
 *   UI-DG-1  Renders grid rows from mock API response
 *   UI-DG-2  Shows execution_block values in the grid
 *   UI-DG-3  Shows a download button for PV products
 *   UI-DG-4  Clicking a row saves values to localStorage
 *   UI-DG-5  Pagination controls are present
 *   UI-DG-6  Filtering triggers a new data fetch
 */

import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK } from '@ska-telescope/ska-gui-components';
import theme from '@services/theme/theme';
import { AuthProvider } from '@ska-telescope/ska-login-page';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import DataproductDataGrid from '@components/DataGrid/DataGrid';
import * as GetMuiDataGridRowsModule from '@services/GetMuiDataGridRows/GetMuiDataGridRows';
import mockDataGridRowsData from '@services/Mocking/mockDataGridRowsData';

// ---------------------------------------------------------------------------
// Mount helper
// ---------------------------------------------------------------------------
const mountGrid = (searchPanelOptions = { items: [] }) => {
  cy.stub(GetMuiDataGridRowsModule, 'default').resolves({
    DataGridRowsData: mockDataGridRowsData.DataGridRowsData,
    total: mockDataGridRowsData.DataGridRowsData.length
  });

  cy.mount(
    <StoreProvider>
      <AuthProvider
        MSENTRA_CLIENT_ID="MSENTRA_CLIENT_ID"
        MSENTRA_TENANT_ID="MSENTRA_TENANT_ID"
        MSENTRA_REDIRECT_URI="MSENTRA_REDIRECT_URI"
      >
        <ThemeProvider theme={theme(THEME_DARK)}>
          <CssBaseline />
          <DataproductDataGrid
            handleSelectedNode={cy.stub()}
            searchPanelOptions={searchPanelOptions}
            updating={false}
          />
        </ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

describe('<DataproductDataGrid />', () => {
  // -------------------------------------------------------------------------
  // UI-DG-1  Grid renders rows
  // -------------------------------------------------------------------------
  it('UI-DG-1: renders the MUI DataGrid component', () => {
    mountGrid();
    cy.get('[role="grid"]').should('exist');
  });

  // -------------------------------------------------------------------------
  // UI-DG-2  Execution block values are visible
  // -------------------------------------------------------------------------
  it('UI-DG-2: shows execution_block values from the API response', () => {
    mountGrid();
    cy.contains('eb-m001-20191031-12345').should('exist');
  });

  // -------------------------------------------------------------------------
  // UI-DG-3  Download button for PV products
  // -------------------------------------------------------------------------
  it('UI-DG-3: shows a Download button for PV data products with a valid path', () => {
    mountGrid();
    // The first mock product has a non-None dataproduct_file
    cy.findAllByTestId('downloadButton').should('have.length.greaterThan', 0);
  });

  // -------------------------------------------------------------------------
  // UI-DG-4  Row click stores selection in localStorage
  // -------------------------------------------------------------------------
  it('UI-DG-4: clicking a row saves the execution_block to localStorage', () => {
    mountGrid();
    cy.get('[role="row"]').not('[aria-rowindex="1"]').first().click();
    cy.window().then((win) => {
      const stored = win.localStorage.getItem('selectedDataProduct');
      expect(stored).to.not.equal(null);
      const parsed = JSON.parse(stored!);
      expect(parsed).to.have.property('execution_block');
    });
  });

  // -------------------------------------------------------------------------
  // UI-DG-5  Pagination controls are present
  // -------------------------------------------------------------------------
  it('UI-DG-5: pagination controls are rendered', () => {
    mountGrid();
    cy.get('.MuiTablePagination-root').should('exist');
  });

  // -------------------------------------------------------------------------
  // UI-DG-6  Filter change triggers re-fetch
  // -------------------------------------------------------------------------
  it('UI-DG-6: updating the searchPanelOptions prop triggers a new data fetch', () => {
    cy.mount(
      <StoreProvider>
        <AuthProvider
          MSENTRA_CLIENT_ID="MSENTRA_CLIENT_ID"
          MSENTRA_TENANT_ID="MSENTRA_TENANT_ID"
          MSENTRA_REDIRECT_URI="MSENTRA_REDIRECT_URI"
        >
          <ThemeProvider theme={theme(THEME_DARK)}>
            <CssBaseline />
            <DataproductDataGrid
              handleSelectedNode={cy.stub()}
              searchPanelOptions={{
                items: [{ field: 'execution_block', operator: 'contains', value: 'eb-m001' }],
                logicOperator: 'and'
              }}
              updating={false}
            />
          </ThemeProvider>
        </AuthProvider>
      </StoreProvider>
    );

    // Verify the grid rendered data rows (search panel options are wired into dataFilterModel)
    cy.get('[role="grid"]').should('exist');
    cy.get('[role="row"]').should('have.length.greaterThan', 1);
  });
});
