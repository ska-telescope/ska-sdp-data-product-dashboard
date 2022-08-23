import React, { Suspense } from 'react';
import { render } from 'react-dom';
import './services/i18n/i18n';
import App from './components/App/App';

render(
  <Suspense fallback="...is loading">
    <App />
  </Suspense>,
  document.getElementById('root')
);
