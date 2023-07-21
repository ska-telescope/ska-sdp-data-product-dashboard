import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import DataProductDashboard from '../components/DataProductDashboard/DataProductDashboard';
import { Footer, Header, Spacer, SPACER_VERTICAL,  THEME_DARK, THEME_LIGHT } from "@ska-telescope/ska-gui-components";
import { DATA_LOCAL, SPACER_FOOTER, SPACER_HEADER } from "../utils/constants";
import theme from '../../src/services/theme/theme';
import GetAPIStatus from '../services/GetAPIStatus/GetAPIStatus';
const REACT_APP_VERSION = process.env.REACT_APP_VERSION;

function App() {
  const [apiVersion, setAPIVersion] = React.useState("LOCAL");
  const { t } = useTranslation('dpd');

  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const toolTip = { skao: skao, mode: mode };

  // Theme related
  const [themeMode, setThemeMode] = React.useState(THEME_LIGHT);

  const themeToggle = () => {
    setThemeMode(themeMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT);
  };

  async function GetVersionNumber() {
    if (!DATA_LOCAL) { 
      const results = await GetAPIStatus()
      setAPIVersion(results.data.Version)
    }
  }

  const TheHeader = () => {
    return (
      <Header data-testid="skaHeader" themeToggle={themeToggle}  toolTip={toolTip}>
        <Grid item />
        <Grid item>
          <Typography variant='h4'>{t('application')}</Typography>
        </Grid>
        <Grid item />
      </Header>
    );
  }

  const TheFooter = () => {
    return (
      <Footer>
        <Grid item>
          <Typography variant='body1'>{t('label.guiVersion') + ' : ' + REACT_APP_VERSION}</Typography>
          <Typography variant='body1'>{t('label.apiVersion') + ' : ' + apiVersion}</Typography>
        </Grid>
        <Grid item />
        <Grid item />
      </Footer>
    );
  }


  GetVersionNumber()

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={t("isLoading")}>
        {TheHeader()}
        <Paper
            elevation={0}
            sx={{
              backgroundColor: 'primary.main',
              width: '100vw',
              minHeight: '100vh',
            }}
          >
            <Spacer size={SPACER_HEADER} axis={SPACER_VERTICAL} />
            <DataProductDashboard data-testid="DataProductDashboardId"/>
            <Spacer size={SPACER_FOOTER} axis={SPACER_VERTICAL} />
          </Paper>
        {TheFooter()}
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
