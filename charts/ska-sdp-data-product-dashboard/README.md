# SDP Data Product Dashboard Helm Chart

This helm chart can spin up all requirments for the SDP Data Product Dashboard.

This can include the following:
* SDP Data Product API
* SDP Data Product Dashboard

## Values

| Value                                                          | Type      | Required   | Default                 | Comment                                            |
| -------------------------------------------------------------- | --------- | ---------- | --------------          | -------------------------------------------------- |
| ska_sdp_data_product_dashboard.api.enabled                     | boolean   | Yes        | True                    | Should the API be created                          |
| ska_sdp_data_product_dashboard.api.container                   | string    | Yes        | link                    | The Docker image for the API                       |
| ska_sdp_data_product_dashboard.api.version                     | string    | Yes        | latest                  | The version of the Docker image to use             |
| ska_sdp_data_product_dashboard.api.imagePullPolicy             | string    | Yes        | IfNotPresent            | When should the image be pulled                    |
| ska_sdp_data_product_dashboard.dashboard.enabled               | boolean   | Yes        | False                   | Should the dashboard be created                    |
| ska_sdp_data_product_dashboard.dashboard.container             | string    | Yes        | link                    | The Docker image for the dashboard                 |
| ska_sdp_data_product_dashboard.dashboard.version               | string    | Yes        | latest                  | The version of the Docker image to use             |
| ska_sdp_data_product_dashboard.dashboard.imagePullPolicy       | string    | Yes        | IfNotPresent            | When should the image be pulled                    |
| ska_sdp_data_product_dashboard.dashboard.apiUrl                | string    | Yes        | "http://localhost:8002" | Dashboard URL                                      |


## Example overrides:

Local running with all services:

> The `ska_sdp_data_product_dashboard.api.pvc.hostpath` should be where your local data is mounted.

```yaml
ska_sdp_data_product_dashboard:
  dashboard:
    enabled: true
    apiUrl: "https://api.ska_sdp_data_product_dashboard.ska.org"
  api:
    enabled: true
    pvc:
      enabled: true
      hostPath: /host_data
      hostPathEnabled: true
```



## Example Usage

This assumes you have the following setup:

* Minikube installed
* A hostpath mount (can be done with: `minikube start --mount=true --mount-string=$HOME/tmp/:/host_data/`)

In the base directory of this repo create a `values.yaml` file with the following contents:

```yaml
ska_sdp_data_product_dashboard:
  api:
    pvc:
      hostPath: /host_data
      hostPathEnabled: true
```

That will have the `api` container use a local mounted volume. This will also spin up the API but not the display.

Run the following (uses default namespace):

```bash
helm dependency build charts/ska-sdp-data-product-dashboard --skip-refresh
helm install ska-sdp-data-product-dashboard charts/ska-sdp-data-product-dashboard --values values.yaml --wait
```

After awhile you should see the following as output:

```
NAME: ska-sdp-data-product-dashboard
LAST DEPLOYED: Fri Jun 24 14:42:03 2022
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

You can check the status of the pods with:

```bash
kubectl get pods --all-namespaces
```

And you should see:

```
$ kubectl get pods --all-namespaces
NAMESPACE     NAME                                                    READY   STATUS    RESTARTS      AGE
default       ska-sdp-data-product-dashboard-0                        1/1     Running   0             2m34s
default       ska-sdp-data-product-api-5bcfccd98f-66b72               1/1     Running   0             2m34s
```

To be able to use this setup you can run a port forward with:

```bash
kubectl port-forward -n default ska-sdp-data-product-dashboard-0 8002:8002
```

Which will produce no output, but you should now be able to connect to port 8002 on your local machine and see the dashboard.
