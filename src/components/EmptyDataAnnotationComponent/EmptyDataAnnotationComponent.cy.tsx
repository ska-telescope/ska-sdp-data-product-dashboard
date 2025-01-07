import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '@services/theme/theme';
import EmptyDataAnnotationComponent from '@components/EmptyDataAnnotationComponent/EmptyDataAnnotationComponent';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<MetaData />', () => {
  for (const theTheme of THEME) {
    it('Theme ' + theTheme + ': Renders', () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <EmptyDataAnnotationComponent/>
        </ThemeProvider>
      );
    });
  }
});