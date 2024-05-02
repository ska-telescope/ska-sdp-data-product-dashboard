import React from 'react';
import { createRoot } from 'react-dom/client';
import '@services/i18n/i18n';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import App from './App/App';
import AuthProvider from './components/Auth/AuthContext';


const root = createRoot(document.getElementById('root'))
root.render(
    <StoreProvider>
      <AuthProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthProvider>
    </StoreProvider>
);
