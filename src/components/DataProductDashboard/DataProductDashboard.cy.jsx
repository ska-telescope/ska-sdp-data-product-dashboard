import React from 'react'
import { MockDPL } from '../../services/Mocking/mockDataProductList';
import DataProductDashboard from './DataProductDashboard';
import axios from 'axios';
import { DOWNLOAD_ICON, PROD_1, PROD_2, TEST_DATA_FILE_1, TEXT_NO_API } from '../../utils/constants';

describe('<DataProductDashboard />', () => {

  it('Data Product Dashboard renders correctly when data is unavailable', () => {
    cy.mount(<DataProductDashboard data-testid="DataProductDashboardId" dataLocalValue='FALSE' />)
    cy.findByTestId("apiAvailability").contains(TEXT_NO_API).should("be.visible");
  })

  it('Data Product Dashboard renders correctly when data is available', () => {
    cy.stub(axios, 'get').returns(MockDPL).as('fetch')
    cy.mount(<DataProductDashboard data-testid="DataProductDashboardId" dataLocalValue='TRUE' />)
    cy.findByTestId("availableData").contains(PROD_1).should("be.visible");
    cy.findByTestId("availableData").contains(PROD_2).should("be.visible");
  })


  it('Data is available for download on Data Product Dashboard', () => {
    cy.stub(axios, 'get').returns(MockDPL).as('fetch')
    cy.mount(<DataProductDashboard data-testid="DataProductDashboardId" dataLocalValue='TRUE' />)
    cy.findByTestId("availableData").contains("1").should("be.visible").click();
    cy.findByTestId(DOWNLOAD_ICON).click()
    cy.readFile('cypress/data/' + TEST_DATA_FILE_1).should('contain', 'This is test file 1')
  })

  it('Data products reindex endpoint is called', () => {
    cy.stub(axios, 'get').returns("").as('fetch')
    cy.mount(<DataProductDashboard data-testid="DataProductDashboardId" dataLocalValue='TRUE' />)
    cy.findByTestId("RefreshIcon").click()
    })

  it('Data products reload endpoint is called', () => {
    cy.stub(axios, 'get').returns("").as('fetch')
    cy.mount(<DataProductDashboard data-testid="DataProductDashboardId" dataLocalValue='TRUE' />)
    cy.findByTestId("CachedIcon").invoke('css', 'pointer-events', 'auto')
    cy.findByTestId("CachedIcon").invoke('prop', 'disabled', false)
    cy.findByTestId("CachedIcon").click()
    })
  })
