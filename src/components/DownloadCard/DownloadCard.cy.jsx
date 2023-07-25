import React from 'react'
import mockData from '../../services/Mocking/mockMetaData';
import DownloadCard from './DownloadCard';
import { DOWNLOAD_BUTTON_LABEL, DOWNLOAD_ICON, SELECTED_FILE_TITLE, TEXT_NO_API } from "../../utils/constants";

describe('<DownloadCard />', () => {
  it('DownloadCard renders', () => {
    cy.mount(<DownloadCard metaData={mockData} />)
    cy.findByTestId("selectedFileDetails").contains(SELECTED_FILE_TITLE).should("be.visible");
    // TODO : Test that this icon is upon the button.
    cy.findByTestId(DOWNLOAD_ICON).should("be.visible")
    cy.get('button').contains(DOWNLOAD_BUTTON_LABEL, { matchCase: false })
  })
})