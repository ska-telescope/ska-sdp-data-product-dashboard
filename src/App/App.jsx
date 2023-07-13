import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import DataProductDashboard from '../components/DataProductDashboard/DataProductDashboard';
import { Footer, Header, Spacer, SPACER_VERTICAL,  THEME_DARK, THEME_LIGHT } from "@ska-telescope/ska-gui-components";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "../utils/constants";
import theme from '../../src/services/theme/theme';
import GetAPIStatus from '../services/GetAPIStatus/GetAPIStatus';
const REACT_APP_VERSION = process.env.REACT_APP_VERSION;

function App() {
  const [apiVersion, setAPIVersion] = React.useState("");
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
    const results = await GetAPIStatus()
    setAPIVersion(results.data.Version)
  }

  GetVersionNumber()

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={t("isLoading")}>
        <Header data-testid="skaHeader" themeToggle={themeToggle}  toolTip={toolTip}>
          <Grid item />
          <Grid item>
            <Typography variant='h4'>{t('application')}</Typography>
          </Grid>
          <Grid item />
        </Header>
        <Paper sx={{ minHeight: "100vh"}}>
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          <DataProductDashboard data-testid="DataProductDashboardId"/>
          <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
        </Paper>
          <Footer>
            <Grid item>
            <Typography variant='body1'>{"Data Product Dashboard version: "+REACT_APP_VERSION}</Typography>
            <Typography variant='body1'>{"Data Product API version: "+apiVersion}</Typography>
            </Grid>
            <Grid item />
            <Grid item />
          </Footer>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
