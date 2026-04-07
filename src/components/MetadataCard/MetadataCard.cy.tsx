import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '@services/theme/theme';
import MetadataCard from '@components/MetadataCard/MetadataCard';

const THEME = [THEME_DARK, THEME_LIGHT];

const emptyDataProduct = {
  execution_block: '',
  relativePathName: '',
  metaDataFile: '',
  uid: '',
  metadata_store_name: ''
};

describe('<MetadataCard />', () => {
  for (const theTheme of THEME) {
    it('Theme ' + theTheme + ': Renders', () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <MetadataCard {...emptyDataProduct} />
        </ThemeProvider>
      );
    });
  }
});
