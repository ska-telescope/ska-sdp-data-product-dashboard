# Data Product Dashboard Helm Chart

This helm chart can spin up all requirments for the Data Product Dashboard.

This can include the following:

- Data Product API
- Data Product Dashboard

## Values

| Value                                                     | Type      | Required   | Default                   | Comment                                            |
| --------------------------------------------------------- | --------- | ---------- | --------------            | -------------------------------------------------- |
| ska_sdp_dataproduct_dashboard.urls.override              | boolean   | Yes        | False                     | Used to override the URL's generated in the _helpers.tpl file that uses the deployed namespaces |
| ska_sdp_dataproduct_dashboard.urls.dashboardurl          | string    | Yes        | "http://localhost"        | Dashboard URL if the override value is true        |
| ska_sdp_dataproduct_dashboard.urls.apiUrl                | string    | Yes        | "http://localhost:8000"   | API URLif the override value is true               |
| ska_sdp_dataproduct_dashboard.api.enabled                | boolean   | Yes        | True                      | Should the API be created                          |
| ska_sdp_dataproduct_dashboard.api.container              | string    | Yes        | link                      | The Docker image for the API                       |
| ska_sdp_dataproduct_dashboard.api.version                | string    | Yes        | latest                    | The version of the Docker image to use             |
| ska_sdp_dataproduct_dashboard.api.imagePullPolicy        | string    | Yes        | IfNotPresent              | When should the image be pulled                    |
| ska_sdp_dataproduct_dashboard.api.storagePath            | string    | Yes        | "/var/log"                | When should the image be pulled                    |
| ska_sdp_dataproduct_dashboard.dashboard.enabled          | boolean   | Yes        | True                      | Should the dashboard be created                    |
| ska_sdp_dataproduct_dashboard.dashboard.container        | string    | Yes        | link                      | The Docker image for the dashboard                 |
| ska_sdp_dataproduct_dashboard.dashboard.version          | string    | Yes        | latest                    | The version of the Docker image to use             |
| ska_sdp_dataproduct_dashboard.dashboard.imagePullPolicy  | string    | Yes        | IfNotPresent              | When should the image be pulled                    |


## Usage

Please see the project documentation for usage instructions https://developer.skao.int/projects/ska-sdp-dataproduct-dashboard/en/latest/overview.html
