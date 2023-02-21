Helm
=============

This is the documentation for the SDP Data Product Dashboard Helm Chart.

Usage
-----

This usage will assume that you have the repo checked out, or have the chart
locally.


Steps to run the system locally in Minikube
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Start Minikube if it is not already running:

.. code-block:: bash

    minikube start
    minikube status

If needed, build images, tag and load them to Minikube.

.. code-block:: bash

    docker build -t ska-sdp-data-product-dashboard .
    docker images
    docker tag [Image ID] ska-sdp-data-product-dashboard:[Tag]
    minikube image load ska-sdp-data-product-dashbaord:[Tag]
    minikube image ls

2. Change to the chart directory in the repository: ``cd charts/ska-sdp-data-product-dashboard/``. Make the needed changes to image versions and enable the deployments as required in the values files. Then update the Helm dependencies.

.. code-block:: bash

    helm dependency update .
    helm dependency build

3. Create a new namespace (optional): ``kubectl create namespace [namespace]``
4. Install the helm chart with the following values: 


    helm install [namespace] . -n tes[namespace]t --set helmdeploy.namespace=[namespace] --values values_local_deployment.yaml

On a system with limited resources / slow connection, run with the following additional flags:

.. code-block:: bash

    helm install [namespace] . -n [namespace] --set helmdeploy.namespace=[namespace] --values values_local_deployment.yaml --set diagnosticMode.enabled=true --timeout=60m

Once the above is complete you will have the following running:

* The SDP Data Product API
* The SDP Data Product Dashboard

To be able to access the API and the dashboard run the following:

.. code-block:: bash

    kubectl -n [namespace] port-forward service/ska-sdp-data-product-api 8000:8000
    kubectl -n [namespace] port-forward service/ska-sdp-data-product-dashboard 8100:8100

You should now be able to access the API and the Dashboard on the following url's:

* http://localhost:8000/filelist
* http://localhost:8100/


To get data onto the PV:

.. code-block:: bash

	kubectl get pod -n [namespace]
    kubectl cp ska_repos_wsl/ska-sdp-data-product-api/tests/test_files/product ska-sdp-data-product-api-67b54b4948-dvhbj:/usr/data -n [namespace]


Steps to deploy the system to a namespace on the SDP cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Clone the SDP Integration Repository (https://gitlab.com/ska-telescope/sdp/ska-sdp-integration)

NOTE: This integration has not been merged into the integration repository. To deploy the dashboard as part of the SDP, add the following dependency to the chart in the ska-sdp-integration repository:

.. code-block:: bash

    - name: ska-sdp-data-product-dashboard
    version: 0.2.0
    repository: https://artefact.skao.int/repository/helm-internal

Load the KUBECONFIG file to access and test the deployment. Please contact Hodosan, Gabriella (@Gabi on Slack) if you haven't got a file yet. 
Once you export the file (i.e. export KUBECONFIG=<my-config-file>), you will have access to your available namespaces.

.. code-block:: bash

    helm install [NAME] [CHART] [flags]
    helm install [NAME] . -n [namespace] --set helmdeploy.namespace=[namespace]-p

You should now be able to access the API and the Dashboard on the following url's

* https://sdhp.stfc.skao.int/[namespace]/data_product/api/filelist
* https://sdhp.stfc.skao.int/[namespace]/data_product/dashboard/