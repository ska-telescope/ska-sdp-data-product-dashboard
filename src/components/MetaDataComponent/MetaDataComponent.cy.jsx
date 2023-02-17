import React from 'react'
import mockData from '../../services/Mocking/mockMetaData';
import MetaDataComponent, { SECTIONS } from './MetaDataComponent';

//TODO : Take from language files
const METADATA_TITLE = "label.metaData"; // "Meta Data";

describe('<MetaData />', () => {
  it('MetaData renders', () => {
    cy.mount(<MetaDataComponent metaData={mockData} />)  
    cy.findByText(METADATA_TITLE).should("be.visible")
    cy.findByText(SECTIONS[0]).should("be.visible")
    cy.findByText(SECTIONS[1]).should("be.visible")
    cy.findByText(SECTIONS[2]).should("be.visible")
    cy.findByText(SECTIONS[3]).should("be.visible")
    cy.findByText(SECTIONS[4]).should("be.visible")
  })
})