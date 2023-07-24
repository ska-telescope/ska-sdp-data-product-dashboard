import React from 'react'
import mockData from '../../services/Mocking/mockMetaData';
import DownloadCard from './DownloadCard';
import { DOWNLOAD_BUTTON_LABEL, DOWNLOAD_ID } from '../../utils/constants';

describe('<DownloadCard />', () => {
  it('DownloadCard renders', () => {
    cy.mount(<DownloadCard metaData={mockData} />)  
    // TODO : Test that this icon is upon the button.
    cy.findByTestId(DOWNLOAD_ID).should("be.visible")
    cy.get('button').contains(DOWNLOAD_BUTTON_LABEL, { matchCase: false })
  })
})