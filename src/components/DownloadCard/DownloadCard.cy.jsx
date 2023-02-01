import React from 'react'
import mockData from '../../services/Mocking/mockMetaData';
import DownloadCard from './DownloadCard';

const TITLE = "Selected file:";

describe('<DownloadCard />', () => {
  it('DownloadCard renders', () => {
    cy.mount(<DownloadCard metaData={mockData} />)  
    cy.findByText(TITLE).should("be.visible") 
  })
})