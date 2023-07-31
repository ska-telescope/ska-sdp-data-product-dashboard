import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme, THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import DataProductsTable from './DataProductsTable';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<DataProductsTable />', () => {
  for (const theTheme of THEME) {
    it('Theme ' + theTheme, () => {
      it('Renders', () => {
        cy.mount(
          <ThemeProvider theme={theme(theTheme)}>
            <CssBaseline />
            <DataProductsTable />
          </ThemeProvider>,
        );
      })
    });
  }
});