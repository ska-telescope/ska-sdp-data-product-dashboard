Changelog
=========


Current Development
-------------------

* `NAL-1132 <https://jira.skatelescope.org/browse/NAL-1132>`_ 

  - **BREAKING** [Changed] The DPD API have been updated to find data products based on their execution_blocks. The dashboard has been updated to request data related to execution_blocks in requests.

* `NAL-1110 <https://jira.skatelescope.org/browse/NAL-1110>`_ 

  - [Added] Added SDP_DATAPRODUCT_API_ELASTIC_INDICES to environment variables to enable specification of Elasticsearch instances in deployments.

* `NAL-1115 <https://jira.skatelescope.org/browse/NAL-1115>`_ 

  - [Changed] Updated Data Product API Helm chart and the values file to reflect updated environment variables required for PostgreSQL and ElasticSearch.

* `NAL-1093 <https://jira.skatelescope.org/browse/NAL-1093>`_ 

  - **BREAKING** [Changed] This update refactors the data structure used by the DPD API to serve data to the MUI DataGrid component. It now aligns with the structure expected by the MUI DataGrid itself. This brings several improvements:

    - Column Filters and Pagination: You can now leverage built-in MUI DataGrid features like column filters and pagination.
    - Full API Configurability: The table can be fully configured from the API, allowing for more granular control over its behaviors.

* `NAL-1119 <https://jira.skatelescope.org/browse/NAL-1119>`_

  - [Fixed] Removed the .env file from the Git repository and Docker file. To do this we moved all the 
    environment variable declarations out of the .env file into a new file named 
    'expected_env_names'. This is done to prevent confusion when deploying the docker image 
    where environment variables is set by other means, as well as preventing accidental
    commits of secrets to the Git repository.

* `NAL-1105 <https://jira.skatelescope.org/browse/NAL-1105>`_

  - [Changed] Updated documentation to include details for the configuration and use of the required shared persistent volume.

Released
========

v0.8.2
------

* [Fixed] `NAL-1167 <https://jira.skatelescope.org/browse/NAL-1167>`_

  - Removed unneeded nginx default.config mount from chart, resolving issue with IPV6 when deployed with Helm.

v0.8.1
------

* [Fixed] `NAL-1153 <https://jira.skatelescope.org/browse/NAL-1153>`_

  - Added default nginx config to Docker file to resolve issue with IPV6.

v0.8.0
------

* `NAL-1045 <https://jira.skatelescope.org/browse/NAL-1045>`_

  - [Added]  Addition of SKA Login with MS Entra.

* `NAL-1012 <https://jira.skatelescope.org/browse/NAL-1012>`_

  - [Added]  Addition of link to the Data Product Dashboard documentation.

* `NAL-1012 <https://jira.skatelescope.org/browse/NAL-1012>`_

  - [Changed] Updated documentation structure.
  - [Changed] Updated the SKAO GUI components and updated all instances where it is used so that they comply with TS.
  - [Changed] Updated node image in dockerfile and gitlab pipeline.
  - [Removed] Removed OAuth2 Proxy authentication.
  - [Changed] Package dependency updates
  - [Changed] Updated components to adjust to available page size.
  - [Changed] Updated data product table to allow adjustment of column widths.

* `NAL-1012 <https://jira.skatelescope.org/browse/NAL-1012>`_

  - [Fixed] Fixed spelling mistake in PERSISTENT_STORAGE_PATH.

* `NAL-1018 <https://jira.skatelescope.org/browse/NAL-1018>`_

  - [Fixed] Fixed failure to load ivoa translations where the metadata contained capital letters.

v0.7.0
------

* `NAL-416 <https://jira.skatelescope.org/browse/NAL-416>`_ 

  - [Added] Add ability to search with multiple key/value pairs without using an Elasticsearch backend.

* `NAL-897 <https://jira.skatelescope.org/browse/NAL-897>`_

  - [Changed] Updates all the dependencies to the latest possible.

* `NAL-936 <https://jira.skatelescope.org/browse/NAL-936>`_ 

  - [Changed] Updated documentation with Elasticsearch deployment info.

* `NAL-897 <https://jira.skatelescope.org/browse/NAL-897>`_ 

  - [Fixed] Added missing REACT_APP_SKA_LOGIN_APP_URL env variable on the Helm chart of the DPD.

* `NAL-934 <https://jira.skatelescope.org/browse/NAL-934>`_ 

  - [Fixed] The DPD has an optional SKA-Login-Page component that is declaratively enabled/disabled from the values files. This enable condition was omitted in error in the chart, so it had no effect. This MR adds it to the template, and has some updates to the packages and webpack config.

v0.6.2
------

  - [Change] Add indexing status to status endpoint.

* `NAL-858 <https://jira.skatelescope.org/browse/NAL-858>`_

  - [Fixed] Fix for load of new data products failures without a refresh.