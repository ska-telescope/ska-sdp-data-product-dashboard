import React from 'react'
import MockData from '../../services/Mocking/mockFilesTree';
import DataProductDashboard from './DataProductDashboard';
import axios from 'axios';

const TEXT_NO_API = "SDP Data API not available";
const TITLE = "Mocked Data Products";
const PROD_1 = "pb_id_1";
const PROD_2 = "pb_id_2";
const TEST_DATA_FILE_1 = "TestDataFile1.txt";
const DOWNLOAD_BUTTON = "DownloadIcon";


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


  it('Data is available for download on Data Product Dashboard', () => {
    cy.stub(axios, 'get').returns(MockData).as('fetch')
    cy.mount(<DataProductDashboard />)
    cy.get('@fetch').should('have.been.called')

    cy.findByText(PROD_1).should("be.visible")
    cy.findByText(PROD_1).click()
    cy.findByText(TEST_DATA_FILE_1).should("be.visible")

    cy.findByText(TEST_DATA_FILE_1).click()
    cy.findByTestId(DOWNLOAD_BUTTON).click()
    cy.readFile('cypress/downloads/' + TEST_DATA_FILE_1).should('contain', 'Error')
  })
})