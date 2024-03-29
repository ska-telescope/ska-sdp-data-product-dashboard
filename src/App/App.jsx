import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, CssBaseline, Paper, ThemeProvider, Typography } from "@mui/material";
import DataProductDashboard from '../components/DataProductDashboard/DataProductDashboard';
import { Footer, Header, Spacer, SPACER_VERTICAL } from "@ska-telescope/ska-gui-components";
import Loader from '@components/loader/Loader';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { SPACER_FOOTER, SPACER_HEADER, fullHeight } from "../utils/constants";
import theme from '../services/theme/theme';
import GetAPIStatus from '../services/GetAPIStatus/GetAPIStatus';
import { AuthProvider, LoginDialogs, LoginButton } from '@components/LoginComponents/LoginComponents'

const REACT_APP_VERSION = process.env.REACT_APP_VERSION;

function App() {
  const [apiVersion, setAPIVersion] = React.useState("LOCAL");
  const { themeMode } = storageObject.useStore();
  const { t } = useTranslation('dpd');

  async function GetVersionNumber() {
    const results = await GetAPIStatus();
    setAPIVersion(results?.data?.Version ? results.data.Version : t('error.API_NOT_AVAILABLE'));
  }

  React.useEffect(() => {
    GetVersionNumber()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TheHeader = () => {
    return (
      <Header selectTelescope={false} data-testid="skaHeader" title={t('application')}>        
        { LoginButton() }
      </Header>
    );
  }

  const TheFooter = () => {
    return (
      <Footer version={REACT_APP_VERSION} versionTooltip={<Typography variant='body1'>{t('label.apiVersion') + ' : ' + apiVersion}</Typography>}>
        <Typography variant='body1'></Typography>
      </Footer>
    );
  }

  return (
    <ThemeProvider theme={theme(themeMode.mode)}>
      <AuthProvider>
        <CssBaseline enableColorScheme />
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
                <DataProductDashboard data-testid="DataProductDashboardId"/>
                <Spacer size={SPACER_FOOTER} axis={SPACER_VERTICAL} />
              </Box>
              {LoginDialogs()}
              {TheFooter()}
            </Paper>
        </React.Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
