const mockFilesTree = {
  "data": {
    "id": "root",
    "name": "Mocked Data Products",
    "relativefilename": "",
    "type": "directory",
    "children": [
      null
    ]
  },
  "status": 200,
  "statusText": "OK",
  "headers": {
      "content-length": "2516",
      "content-type": "application/json"
  },
  "config": {
      "transitional": {
          "silentJSONParsing": true,
          "forcedJSONParsing": true,
          "clarifyTimeoutError": false
      },
      "transformRequest": [
          null
      ],
      "transformResponse": [
          null
      ],
      "timeout": 0,
      "xsrfCookieName": "XSRF-TOKEN",
      "xsrfHeaderName": "X-XSRF-TOKEN",
      "maxContentLength": -1,
      "maxBodyLength": -1,
      "env": {
          "FormData": null
      },
      "headers": {
          "Accept": "application/json"
      },
      "method": "get",
      "url": "http://localhost:8000/dataproductlist"
  },
  "request": {}
}

export default mockFilesTree;
