Changelog
=========


Current Development
-------------------

* [Added]  `NAL-1012 <https://jira.skatelescope.org/browse/NAL-1012>`_

  - Addition of link to the Data Product Dashboard documentation.

* [Changed] `NAL-1012 <https://jira.skatelescope.org/browse/NAL-1012>`_

  - Updated documentation structure.
  - Updated the SKAO GUI components and updated all instances where it is used so that they comply with TS.
  - Updated node image in dockerfile and gitlab pipeline.

* [Fixed] `NAL-1012 <https://jira.skatelescope.org/browse/NAL-1012>`_

  - Fixed spelling mistake in PERSISTENT_STORAGE_PATH.

* [Fixed] `NAL-1018 <https://jira.skatelescope.org/browse/NAL-1018>`_

  - Fixed failure to load ivoa translations where the metadata contained capital letters.


Released
========

v0.7.0
------

* [Added] `NAL-416 <https://jira.skatelescope.org/browse/NAL-416>`_ 

  - Add ability to search with multiple key/value pairs without using an Elasticsearch backend.

* [Changed] `NAL-897 <https://jira.skatelescope.org/browse/NAL-897>`_

  - Updates all the dependencies to the latest possible.

* [Changed] `NAL-936 <https://jira.skatelescope.org/browse/NAL-936>`_ 

  - Updated documentation with Elasticsearch deployment info.

* [Fixed] `NAL-897 <https://jira.skatelescope.org/browse/NAL-897>`_ 

  - Added missing REACT_APP_SKA_LOGIN_APP_URL env variable on the Helm chart of the DPD.

* [Fixed] `NAL-934 <https://jira.skatelescope.org/browse/NAL-934>`_ 

  - The DPD has an optional SKA-Login-Page component that is declaratively enabled/disabled from the values files. This enable condition was omitted in error in the chart, so it had no effect. This MR adds it to the template, and has some updates to the packages and webpack config.

v0.6.2
------

* [Change] 

  - Add indexing status to status endpoint.

* [Fixed] `NAL-858 <https://jira.skatelescope.org/browse/NAL-858>`_

  - Fix for load of new data products failures without a refresh.