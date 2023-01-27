import React from 'react'
import DataProductDashboard from './DataProductDashboard'

describe('<DataProductDashboard />', () => {
  it('Data Product Dashboard renders correctly when data is unavailable', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DataProductDashboard />)
    cy.findAllByTestId("WarningIcon").should("be.visible")
    cy.findByText("SDP Data API not available").should("be.visible")
  })
})