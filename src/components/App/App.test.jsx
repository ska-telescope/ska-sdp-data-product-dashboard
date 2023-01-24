import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    cleanup();
  });
  
  it('renders without crashing', () => {
    render(<App />);
  });
});
