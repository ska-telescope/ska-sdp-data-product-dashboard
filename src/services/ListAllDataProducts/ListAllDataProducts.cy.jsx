import ListAllDataProducts from './ListAllDataProducts';
import mockFilesTree from '../Mocking/mockFilesTree';


describe('dataproduct_api_DataProductList LIVE passing', () => {
  it('Passes', () => {
    const staticResponse = { data: mockFilesTree };
    cy.intercept('/dataproductlist', staticResponse)
    const fileList = ListAllDataProducts();
    expect(fileList.data).equal(mockFilesTree);
  });
});

describe('dataproduct_api_DataProductList LIVE failing', () => {
  it('Fails', () => {
    // axios.get.mockRejectedValueOnce(new Error('Network Error'));
    cy.intercept('/dataproductlist', new Error('Network Error'))
    const fileList = ListAllDataProducts();
    expect(fileList).equal('error.API_UNKNOWN_ERROR');
  });
});
