import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, ThemeProvider } from '@mui/material';
import DataProductDashboard from '../DataProductDashboard/DataProductDashboard';
import theme from '../../services/theme/theme';

function App() {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={t("isLoading")}>
        <div className="App">
          <DataProductDashboard id="DataProductDashboardId" />
        </div>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
