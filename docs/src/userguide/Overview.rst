Overview
~~~~~~~~

The data product dashboard is used to list and download data products that are saved on a shared data volume within the environment where it is deployed. This documentation will guide you through utilizing the dashboard's features to  locate and retrieve data products.

Usage
=====

The dashboard contains a table of all the data products in the shared data volume, as seen by the `Data Product API <https://developer.skao.int/projects/ska-dataproduct-api/en/latest/?badge=latest>`_. This table has built-in functionality for sorting and filtering. When a data product is selected, its metadata and download option is displayed on a panel on the right.

.. figure:: /_static/img/dataproductdashboardWithoutSearch.png
   :width: 90%

   Example Data Product Dashboard

When the download option is selected, the data product will be streamed to disk as a .tar archive with the browser download manager.

.. figure:: /_static/img/dataproductdashboardWithFileDownloaded.png
   :width: 90%

   Example of file downloaded with browser download manager.


Above the table is a panel which contains functions related to the data store in use. These can include the following:

- **Index Data Products**

  This button will re-index the shared data volume from disk into the metadata store. This allows the user to find items that might have been added to the volume without being ingested by the API. 

- **Reload**

  This function will update the table on the dashboard with the latest list of data products in the metadata store. This allows the user to find items that have been ingested by the API since the dashboard last loaded. 

When the data product API has access to an Elasticsearch backend, additional search functionality will become available. This allows the user to use Elasticsearch to search for a key value pair within the metadata.

.. figure:: /_static/img/dataproductdashboardWithSearch.png
   :width: 90%

   Example Data Product Dashboard with Elasticsearch enabled.

The application can be run as a standalone front-end application or used as a remote (Webpack 5 Module) within the SKA Portal `SKA Landing Page <https://gitlab.com/ska-telescope/ska-landing-page>`_. 