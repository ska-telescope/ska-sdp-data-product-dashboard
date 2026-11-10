import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppSettingsProvider } from '@contexts/appSettingsContext';
import '@services/i18n/i18n';
import App from './App/App';
import { AuthProvider } from '@ska-telescope/ska-login-page';
import { AUTH_CLIENT_ID, AUTH_AUTHORITY, AUTH_REDIRECT_URI } from '@utils/constants';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container missing from index.html');
}

createRoot(container).render(
  <AppSettingsProvider>
    <AuthProvider
      clientId={AUTH_CLIENT_ID}
      authority={AUTH_AUTHORITY}
      redirectUri={AUTH_REDIRECT_URI}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </AppSettingsProvider>
);
