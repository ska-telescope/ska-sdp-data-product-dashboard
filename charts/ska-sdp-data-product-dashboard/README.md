# SDP Data Product Dashboard Helm Chart

This helm chart can spin up all requirments for the SDP Data Product Dashboard.

This can include the following:
* SDP Data Product API
* SDP Data Product Dashboard

## Values

| Value                                                          | Type      | Required   | Default                      | Comment                                            |
| -------------------------------------------------------------- | --------- | ---------- | --------------               | -------------------------------------------------- |
| ska_sdp_data_product_dashboard.api.enabled                     | boolean   | Yes        | True                         | Should the API be created                          |
| ska_sdp_data_product_dashboard.api.container                   | string    | Yes        | link                         | The Docker image for the API                       |
| ska_sdp_data_product_dashboard.api.version                     | string    | Yes        | latest                       | The version of the Docker image to use             |
| ska_sdp_data_product_dashboard.api.imagePullPolicy             | string    | Yes        | IfNotPresent                 | When should the image be pulled                    |
| ska_sdp_data_product_dashboard.api.hostUrl                     | string    | Yes        | "https://sdhp.stfc.skao.int" | Url the DP cluster                                 |
| ska_sdp_data_product_dashboard.api.hostPort                    | string    | Yes        | "8100"                       | When should the image be pulled                    |
| ska_sdp_data_product_dashboard.api.storagePath                 | string    | Yes        | "/var/log"                   | When should the image be pulled                    |
| ska_sdp_data_product_dashboard.dashboard.enabled               | boolean   | Yes        | True                         | Should the dashboard be created                    |
| ska_sdp_data_product_dashboard.dashboard.container             | string    | Yes        | link                         | The Docker image for the dashboard                 |
| ska_sdp_data_product_dashboard.dashboard.version               | string    | Yes        | latest                       | The version of the Docker image to use             |
| ska_sdp_data_product_dashboard.dashboard.imagePullPolicy       | string    | Yes        | IfNotPresent                 | When should the image be pulled                    |
| ska_sdp_data_product_dashboard.dashboard.hostUrl               | string    | Yes        | "http://localhost:8002"      | Host URL for example "https://sdhp.stfc.skao.int/dp-naledi-andre/data_product/dashboard" |
| ska_sdp_data_product_dashboard.dashboard.apiUrl                | string    | Yes        | "http://localhost:8002"      | Dashboard URL for example "https://sdhp.stfc.skao.int/dp-naledi-andre/data_product/api" |
| ska_sdp_data_product_dashboard.dashboard.dummyData             | boolean   | Yes        | False                        | Flag to use dummy data rather then the API         |


## Usage

Please see the project documentation for usage instructions https://developer.skao.int/projects/ska-sdp-data-product-dashboard/en/latest/overview.html