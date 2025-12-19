Overview
~~~~~~~~

The data product dashboard is used to list and download data products saved on a shared data volume within the environment where it is deployed.
This documentation will guide you through utilizing the dashboard's features to find data products and view their metadata.

The application can be run as a standalone front-end application or used as a remote (Webpack 5 Module)
within the SKA Portal `SKA Landing Page <https://gitlab.com/ska-telescope/ska-landing-page>`_.

On DP Platform, an example dashboard HTML can be accessed through `this address <https://sdhp.stfc.skao.int/integration-ska-dataproduct-dashboard/dashboard/#>`_,
alternatively you can also set up a Dashboard locally, please check the Developer guide page for details on how this is done.

Usage
=====

The dashboard contains a table of data products. In the current version, you will be able to view and download all the data products on the shared data volume where the data product dashboard is deployed.
If a view of the data_item PostgreSQL database table used by the DLM (`Data Life Cycle Manager <https://developer.skao.int/projects/ska-data-lifecycle/en/latest/?badge=latest>`_) has been shared with the dashboard database user,
you will also be able to view metadata of data products that have been registered as data products in the DLM.

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

The current release of the Data Product Dashboard can be deployed with either a persistent metadata store using a PostgreSQL backend, or an in-memory solution that indexes all the data products on the shared data volume and creates a table in memory.
When products are directly loaded onto the shared volume, the user can re-index the data volume to update the metadata store of the Data Product Dashboard accordingly.

The dashboard will automatically reload after a re-index or when new data is added to its store via the rest API endpoints. The reload button will be deactivated while the dashboard is in sync with the data in the store.

API Status Indicator
--------------------

The dashboard displays a status icon that provides real-time information about the backend API connection and indexing status. Hovering over the icon displays a tooltip with detailed status information, including:

- Current indexing state
- Metadata and search store state
- API availability and connection status


.. figure:: /_static/img/api_status.png
   :width: 90%

   Example of API status indicator with tooltip information.


Connecting to an SDP Configuration Database
===========================================

The DPD has the capability (from v0.14.0) to connect to a specific Science Data Processor (SDP) Configuration Database (Config DB).
This feature allows the DPD to retrieve data flow information from the Config DB. Data flow objects give
the users information about the status of a data product, e.g if it is already available or being written, etc.,
as well as will allow users to "reserve" data products in the buffer space for further processing.
Note that this latter functionality is not yet implemented. For now, the DPD only displays flow keys and status
associated with existing data products in the data table.