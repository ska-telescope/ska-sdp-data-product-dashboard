import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import DataProductDashboard from '../DataProductDashboard/DataProductDashboard';

const theme = createTheme({
  palette: {
    primary: {
      light: '#c1c6ca',
      main: '#c1c6ca',
      dark: '#212121',
      contrastText: '#000000'
    },
    secondary: {
      main: '#070068',
      light: '#070068',
      dark: '#f7be00',
      contrastText: '#FFFFFF'
    }
  },
  shape: {
    borderRadius: 25
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback="...is loading">
        <div className="App">
          <DataProductDashboard id="DataProductDashboardId" />
        </div>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
