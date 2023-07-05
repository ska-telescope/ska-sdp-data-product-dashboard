import React from 'react'
import mockData from '../../services/Mocking/mockMetaData';
import DownloadCard from './DownloadCard';
import Constants from '../../utils/constants';

describe('<DownloadCard />', () => {
  it('DownloadCard renders', () => {
    cy.mount(<DownloadCard metaData={mockData} />)  
    cy.findByText(Constants.SELECTED_FILE_TITLE).should("be.visible")
    // TODO : Test that this icon is upon the button.
    cy.findByTestId(Constants.DOWNLOAD_ICON).should("be.visible")
    cy.get('button').contains(Constants.DOWNLOAD_BUTTON_LABEL, { matchCase: false })
  })
})