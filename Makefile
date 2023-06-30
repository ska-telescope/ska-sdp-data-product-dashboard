## The following should be standard includes
# include core makefile targets for release management
-include .make/base.mk
-include .make/docs.mk
-include .make/oci.mk
-include .make/helm.mk
-include .make/k8s.mk

# include your own private variables for custom deployment configuration
-include PrivateRules.mak

# Make production deployment to allow application to be run with Helm and Nginx image
production-deploy:
	cp -R public /dist/
	yarn webpack build --optimization-concatenate-modules --mode production --optimization-minimize --output-clean --output-path /dist/

# DP Cluster shared PV setup
## Check if the pvc exists if it does:
## 		Check if the PV exists, if not create it copying from the main shared PV
## 	else:
## 		create both PVC and PV
define DP_PVC
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shared
  namespace: ${KUBE_NAMESPACE}
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: $${SHARED_CAPACITY}
  storageClassName: ""
  volumeMode: Filesystem
  volumeName: dpshared-${KUBE_NAMESPACE}
endef
export DP_PVC

k8s-pre-install-chart:
	kubectl delete --now --force --ignore-not-found pv/dpshared-${KUBE_NAMESPACE} || true ;\
	make k8s-namespace
	apt-get update && apt-get install gettext -y
	if [[ "$(CI_RUNNER_TAGS)" == *"ska-k8srunner-dp"* ]] || [[ "$(CI_RUNNER_TAGS)" == *"ska-k8srunner-dp-gpu-a100"* ]] ; then \
	kubectl -n $(KUBE_NAMESPACE) get pvc shared > /dev/null 2>&1 ; \
	K_PVC=$$? ; \
		if [ $$K_PVC -ne 0 ] ; then \
			export SHARED_CAPACITY=$(shell kubectl get pv/dpshared -o jsonpath="{.spec.capacity.storage}") ; \
			echo "$${DP_PVC}" | envsubst | kubectl -n $(KUBE_NAMESPACE) apply -f - ;\
		fi ;\
	kubectl get pv dpshared -o json | \
	jq ".metadata = { \"name\": \"dpshared-${KUBE_NAMESPACE}\" }" | \
	jq ".spec.csi.volumeHandle = \"dpshared-${KUBE_NAMESPACE}-cephfs-pv\"" | \
	jq 'del(.spec.claimRef)' | \
	jq 'del(.status)' | \
	kubectl apply -f - ; \
	elif [[ "$(CI_RUNNER_TAGS)" == *"k8srunner"* ]] || [[ "$(CI_RUNNER_TAGS)" == *"k8srunner-gpu-v100"* ]] ; then \
		echo "techops not implemented yet!" ;\
	fi
