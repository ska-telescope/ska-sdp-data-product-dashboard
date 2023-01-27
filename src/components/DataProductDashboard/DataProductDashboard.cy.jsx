import React from 'react'
import DataProductDashboard from './DataProductDashboard'

const TEXT_NO_API = "SDP Data API not available"
describe('<DataProductDashboard />', () => {
  it('Data Product Dashboard renders correctly when data is unavailable', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DataProductDashboard />)
    cy.findAllByTestId("WarningIcon").should("be.visible")
    cy.findByText(TEXT_NO_API).should("be.visible")
  })
})