import ExampleMetadata from '../data/ExampleMetadata.json';
import ExampleDataProductList from '../data/ExampleDataProductList.json';
import ExampleDataProductStatus from '../data/ExampleDataProductStatus.json';
import ExampleDataProductStatusUnavailable from '../data/ExampleDataProductStatusAPIUnavailable.json';
import ExampleDataProductStatusAvailableWithSearch from '../data/ExampleDataProductStatusAvailableWithSearch.json';
import ExampleHumanReadable from '../data/ExampleHumanReadable.json';

// Cloned FROM the constants file in the src directory. Linking to that directly is bad practice.
const LOCAL_HOST = "http://localhost:8100/";
const API_URL = "http://localhost:8001";

context('Select and download data product', () => {

  function setUpForTests() {
    Cypress.env('REACT_APP_USE_LOCAL_DATA', false);
    cy.intercept('GET', `${API_URL}/status`, ExampleDataProductStatus);
    cy.intercept('GET', `${API_URL}/en/humanreadable`, ExampleHumanReadable);
    const STRING_OPERATORS = [
      { value: 'contains' },
      { value: 'equals' },
      { value: 'startsWith' },
      { value: 'endsWith' },
      { value: 'isEmpty', requiresFilterValue: false },
      { value: 'isNotEmpty', requiresFilterValue: false },
      { value: 'isAnyOf' }
    ];
    const DATE_OPERATORS = [
      { value: 'is' },
      { value: 'not' },
      { value: 'after' },
      { value: 'onOrAfter' },
      { value: 'before' },
      { value: 'onOrBefore' },
      { value: 'isEmpty', requiresFilterValue: false },
      { value: 'isNotEmpty', requiresFilterValue: false }
    ];
    const NUMBER_OPERATORS = [
      { value: '=' },
      { value: '!=' },
      { value: '>' },
      { value: '>=' },
      { value: '<' },
      { value: '<=' },
      { value: 'isEmpty', requiresFilterValue: false },
      { value: 'isNotEmpty', requiresFilterValue: false }
    ];
    cy.intercept('GET', `${API_URL}/muidatagridconfig`, {
      columns: [
        {
          field: 'execution_block',
          headerName: 'Execution Block',
          width: 250,
          hide: false,
          type: 'string',
          filterable: true,
          filterOperators: STRING_OPERATORS
        },
        {
          field: 'date_created',
          headerName: 'Date Created',
          width: 150,
          hide: false,
          type: 'date',
          filterable: true,
          filterOperators: DATE_OPERATORS
        },
        {
          field: 'size',
          headerName: 'File Size',
          width: 80,
          hide: false,
          type: 'number',
          filterable: true,
          filterOperators: NUMBER_OPERATORS
        }
      ]
    });
    cy.intercept('POST', `${API_URL}/filterdataproducts`, ExampleDataProductList);
    cy.intercept('POST', `${API_URL}/dataproductmetadata`, {
      statusCode: 200,
      body: ExampleMetadata,
      headers: {
        "content-disposition": "attachment; filename=\"TestDataFile1.txt\"",
        "content-type": "application/json"
      }
    });
    cy.intercept('POST', `${API_URL}/download`, {
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
      cy.intercept('POST', `${API_URL}/filterdataproducts`, {});
      cy.intercept('GET', `${API_URL}/status`, ExampleDataProductStatusUnavailable)
      cy.visit(LOCAL_HOST)
    })

    it('Verify Data API not available alert is displayed', () => {
      cy.findByTestId("apiAvailability").contains("Data product API unreachable").should("be.visible");
    })
  })

  describe('url parameters are set', () => {
    beforeEach(() => {
      setUpForTests();
      cy.intercept('GET', `${API_URL}/muidatagridconfig`).as('gridConfig');
      cy.visit(LOCAL_HOST + '?execution_block=eb-test-20260101-1234');
      cy.wait('@gridConfig');
    })
    it('Verify form is filled correct', () => {
      cy.get('[data-testid="search-option-0"]')
        .should('be.visible');
      cy.get('[data-testid="search-bar"]')
        .click();
      cy.get('[data-testid="key-field"]')
        .should('be.visible');
      cy.get('[data-testid="operator-select"]')
        .should('be.visible');
      cy.get('[data-testid="value-field"]')
        .should('be.visible');
    })

    it('dedicated start/end date pickers are removed from the panel', () => {
      cy.get('[data-testid="DateEntryStartdate"]').should('not.exist');
      cy.get('[data-testid="DateEntryEndDate"]').should('not.exist');
    })
  })

  describe('legacy start_date / end_date URL parameters', () => {
    beforeEach(() => {
      setUpForTests();
      cy.intercept('GET', `${API_URL}/muidatagridconfig`).as('gridConfig');
      cy.visit(LOCAL_HOST + '?start_date=2024-01-01&end_date=2024-06-01');
      cy.wait('@gridConfig');
    })

    it('start_date maps to a date_created and onOrAfter', () => {
      cy.get('[data-testid="search-option-0"]')
        .find('span')
        .should('contain.text', 'Date Created  onOrAfter  2024-01-01');
    })

    it('end_date maps to a date_created before row', () => {
      cy.get('[data-testid="search-option-1"]')
        .find('span')
        .should('contain.text', 'Date Created  before  2024-06-01');
    })
  })

  describe('operator selection in search panel', () => {
    beforeEach(() => {
      setUpForTests();
      cy.intercept('GET', `${API_URL}/muidatagridconfig`).as('gridConfig');
      cy.visit(LOCAL_HOST);
      cy.wait('@gridConfig');
    })

    it('operator dropdown appears after selecting a field and reflects column type', () => {
      // Select 'Execution Block' (string type)
      cy.get('[data-testid="search-bar"]')
        .click();
      cy.get('[data-testid="key-field"]').find('input').type('Execution Block', { force: true });
      cy.get('[role="option"]').contains('Execution Block').click();
      cy.get('[data-testid="operator-select"]').should('be.visible');
      // 'contains' is the first string operator — check via the hidden native input
      cy.get('[data-testid="operator-select"]').find('input').should('have.value', 'contains');
      // Change operator to 'equals'
      cy.get('[data-testid="operator-select"]').click();
      cy.get('[role="option"]').contains('equals').click();
      cy.get('[data-testid="operator-select"]').find('input').should('have.value', 'equals');
    })

    it('date-picker renders when selected column has type date', () => {
      cy.get('[data-testid="search-bar"]')
        .click();
      cy.get('[data-testid="key-field"]').find('input').type('Date', { force: true });
      cy.get('[role="option"]').contains('Date Created').click();
      // value input should be a DateEntry (contains an input with type date or text used by DateEntry)
      cy.get('[data-testid="dateEntry-value"]').should('exist');
    })

    it('value input is hidden for isEmpty operator', () => {
      cy.get('[data-testid="search-bar"]')
        .click();
      cy.get('[data-testid="key-field"]').find('input').type('Execution Block', { force: true });
      cy.get('[role="option"]').contains('Execution Block').click();
      cy.get('[data-testid="operator-select"]').click();
      cy.get('[role="option"]').contains('isEmpty').click();
      // The value input Grid item should not be present
      cy.get('[data-testid="value-field"]').should('not.exist');
    })
  })

  describe('data product service is available with search functionality', () => {
    beforeEach(() => {
      setUpForTests();
      cy.intercept('GET', `${API_URL}/status`, ExampleDataProductStatusAvailableWithSearch)
      cy.visit(LOCAL_HOST);
    })

    it('Search for data product', () => {
      cy.get('[data-testid="search-bar"]')
        .click();
      cy.get('[data-testid="key-field"]').find('input').type('Execution Block', { force: true });
      cy.get('[role="option"]').contains('Execution Block').click();
      cy.get('[data-testid="operator-select"]').click();
      cy.get('[role="option"]').contains('isEmpty').click();
      cy.get('[data-testid="AddKeyValuePairButton"]')
        .click();
    })

    it('Data products can be indexed', () => {
      cy.findByTestId("RefreshIcon").click();
    })

    it('Data products can be reloaded', () => {
      cy.findByTestId("CachedIcon").invoke('css', 'pointer-events', 'auto');
      cy.findByTestId("CachedIcon").invoke('prop', 'disabled', false);
      cy.findByTestId("CachedIcon").click();
    })

    it('Verify external link to skao site', () => {
      cy.findByLabelText("skaWebsite").click();
    })

    it('Verify light/dark mode is available', () => {
      cy.findByTestId("Brightness7Icon").click();
    })
  })
})

