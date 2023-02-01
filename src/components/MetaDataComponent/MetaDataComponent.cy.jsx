import React from 'react'
import mockData from '../../services/Mocking/mockMetaData';
import MetaDataComponent from './MetaDataComponent';

const TITLE = "Meta Data";

describe('<MetaData />', () => {
  it('MetaData renders', () => {
    cy.mount(<MetaDataComponent metaData={mockData} />)  
    cy.findByText(TITLE).should("be.visible") 
  })
})