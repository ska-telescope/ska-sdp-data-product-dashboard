import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './services/i18n/i18n';
import App from './components/App/App';

ReactDOM.render(
  <Suspense fallback="...is loading">
    <App />
  </Suspense>,
  document.getElementById('root')
);
