Overview
~~~~~~~~

The data product dashboard is used to list and download data products saved on a shared data volume within the environment where it is deployed.
This documentation will guide you through utilizing the dashboard's features to find data products and view their metadata.

On DP Platform, an example dashboard HTML can be accessed through `this address <https://sdhp.stfc.skao.int/integration-ska-dataproduct-dashboard/dashboard/#>`_,
alternatively you can also set up a Dashboard locally, please check the Developer guide page for details how this is done.

Usage
=====

The dashboard contains a table of data products. In the current version, you will be able to view and download all the data products on the shared data volume where the data product dashboard is deployed.
You will also be able to view metadata of data products that has been registered as data products on the Data Product Dashboard by the DLM (`Data Life Cycle Manager <https://developer.skao.int/projects/ska-data-lifecycle/en/latest/?badge=latest>`_).

.. figure:: /_static/img/dataproductdashboardDatagridSearch.png
   :width: 90%

   Example Data Product Dashboard


This table has built-in functionality for sorting and filtering, allowing a user to select any column header, and filter for values contained in that property of the products.

.. note:: In this release, only the 'contains' filter is implemented.


The user can also give a time range and list key value pairs as search parameters on the search box on the right of the table.

.. figure:: /_static/img/dataproductdashboardSearchPanelSearch.png
   :width: 90%

   Example Data Product Dashboard search with time range and key value pair.


When a data product is selected, its metadata is displayed on a panel on the right.

.. figure:: /_static/img/dataproductdashboardMetadata.png
   :width: 90%

   Example of selected data product metadata.

The download functionality for these items will depend if the product is accessible on the shared data volume. If available the user will be able to stream the data product to disk as a .tar archive with the browser download manager.

.. figure:: /_static/img/dataproductdashboardWithFileDownloaded.png
   :width: 90%

   Example of file downloaded with browser download manager.


The data annotations associated with the selected data product can be viewed on a panel on the right of the table under the metadata.

.. figure:: /_static/img/dataAnnotationsPanel.png
   :width: 90%

   Example of data annotations panel.



Data Product Index
==================

The current release of the Data Product Dashboard can be deployed with either a persistent metadata store using a PostgreSQL backend, or an in-memory solution that indexes all the data products on the shared data volume and creates a table in memory. In both cases, the store will be updated when a new product is loaded by the DLM. If an administrator loads data products directly onto the shared volume, the user can re-index the data volume to update the metadata store of the Data Product Dashboard accordingly.

The dashboard will automatically reload when new data is added to its store, and the reload button will be deactivated while the dashboard is in sync with the data in the store.


Integration into the SKA Portal
===============================

The application can be run as a standalone front-end application or used as a remote (Webpack 5 Module) within the SKA Portal `SKA Landing Page <https://gitlab.com/ska-telescope/ska-landing-page>`_. 
