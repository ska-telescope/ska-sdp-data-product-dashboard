import Constants from '../../src/constants/constants';
import ExampleMetadata from '../data/ExampleMetadata.json';
context('Select and download data product', () => {

  beforeEach(() => {
    cy.visit(Constants.LOCAL_HOST)
    cy.intercept('GET', 'http://localhost:8000/status', {"API_running":true,"Search_enabled":false})
    cy.intercept('GET', 'http://localhost:8000/dataproductlist', [{"id": 1, "execution_block": "eb-test-20200325-00001", "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "date_created": "2020-03-25", "dataproduct_file": "product/eb-test-20200325-00001", "metadata_file": "product/eb-test-20200325-00001/ska-data-product.yaml"}, {"id": 2, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345", "date_created": "2019-10-31", "dataproduct_file": "product/eb-m001-20221212-12345", "metadata_file": "product/eb-m001-20221212-12345/ska-data-product.yaml"}, {"id": 3, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m003-20191131-12345", "date_created": "2023-04-14", "dataproduct_file": "product/eb-m003-20191131-12345", "metadata_file": "product/eb-m003-20191131-12345/ska-data-product.yaml"}, {"id": 4, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m002-20221212-12345", "date_created": "2022-12-12", "dataproduct_file": "product/eb-m002-20221212-12345", "metadata_file": "product/eb-m002-20221212-12345/ska-data-product.yaml"}, {"id": 5, "execution_block": "eb-test-20230214-07904", "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "date_created": "2023-02-14", "dataproduct_file": "product/eb-test-20230214-07904", "metadata_file": "product/eb-test-20230214-07904/ska-data-product.yaml"}, {"id": 6, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m004-20191031-12345", "date_created": "2019-10-31", "dataproduct_file": "product/eb-m004-20191031-12345", "metadata_file": "product/eb-m004-20191031-12345/ska-data-product.yaml"}])
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


