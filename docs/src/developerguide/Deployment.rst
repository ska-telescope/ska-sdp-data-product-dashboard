Deployment Guide
~~~~~~~~~~~~~~~~

Kubernetes Deployment
=====================

This is the documentation for the Data Product Dashboard Helm Chart.

All Configuration Options
-------------------------

Currently the full list of configuration options are:

Ingress:

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

Data product API:

.. list-table::
    :widths: 20, 20, 60
    :header-rows: 1

    * - Value
      - Default
      - Comment
    * - ``api.enabled``
      - ``true``
      - If the ska-sdp-dataproduct-api should be enabled.
    * - ``api.container``
      - ``artefact.skao.int/ska-sdp-dataproduct-api``
      - The link to the artefact repository
    * - ``api.version``
      - ``0.7.0``
      - The version of the ska-sdp-dataproduct-api to use.
    * - ``api.imagePullPolicy``
      - ``IfNotPresent``
      - The pull policy of the ska-sdp-dataproduct-api.
    * - ``api.ingress.path``
      - ``"api"``
      - What the prefix for the ska-sdp-dataproduct-api path should be.
    * - ``api.storagePath``
      - ``"/mnt/data/product/"``
      - The path to the data on the PV.
    * - ``api.metadata_file_name``
      - ``ska-data-product.yaml``
      - The name of the data products metadata file that is used to indicate that a folder is a data product.
    * - ``api.metadata_es_schema_file``
      - ``/mnt/src/ska_sdp_dataproduct_api/elasticsearch/data_product_metadata_schema.json``
      - The metadata schema used to verify the metadata schema.
    * - ``api.es_host``
      - ``"http://ska-sdp-dataproduct-dashboard-elasticsearch-master-hl.test.svc:9200"``
      - The Elasticsearch host.
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
   

Data product Dashboard:

.. list-table::
    :widths: 20, 20, 60
    :header-rows: 1

    * - Value
      - Default
      - Comment
    * - ``dashboard.enabled``
      - ``true``
      - If the ska-sdp-dataproduct-dashboard should be enabled.
    * - ``dashboard.container``
      - ``artefact.skao.int/ska-sdp-dataproduct-dashboard``
      - The link to the artefact repository
    * - ``dashboard.version``
      - ``0.7.0``
      - The version of the ska-sdp-dataproduct-dashboard to use.
    * - ``dashboard.imagePullPolicy``
      - ``IfNotPresent``
      - The pull policy of the ska-sdp-dataproduct-dashboard.
    * - ``dashboard.ingress.path``
      - ``"dashboard"``
      - What the prefix for the ska-sdp-dataproduct-dashboard path should be.
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

Permissions API:

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



Usage
-----

The data product dashboard is intended to be deployed as a standalone deployment, running as a service accessible to other deployments through its API or to users through the dashboard URL. Typical deployments are done from within the GitLab pipelines, deploying into pre-configured environments to one of three namespaces (ci-dev, integration or staging)

During development, developers can deploy the development branches into the ci-dev namespace from the Gitlab pipeline. Here the installation use the local chart in the repository for deployment:

.. figure:: /_static/img/ci-dev_deployment.png
   :width: 90%

   Deployment from pipeline on dev branch


From the master branch, the application can be deployed into the integration or staging namespace of each environment. For these deployments released chart from `CAR <https://artefact.skao.int/>`_ is used.

.. figure:: /_static/img/integration_staging_deployment.png
   :width: 90%

   Deployment from pipeline on master branch


The deployed Data Product Dashboard should then be accessible at: "https://sdhp.stfc.skao.int/$KUBE_NAMESPACE/dashboard/", and the backend should be accessible at: "https://sdhp.stfc.skao.int/$KUBE_NAMESPACE/api/"


Steps to run the system locally in Minikube
===========================================

The following steps will assume that you have the repo checked out, or have the chart
locally.

1. Start Minikube if it is not already running:

.. code-block:: bash

    minikube start
    minikube status

2. If needed, build the Docker images, tag and load them to Minikube.

.. code-block:: bash

    docker build -t ska-sdp-dataproduct-dashboard .
    docker images
    docker tag [Image ID] ska-sdp-dataproduct-dashboard:[Tag]
    minikube image load ska-sdp-dataproduct-dashboard:[Tag]
    minikube image ls

3. If you want to run the API with a local instance of Elasticsearch, you can add the Bitnami repository to your repositories:

.. code-block:: bash

    helm repo add bitnami https://charts.bitnami.com/bitnami

Pull and load the Elasticsearch images into Minikube if required:

.. code-block:: bash

    docker image pull bitnami/elasticsearch:[Tag]
    minikube image load bitnami/elasticsearch:[Tag]

Update the DPD chart (Chart.yaml) dependency to match the Elasticsearch tag and enable it. 

.. code-block:: bash

    dependencies:
    - name: 'elasticsearch'
        version: '[Tag]'
        repository: 'https://charts.bitnami.com/bitnami'
        condition: elasticsearch.enabled

4. Change to the chart directory in the repository: ``cd charts/ska-sdp-dataproduct-dashboard/``. Make the needed changes to image versions and enable the deployments as required in the values files. Then update the Helm dependencies.

.. code-block:: bash

    helm dependency update .
    helm dependency build

5. Create a new namespace (optional): ``kubectl create namespace [namespace]``
6. Install the helm chart with the following values: 

    helm install [deploy-name] charts/ska-sdp-dataproduct-dashboard -n [namespace] --values values_local_deployment.yaml

On a system with limited resources / slow connection, run with the following additional flags:

.. code-block:: bash

    helm install [deploy-name] charts/ska-sdp-dataproduct-dashboard -n [namespace] --values values_local_deployment.yaml --set diagnosticMode.enabled=true --timeout=60m

Once the above is complete you will have the following running:

* The Data Product API
* The Data Product Dashboard

7. To be able to access the API and the dashboard (Add Elasticsearch if in use as well so that it can be reached by the API on the local host) run the following:

.. code-block:: bash

    kubectl -n [namespace] port-forward service/ska-sdp-dataproduct-api 8000:8000
    kubectl -n [namespace] port-forward service/ska-sdp-dataproduct-dashboard 80:80

You should now be able to access the API and the Dashboard on the following URL's:

* http://localhost:8000/filelist
* http://localhost/


To get data onto the PV:

.. code-block:: bash

	kubectl get pod -n [namespace]
    kubectl cp [host path]/ska-sdp-dataproduct-api/tests/test_files/product [ska-sdp-dataproduct-api pod]:/usr/data -n [namespace]
