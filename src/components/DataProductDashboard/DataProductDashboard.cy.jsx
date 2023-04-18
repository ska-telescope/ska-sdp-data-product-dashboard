import React from 'react'
import MockData from '../../services/Mocking/mockFilesTree';
import DataProductDashboard from './DataProductDashboard';
import axios from 'axios';
import Constants from '../../constants/constants';

describe('<DataProductDashboard />', () => {

  it('Data Product Dashboard renders correctly when data is unavailable', () => {
    cy.mount(<DataProductDashboard />)
    cy.findByText(Constants.TEXT_NO_API).should("be.visible")
  })

  it('Data Product Dashboard renders correctly when data is available', () => {

    cy.stub(axios, 'get').returns(MockData).as('fetch')
    cy.mount(<DataProductDashboard />)
    cy.get('@fetch').should('have.been.called')
    cy.findByText(Constants.PROD_1).should("be.visible")
    cy.findByText(Constants.PROD_2).should("be.visible")
  })


  it('Data is available for download on Data Product Dashboard', () => {
    cy.stub(axios, 'get').returns(MockData).as('fetch')
    cy.mount(<DataProductDashboard />)
    cy.get('@fetch').should('have.been.called')

    cy.findByText("1").click()
    cy.findByTestId(Constants.DOWNLOAD_ICON).click()
    cy.readFile('cypress/data/' + Constants.TEST_DATA_FILE_1).should('contain', 'This is test file 1')
  })
})