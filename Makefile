## The following should be standard includes
# include core makefile targets for release management
-include .make/base.mk
-include .make/oci.mk
-include .make/helm.mk
-include .make/k8s.mk

# include your own private variables for custom deployment configuration
-include PrivateRules.mak

# Make production deployment to allow application to be run with Helm and Nginx image
production-deploy:
	cp -R public /dist/
	yarn webpack build --optimization-concatenate-modules --mode production --optimization-minimize --output-clean --output-path /dist/

dev-local-env:
	-rm public/env.js src/env.ts
	ENV_TYPE_FILE=env_scripts/env_config \
	ENV_JS_OUTPUT_LOCATION=public/env.js \
		bash env_scripts/env_config.sh js
	ENV_TYPE_FILE=env_scripts/env_config \
	ENV_JS_OUTPUT_LOCATION=src/env.ts \
		bash env_scripts/env_config.sh ts

# DP Cluster shared PV setup
## Delete the existing PVC and PV. Note that this is safe as the PV is shared clusterwide
## Recreate the PV and PVC before installing the app
define DP_PVC
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shared-mnl
  namespace: ${KUBE_NAMESPACE}
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: $${SHARED_CAPACITY}
  storageClassName: ""
  volumeMode: Filesystem
  volumeName: dpshared-${KUBE_NAMESPACE}-mnl
endef
export DP_PVC

k8s-pre-install-chart-car: k8s-pre-install-chart
k8s-pre-install-chart:
	if [[ "$(CI_RUNNER_TAGS)" == *"ska-k8srunner-dp"* ]] || [[ "$(CI_RUNNER_TAGS)" == *"ska-k8srunner-dp-gpu-a100"* ]] ; then \
	make k8s-namespace ;\
	kubectl -n ${KUBE_NAMESPACE} delete --now --ignore-not-found pvc/shared-mnl || true ;\
	kubectl delete --now --ignore-not-found pv/dpshared-${KUBE_NAMESPACE}-mnl || true ;\
	apt-get update && apt-get install gettext -y ;\
	export SHARED_CAPACITY=$(shell kubectl get pv/dpshared-dp-shared-mnl -o jsonpath="{.spec.capacity.storage}") ; \
	echo "$${DP_PVC}" | envsubst | kubectl -n $(KUBE_NAMESPACE) apply -f - ;\
	kubectl get pv dpshared-dp-shared-mnl -o json | \
	jq ".metadata = { \"name\": \"dpshared-${KUBE_NAMESPACE}-mnl\" }" | \
	jq ".spec.csi.volumeHandle = \"dpshared-${KUBE_NAMESPACE}-mnlfs-pv\"" | \
	jq 'del(.spec.claimRef)' | \
	jq 'del(.status)' | \
	kubectl apply -f - ; \
	elif [[ "$(CI_RUNNER_TAGS)" == *"k8srunner"* ]] || [[ "$(CI_RUNNER_TAGS)" == *"k8srunner-gpu-v100"* ]] ; then \
		echo "techops not implemented yet!" ;\
	fi

# k8s-post-install-chart: k8s-namespace-credentials
