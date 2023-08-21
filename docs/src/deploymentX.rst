Deployment Guide
~~~~~~~~~~~~~~~~

Kubernetes Deployment
=====================

This is the documentation for the Data Product Dashboard Helm Chart.

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

If needed, build images, tag and load them to Minikube.

.. code-block:: bash

    docker build -t ska-sdp-dataproduct-dashboard .
    docker images
    docker tag [Image ID] ska-sdp-dataproduct-dashboard:[Tag]
    minikube image load ska-sdp-dataproduct-dashboard:[Tag]
    minikube image ls

2. Change to the chart directory in the repository: ``cd charts/ska-sdp-dataproduct-dashboard/``. Make the needed changes to image versions and enable the deployments as required in the values files. Then update the Helm dependencies.

.. code-block:: bash

    helm dependency update .
    helm dependency build

3. Create a new namespace (optional): ``kubectl create namespace [namespace]``
4. Install the helm chart with the following values: 


    helm install [namespace] . -n [namespace] --set helmdeploy.namespace=[namespace] --values values_local_deployment.yaml

On a system with limited resources / slow connection, run with the following additional flags:

.. code-block:: bash

    helm install [namespace] . -n [namespace] --set helmdeploy.namespace=[namespace] --values values_local_deployment.yaml --set diagnosticMode.enabled=true --timeout=60m

Once the above is complete you will have the following running:

* The Data Product API
* The Data Product Dashboard

To be able to access the API and the dashboard run the following:

.. code-block:: bash

    kubectl -n [namespace] port-forward service/ska-sdp-dataproduct-api 8000:8000
    kubectl -n [namespace] port-forward service/ska-sdp-dataproduct-dashboard 8100:8100

You should now be able to access the API and the Dashboard on the following URL's:

* http://localhost:8000/filelist
* http://localhost:8100/


To get data onto the PV:

.. code-block:: bash

	kubectl get pod -n [namespace]
    kubectl cp [host path]/ska-sdp-dataproduct-api/tests/test_files/product [ska-sdp-dataproduct-api pod]:/usr/data -n [namespace]
