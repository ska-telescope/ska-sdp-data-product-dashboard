import Constants from '../../src/constants/constants';
import ExampleMetadata from '../data/ExampleMetadata.json';
import ExampleDataProductList from '../data/ExampleDataProductList.json';
import ExampleDataProductStatus from '../data/ExampleDataProductStatus.json';
import ExampleDataProductStatusUnavailable from '../data/ExampleDataProductStatusAPIUnavailable.json';
import ExampleDataProductStatusAvailableWithSearch from '../data/ExampleDataProductStatusAvailableWithSearch.json';
context('Select and download data product', () => {

  function testDownloadProducts() {
    it("Select data product 1 and download file", () => {
      cy.findByTitle("1").click();
      cy.findByTestId(Constants.DOWNLOAD_ICON).click();
      cy.readFile("cypress/data/" + Constants.TEST_DATA_FILE_1).should("contain", "This is test file 1");
    });

    it("Select data product 2 and download file", () => {
      cy.findByTitle("2").click();
      cy.findByTestId(Constants.DOWNLOAD_ICON).click();
      cy.readFile("cypress/data/" + Constants.TEST_DATA_FILE_1).should("contain", "This is test file 1");
    });
  }

  function setUpForTests() {
    cy.intercept("GET", "http://localhost:8000/dataproductlist", ExampleDataProductList);
    cy.intercept("POST", "http://localhost:8000/dataproductmetadata", {
      statusCode: 200,
      body: ExampleMetadata,
      headers: {
        "content-disposition": "attachment; filename=\"TestDataFile1.txt\"",
        "content-type": "application/json"
      }
    });
    cy.intercept("POST", "http://localhost:8000/download", {
      statusCode: 200,
      body: "This is test file 1",
      headers: {
        "content-disposition": "attachment; filename=\"TestDataFile1.txt\"",
        "content-type": "application/json"
      }
    });
  }

  describe('data product service is available', () => {
    beforeEach(() => {
      cy.visit(Constants.LOCAL_HOST)
      cy.intercept('GET', 'http://localhost:8000/status', ExampleDataProductStatus)
      setUpForTests();
    })
    testDownloadProducts();
  })

  describe('data product service is unavailable', () => {
    beforeEach(() => {
      cy.visit(Constants.LOCAL_HOST)
      cy.intercept('GET', 'http://localhost:8000/status', ExampleDataProductStatusUnavailable)
    })

    it('Verify SDP Data API not available alert is displayed', () => {
      cy.findByText("SDP Data API not available").should("be.visible")
    })
  })

  describe('data product service is available with search functionality', () => {
    beforeEach(() => {
      cy.visit(Constants.LOCAL_HOST)
      cy.intercept('GET', 'http://localhost:8000/status', ExampleDataProductStatusAvailableWithSearch)
      setUpForTests();
    })

    testDownloadProducts();

    it('Search for data product', () => {
      cy.findByText("Filter data products based on metadata:").should("be.visible")
      cy.findByTestId("SearchIcon").click()
    })

    it('Data products can be indexed', () => {
      cy.findByTestId("RefreshIcon").click()
    })

    it('Data products can be reloaded', () => {
      cy.findByTestId("CachedIcon").click()
    })

    it('Verify external link to skao site', () => {
      cy.findByLabelText("skaWebsite").click()
    })

    it('Verify light/dark mode is available', () => {
      cy.findByTestId("Brightness7Icon").click()
    })
  })
})

