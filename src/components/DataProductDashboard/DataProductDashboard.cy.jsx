import React from 'react'
import MockData from '../../services/Mocking/mockFilesTree';
import DataProductDashboard from './DataProductDashboard';
// import DataProductList from '../../services/DataProductList/DataProductList';
import axios from 'axios';

const TEXT_NO_API = "SDP Data API not available";
const TITLE = "Mocked Data Products";
const PROD_1 = "pb_id_1";
const PROD_2 = "pb_id_2";

describe('<DataProductDashboard />', () => {

  it('Data Product Dashboard renders correctly when data is unavailable', () => {
    cy.mount(<DataProductDashboard />)
    cy.findByTestId("WarningIcon").should("be.visible")
    cy.findByText(TEXT_NO_API).should("be.visible")
  })

  it('Data Product Dashboard renders correctly when data is available', () => {

    cy.stub(axios, 'get').returns(MockData).as('fetch')
    cy.mount(<DataProductDashboard />)
    cy.get('@fetch').should('have.been.called')
    cy.findByText(TITLE).should("be.visible") 
    cy.findByText(PROD_1).should("be.visible") 
    cy.findByText(PROD_2).should("be.visible")
  })
})