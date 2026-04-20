Developer Guide
~~~~~~~~~~~~~~~

.. note:: This document complements the guidelines set out in the `SKA telescope developer portal <https://developer.skao.int/en/latest/>`_

Tooling Pre-requisites
======================

This project requires **Node** and **YARN** to install and run. To install please follow the instructions for your operating system at `nodejs downloads <https://nodejs.org/en/download/>`_.

Alternatively, the official Node docker image can be used.
Instructions can be found on the `official Node docker image site <https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image>`_.

After installing Node, YARN can be installed following `this page <https://yarnpkg.com/getting-started/install>`_. Currently, the repository only accepts classical YARN versions.
We recommend using 1.22.22, and under corepack you can set this by

.. code-block:: bash

  > yarn set version 1.22.22

Or you can directly install YARN via npm.

If you have any questions, the SKA developer portal also has a general guide on how to install JS related packages:
`Javascript (JS) Guidelines <https://developer.skao.int/en/latest/tools/codeguides/javascript-codeguide.html>`_ .

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

    git clone --recursive https://gitlab.com/ska-telescope/ska-dataproduct-dashboard.git
    make make

Scripts for running, testing, and building the application are defined in the scripts section of the package.json file.
These are run using YARN.

To run the application locally on your host machine, install all the latest SKAO React components library and other necessary project dependencies with the YARN package manager:

.. code-block:: bash

  > yarn skao:update
  > yarn

If you are setting this up the first time, you may need to run 'yarn install' to install any missing dependencies.

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

The app can be run with the node environment set to NODE_ENV=test (allowing Istanbul to instrument the code) and webpack serve with --mode development.
You can access your application at http://localhost:8100. The app will recompile and restart if you make any edits to the source files.
To run, use the following command and the dashboard will pop up automatically.

.. code-block:: bash

  > yarn start

**Running the application tests using Cypress**

The package `Cypress <https://www.cypress.io>`_ has been set up to provide component and end to end testing.
For information on the use of Cypress, see `Cypress component-testing <https://docs.cypress.io/guides/component-testing/overview>`_.

Code coverage is implemented with `Istanbul <https://istanbul.js.org/>`_ and `NYC <https://www.npmjs.com/package/nyc>`_ for instrumenting the code,
and `cobertura reporter <https://istanbul.js.org/docs/advanced/alternative-reporters/#cobertura>`_ as it is used for reporting for the Gitlab CI of coverage statistics.

Cypress can be opened in a browser by running the following (this will open an interactive session):

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


Connecting to SDP
=================

If you wish to connect to an existing deployment of the Science Data Processor (SDP)
and display data flow information associated with data products, you need to install
the DPD with the following value set in ``values.yaml``

.. code-block::

    api:
      sdpConfigdbHost: "ska-sdp-etcd.<namespace>"

Replace ``<namespace>`` with the SDP control system namespace where its Configuration DB is running.

Column Header Labels, Descriptions, and Default Visibility
===========================================================

This section documents how column headers with tooltips are rendered in the DataGrid,
how default column visibility is controlled and persisted, and how to extend either.

Column header tooltip flow
--------------------------

The frontend resolves column labels and tooltip descriptions from a single i18next
namespace (``humanreadable``) loaded from ``GET /en/humanreadable``:

.. code-block:: text

    GET /en/humanreadable
        │
        ├─ top-level keys  →  tColumns(item.field)        →  GridColDef.headerName
        └─ "description"   →  tColumns(`description.${item.field}`)  →  GridColDef.description

When ``GridColDef.description`` is set to a non-empty string, MUI DataGrid renders
a built-in tooltip on column header hover with no additional code required.

If a field has no description in the API response, ``tColumns(...)`` returns the raw
key string, which is then coerced to ``undefined`` by ``|| undefined`` in
``DataGrid.tsx``.  MUI shows no tooltip for ``undefined`` descriptions.

How ``DataGrid.tsx`` injects descriptions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In ``fetchData``, after ``/muidatagridconfig`` columns are processed:

.. code-block:: tsx

    setMuiConfigData({
      columns: newData.columns.map((item) => ({
        ...item,
        headerName: tColumns(item.field),
        description: tColumns(`description.${item.field}`) || undefined,
      }))
    });

The same ``tColumns`` hook and namespace are used for both label and description.
No extra HTTP requests are made.

Default visible columns
-----------------------

Default column visibility is driven entirely by ``DEFAULT_COLUMNS`` on the API side,
communicated to the frontend through the ``col.hide`` field in ``/muidatagridconfig``.

Priority chain on first load
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: text

    1. localStorage "defaultColumns"  (if field set matches current API — see below)
           │
    2. col.hide from /muidatagridconfig  (API default — stored on first load)

On first load (or after field-set invalidation), ``visibilityModel`` is built from
``col.hide``, stored to ``localStorage`` as ``defaultColumns``, and used immediately.
On subsequent loads the stored preferences take priority.

localStorage field-set invalidation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The key ``defaultColumnsFields`` in ``localStorage`` contains a sorted, comma-joined
list of all field names from the last ``/muidatagridconfig`` response.

On each load, this stored list is compared to the current API field set.  If they
differ, ``defaultColumns`` is discarded and re-seeded from ``col.hide``.  This
automatically resets saved preferences when columns are added or removed in an
API upgrade — silently, without prompting the user.

MUI column panel Reset button
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Clicking MUI's built-in "Reset" button fires ``onColumnVisibilityModelChange``
with an empty object ``{}``.  The handler in ``DataGrid.tsx`` detects this and
restores the API-derived defaults from ``apiDerivedVisibilityRef`` (populated
from ``col.hide`` during ``fetchData``) without re-fetching from the API:

.. code-block:: tsx

    onColumnVisibilityModelChange={(newDefaultColumns) => {
      if (Object.keys(newDefaultColumns).length === 0) {
        // Reset button clicked — restore API defaults
        setDefaultColumns(apiDerivedVisibilityRef.current);
      } else {
        setDefaultColumns(newDefaultColumns);
      }
    }}

After clicking Reset, ``localStorage`` is overwritten with the API defaults so the
next page reload also shows the correct initial state.

How to change the default visible set
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Edit ``DEFAULT_COLUMNS`` in
``ska-dataproduct-api/src/ska_dataproduct_api/configuration/settings.py``.
The list order also controls the column display order in the DataGrid.

To override per deployment without a code change, set the environment variable:

.. code-block:: bash

    SKA_DATAPRODUCT_API_DEFAULT_COLUMNS='["execution_block","date_created","obscore.s_ra"]'

The value must be a valid JSON array of field-name strings.