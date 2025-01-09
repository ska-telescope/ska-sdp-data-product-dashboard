import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '@services/theme/theme';
import MockDataAnnotations from '@services/Mocking/mockDataAnnotations';
import DataAnnotationComponent from '@components/DataAnnotationComponent/DataAnnotationComponent';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<MetaData />', () => {
  for (const theTheme of THEME) {
    it('Theme ' + theTheme + ': Renders', () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <DataAnnotationComponent data={MockDataAnnotations} />
        </ThemeProvider>
      );
    });
  }
});
