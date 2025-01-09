import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '@services/theme/theme';
import mockDataAnnotations from '@services/Mocking/mockDataAnnotations';
import DataAnnotationsCard from '@components/DataAnnotationsCard/DataAnnotationsCard';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<DataAnnotationsCard  />', () => {
  for (const theTheme of THEME) {
    it('Theme ' + theTheme + ': Renders', () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <DataAnnotationsCard data={mockDataAnnotations} />
        </ThemeProvider>
      );
      cy.findByTestId('createDataAnnotation').should('be.visible');
    });
  }
});
