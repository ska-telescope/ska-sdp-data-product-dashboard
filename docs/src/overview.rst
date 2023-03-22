SDP Data Product Dashboard Overview
=============

This Dashboard is used to list SDP data products (files) that is hosted at a persistent storage or other orchestrated location and make them available to download.

Deployment
-----

Local Deployment
~~~~~~~~~~~
**Tooling Pre-requisites**

This project requires **Node** and **YARN** to install and run. To install these follow the instructions for your operating system at [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

Alternatively the official Node docker image can be used. Instructions can be found on the [official Node docker image site](https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image).


**Installation**

Clone the repository and its submodules:

.. code-block:: bash

    git clone git@gitlab.com:ska-telescope/sdp/ska-sdp-dataproduct-dashboard.git
    git submodule update --init --recursive

*To run the application directly on your host machine in developer mode:*

All the following notes assume you are at the command prompt for your chosen environment.

Scripts for running, testing, and building the application are provided as part of the standard configuration. These are run using YARN and listed in the scripts section of the package.json file.

1.  Confirm Node and YARN are installed and configured correctly, both the following commands should return the relevant version number.

.. code-block:: bash

  > node --version
  > yarn --version

2.  Install all the necessary project dependencies by running

.. code-block:: bash

  > yarn install

3.  From the project directory, you can run any of the following:

.. code-block:: bash

  > yarn start

Runs the app in the development mode at http://localhost:8100. The app will recompile and restart if you make any edits to the source files. Any linting errors will also be shown in the console.

.. code-block:: bash

  > yarn cypress

Launches Cypress which has been set up to provide component testing.   For further information on the use of Cypress, see https://docs.cypress.io/guides/component-testing/overview

.. code-block:: bash

  > yarn test

Launches the test runner in the interactive watch mode. 

.. code-block:: bash

  > yarn build

Builds the app for production to the `build` folder. The build is minified and any JSX is transpiled to JavaScript. Your app is ready to be deployed!

The dashboard will then be running on http://localhost:8100/


*To run the application inside a docker container on your host machine:*

To run the application using docker, build the docker file in the root directory and run the container exposing port 8100.

.. code-block:: bash

  docker build -t ska-sdp-dataproduct-dashboard .
  docker run -p 8100:8100 ska-sdp-dataproduct-dashboard

The project will then be accessible at the url http://localhost:8100/

Kubernetes Deployment
~~~~~~~~~~~
The SDP Data Product API is deployed as part of the helm chart of the SDP Data Product Dashboard. Please see the Helm section of this documentation for details.

Usage
-----

The dashboard contains a list of all the data products that can be accessed with the `SDP Data Product API <https://developer.skao.int/projects/ska-sdp-dataproduct-api/en/latest/?badge=latest>`_

This dashboard is developed as a Webpack 5 Module that is used as a remote in the `SKA Landing Page <https://gitlab.com/ska-telescope/ska-landing-page>`_. It contains a table view of all the Data Products and a capability to select and download a product or individual file when selected.

.. figure:: /_static/img/dataproductdashboardWithSearch.png
   :width: 90%

   Example SDP Data Product Dashboard