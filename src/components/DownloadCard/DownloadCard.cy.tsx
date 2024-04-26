import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '@services/theme/theme';
import mockData from '@services/Mocking/mockMetaData';
import DownloadCard from '@components/DownloadCard/DownloadCard';
import { DOWNLOAD_BUTTON_LABEL, DOWNLOAD_ID } from '@utils/constants';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<DownloadCard />', () => {
  for (const theTheme of THEME) {
    it('Theme ' + theTheme + ': Renders', () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <DownloadCard metaData={mockData} />
        </ThemeProvider>
      );
      cy.findByTestId(DOWNLOAD_ID).should('be.visible');
      cy.get('button').contains(DOWNLOAD_BUTTON_LABEL, { matchCase: false });
    });
  }
});
