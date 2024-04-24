import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, CssBaseline, Paper, ThemeProvider } from '@mui/material';
import DataProductDashboard from '@components/DataProductDashboard/DataProductDashboard';
import {
  Footer,
  Header,
  Spacer,
  SPACER_VERTICAL,
  CopyrightModal
} from '@ska-telescope/ska-gui-components';
import Loader from '@components/loader/Loader';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { SPACER_FOOTER, SPACER_HEADER, fullHeight } from '@utils/constants';
import theme from '@services/theme/theme';
import GetAPIStatus from '@services/GetAPIStatus/GetAPIStatus';

const REACT_APP_VERSION = process.env.REACT_APP_VERSION;

function App() {
  const [apiVersion, setAPIVersion] = React.useState('LOCAL');
  const { help, helpToggle, themeMode, toggleTheme } = storageObject.useStore();
  const { t } = useTranslation('dpd');
  const skao = t('toolTip.button.skao', { ns: 'dpd' });
  const mode = t('toolTip.button.mode', { ns: 'dpd' });
  const toolTip = { skao: skao, mode: mode };
  const [showCopyright, setShowCopyright] = React.useState(false);

  async function GetVersionNumber() {
    const results = await GetAPIStatus();
    setAPIVersion(results?.data?.Version ? results.data.Version : t('error.API_NOT_AVAILABLE'));
  }

  React.useEffect(() => {
    GetVersionNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDocs = () => {
    const headerTip = t('toolTip.button.docs');
    const headerURL = t('toolTip.button.docsURL');
    return { tooltip: headerTip, url: headerURL };
  };

  const theStorage = {
    help: help,
    helpToggle: helpToggle,
    themeMode: themeMode.mode,
    toggleTheme: toggleTheme
  };

  const TheHeader = () => {
    return (
      <Header
        docs={getDocs()}
        title={t('application')}
        testId="skaHeader"
        toolTip={toolTip}
        storage={theStorage}
      ></Header>
    );
  };

  const TheFooter = () => {
    return (
      <Footer
        copyrightFunc={setShowCopyright}
        testId="footerId"
        version={REACT_APP_VERSION}
        versionTooltip={`${t('label.apiVersion')} ${apiVersion}`}
      />
    );
  };

  return (
    <ThemeProvider theme={theme(themeMode?.mode)}>
      <CssBaseline enableColorScheme />
      <CopyrightModal copyrightFunc={setShowCopyright} show={showCopyright} />
      <React.Suspense fallback={<Loader />}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: 'primary.main',
            height: '100vh'
          }}
        >
          {TheHeader()}
          <Box m={1} sx={{ height: fullHeight() }}>
            <Spacer size={SPACER_HEADER} axis={SPACER_VERTICAL} />
            <DataProductDashboard data-testid="DataProductDashboardId" />
            <Spacer size={SPACER_FOOTER} axis={SPACER_VERTICAL} />
          </Box>
          {TheFooter()}
        </Paper>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
