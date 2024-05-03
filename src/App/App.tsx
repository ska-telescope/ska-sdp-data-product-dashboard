import React from 'react';
import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import DataProductDashboard from '@components/DataProductDashboard/DataProductDashboard';
import Loader from '@components/loader/Loader';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import theme from '@services/theme/theme';
import { Shell } from '@components/Shell/Shell';

function App() {
  const { themeMode } = storageObject.useStore();

  return (
    <ThemeProvider theme={theme(themeMode?.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={<Loader />}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: 'primary.main',
            height: '100vh'
          }}
        >
          <Shell>
            <DataProductDashboard data-testid="DataProductDashboardId" />
          </Shell>
        </Paper>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
