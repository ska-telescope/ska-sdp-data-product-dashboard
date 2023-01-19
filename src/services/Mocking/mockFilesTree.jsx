const mockFilesTree = {
  "data": {
      "id": "root",
      "name": "Mocked Data Products",
      "relativefilename": "",
      "type": "directory",
      "children": [
          {
              "id": 0,
              "name": "pb_id_2",
              "metadatafile": "tests/test_files/product/eb_id_2/ska-sub-system/scan_id_2/pb_id_2/ska-data-product.yaml",
              "relativefilename": "product/eb_id_2/ska-sub-system/scan_id_2/pb_id_2",
              "type": "directory",
              "children": [
                  {
                      "id": 1,
                      "name": "ska-data-product.yaml",
                      "metadatafile": "tests/test_files/product/eb_id_2/ska-sub-system/scan_id_2/pb_id_2/ska-data-product.yaml",
                      "relativefilename": "product/eb_id_2/ska-sub-system/scan_id_2/pb_id_2/ska-data-product.yaml",
                      "type": "file"
                  },
                  {
                      "id": 2,
                      "name": "TestDataFile4.txt",
                      "metadatafile": "tests/test_files/product/eb_id_2/ska-sub-system/scan_id_2/pb_id_2/ska-data-product.yaml",
                      "relativefilename": "product/eb_id_2/ska-sub-system/scan_id_2/pb_id_2/TestDataFile4.txt",
                      "type": "file"
                  },
                  {
                      "id": 3,
                      "name": "TestDataFile6.txt",
                      "metadatafile": "tests/test_files/product/eb_id_2/ska-sub-system/scan_id_2/pb_id_2/ska-data-product.yaml",
                      "relativefilename": "product/eb_id_2/ska-sub-system/scan_id_2/pb_id_2/TestDataFile6.txt",
                      "type": "file"
                  },
                  {
                      "id": 4,
                      "name": "TestDataFile5.txt",
                      "metadatafile": "tests/test_files/product/eb_id_2/ska-sub-system/scan_id_2/pb_id_2/ska-data-product.yaml",
                      "relativefilename": "product/eb_id_2/ska-sub-system/scan_id_2/pb_id_2/TestDataFile5.txt",
                      "type": "file"
                  }
              ]
          },
          {
              "id": 5,
              "name": "pb_id_1",
              "metadatafile": "tests/test_files/product/eb_id_1/ska-sub-system/scan_id_1/pb_id_1/ska-data-product.yaml",
              "relativefilename": "product/eb_id_1/ska-sub-system/scan_id_1/pb_id_1",
              "type": "directory",
              "children": [
                  {
                      "id": 6,
                      "name": "TestDataFile2.txt",
                      "metadatafile": "tests/test_files/product/eb_id_1/ska-sub-system/scan_id_1/pb_id_1/ska-data-product.yaml",
                      "relativefilename": "product/eb_id_1/ska-sub-system/scan_id_1/pb_id_1/TestDataFile2.txt",
                      "type": "file"
                  },
                  {
                      "id": 7,
                      "name": "TestDataFile3.txt",
                      "metadatafile": "tests/test_files/product/eb_id_1/ska-sub-system/scan_id_1/pb_id_1/ska-data-product.yaml",
                      "relativefilename": "product/eb_id_1/ska-sub-system/scan_id_1/pb_id_1/TestDataFile3.txt",
                      "type": "file"
                  },
                  {
                      "id": 8,
                      "name": "ska-data-product.yaml",
                      "metadatafile": "tests/test_files/product/eb_id_1/ska-sub-system/scan_id_1/pb_id_1/ska-data-product.yaml",
                      "relativefilename": "product/eb_id_1/ska-sub-system/scan_id_1/pb_id_1/ska-data-product.yaml",
                      "type": "file"
                  },
                  {
                      "id": 9,
                      "name": "TestDataFile1.txt",
                      "metadatafile": "tests/test_files/product/eb_id_1/ska-sub-system/scan_id_1/pb_id_1/ska-data-product.yaml",
                      "relativefilename": "product/eb_id_1/ska-sub-system/scan_id_1/pb_id_1/TestDataFile1.txt",
                      "type": "file"
                  }
              ]
          }
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
