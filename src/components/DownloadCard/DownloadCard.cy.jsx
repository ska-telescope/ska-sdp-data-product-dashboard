import React from 'react'
import mockData from '../../services/Mocking/mockMetaData';
import DownloadCard from './DownloadCard';

const TITLE = "Selected file:";
const BTN_LABEL = "DOWNLOAD";

describe('<DownloadCard />', () => {
  it('DownloadCard renders', () => {
    cy.mount(<DownloadCard metaData={mockData} />)  
    cy.findByText(TITLE).should("be.visible") 
    // TODO : Test that this icon is upon the button.
    cy.findByTestId("DownloadIcon").should("be.visible")
    cy.get('button').contains(BTN_LABEL, { matchCase: false })
  })
})