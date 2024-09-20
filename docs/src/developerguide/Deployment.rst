Deployment Guide
~~~~~~~~~~~~~~~~

The Data Product Dashboard is built for continuous operation within a Kubernetes cluster. It functions as a service that enables access to data products created by various pipelines and saved on a shared persistent volume.


Pre-requisites
==============

- **Metadata File**: 

  To ensure data products appear on the Data Product Dashboard, the folder containing the data product files must include a metadata file. Refer to `ADR-55 <https://confluence.skatelescope.org/display/SWSI/ADR-55+Definition+of+metadata+for+data+management+at+AA0.5>`_ : Definition of metadata for data management at AA0.5 for details on the metadata file format.


- **Shared Persistent Volume**: 

  The Data Product Dashboard needs to access the same persistent volume (PV) where the data products reside. These data products are typically written by pipelines deployed in a different namespace than the Data Product Dashboard. To enable access, you need to configure the persistent volume claim (PVC) correctly to share the PV between the namespaces.

  For more information on configuring shared storage between namespaces in SKAO clusters, refer to the guide: `Guide to Sharing Storage Between Namespaces in SKAO Clusters. <https://developer.skao.int/en/latest/howto/shared-storage.html>`_.

  Once the PVC is configured correctly, you can update the deployment's values file with the appropriate details. The following extract from a values file shows an example configuration for the shared-mnl PVC in the DP cluster (replace shared-mnl with your actual PVC name):


  .. code-block:: yaml

      dataProductPVC:
        name: shared-mnl
        create:
          enabled: false
          size: 5Gi
          storageClassName: nfss1


Helm chart configuration options
================================

This section details the configuration options available when deploying the Data Product Dashboard in Kubernetes using Helm.

**Ingress**:

.. list-table::
    :widths: 20, 20, 60
    :header-rows: 1

    * - Value
      - Default
      - Comment
    * - ``ingress.enabled``
      - ``true``
      - Whether the Ingress should be enabled.
    * - ``ingress.namespaced``
      - ``true``
      - Whether the namespace should be added to the ingress prefix.
    * - ``ingress.hostname``
      - ``true``
      - The domain name where the application will be hosted. Used for MS Entra redirect URI.

**Data product API**:

.. list-table::
    :widths: 20, 20, 60
    :header-rows: 1

    * - Value
      - Default
      - Comment
    * - ``api.enabled``
      - ``true``
      - If the ska-dataproduct-api should be enabled.
    * - ``api.container``
      - ``artefact.skao.int/ska-dataproduct-api``
      - The link to the artefact repository
    * - ``api.version``
      - ``0.8.0``
      - The version of the ska-dataproduct-api to use.
    * - ``api.imagePullPolicy``
      - ``IfNotPresent``
      - The pull policy of the ska-dataproduct-api.
    * - ``api.ingress.path``
      - ``"api"``
      - What the prefix for the ska-dataproduct-api path should be.
    * - ``api.storagePath``
      - ``"/mnt/data/product/"``
      - The path to the data on the PV.
    * - ``api.metadata_file_name``
      - ``ska-data-product.yaml``
      - The name of the data products metadata file that is used to indicate that a folder is a data product.
    * - ``api.elasticsearch.host``
      - ``https://localhost``
      - The ElasticSearch port.
    * - ``api.elasticsearch.port``
      - ``9200``
      - The ElasticSearch host.
    * - ``api.elasticsearch.metadata_schema_file``
      - ``/mnt/src/ska_dataproduct_api/elasticsearch/data_product_metadata_schema.json``
      - The ElasticSearch metadata schema.
    * - ``api.elasticsearch.http_ca``
      - ``None``
      - The ElasticSearch CA certificate, it not used set to None.
    * - ``api.elasticsearch.user``
      - ``elastic``
      - The ElasticSearch user.
    * - ``api.elasticsearch.password``
      - ````
      - The ElasticSearch password.
    * - ``api.elasticsearch.indices``
      - ``ska-dp-dataproduct-localhost-dev-v1``
      - The ElasticSearch indices to be used for the search store, following the convention ska-dp-dataproduct-<Data center>-<namespace>-<version>. For example "ska-dp-dataproduct-sdhp-stfc-integration-v1"
    * - ``api.postgresql.host``
      - ``https://localhost``
      - The PostgreSQL port.
    * - ``api.postgresql.port``
      - ``9200``
      - The PostgreSQL host.
    * - ``api.postgresql.user``
      - ``elastic``
      - The PostgreSQL user.
    * - ``api.postgresql.password``
      - ````
      - The PostgreSQL password.
    * - ``api.stream_chunk_size``
      - ``65536``
      - Data downloaded are streamed in stream_chunk_size chunks.
    * - ``api.resources.requests.cpu``
      - ``500m``
      - The requested minimum CPU usage of the api.
    * - ``api.resources.requests.memory``
      - ``1024Mi``
      - The requested minimum memory usage of the api.
    * - ``api.resources.limits.cpu``
      - ``1000m``
      - The maximum CPU usage of the api.
    * - ``api.resources.limits.memory``
      - ``2048Mi``
      - The maximum memory usage of the api.
   

**Data product Dashboard**:

.. list-table::
    :widths: 20, 20, 60
    :header-rows: 1

    * - Value
      - Default
      - Comment
    * - ``dashboard.enabled``
      - ``true``
      - If the ska-dataproduct-dashboard should be enabled.
    * - ``dashboard.container``
      - ``artefact.skao.int/ska-dataproduct-dashboard``
      - The link to the artefact repository
    * - ``dashboard.version``
      - ``0.9.0``
      - The version of the ska-dataproduct-dashboard to use.
    * - ``dashboard.imagePullPolicy``
      - ``IfNotPresent``
      - The pull policy of the ska-dataproduct-dashboard.
    * - ``dashboard.ingress.path``
      - ``"dashboard"``
      - What the prefix for the ska-dataproduct-dashboard path should be.
    * - ``dashboard.config.allowMockAuth``
      - ``false``
      - Enable mocked authentication.
    * - ``dashboard.vault.useVault``
      - ``true``
      - Enables the deployment to retrieve SPA registration details from the SKAO vault.
    * - ``dashboard.vault.pathToSecretVault``
      - ``kv/data/users/andre_odendaal/ska_login_page``
      - Path to the secrets in the vault.
    * - ``dashboard.vault.client_id``
      - ``abcde``
      - Placeholder env variable for MS Entra application registration client ID.
    * - ``dashboard.vault.tenant_id``
      - ``abcde``
      - Placeholder env variable for MS Entra application registration tenant ID.
    * - ``dashboard.apiRefreshRate``
      - ``10000``
      - The polling rate for new data from the API.      
    * - ``dashboard.resources.requests.cpu``
      - ``500m``
      - The requested minimum CPU usage of the dashboard.
    * - ``dashboard.resources.requests.memory``
      - ``1024Mi``
      - The requested minimum memory usage of the dashboard.
    * - ``dashboard.resources.limits.cpu``
      - ``1000m``
      - The maximum CPU usage of the dashboard.
    * - ``dashboard.resources.limits.memory``
      - ``2048Mi``
      - The maximum memory usage of the dashboard.

**Permissions API**:

.. list-table::
    :widths: 20, 20, 60
    :header-rows: 1

    * - Value
      - Default
      - Comment
    * - ``permissionsApi.enabled``
      - ``false``
      - If the ska-permissions-api should be enabled.
    * - ``permissionsApi.container``
      - ``artefact.skao.int/ska-permissions-api``
      - The link to the artefact repository
    * - ``permissionsApi.version``
      - ``0.1.0``
      - The version of the ska-permissions-api to use.
    * - ``permissionsApi.imagePullPolicy``
      - ``IfNotPresent``
      - The pull policy of the ska-permissions-api.
    * - ``permissionsApi.ingress.path``
      - ``"permissionsApi"``
      - What the prefix for the ska-permissions-api path should be.
    * - ``permissionsApi.vault.useVault``
      - ``true``
      - Enables the deployment to retrieve WEB API registration details from the SKAO vault.
    * - ``permissionsApi.vault.pathToSecretVault``
      - ``kv/data/users/andre_odendaal/skao_mf_remote_module_permissions_api``
      - Path to the secrets in the vault.
    * - ``permissionsApi.vault.client_id``
      - ``abcde``
      - Placeholder env variable for MS Entra application registration client ID.
    * - ``permissionsApi.vault.tenant_id``
      - ``abcde``
      - Placeholder env variable for MS Entra application registration tenant ID.
    * - ``permissionsApi.resources.requests.cpu``
      - ``500m``
      - The requested minimum CPU usage of the api.
    * - ``permissionsApi.resources.requests.memory``
      - ``1024Mi``
      - The requested minimum memory usage of the api.
    * - ``permissionsApi.resources.limits.cpu``
      - ``1000m``
      - The maximum CPU usage of the api.
    * - ``permissionsApi.resources.limits.memory``
      - ``2048Mi``
      - The maximum memory usage of the api.


**Shared persistent volume**:

.. list-table::
    :widths: 20, 20, 60
    :header-rows: 1

    * - Value
      - Default
      - Comment
    * - ``dataProductPVC.name``
      - ``shared-mnl``
      - This is the name of the PVC that is shared between the namespace used by the pipeline that create data products and the namespace where the Data Product Dashboard is deployed.
    * - ``dataProductPVC.create.enabled``
      - ``false``
      - Enable the creation of a PVC when running the application locally or in tests where the shared PCV is not used. 
    * - ``dataProductPVC.create.size``
      - ``false``
      - The size of the requested PVC. 
    * - ``dataProductPVC.create.storageClassName``
      - ``false``
      - The storage class of the requested PVC. 


Deployment from GitLab pipelines
--------------------------------

If configured, the deployment can be done with GitLab pipelines, deploying into pre-configured environments to one of three namespaces (ci-dev, integration or staging)

**Development branches**:

During development, developers can deploy the development branches into the ci-dev namespace from the Gitlab pipeline. Here the installation use the local chart in the repository for deployment:

.. figure:: /_static/img/ci-dev_deployment.png
   :width: 90%

   Deployment from pipeline on dev branch


**Master branch**:

From the master branch, the application can be deployed into the integration or staging namespace of each environment. For these deployments released chart from `CAR <https://artefact.skao.int/>`_ is used.

.. figure:: /_static/img/integration_staging_deployment.png
   :width: 90%

   Deployment from pipeline on master branch


The deployed Data Product Dashboard should then be accessible at: "https://sdhp.stfc.skao.int/$KUBE_NAMESPACE/dashboard/", and the backend should be accessible at: "https://sdhp.stfc.skao.int/$KUBE_NAMESPACE/api/"


