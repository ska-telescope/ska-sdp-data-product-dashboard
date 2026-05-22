SKA Data Product Dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~

The SKA Data Product Dashboard `ska-dataproduct-dashboard` is a web application for discovering, searching, downloading, and annotating SKA Data Products stored in a persistent storage volume,  managed by the Data Lifecycle Manager (DLM) or the flows in the SDP Configuration database (etcd).

It uses the `Data Product API <https://developer.skao.int/projects/ska-dataproduct-api/en/latest/>`_ as its
backend to retrieve data products and their metadata. 

If you just want to use the Dashboard, check the `User Guide <userguide/Overview>`_.
To understand the internals, check out the `Developer Guide <developerguide/Development>`_.


.. toctree::
  :maxdepth: 1
  :caption: User Guide

  userguide/Overview

.. toctree::
  :maxdepth: 1
  :caption: Developer Guide

  developerguide/Development
  developerguide/Deployment

.. toctree::
  :maxdepth: 1
  :caption: Releases

  CHANGELOG.md
