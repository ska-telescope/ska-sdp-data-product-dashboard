Deployment Guide
~~~~~~~~~~~~~~~~

The Data Product Dashboard is built for continuous operation within a Kubernetes cluster.
It functions as a service that enables access to data products created by various pipelines and saved on a shared persistent volume.


Pre-requisites
==============

- **Metadata File**:

  To ensure data products appear on the Data Product Dashboard, the folder containing the data product files must include a metadata file. Refer to `ADR-55 <https://confluence.skatelescope.org/display/SWSI/ADR-55+Definition+of+metadata+for+data+management+at+AA0.5>`_ : Definition of metadata for data management at AA0.5 for details on the metadata file format.


- **Shared Persistent Volume**:

  The Data Product Dashboard needs to access the same persistent volume (PV) where the data products reside. These data products are typically written by pipelines deployed in a different namespace than the Data Product Dashboard. To enable access, you need to configure the persistent volume claim (PVC) correctly to share the PV between the namespaces.

  For more information on configuring shared storage between namespaces in SKAO clusters, refer to the guide: `Guide to Sharing Storage Between Namespaces in SKAO Clusters. <https://developer.skao.int/en/latest/howto/shared-storage.html>`_.

  Once the PVC is configured correctly, you can update the deployment's values file with the appropriate details. The following extract from a values file shows an example configuration for the shared PVC in the DP cluster (replace shared with your actual PVC name):


  .. code-block:: yaml

      dataProductPVC:
        name: shared
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
    * - ``api.verbose``
      - ``false``
      - Enable verbose logging.
    * - ``api.dateFromat``
      - ``%Y-%m-%d``
      - Date format used for search.
    * - ``api.ingress.path``
      - ``"api"``
      - What the prefix for the ska-dataproduct-api path should be.
    * - ``api.storagePath``
      - ``"/mnt/data/product/"``
      - The path to the data on the PV.
    * - ``api.metadataFileName``
      - ``ska-data-product.yaml``
      - The name of the data products metadata file that is used to indicate that a folder is a data product.
    * - ``api.vault.useVault``
      - ``true``
      - Enables the deployment to retrieve SPA registration details from the SKAO vault.
    * - ``api.vault.pathToSecretVault``
      - ``phoenix/sdhp-stfc/integration/ska-sdp-dataproduct-api``
      - Path to the secrets in the vault.
    * - ``api.vault.refreshAfter``
      - ``360s``
      - The amount of time between refreshing the data.
    * - ``api.vault.engine``
      - ``dev``
      - The base engine in which the secrets are stored.
    * - ``api.postgresql.host``
      - ``https://localhost``
      - The PostgreSQL host.
    * - ``api.postgresql.port``
      - ``9200``
      - The PostgreSQL port.
    * - ``api.postgresql.user``
      - ``postgre``
      - The PostgreSQL user.
    * - ``api.postgresql.dbname``
      -
      - The PostgreSQL database name.
    * - ``api.postgresql.schema``
      -
      - The PostgreSQL schema name.
    * - ``api.postgresql.metadataTableName``
      - ``data_products_metadata_v3``
      - The PostgreSQL table that contain the data products metadata.
    * - ``api.postgresql.annotationsTableName``
      - ``data_products_annotations_v2``
      - The PostgreSQL table that contain the data products annotations.
    * - ``api.postgresql.querySizeLimit``
      - ``10000``
      - Limit of the number of results from a PostgreSQL query.
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


**Data product API secrets**:

The following secrets are expected in the file mapped into the API container by the vault:

.. list-table::
    :widths: 50, 50
    :header-rows: 1

    * - Secret
      - Comment
    * - ``SKA_DATAPRODUCT_API_POSTGRESQL_PASSWORD``
      - The PostgreSQL password.



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
      - ``0.13.0``
      - The version of the ska-dataproduct-dashboard to use.
    * - ``dashboard.imagePullPolicy``
      - ``IfNotPresent``
      - The pull policy of the ska-dataproduct-dashboard.
    * - ``dashboard.ingress.path``
      - ``"dashboard"``
      - What the prefix for the ska-dataproduct-dashboard path should be.
    * - ``dashboard.vault.useVault``
      - ``true``
      - Enables the deployment to retrieve SPA registration details from the SKAO vault.
    * - ``dashboard.vault.pathToSecretVault``
      - ``phoenix/sdhp-stfc/integration/ska-dataproduct-dashboard``
      - Path to the secrets in the vault.
    * - ``dashboard.vault.client_id``
      - ``abcde``
      - Placeholder env variable for MS Entra application registration client ID.
    * - ``dashboard.vault.tenant_id``
      - ``abcde``
      - Placeholder env variable for MS Entra application registration tenant ID.
    * - ``dashboard.vault.refreshAfter``
      - ``360s``
      - The amount of time between refreshing the data.
    * - ``dashboard.vault.engine``
      - ``dev``
      - The base engine in which the secrets are stored.
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


**Shared persistent volume**:

.. note:: Only enable the creation of a PVC here when running the application locally or in tests where the shared PCV is not used.

.. list-table::
    :widths: 20, 20, 60
    :header-rows: 1

    * - Value
      - Default
      - Comment
    * - ``dataProductPVC.name``
      - ``shared``
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


