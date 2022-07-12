import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Ska_sdp_data_product_dashboard from '../Ska_sdp_data_product_dashboard/Ska_sdp_data_product_dashboard';

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
          <Ska_sdp_data_product_dashboard id="Ska_sdp_data_product_dashboardId" />
        </div>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
