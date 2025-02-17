# Changelog

## Current Development

- [NAL-1341](https://jira.skatelescope.org/browse/NAL-1341)

  - [Changed] Updated AAA components to make use of the latest SKA AAA Gui components form the SKA-Login-Page.
  - [Changed] Removed the SKA Permissions API from the Helm chart. The SKA Permissions API is now installed independently and only added as a URL to the service for use by the DPD API.


- [NAL-1363](https://jira.skatelescope.org/browse/NAL-1363)

  - [Removed] Removed old references to Elasticsearch.
  - [Changed] Updated environment variables in API chart to match all variables in the API.

## v0.12.0

- [NAL-1348](https://jira.skatelescope.org/browse/NAL-1348)

  - [Changed] Updated key value search field to match structure used by MUI Data Grid and DPD API.

- [NAL-1319](https://jira.skatelescope.org/browse/NAL-1319)

  - [Added] View Data Annotations to dashboard

- [NAL-1309](https://jira.skatelescope.org/browse/NAL-1309)

  - [Changed] Made the Elasticsearch query body size configurable from environment variable SKA_DATAPRODUCT_API_ELASTIC_QUERY_BODY_SIZE via the Helm chart.
  - [Changed] Updated documentation.
  - [Changed] Updated deployment values name for the shared PVC.

- [NAL-1275](https://jira.skatelescope.org/browse/NAL-1275)

  - [Changed] Disable download button when data product has not file reference in the metadata.
  - [Changed] Moved the download button to be inline with the data product in the data grid.

- [NAL-1279](https://jira.skatelescope.org/browse/NAL-1279)
  - [Fixed] Resolved issue where the MUI DataGrid row selection did not change the selected rows color.
  - [Changed] Updated changelog to match guidelines in developer portal.
  - [Changed] Updated GUI Components library to ska-gui-components: "^2.0.21".
  - [Changed] Changed the k8s-pre-install-chart make function to only attempt to delete old deployments pvc/shared-mnl when running on the dp cluster.

## v0.11.0

- [NAL-1254](https://jira.skatelescope.org/browse/NAL-1254)
  - [Changed] Changed the unique ID of data products from the execution_block_id to a UUID. This allows sub products of an execution_block to be loaded as a separate data product on the DPD.
  - [Changed] Changed the /dataproductmetadata endpoint to expect a data products UUID instead of a execution_block_id, which is not unique in the case where there are sub products inside a data product.
  - [Changed] Updated the /download endpoint to accept either the execution_block_id or a UUID. The UUID is used to differentiate between sub products inside a data product when downloading from the dashboard. If there are more than one match for data products of an execution_block_id, they will all be downloaded when calling the endpoint with an execution_block_id.

## v0.10.0

- [NAL-1228](https://jira.skatelescope.org/browse/NAL-1228)

  - [Changed] Updated K8S_CHART_PARAMS for Gitlab pipeline deployments.
  - [Fixed] Updated env_config script to load environment variables from an .env when available.

- [NAL-1227](https://jira.skatelescope.org/browse/NAL-1227)
  - **BREAKING** [Changed] The project have now been renamed and moved out of the SDP Gitlab folder. This was done because the Data Product Dashboard is not limited to data products of SDP and it might cause confusion if the name is not more general.
  - [Changed] Update the env_config.sh script to load variables from a .env file that can be used during development.
  - [Fixed] Update the boolean data types of env variables in the project.

## v0.9.0

- [NAL-1157](https://jira.skatelescope.org/browse/NAL-1157)

  - [Changed] Updated reload behaviour to reload data products on the dashboard as they are added in the database by the API.

- [NAL-1146](https://jira.skatelescope.org/browse/NAL-1146)

  - **BREAKING** [Changed] Added the users access token to the request for data product metadata form the filterdataproducts endpoint of the DPD API.
  - [Changed] Updated the environment variable names for Elasticsearch in the API Chart.
  - [Added] Changed the default deployment of the SKA Permission API to true.

- [NAL-1145](https://jira.skatelescope.org/browse/NAL-1145)

  - **BREAKING** [Changed] Updated charts and pipeline to include env variables required for integration with PostgreSQL and ElasticSearch instances in the cluster.

- [NAL-1132](https://jira.skatelescope.org/browse/NAL-1132)

  - **BREAKING** [Changed] The DPD API have been updated to find data products based on their execution_blocks. The dashboard has been updated to request data related to execution_blocks in requests.

- [NAL-1110](https://jira.skatelescope.org/browse/NAL-1110)

  - [Added] Added SDP_DATAPRODUCT_API_ELASTIC_INDICES to environment variables to enable specification of Elasticsearch instances in deployments.

- [NAL-1115](https://jira.skatelescope.org/browse/NAL-1115)

  - [Changed] Updated Data Product API Helm chart and the values file to reflect updated environment variables required for PostgreSQL and ElasticSearch.

- [NAL-1093](https://jira.skatelescope.org/browse/NAL-1093)

  - **BREAKING** [Changed] This update refactors the data structure used by the DPD API to serve data to the MUI DataGrid component. It now aligns with the structure expected by the MUI DataGrid itself. This brings several improvements:
  - Column Filters and Pagination: You can now leverage built-in MUI DataGrid features like column filters and pagination.
  - Full API Configurability: The table can be fully configured from the API, allowing for more granular control over its behaviors.

- [NAL-1119](https://jira.skatelescope.org/browse/NAL-1119)

  - [Fixed] Removed the .env file from the Git repository and Docker file. To do this we moved all the
    environment variable declarations out of the .env file into a new file named
    'expected_env_names'. This is done to prevent confusion when deploying the docker image
    where environment variables is set by other means, as well as preventing accidental
    commits of secrets to the Git repository.

- [NAL-1105](https://jira.skatelescope.org/browse/NAL-1105)
  - [Changed] Updated documentation to include details for the configuration and use of the required shared persistent volume.

## v0.8.2

- [Fixed] [NAL-1167](https://jira.skatelescope.org/browse/NAL-1167)
  - Removed unneeded nginx default.config mount from chart, resolving issue with IPV6 when deployed with Helm.

## v0.8.1

- [Fixed] [NAL-1153](https://jira.skatelescope.org/browse/NAL-1153)
  - Added default nginx config to Docker file to resolve issue with IPV6.

## v0.8.0

- [NAL-1045](https://jira.skatelescope.org/browse/NAL-1045)

  - [Added] Addition of SKA Login with MS Entra.

- [NAL-1012](https://jira.skatelescope.org/browse/NAL-1012)

  - [Added] Addition of link to the Data Product Dashboard documentation.

- [NAL-1012](https://jira.skatelescope.org/browse/NAL-1012)

  - [Changed] Updated documentation structure.
  - [Changed] Updated the SKAO GUI components and updated all instances where it is used so that they comply with TS.
  - [Changed] Updated node image in dockerfile and gitlab pipeline.
  - [Removed] Removed OAuth2 Proxy authentication.
  - [Changed] Package dependency updates
  - [Changed] Updated components to adjust to available page size.
  - [Changed] Updated data product table to allow adjustment of column widths.

- [NAL-1012](https://jira.skatelescope.org/browse/NAL-1012)

  - [Fixed] Fixed spelling mistake in PERSISTENT_STORAGE_PATH.

- [NAL-1018](https://jira.skatelescope.org/browse/NAL-1018)
  - [Fixed] Fixed failure to load ivoa translations where the metadata contained capital letters.

## v0.7.0

- [NAL-416](https://jira.skatelescope.org/browse/NAL-416)

  - [Added] Add ability to search with multiple key/value pairs without using an Elasticsearch backend.

- [NAL-897](https://jira.skatelescope.org/browse/NAL-897)

  - [Changed] Updates all the dependencies to the latest possible.

- [NAL-936](https://jira.skatelescope.org/browse/NAL-936)

  - [Changed] Updated documentation with Elasticsearch deployment info.

- [NAL-897](https://jira.skatelescope.org/browse/NAL-897)

  - [Fixed] Added missing REACT_APP_SKA_LOGIN_APP_URL env variable on the Helm chart of the DPD.

- [NAL-934](https://jira.skatelescope.org/browse/NAL-934)
  - [Fixed] The DPD has an optional SKA-Login-Page component that is declaratively enabled/disabled from the values files. This enable condition was omitted in error in the chart, so it had no effect. This MR adds it to the template, and has some updates to the packages and webpack config.

## v0.6.2

- [Change] Add indexing status to status endpoint.

- [NAL-858](https://jira.skatelescope.org/browse/NAL-858)
  - [Fixed] Fix for load of new data products failures without a refresh.
