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
