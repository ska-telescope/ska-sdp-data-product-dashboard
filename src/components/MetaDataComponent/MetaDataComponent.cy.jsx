import React from 'react'
import mockData from '../../services/Mocking/mockMetaData';
import MetaDataComponent from './MetaDataComponent';

const TITLE = "Meta Data";
const INTERFACE = "interface";
const EX_BLOCK = "execution_block";
const CONTEXT = "context";
const CONFIG = "config";
const FILES = "files";

describe('<MetaData />', () => {
  it('MetaData renders', () => {
    cy.mount(<MetaDataComponent metaData={mockData} />)  
    cy.findByText(TITLE).should("be.visible") 
    cy.findByText(INTERFACE).should("be.visible") 
    cy.findByText(EX_BLOCK).should("be.visible") 
    cy.findByText(CONTEXT).should("be.visible") 
    cy.findByText(CONFIG).should("be.visible") 
    cy.findByText(FILES).should("be.visible") 
  })
})