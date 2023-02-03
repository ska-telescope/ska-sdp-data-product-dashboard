context('Navigation', () => {

  const PROD_1 = "pb_id_1";
  const TEST_DATA_FILE_1 = "TestDataFile1.txt";
  const DOWNLOAD_BUTTON = "DownloadIcon";

  beforeEach(() => {
    cy.visit('http://localhost:8100/')
  })

  it('Select data product and download file', () => {
    cy.findByText(PROD_1).click()
    cy.findByText(TEST_DATA_FILE_1).click()
    cy.findByTestId(DOWNLOAD_BUTTON).click()
    cy.readFile('cypress/downloads/' + TEST_DATA_FILE_1).should('contain', 'Error')
  })
})
