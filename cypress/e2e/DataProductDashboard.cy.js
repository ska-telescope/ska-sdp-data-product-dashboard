context('Select and download data product', () => {

  const TEST_DATA_FILE_1 = "TestDataFile1.txt";
  const DOWNLOAD_ICON = "DownloadIcon";
  const LOCAL_HOST = "http://localhost:8100/";

  beforeEach(() => {
    cy.visit(LOCAL_HOST)
  })

  it('Select data product 1 and download file', () => {
    cy.findByText("1").click()
    cy.findByTestId(DOWNLOAD_ICON).click()
    cy.readFile('cypress/downloads/' + TEST_DATA_FILE_1).should('contain', 'Error')
  })

  it('Select data product 2 and download file', () => {
    cy.findByText("2").click()
    cy.findByTestId(DOWNLOAD_ICON).click()
    cy.readFile('cypress/downloads/' + TEST_DATA_FILE_1).should('contain', 'Error')
  })
})
