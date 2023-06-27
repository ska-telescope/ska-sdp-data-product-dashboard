Overview
=============

The data product dashboard is used to list and download data products (files) that are saved on a shared data volume within the environment where it is deployed.

Usage
-----

The dashboard contains a table of all the data products in the shared data volume, as seen by the `SDP Data Product API <https://developer.skao.int/projects/ska-sdp-dataproduct-api/en/latest/?badge=latest>`_. This table has built-in functionality for sorting and filtering. When a data product is selected, its metadata is displayed on the right as well as the download options for the selected product.

The application can be run as a standalone front-end application or used as a remote (Webpack 5 Module) within the SKA Portal `SKA Landing Page <https://gitlab.com/ska-telescope/ska-landing-page>`_. 

.. figure:: /_static/img/dataproductdashboardWithoutSearch.png
   :width: 90%

   Example SDP Data Product Dashboard

When the data product API has access to an Elasticsearch backend, additional search functionality will become available. This allows the user to use Elasticsearch to search for a key value pair within the metadata.

.. figure:: /_static/img/dataproductdashboardWithSearch.png
   :width: 90%

   Example SDP Data Product Dashboard with Elasticsearch enabled.

