import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './services/i18n/i18n';
import App from './App/App';

const root = createRoot(document.getElementById('root'))
root.render(
  <Suspense fallback="...is loading">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
);
