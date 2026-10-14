# pull the base image
FROM artefact.skao.int/ska-build-node:1.1.1 AS base

# set the working directory
WORKDIR /app

# install app dependencies (separate layer, cached while lockfile is unchanged)
COPY package.json yarn.lock .npmrc ./
RUN yarn install && yarn cache clean

# copy only the sources required to build the app
COPY tsconfig.json vite.config.ts index.html ./
COPY src/ src/
COPY public/ public/
COPY env_scripts/ env_scripts/
COPY README.md LICENSE ./

RUN yarn build

FROM artefact.skao.int/ska-webserver:1.1.1 AS final

# Copy built files
COPY --from=base --chown=1000:1000 /app/dist/ /usr/share/nginx/html/

# COPY scripts/* /docker-entrypoint.d/
COPY env_scripts/env_config /env_config
COPY env_scripts/env_config.sh /docker-entrypoint.d/
RUN chmod 755 /docker-entrypoint.d/env_config.sh
COPY nginx.yaml ${NGINX_ENVSUBST_TEMPLATE_DIR}/conf.d/
