import React from 'react'
import MockData from '../../services/Mocking/mockFilesTree';
import DataProductDashboard from './DataProductDashboard';
import axios from 'axios';

const PROD_1 = "eb-m001-20191031-12345";
const PROD_2 = "eb-m002-20221212-12345";
const TEST_DATA_FILE_1 = "TestDataFile1.txt";
const DOWNLOAD_ICON = "DownloadIcon";

// TODO : Pull out of language file
const TEXT_NO_API = "error.API_NO_DATA"; // "SDP Data API not available";

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
    cy.findByText(PROD_1).should("be.visible")
    cy.findByText(PROD_2).should("be.visible")
  })


  it('Data is available for download on Data Product Dashboard', () => {
    cy.stub(axios, 'get').returns(MockData).as('fetch')
    cy.mount(<DataProductDashboard />)
    cy.get('@fetch').should('have.been.called')

    cy.findByText("1").click()
    cy.findByTestId(DOWNLOAD_ICON).click()
    // TODO : Below is passing but should fail ???
    cy.readFile('cypress/downloads/' + TEST_DATA_FILE_1).should('contain', 'Error')
  })
})