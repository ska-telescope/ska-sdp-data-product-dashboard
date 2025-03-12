import ExampleMetadata from '../data/ExampleMetadata.json';
import ExampleDataProductList from '../data/ExampleDataProductList.json';
import ExampleDataProductStatus from '../data/ExampleDataProductStatus.json';
import ExampleDataProductStatusUnavailable from '../data/ExampleDataProductStatusAPIUnavailable.json';
import ExampleDataProductStatusAvailableWithSearch from '../data/ExampleDataProductStatusAvailableWithSearch.json';

// Cloned FROM the constants file in the src directory. Linking to that directly is bad practice.
const LOCAL_HOST = "http://localhost:8100/";

context('Select and download data product', () => {

  function setUpForTests() {
    Cypress.env('REACT_APP_USE_LOCAL_DATA', false);
    cy.intercept('POST', "http://localhost:8000/filterdataproducts", ExampleDataProductList);
    cy.intercept('GET', 'http://localhost:8000/status', ExampleDataProductStatus)
    cy.intercept('POST', "http://localhost:8000/dataproductmetadata", {
      statusCode: 200,
      body: ExampleMetadata,
      headers: {
        "content-disposition": "attachment; filename=\"TestDataFile1.txt\"",
        "content-type": "application/json"
      }
    });
    cy.intercept('POST', "http://localhost:8000/download", {
      statusCode: 200,
      body: "This is test file 1",
      headers: {
        "content-disposition": "attachment; filename=\"TestDataFile1.txt\"",
        "content-type": "application/json"
      }
    });
  }


  describe('data product service is unavailable', () => {
    beforeEach(() => {
      setUpForTests();
      cy.intercept('POST', "http://localhost:8000/filterdataproducts", {});
      cy.intercept('GET', 'http://localhost:8000/status', ExampleDataProductStatusUnavailable)
      cy.visit(LOCAL_HOST)
    })

    it('Verify Data API not available alert is displayed', () => {
      cy.findByTestId("apiAvailability").contains("Data product API unreachable").should("be.visible");
    })
  })

  describe('data product service is available with search functionality', () => {
    beforeEach(() => {
      setUpForTests();
      cy.intercept('GET', 'http://localhost:8000/status', ExampleDataProductStatusAvailableWithSearch)
      cy.visit(LOCAL_HOST)
    })

    it('Search for data product', () => {
      cy.findByTestId("metaDataDescription").contains("Filter data products based on metadata:").should("be.visible");
      cy.findByTestId("SearchIcon").click()
    })

    it('Data products can be indexed', () => {
      cy.findByTestId("RefreshIcon").click()
    })

    it('Data products can be reloaded', () => {
      cy.findByTestId("CachedIcon").invoke('css', 'pointer-events', 'auto')
      cy.findByTestId("CachedIcon").invoke('prop', 'disabled', false)
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

