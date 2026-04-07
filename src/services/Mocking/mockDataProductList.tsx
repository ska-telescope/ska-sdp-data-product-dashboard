const MockDPL = {
  data: [
    {
      id: '320585fc-26be-43d0-8c38-ce2bf014e09b',
      interface: 'http://schema.skao.int/ska-data-product-meta/0.1',
      execution_block: 'eb-m001-20191031-12345',
      date_created: '2019-10-31',
      dataproduct_file: 'product/eb-m001-20221212-12345',
      metadata_file: 'product/eb-m001-20221212-12345/ska-data-product.yaml'
    },
    {
      id: 'ce7b6f3a-0205-404f-b2ba-f3444a3776ba',
      interface: 'http://schema.skao.int/ska-data-product-meta/0.1',
      execution_block: 'eb-m002-20221212-12345',
      date_created: '2022-12-12',
      dataproduct_file: 'product/eb-m002-20221212-12345',
      metadata_file: 'product/eb-m002-20221212-12345/ska-data-product.yaml'
    }
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '556'
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: null
    },
    headers: {
      Accept: 'application/json'
    },
    method: 'get',
    url: 'http://localhost:8000/dataproductlist'
  },
  request: {}
};

export default MockDPL;
