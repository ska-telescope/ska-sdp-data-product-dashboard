import Constants from '../../src/constants/constants';
context('Select and download data product', () => {

  beforeEach(() => {
    cy.visit(Constants.LOCAL_HOST)
  })

  it('Select data product 1 and download file', () => {
    cy.findByText("1").click()
    cy.findByTestId(Constants.DOWNLOAD_ICON).click()
    cy.readFile('cypress/downloads/' + Constants.TEST_DATA_FILE_1).should('contain', 'Error')
  })

  it('Select data product 2 and download file', () => {
    cy.findByText("2").click()
    cy.findByTestId(Constants.DOWNLOAD_ICON).click()
    cy.readFile('cypress/downloads/' + Constants.TEST_DATA_FILE_1).should('contain', 'Error')
  })
})
