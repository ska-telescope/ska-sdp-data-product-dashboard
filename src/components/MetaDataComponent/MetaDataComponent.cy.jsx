import React from 'react'
import mockData from '../../services/Mocking/mockMetaData';
import MetaDataComponent from './MetaDataComponent';
import Constants from '../../constants/constants';


describe('<MetaData />', () => {
  it('MetaData renders', () => {
    cy.mount(<MetaDataComponent metaData={mockData} />)  
    cy.findByText(Constants.METADATA_TITLE).should("be.visible")
    cy.findByText(Constants.INTERFACE).should("be.visible")
    cy.findByText(Constants.EX_BLOCK).should("be.visible")
    cy.findByText(Constants.CONTEXT).should("be.visible")
    cy.findByText(Constants.CONFIG).should("be.visible")
    cy.findByText(Constants.FILES).should("be.visible")
  })
})