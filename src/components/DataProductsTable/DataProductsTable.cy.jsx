import React from 'react'
import DataProductsTable from './DataProductsTable'

describe('<DataProductsTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DataProductsTable />)
  })
})