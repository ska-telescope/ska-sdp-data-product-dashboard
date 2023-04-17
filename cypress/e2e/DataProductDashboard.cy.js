import Constants from '../../src/constants/constants';
import ExampleMetadata from '../data/ExampleMetadata.json';
import ExampleDataProductList from '../data/ExampleDataProductList.json';
import ExampleDataProductStatus from '../data/ExampleDataProductStatus.json';
context('Select and download data product', () => {

  beforeEach(() => {
    cy.visit(Constants.LOCAL_HOST)
    cy.intercept('GET', 'http://localhost:8000/status', ExampleDataProductStatus)
    cy.intercept('GET', 'http://localhost:8000/dataproductlist', ExampleDataProductList)
    cy.intercept('POST', 'http://localhost:8000/dataproductmetadata', {
      statusCode: 200,
      body: ExampleMetadata,
      headers: {
        'content-disposition': 'attachment; filename="TestDataFile1.txt"',
        'content-type': 'application/json'
      }
    })
    cy.intercept('POST', 'http://localhost:8000/download', {
      statusCode: 200,
      body: 'This is test file 1',
      headers: {
        'content-disposition': 'attachment; filename="TestDataFile1.txt"',
        'content-type': 'application/json'
      }
    })
  })

  it('Select data product 1 and download file', () => {
    cy.findByText("1").click()
    cy.findByTestId(Constants.DOWNLOAD_ICON).click()
    cy.readFile('cypress/data/' + Constants.TEST_DATA_FILE_1).should('contain', 'This is test file 1')
  })

  it('Select data product 2 and download file', () => {
    cy.findByText("2").click()
    cy.findByTestId(Constants.DOWNLOAD_ICON).click()
    cy.readFile('cypress/data/' + Constants.TEST_DATA_FILE_1).should('contain', 'This is test file 1')
  })
})


