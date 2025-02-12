import { AxiosResponse } from 'axios';

const MockDataAnnotations: AxiosResponse = {
  data: [
    {
      data_product_uuid: '1',
      annotation_text:
        'test annotation text \n\n' +
        'hello world! 🌍 😀' +
        'Special Characters: !@#$%^&*()_+-=[]{};\':",./<>?|~ ' +
        '¡¢£¥€§¤®©™¶°ªº»«–—´‘’“”äöüßÄÖÜẞ' +
        'éèêëàâäîïôûùüÿæœçÇñÑ' +
        'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ',
      user_principal_name: 'test@skao.int',
      timestamp_created: '2024-12-24T12:00:00',
      timestamp_modified: '2024-12-24T12:00:00',
      annotation_id: 1
    },
    {
      data_product_uuid: '2',
      annotation_text: 'test annotation text',
      user_principal_name: 'test@skao.int',
      timestamp_created: '2024-12-24T12:23:00',
      timestamp_modified: '2024-12-24T12:23:00',
      annotation_id: 2
    },
    {
      data_product_uuid: '1',
      annotation_text: 'test annotation text',
      user_principal_name: 'test@skao.int',
      timestamp_created: '2024-12-24T12:40:00',
      timestamp_modified: '2024-12-24T12:40:00',
      annotation_id: 3
    },
    {
      data_product_uuid: '1',
      annotation_text: 'test annotation text',
      user_principal_name: 'test@skao.int',
      timestamp_created: '2024-12-24T12:40:00',
      timestamp_modified: '2024-12-24T12:40:00',
      annotation_id: 4
    }
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '2367',
    'content-type': 'application/json'
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer 123qwe.123qwe.123qwe-123qwe-123qwe-123qwe-123qwe'
    },
    baseURL: 'http://localhost:8001',
    method: 'get',
    url: '/annotations/603e0a65-4645-7d10-1c2e-79f00555369f'
  },
  request: {}
};

export default MockDataAnnotations;
