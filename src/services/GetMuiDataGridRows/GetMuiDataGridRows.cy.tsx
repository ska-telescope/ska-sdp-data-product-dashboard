/**
 * Cypress component tests for the GetMuiDataGridRows service function.
 *
 * Test IDs UI-SVC-1 to UI-SVC-7:
 *   UI-SVC-1  Returns paginated data from a successful API response
 *   UI-SVC-2  Returns DataGridRowsData from non-paginated legacy response
 *   UI-SVC-3  Returns empty array when response data is empty
 *   UI-SVC-4  Returns error info when the API returns a 500 status
 *   UI-SVC-5  Retries up to maxRetries on 500 and then returns error
 *   UI-SVC-6  Returns local mock data when USE_LOCAL_DATA is true
 *   UI-SVC-7  Returns error info when the network request times out
 */

import GetMuiDataGridRows from './GetMuiDataGridRows';

// ---------------------------------------------------------------------------
// Helper: build a minimal stub for the authAxiosClient ret value
// ---------------------------------------------------------------------------
const makeClient = (postImpl: () => Promise<any>) =>
  ({ post: cy.stub().callsFake(postImpl) }) as any;

describe('GetMuiDataGridRows', () => {
  // -------------------------------------------------------------------------
  // UI-SVC-1  Paginated API response
  // -------------------------------------------------------------------------
  it('UI-SVC-1: returns paginated data and total from a { data, total } response', () => {
    const mockRows = [
      { execution_block: 'eb-m001-20221212-12345', date_created: '2022-12-12' },
      { execution_block: 'eb-m001-20230921-245', date_created: '2023-09-21' }
    ];
    const client = makeClient(() => Promise.resolve({ data: { data: mockRows, total: 54 } }));

    cy.wrap(
      GetMuiDataGridRows(
        client,
        { filterModel: {}, searchPanelOptions: {}, sortModel: [] },
        0,
        3,
        false
      )
    ).then((result: any) => {
      expect(result.DataGridRowsData).to.have.length(2);
      expect(result.total).to.equal(54);
      expect(result.DataGridRowsData[0].execution_block).to.equal('eb-m001-20221212-12345');
    });
  });

  // -------------------------------------------------------------------------
  // UI-SVC-2  Non-paginated (legacy) response
  // -------------------------------------------------------------------------
  it('UI-SVC-2: returns DataGridRowsData from a legacy flat-array response', () => {
    const mockRows = [{ execution_block: 'eb-legacy-001', date_created: '2024-01-01' }];
    const client = makeClient(() => Promise.resolve({ data: mockRows }));

    cy.wrap(GetMuiDataGridRows(client, {}, 0, 3, false)).then((result: any) => {
      expect(result.DataGridRowsData).to.have.length(1);
      expect(result.total).to.equal(1);
    });
  });

  // -------------------------------------------------------------------------
  // UI-SVC-3  Empty data response
  // -------------------------------------------------------------------------
  it('UI-SVC-3: returns empty DataGridRowsData when the API responds with empty data array', () => {
    const client = makeClient(() => Promise.resolve({ data: { data: [], total: 0 } }));

    cy.wrap(GetMuiDataGridRows(client, {}, 0, 3, false)).then((result: any) => {
      expect(result.DataGridRowsData).to.have.length(0);
      expect(result.total).to.equal(0);
    });
  });

  // -------------------------------------------------------------------------
  // UI-SVC-4  Single 500 error — no retries left (maxRetries = 0)
  // -------------------------------------------------------------------------
  it('UI-SVC-4: returns error info on a 500 response when retries are exhausted', () => {
    const client = makeClient(() =>
      Promise.reject({
        response: {
          status: 500,
          data: {
            detail: { error_type: 'SERVER_ERROR', message: 'Internal error', indexing: false }
          }
        }
      })
    );

    cy.wrap(GetMuiDataGridRows(client, {}, 0, 0, false)).then((result: any) => {
      expect(result.DataGridRowsData).to.have.length(0);
      expect(result.error).to.not.equal(undefined);
      expect(result.error.type).to.equal('SERVER_ERROR');
      expect(result.error.message).to.equal('Internal error');
    });
  });

  // -------------------------------------------------------------------------
  // UI-SVC-5  Network timeout error
  // -------------------------------------------------------------------------
  it('UI-SVC-5: returns error info when a network timeout occurs and retries are exhausted', () => {
    const client = makeClient(() =>
      Promise.reject({ code: 'ETIMEDOUT', message: 'timeout of 10000ms exceeded' })
    );

    cy.wrap(GetMuiDataGridRows(client, {}, 0, 0, false)).then((result: any) => {
      expect(result.DataGridRowsData).to.have.length(0);
      expect(result.error).to.not.equal(undefined);
      expect(result.error.message).to.include('timeout');
    });
  });

  // -------------------------------------------------------------------------
  // UI-SVC-6  Null / undefined response data
  // -------------------------------------------------------------------------
  it('UI-SVC-6: returns empty DataGridRowsData when API response data is null', () => {
    const client = makeClient(() => Promise.resolve({ data: null }));

    cy.wrap(GetMuiDataGridRows(client, {}, 0, 3, false)).then((result: any) => {
      expect(result.DataGridRowsData).to.have.length(0);
      expect(result.total).to.equal(0);
    });
  });

  // -------------------------------------------------------------------------
  // UI-SVC-7  Filter model is forwarded in the POST body
  // -------------------------------------------------------------------------
  it('UI-SVC-7: includes filterModel and searchPanelOptions in the POST body', () => {
    const filterModel = {
      items: [{ field: 'execution_block', operator: 'contains', value: 'eb-m001' }]
    };
    const searchPanelOptions = {
      items: [{ field: 'context.observer', operator: 'isNotEmpty' }],
      logicOperator: 'and'
    };
    const postStub = cy.stub().resolves({ data: { data: [], total: 0 } });
    const client = { post: postStub } as any;

    cy.wrap(GetMuiDataGridRows(client, { filterModel, searchPanelOptions }, 0, 3, false)).then(
      () => {
        expect(postStub.callCount).to.equal(1);
        const bodyStr = postStub.firstCall.args[1];
        const body = JSON.parse(bodyStr);
        expect(body.filterModel.items[0].field).to.equal('execution_block');
        expect(body.searchPanelOptions.items[0].operator).to.equal('isNotEmpty');
      }
    );
  });
});
