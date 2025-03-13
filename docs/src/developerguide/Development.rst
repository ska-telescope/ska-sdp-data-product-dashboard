Developer Guide
~~~~~~~~~~~~~~~

.. note:: This document complements the guidelines set out in the `SKA telescope developer portal <https://developer.skao.int/en/latest/>`_

Tooling Pre-requisites
======================

This project requires **Node** and **YARN** to install and run. To install please follow the instructions for your operating system at `nodejs downloads <https://nodejs.org/en/download/>`_.

Alternatively, the official Node docker image can be used. Instructions can be found on the `official Node docker image site <https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image>`_.

After installing Node, YARN can be installed following `this page <https://yarnpkg.com/getting-started/install>>`_.

Development setup
=================

*To run the application directly on your host machine*

*All the following notes assume you are at the command prompt for your chosen environment.*


Confirm Node and YARN are installed and configured correctly, both the following commands should return the relevant version number.

.. code-block:: bash

  > node --version
  > yarn --version

Clone the repository and its submodules:

.. code-block:: bash

    git clone --recursive git@gitlab.com:ska-telescope/ska-dataproduct-dashboard.git
    make make

Scripts for running, testing, and building the application are defined in the scripts section of the package.json file. These are run using YARN

To run the application locally on your host machine, install all the latest SKAO React components library and other necessary project dependencies with the YARN package manager:

.. code-block:: bash

  > yarn skao:update
  > yarn

Using a .env File (For hosting the application on a developer machine)
______________________________________________________________________

.. note:: This file is excluded from version control using .gitignore to prevent exposing sensitive information. 
  
Create a file named .env at the root of your project directory. The following list of environment variables can be set according to your environment:

.. code-block:: bash

  SKIP_PREFLIGHT_CHECK='true'
  REACT_APP_SKA_DATAPRODUCT_API_URL='http://localhost:8000'
  REACT_APP_API_REFRESH_RATE='1000'
  REACT_APP_USE_LOCAL_DATA='false'
  REACT_APP_ALLOW_MOCK_AUTH='true'
  REACT_APP_MSENTRA_CLIENT_ID='The applciation ID'
  REACT_APP_MSENTRA_TENANT_ID='The tenant ID'
  REACT_APP_MSENTRA_REDIRECT_URI='http://localhost:8000'


Running scripts
===============

You should now be able to run the scripts defined in the package.json within the project directory.

**Running the application in development mode**

The app can be run with the node environment set to NODE_ENV=test (allowing Istanbul to instrument the code) and webpack serve with --mode development. You can access your application at http://localhost:8100. The app will recompile and restart if you make any edits to the source files. 


.. code-block:: bash

  > yarn start

**Running the application tests using Cypress**

Cypress has been set up to provide component and end to end testing. For information on the use of Cypress, see `Cypress component-testing <https://docs.cypress.io/guides/component-testing/overview>`_. 

Code coverage is implemented with `Istanbul <https://istanbul.js.org/>`_ and `NYC <https://www.npmjs.com/package/nyc>`_ for instrumenting the code, and `cobertura reporter <https://istanbul.js.org/docs/advanced/alternative-reporters/#cobertura>`_ as it is used for reporting for the Gitlab CI of coverage statistics.

Cypress can be opened in a browser by running: 

.. code-block:: bash

  > yarn cypress:open

Or alternatively unit and end to end tests can be run headless by: 

.. code-block:: bash

  > yarn test:cypress:component:ci
  > yarn test:cypress:e2e:ci


Code coverage can be viewed by opening the `build/coverage/index.html` in a browser after running:

.. code-block:: bash

  > yarn test:coverage:report

**Running the production code**

The build script builds the app for production to the `dist` folder. The build is minified and any JSX is transpiled to JavaScript. Your app is ready to be deployed!

.. code-block:: bash

  > yarn build

**Running the application inside a docker container on your host machine**

When running the application within a container, the production image of the application is first built in the docker file and a Nginx image is then used to run the application. The following docker commands can be used to build and run it locally:

.. code-block:: bash

  docker build -t ska-dataproduct-dashboard .
  docker run -p 80:80 ska-dataproduct-dashboard

The project will then be accessible at the URL http://localhost/


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

    docker build -t ska-dataproduct-dashboard .
    docker images
    docker tag [Image ID] ska-dataproduct-dashboard:[Tag]
    minikube image load ska-dataproduct-dashboard:[Tag]
    minikube image ls

3. Change to the chart directory in the repository: ``cd charts/ska-dataproduct-dashboard/``. Make the needed changes to image versions and enable the deployments as required in the values files. Then update the Helm dependencies.

.. code-block:: bash

    helm dependency update .
    helm dependency build

4. Create a new namespace (optional): ``kubectl create namespace [namespace]``
5. Install the helm chart with the following values: 

    helm install [deploy-name] charts/ska-dataproduct-dashboard -n [namespace] --values values_local_deployment.yaml

On a system with limited resources / slow connection, run with the following additional flags:

.. code-block:: bash

    helm install [deploy-name] charts/ska-dataproduct-dashboard -n [namespace] --values values_local_deployment.yaml --set diagnosticMode.enabled=true --timeout=60m

Once the above is complete you will have the following running:

* The Data Product API
* The Data Product Dashboard

6. To be able to access the API and the dashboard run the following:

.. code-block:: bash

    kubectl -n [namespace] port-forward service/ska-dataproduct-api 8000:8000
    kubectl -n [namespace] port-forward service/ska-dataproduct-dashboard 80:80

You should now be able to access the API and the Dashboard on the following URL's:

* http://localhost:8000/filelist
* http://localhost/


To get data onto the PV:

.. code-block:: bash

	kubectl get pod -n [namespace]
    kubectl cp [host path]/ska-dataproduct-api/tests/test_files/product [ska-dataproduct-api pod]:/usr/data -n [namespace]
