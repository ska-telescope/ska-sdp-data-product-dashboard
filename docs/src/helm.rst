Helm
=============

This is the documentation for the SDP Data Product Dashboard Helm Chart.

Usage
-----

This usage will assume that you have the repo checked out, or have the chart
locally.


Steps to run the system locally in Minikube
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Start Minikube if it is not already running:

.. code-block:: bash

    minikube start
    minikube status

1. Change to the chart directory in the repository: ``cd ska-sdp-integration/charts/ska-sdp``
2. Create a new namespace (optional): ``kubectl create namespace test``
3. Install the helm chart with the following values: ``helm install test . -n test --values values_local_deployment.yaml``

Once the above is complete you will have the following running:

* The SDP Data Product API
* The SDP Data Product Dashboard

To be able to access the API and the dashboard run the following:

.. code-block:: bash

    kubectl -n test port-forward service/ska-sdp-data-product-api 8000:8000
    kubectl -n test port-forward service/ska-sdp-data-product-dashboard 8100:8100

You should now be able to access the API and the Dashboard on the following url's:

* http://localhost:8000/filelist
* http://localhost:8100/

Steps to deploy the system to a namespace on the SDP cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The SDP Data Product API and Dashboard is deployed as part of the SDP ska-sdp-integration.

Clone the SDP Integration Repository (https://gitlab.com/ska-telescope/sdp/ska-sdp-integration)

Load the KUBECONFIG file to access and test the deployment. Please contact Hodosan, Gabriella (@Gabi on Slack) if you haven't got a file yet. 
Once you export the file (i.e. export KUBECONFIG=<my-config-file>), you will have access to your available namespaces.

Before you install the helm chart, update the values file with the namespace you are going to deploy it to, to allow the dashboard to access the API.

.. code-block:: bash
    ...
    hostUrl: "https://sdhp.stfc.skao.int/[namespace]/data_product/dashboard"
    apiUrl: "https://sdhp.stfc.skao.int/[namespace]/data_product/api" 
    ...

.. code-block:: bash

    helm install [NAME] [CHART] [flags]
    helm install [NAME] . -n [namespace] --set helmdeploy.namespace=[namespace]-p

You should now be able to access the API and the Dashboard on the following url's

* https://sdhp.stfc.skao.int/[namespace]/data_product/api/filelist
* https://sdhp.stfc.skao.int/[namespace]/data_product/dashboard/