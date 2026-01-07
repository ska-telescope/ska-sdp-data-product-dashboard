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
    * - ``api.metadata_file_name``
      - ``ska-data-product.yaml``
      - The name of the data products metadata file that is used to indicate that a folder is a data product.
    * - ``api.sdpConfigdbHost``
      - ``""``
      - Host path to an SDP Configuration DB. Example: "ska-sdp-etcd.dp-shared"
    * - ``api.secrets.useExistingSecret``
      - ``false``
      - If true, expects an externally managed Kubernetes secret. If false, creates a secret from values.
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


**Required API secrets**:

.. list-table::
    :widths: 50, 50
    :header-rows: 1

    * - Secret Key
      - Description
    * - ``SKA_DATAPRODUCT_API_POSTGRESQL_PASSWORD``
      - PostgreSQL database password



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
    * - ``dashboard.secrets.useExistingSecret``
      - ``false``
      - If true, expects an externally managed Kubernetes secret. If false, creates a secret from values below.
    * - ``dashboard.vault.client_id``
      - ``placeholder_for_client_id``
      - MS Entra application registration client ID. Used only when useExistingSecret is false.
    * - ``dashboard.vault.tenant_id``
      - ``placeholder_for_tenant_id``
      - MS Entra application registration tenant ID. Used only when useExistingSecret is false.
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


**Required Dashboard secrets**:

.. list-table::
    :widths: 50, 50
    :header-rows: 1

    * - Secret Key
      - Description
    * - ``REACT_APP_MSENTRA_CLIENT_ID``
      - Microsoft Entra application registration client ID
    * - ``REACT_APP_MSENTRA_TENANT_ID``
      - Microsoft Entra application registration tenant ID


Secret Management
=================

The chart supports three modes for managing application secrets (both API and Dashboard):

**Mode 1: Values-based secrets (Development/Testing only)**

Secrets are created directly by the chart using values from the values file. This mode stores sensitive data in plain text configuration files and should only be used for local development or testing.

Configuration:
  - Set ``*.secrets.useExistingSecret: false``
  - Provide secret values in the values file (e.g., ``dashboard.vault.client_id``, ``api.postgresql.password``)

**Mode 2: Manual Kubernetes secrets**

You manage secrets externally using ``kubectl``, External Secrets Operator, Sealed Secrets, or any other secret management tool. The chart expects these secrets to exist before deployment.

Configuration:
  - Set ``*.secrets.useExistingSecret: true``
  - Set ``vault-secret-sync.enabled: false``
  - Create secrets manually with the correct names and keys

Required secret names:
  - Dashboard: ``ska-dataproduct-dashboard-dashboard-secret``
  - API: ``ska-dataproduct-dashboard-api-secret``

**Mode 3: Vault-synced secrets (Production)**

Secrets are automatically synchronized from HashiCorp Vault using the vault-secret-sync subchart. This requires the Vault Secrets Operator to be installed in the cluster.

Configuration:
  - Set ``*.secrets.useExistingSecret: true``
  - Set ``vault-secret-sync.enabled: true``
  - Enable specific secret syncs (``vault-secret-sync.secrets.dashboard.enabled``, ``vault-secret-sync.secrets.api.enabled``)

Prerequisites:
  - HashiCorp Vault Secrets Operator installed in cluster
  - Vault properly configured with authentication
  - Service account has permissions to access Vault paths


Vault Secret Synchronization Subchart
--------------------------------------

The vault-secret-sync subchart is an optional helper that automatically syncs secrets from HashiCorp Vault to Kubernetes. It creates VaultStaticSecret custom resources that are managed by the Vault Secrets Operator.

**Configuration options**:

.. list-table::
    :widths: 30, 20, 50
    :header-rows: 1

    * - Value
      - Default
      - Description
    * - ``vault-secret-sync.enabled``
      - ``false``
      - Master switch to enable/disable the subchart
    * - ``vault-secret-sync.vault.engine``
      - ``dev``
      - Vault KV engine mount point
    * - ``vault-secret-sync.vault.refreshAfter``
      - ``360s``
      - How often to refresh secrets from Vault
    * - ``vault-secret-sync.secrets.dashboard.enabled``
      - ``false``
      - Enable dashboard secret synchronization
    * - ``vault-secret-sync.secrets.dashboard.vaultPath``
      - ``phoenix/sdhp-stfc/integration/ska-dataproduct-dashboard``
      - Vault path to dashboard secrets
    * - ``vault-secret-sync.secrets.dashboard.secretName``
      - ``ska-dataproduct-dashboard-dashboard-secret``
      - Kubernetes secret name for dashboard
    * - ``vault-secret-sync.secrets.api.enabled``
      - ``false``
      - Enable API secret synchronization
    * - ``vault-secret-sync.secrets.api.vaultPath``
      - ``phoenix/sdhp-stfc/integration/ska-sdp-dataproduct-api``
      - Vault path to API secrets
    * - ``vault-secret-sync.secrets.api.secretName``
      - ``ska-dataproduct-dashboard-api-secret``
      - Kubernetes secret name for API

**How it works**:

The main application always references standard Kubernetes secrets. The vault-secret-sync subchart acts as a bridge between Vault and these Kubernetes secrets, keeping them synchronized. This design decouples the application from Vault-specific dependencies, making it portable across different secret management strategies.


Persistent Volume Configuration
--------------------------------

.. note:: Only enable PVC creation for local development or testing. In production, use a pre-configured shared PVC.

.. list-table::
    :widths: 30, 20, 50
    :header-rows: 1

    * - Value
      - Default
      - Description
    * - ``dataProductPVC.name``
      - ``shared``
      - Name of the PVC shared between pipeline and dashboard namespaces
    * - ``dataProductPVC.create.enabled``
      - ``false``
      - Create a new PVC (only for local/test environments)
    * - ``dataProductPVC.create.size``
      - ``5Gi``
      - Size of the PVC to create
    * - ``dataProductPVC.create.storageClassName``
      - ``nfss1``
      - Storage class for the PVC


Deployment Examples
===================

Development (Values-based Secrets)
-----------------------------------

For local development and testing only. Secrets are stored in plain text in values files.

.. code-block:: bash

    helm install ska-dataproduct-dashboard charts/ska-dataproduct-dashboard \
      --set dashboard.secrets.useExistingSecret=false \
      --set dashboard.vault.client_id="your-dev-client-id" \
      --set dashboard.vault.tenant_id="your-dev-tenant-id" \
      --set api.secrets.useExistingSecret=false \
      --set api.postgresql.password="your-db-password" \
      --set vault-secret-sync.enabled=false

Production (Vault-Synced Secrets)
----------------------------------

For production deployments with HashiCorp Vault. Secrets are automatically synchronized from Vault.

First, update Helm dependencies:

.. code-block:: bash

    helm dependency update charts/ska-dataproduct-dashboard

Then deploy with Vault synchronization:

.. code-block:: bash

    helm install ska-dataproduct-dashboard charts/ska-dataproduct-dashboard \
      --set dashboard.secrets.useExistingSecret=true \
      --set api.secrets.useExistingSecret=true \
      --set vault-secret-sync.enabled=true \
      --set vault-secret-sync.secrets.dashboard.enabled=true \
      --set vault-secret-sync.secrets.api.enabled=true \
      --set vault-secret-sync.vault.engine="prod" \
      --set vault-secret-sync.secrets.dashboard.vaultPath="phoenix/sdhp-stfc/production/ska-dataproduct-dashboard" \
      --set vault-secret-sync.secrets.api.vaultPath="phoenix/sdhp-stfc/production/ska-sdp-dataproduct-api"

Manual Secret Management
-------------------------

For environments using external secret management tools (External Secrets Operator, Sealed Secrets, etc.).

Create secrets manually:

.. code-block:: bash

    kubectl create secret generic ska-dataproduct-dashboard-dashboard-secret \
      --from-literal=REACT_APP_MSENTRA_CLIENT_ID="your-client-id" \
      --from-literal=REACT_APP_MSENTRA_TENANT_ID="your-tenant-id"
    
    kubectl create secret generic ska-dataproduct-dashboard-api-secret \
      --from-literal=SKA_DATAPRODUCT_API_POSTGRESQL_PASSWORD="your-db-password"

Then deploy the chart:

.. code-block:: bash

    helm install ska-dataproduct-dashboard charts/ska-dataproduct-dashboard \
      --set dashboard.secrets.useExistingSecret=true \
      --set api.secrets.useExistingSecret=true \
      --set vault-secret-sync.enabled=false


CI/CD Pipeline Deployments
===========================

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


