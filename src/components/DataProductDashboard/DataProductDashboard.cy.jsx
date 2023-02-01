import React from 'react'
import MockData from '../../services/Mocking/mockFilesTree';
import DataProductDashboard from './DataProductDashboard'
// import DataProductList from '../../services/DataProduct/DataProductList';

const TEXT_NO_API = "SDP Data API not available";
// const TEXT_MOCK_TITLE = "Data Products";
const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;

describe('<DataProductDashboard />', () => {

  it('Data Product Dashboard renders correctly when data is unavailable', () => {
    cy.mount(<DataProductDashboard />)
    cy.findAllByTestId("WarningIcon").should("be.visible")
    cy.findByText(TEXT_NO_API).should("be.visible")
  })

  it('Data Product Dashboard renders correctly when data is available', () => {
    cy.intercept('GET', `${apiUrl}/dataproductlist`,  MockData )


    // cy.mount(<DataProductDashboard />)

    // cy.stub(DataProductList, 'fetchDataProductList').returns({MockData})
    // cy.findByText(TEXT_MOCK_TITLE).should("be.visible")
  })
})