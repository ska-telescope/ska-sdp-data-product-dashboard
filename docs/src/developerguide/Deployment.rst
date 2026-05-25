Deployment Guide
~~~~~~~~~~~~~~~~

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


- **PostgreSQL** *(optional)*:

  By default the API stores metadata in memory and all indexed data is lost on restart.
  To persist metadata across restarts, provide a PostgreSQL instance and set
  ``api.postgresql.host``, ``api.postgresql.dbname``, and ``api.postgresql.schema``
  in the values file.  The API will create and manage its own tables automatically on
  first startup.

- **DLM Integration** *(optional)*:

  If the deployment shares a PostgreSQL instance with the Data Lifecycle Manager (DLM),
  the dashboard can surface DLM-registered data items alongside PV-indexed products.
  This requires the dashboard database user to have ``SELECT`` access on the DLM schema
  (``dlm`` by default) in the same PostgreSQL instance.  Enable the feature by setting
  ``api.postgresql.dlmInterfaceEnabled: true``.


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
      - ``"https://sdhp.stfc.skao.int"``
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
    * - ``api.replicas``
      - ``1``
      - Number of API pod replicas.
    * - ``api.container``
      - ``artefact.skao.int/ska-dataproduct-api``
      - The link to the artefact repository
    * - ``api.version``
      - ``0.16.0``
      - The version of the ska-dataproduct-api to use.
    * - ``api.imagePullPolicy``
      - ``IfNotPresent``
      - The pull policy of the ska-dataproduct-api.
    * - ``api.verbose``
      - ``false``
      - Enable verbose logging.
    * - ``api.dateFormat``
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
    * - ``api.indexingTimeoutSeconds``
      - ``21600``
      - Maximum seconds to wait for a PV scan to complete.
    * - ``api.indexingBatchSize``
      - ``100``
      - Number of metadata files processed per indexing batch.
    * - ``api.indexingParallelWorkers``
      - ``8``
      - Threads used for the parallel YAML read phase. Increase on high-latency NFS storage.
    * - ``api.indexingHeartbeatStaleSeconds``
      - ``300``
      - Seconds since the last heartbeat before an indexing leadership claim is considered stale.
    * - ``api.indexingStateTableName``
      - ``"dpd_indexing_state"``
      - Shared PostgreSQL table used for multi-instance indexing coordination. Override only when running multiple independent DPD stacks in the same schema.
    * - ``api.sdpConfigdbHost``
      - ``""``
      - Host of the SDP Configuration DB (etcd). Leave empty to disable SDP flow enrichment. Example: ``"ska-sdp-etcd.dp-shared"``
    * - ``api.sdpWatcherTimeoutSeconds``
      - ``30.0``
      - Seconds the SDP flow watcher waits for an etcd event before looping.
    * - ``api.sdpWatcherReconnectDelaySeconds``
      - ``10.0``
      - Seconds to wait before reconnecting after an unexpected SDP watcher error.
    * - ``api.useLocalTestData``
      - ``false``
      - Load mock SDP flow data without a live etcd connection. For development only — never enable in production.
    * - ``api.dashboardPort``
      - ``"8100"``
      - Dashboard port used to build the CORS allowed-origins list on the API.
    * - ``api.postgresql.host``
      - ``""``
      - The PostgreSQL host. Leave empty to disable PostgreSQL and use in-memory storage.
    * - ``api.postgresql.port``
      - ``5432``
      - The PostgreSQL port.
    * - ``api.postgresql.user``
      - ``postgres``
      - The PostgreSQL user.
    * - ``api.postgresql.dbname``
      - ``""``
      - The PostgreSQL database name. Required when PostgreSQL is enabled.
    * - ``api.postgresql.schema``
      - ``""``
      - The PostgreSQL schema name. Required when PostgreSQL is enabled.
    * - ``api.postgresql.metadataTableName``
      - ``""`` (auto-derived)
      - PostgreSQL table for data product metadata. See
        :ref:`volume-keyed-table-names` for how names are derived automatically.
    * - ``api.postgresql.annotationsTableName``
      - ``""`` (auto-derived)
      - PostgreSQL table for data product annotations. Auto-derived; see
        :ref:`volume-keyed-table-names`.
    * - ``api.postgresql.sdpFlowsTableName``
      - ``""`` (auto-derived)
      - PostgreSQL table for SDP flow data. Auto-derived; see
        :ref:`volume-keyed-table-names`.
    * - ``api.postgresql.dpdVolumeIdFile``
      - ``.dpd-volume-id``
      - Filename of the volume identity file written at the root of the storage path.
        Change only if the default name conflicts with existing PV content.
    * - ``api.postgresql.querySizeLimit``
      - ``10000``
      - Limit of the number of results from a PostgreSQL query.
    * - ``api.postgresql.dlmInterfaceEnabled``
      - ``false``
      - Enable the DLM database interface. Requires the dashboard database user to have SELECT access on the DLM schema in the same PostgreSQL instance.
    * - ``api.postgresql.dlmSchema``
      - ``"dlm"``
      - PostgreSQL schema where the DLM ``data_item`` table resides.
    * - ``api.postgresql.dlmMetadataTableName``
      - ``"data_item"``
      - Name of the DLM table the dashboard database user has SELECT access to.
    * - ``api.streamChunkSize``
      - ``65536``
      - Chunk size in bytes for streaming file downloads.
    * - ``api.resources.requests.cpu``
      - ``200m``
      - The requested minimum CPU usage of the api.
    * - ``api.resources.requests.memory``
      - ``200Mi``
      - The requested minimum memory usage of the api.
    * - ``api.resources.limits.cpu``
      - ``1000m``
      - The maximum CPU usage of the api.
    * - ``api.resources.limits.memory``
      - ``600Mi``
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
      - ``0.17.0``
      - The version of the ska-dataproduct-dashboard to use.
    * - ``dashboard.imagePullPolicy``
      - ``IfNotPresent``
      - The pull policy of the ska-dataproduct-dashboard.
    * - ``dashboard.ingress.path``
      - ``"dashboard"``
      - What the prefix for the ska-dataproduct-dashboard path should be.
    * - ``dashboard.apiRefreshRate``
      - ``10000``
      - The polling rate for new data from the API.
    * - ``dashboard.dataGridDefaultPageSize``
      - ``25``
      - Default number of rows per page in the data grid.
    * - ``dashboard.resources.requests.cpu``
      - ``1000m``
      - The requested minimum CPU usage of the dashboard.
    * - ``dashboard.resources.requests.memory``
      - ``2048Mi``
      - The requested minimum memory usage of the dashboard.
    * - ``dashboard.resources.limits.cpu``
      - ``2000m``
      - The maximum CPU usage of the dashboard.
    * - ``dashboard.resources.limits.memory``
      - ``3072Mi``
      - The maximum memory usage of the dashboard.


**Dashboard secrets**:

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

The chart supports two modes for managing application secrets (both API and Dashboard):

**Option 1: User-managed Kubernetes secrets (Default)**

You manage secrets externally using ``kubectl``, External Secrets Operator, Sealed Secrets, or any other secret management tool. The chart expects these secrets to exist before deployment.

Configuration:
  - ``vault-secret-sync.enabled: false`` (default)
  - Create secrets manually with the required names and keys (see below)

**Option 2: Vault-synced secrets**

Secrets are automatically synchronized from HashiCorp Vault using the vault-secret-sync subchart. This requires the Vault Secrets Operator to be installed in the cluster.

Configuration:
  - Set ``vault-secret-sync.enabled: true``

Prerequisites:
  - HashiCorp Vault Secrets Operator installed in cluster
  - Vault properly configured with authentication
  - Service account has permissions to access Vault paths

Required Secrets for Both Options
----------------------------------

The following Kubernetes secrets must exist (either created manually or synced from Vault).

.. note:: The secret names shown below are the default values and can be customized via ``vault-secret-sync.secrets.dashboard.secretName`` and ``vault-secret-sync.secrets.api.secretName`` configuration options.

**Dashboard secret** (default name: ``ska-dataproduct-dashboard-dashboard-secret``)

  Required keys:
    - ``REACT_APP_MSENTRA_CLIENT_ID`` - Microsoft Entra application registration client ID
    - ``REACT_APP_MSENTRA_TENANT_ID`` - Microsoft Entra application registration tenant ID

**API secret** (default name: ``ska-dataproduct-dashboard-api-secret``)

  Required keys:
    - ``SKA_DATAPRODUCT_API_POSTGRESQL_PASSWORD`` - PostgreSQL database password


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
    * - ``vault-secret-sync.secrets.dashboard.vaultPath``
      - ``vault/path/ska-dataproduct-dashboard``
      - Vault path to dashboard secrets
    * - ``vault-secret-sync.secrets.dashboard.secretName``
      - ``ska-dataproduct-dashboard-dashboard-secret``
      - Kubernetes secret name for dashboard
    * - ``vault-secret-sync.secrets.api.vaultPath``
      - ``vault/path/ska-dataproduct-api``
      - Vault path to API secrets
    * - ``vault-secret-sync.secrets.api.secretName``
      - ``ska-dataproduct-dashboard-api-secret``
      - Kubernetes secret name for API

**How it works**:

When enabled, the subchart creates VaultStaticSecret custom resources that the Vault Secrets Operator monitors. The operator automatically fetches secrets from the specified Vault paths and creates/updates the corresponding Kubernetes secrets. The main application always references standard Kubernetes secrets, making it portable across different secret management strategies.


.. _volume-keyed-table-names:

Volume-keyed PostgreSQL Table Names
-------------------------------------

On first startup against a Persistent Volume, the API writes a UUID v4 identity
file (``.dpd-volume-id``) at the root of the storage path. On every subsequent
startup the same UUID is read from that file. The UUID is used to derive a stable
16-character table-name prefix of the form ``dpd_<first 12 hex chars of UUID>``,
for example ``dpd_a3f1c2d4e5f6``. All three managed tables (metadata, annotations,
SDP flows) use this prefix, isolating each PV's data in the shared PostgreSQL
database without any manual configuration.

**Two pods racing on a brand-new volume**: the identity file is written with
``O_CREAT | O_EXCL`` (atomic on POSIX file systems), so only one write succeeds.
The losing pod retries reading up to three times with a short random back-off and
obtains the same UUID.

**Override**: set ``api.postgresql.metadataTableName``,
``api.postgresql.annotationsTableName``, or ``api.postgresql.sdpFlowsTableName``
to a non-empty string in ``values.yaml`` to bypass auto-derivation and use a fixed
table name — useful when reusing a database populated by a previous deployment.

**Identity file location**: controlled by ``api.postgresql.dpdVolumeIdFile``
(default ``.dpd-volume-id``). Change this only if the default filename conflicts
with existing content on the PV.

**Multi-instance indexing coordination**: a single shared table ``dpd_indexing_state``
in the DPD schema coordinates which API pod is the active indexer for each volume
prefix. On startup, each pod performs an atomic claim; only the leader scans the PV
and populates the shared tables. Non-leaders skip the scan and serve data immediately
from the tables the leader has already written. The coordination record is visible in
the ``indexing.coordination_state`` block of the ``/status`` endpoint.


Shared Persistent Volume Configuration
---------------------------------------

.. note:: Only enable PVC creation for local development or testing. In production, use a pre-configured shared PVC.

.. list-table::
    :widths: 30, 20, 50
    :header-rows: 1

    * - Value
      - Default
      - Description
    * - ``dataProductPVC.enabled``
      - ``true``
      - Whether to mount the shared PVC to the API pod.
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

Vault-synced Secrets (Production)
----------------------------------

For production deployments with HashiCorp Vault, secrets are automatically synchronized from Vault.

First, update Helm dependencies:

.. code-block:: bash

    helm dependency update charts/ska-dataproduct-dashboard

Then deploy with Vault synchronization:

.. code-block:: bash

    helm install ska-dataproduct-dashboard charts/ska-dataproduct-dashboard \
      --set vault-secret-sync.enabled=true \
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


The deployed Data Product Dashboard should then be accessible at: ``https://sdhp.stfc.skao.int/$KUBE_NAMESPACE/dashboard/``, and the backend should be accessible at: ``https://sdhp.stfc.skao.int/$KUBE_NAMESPACE/api/``


