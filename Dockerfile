# pull the base image
FROM node:20.11.1 as base

# # set the working direction
WORKDIR /app
COPY . .

# install app dependencies
RUN yarn install && yarn cache clean

EXPOSE 8100

# start app
CMD ["yarn", "start"]

FROM base as builder

RUN ENV_TYPE_FILE=env_scripts/env_config \
    ENV_JS_OUTPUT_LOCATION=src/env.ts \
        bash env_scripts/env_config.sh ts && \
    yarn webpack build \
    --mode production \
    --optimization-concatenate-modules \
    --optimization-minimize \
    --output-clean \
    --output-path /dist/ && \
    npx react-inject-env set -d /dist/

FROM nginx:1.27.0 as final

# Copy built files
COPY env_scripts/env_config /env_config
COPY env_scripts/env_config.sh /docker-entrypoint.d/
RUN chmod 777 /docker-entrypoint.d/env_config.sh
COPY --from=builder /dist/* /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf