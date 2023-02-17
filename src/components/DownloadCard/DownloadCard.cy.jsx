import React from 'react'
import mockData from '../../services/Mocking/mockMetaData';
import DownloadCard from './DownloadCard';

const DOWNLOAD_ICON = "DownloadIcon";
// TODO : Obtain from language files 
const SELECTED_FILE_TITLE = "prompt.selectFile" // "Selected file:";
const DOWNLOAD_BUTTON_LABEL = "BUTTON.DOWNLOAD" // "DOWNLOAD";

describe('<DownloadCard />', () => {
  it('DownloadCard renders', () => {
    cy.mount(<DownloadCard metaData={mockData} />)  
    cy.findByText(SELECTED_FILE_TITLE).should("be.visible")
    // TODO : Test that this icon is upon the button.
    cy.findByTestId(DOWNLOAD_ICON).should("be.visible")
    cy.get('button').contains(DOWNLOAD_BUTTON_LABEL, { matchCase: false })
  })
})