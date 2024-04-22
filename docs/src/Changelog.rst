Change Log
###########

In development
==============

**Added**

**Changed**

* None
* **BREAKING** None

**Deprecated**

* None

**Removed**

* None

**Fixed**

* `NAL-1018 <https://jira.skatelescope.org/browse/NAL-1018>`_ 

  - Fixed failure to load ivoa translations where the metadata contained capital letters.

**Test Evidence**

* None

**Security**

* None



Released
========

v0.7.0
------

**Added**

* `NAL-416 <https://jira.skatelescope.org/browse/NAL-416>`_ 

  - Add ability to search with multiple key/value pairs without using an Elasticsearch backend.

**Changed**

* `NAL-897 <https://jira.skatelescope.org/browse/NAL-897>`_ 

  - Updates all the dependencies to the latest possible.

* `NAL-936 <https://jira.skatelescope.org/browse/NAL-936>`_ 

  - Updated documentation with Elasticsearch deployment info.

* **BREAKING** None

**Deprecated**

* None

**Removed**

* None

**Fixed**

* `NAL-897 <https://jira.skatelescope.org/browse/NAL-897>`_ 

  - Added missing REACT_APP_SKA_LOGIN_APP_URL env variable on the Helm chart of the DPD.

* `NAL-934 <https://jira.skatelescope.org/browse/NAL-934>`_ 

  - The DPD has an optional SKA-Login-Page component that is declaratively enabled/disabled from the values files. This enable condition was omitted in error in the chart, so it had no effect. This MR adds it to the template, and has some updates to the packages and webpack config.

**Test Evidence**

* None

**Security**

* None


v0.6.2
------

**Added**

**Changed**

* Add indexing status to status endpoint.
* **BREAKING** None

**Deprecated**

* None

**Removed**

* None

**Fixed**

* `NAL-858 <https://jira.skatelescope.org/browse/NAL-858>`_ : Fix for load of new data products failures without a refresh.

**Test Evidence**

* None

**Security**

* None
