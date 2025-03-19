SKA Data Product Dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~

The SKA Data Product Dashboard `ska-dataproduct-dashboard` is a web-based application
that simplifies browsing and downloading data products stored within the persistent volume within a cluster.

It utilises the `Data Product API <https://developer.skao.int/projects/ska-dataproduct-api/en/latest/>`_ as the backend
to retrieve data products and their metadata. The repository mostly contains the frontend configurations to render
the webpage in a user-friendly manner. The code and dependencies are managed through **YARN** (a Javascript package manager).
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
