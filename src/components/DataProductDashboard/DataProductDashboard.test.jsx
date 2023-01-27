import React from 'react';
import { cleanup } from '@testing-library/react';
import DataProductDashboard from "./DataProductDashboard";

beforeEach(() => {
});

afterEach(() => {
  cleanup();
});

describe('My First Tests', () => {
  it('Does not do much!', () => {
    expect(1).toEqual(1);
  })

  it('Does not do much either!', () => {
    expect(1).not.toEqual(3);
  })

  it('Example test', () => {
    cy.mount(<DataProductDashboard />);
    cy.get('dataProductDashboard').should('contains.text', 'Click me!')
  })
})
