import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Grid, ThemeProvider, Typography } from "@mui/material";
import DataProductDashboard from '../DataProductDashboard/DataProductDashboard';
import { Footer, Header, Spacer, SPACER_VERTICAL } from "@ska-telescope/ska-gui-components";
import theme, { THEME_DARK, THEME_LIGHT } from '../../services/theme/theme';
import { Container } from "@mui/system";

function App() {
  const { t } = useTranslation();

  const HEADER_HEIGHT = 70;
  const FOOTER_HEIGHT = 70;

  // Theme related
  const [themeMode, setThemeMode] = React.useState(THEME_LIGHT);

  const themeToggle = () => {
    setThemeMode(themeMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT);
  };

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={t("isLoading")}>
        <div className="App">
          <DataProductDashboard id="DataProductDashboardId" />
        </div>
        <Header data-testid="skaHeader" themeToggle={themeToggle}>
          <Grid item />
          <Grid item>
            <Typography variant='h4'>Data Product Dashboard</Typography>
          </Grid>
          <Grid item />
        </Header>
        <>
          <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
          <Container />
          <Spacer size={FOOTER_HEIGHT} axis={SPACER_VERTICAL} />
          <Footer />
        </>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
