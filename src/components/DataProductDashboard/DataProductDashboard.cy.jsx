import React from 'react'
import MockData from '../../services/Mocking/mockFilesTree';
import DataProductDashboard from './DataProductDashboard'
import axios from 'axios';

const TEXT_NO_API = "SDP Data API not available";
// const TEXT_MOCK_TITLE = "Data Products";
// const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;

describe('<DataProductDashboard />', () => {

  it('Data Product Dashboard renders correctly when data is unavailable', () => {
    cy.mount(<DataProductDashboard />)
    cy.findByTestId("WarningIcon").should("be.visible")
    cy.findByText(TEXT_NO_API).should("be.visible")
  })

  it('Data Product Dashboard renders correctly when data is available', () => {
    cy.stub(axios, 'get').returns({MockData}).as('get')
    cy.mount(<DataProductDashboard />)
    cy.get('@get').should('have.been.called')

    // cy.stub(DataProductList, 'FetchDataProductList').returns({MockData})
    // cy.findByText(TEXT_MOCK_TITLE).should("be.visible")
  })
})