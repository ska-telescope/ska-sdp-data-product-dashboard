import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import DataProductDashboard from '../components/DataProductDashboard/DataProductDashboard';
import { Footer, Header, Spacer, SPACER_VERTICAL,  THEME_DARK, THEME_LIGHT } from "@ska-telescope/ska-gui-components";
import { DATA_LOCAL, HEADER_HEIGHT, FOOTER_HEIGHT } from "../utils/constants";
import theme from '../../src/services/theme/theme';
function App() {
  const { t } = useTranslation('dpd');

  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const toolTip = { skao: skao, mode: mode };

  // Theme related
  const [themeMode, setThemeMode] = React.useState(THEME_LIGHT);

  const themeToggle = () => {
    setThemeMode(themeMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT);
  };

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
          <DataProductDashboard data-testid="DataProductDashboardId" dataLocal={DATA_LOCAL} />
          <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
        </Paper>
          <Footer />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
