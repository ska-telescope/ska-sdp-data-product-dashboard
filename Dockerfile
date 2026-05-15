# pull the base image
FROM artefact.skao.int/ska-build-node:0.3.1 AS base

# set the working directory
WORKDIR /app
COPY . .

# install app dependencies and build the app
RUN yarn install && yarn cache clean
RUN yarn build

FROM artefact.skao.int/ska-webserver:0.2.1 AS final

# Copy built files
COPY --from=base /app/dist/ /usr/share/nginx/html/

# COPY scripts/* /docker-entrypoint.d/
COPY env_scripts/env_config /env_config
COPY env_scripts/env_config.sh /docker-entrypoint.d/
COPY env_scripts/set_absolute_paths.sh /docker-entrypoint.d/
RUN chmod 777 /docker-entrypoint.d/env_config.sh
RUN chmod 777 /docker-entrypoint.d/set_absolute_paths.sh
COPY nginx.yaml ${NGINX_ENVSUBST_TEMPLATE_DIR}/conf.d/
