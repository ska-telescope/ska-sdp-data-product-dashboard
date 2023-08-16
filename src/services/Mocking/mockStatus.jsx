const MockStatus = {
    "data": {
        "API_running": true,
        "Search_enabled": false,
        "Date_modified": "2023-08-15T13:03:51.102605",
        "Version": "Using Local data, mocking status"
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "106",
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
        "url": "http://localhost:8000/status"
    },
    "request": {}
}

export default MockStatus;

