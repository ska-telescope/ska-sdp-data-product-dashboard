# pull the base image
FROM node:18.12.1

ENV PORT 8100

# # set the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

# Remove SKAO speific libraries
RUN npm config set registry https://registry.npmjs.org/ &&\
    yarn remove @ska-telescope/ska-gui-components

# Install standard libraries
RUN npm config set registry https://registry.npmjs.org/ && yarn install && yarn cache clean

# Install the SKAO specific library
RUN npm config set registry https://artefact.skao.int/repository/npm-internal/ &&\
    yarn add @ska-telescope/ska-gui-components@latest &&\
    npm config set registry https://registry.npmjs.org/

COPY . /usr/src/app

EXPOSE 8100

# start app
CMD ["yarn", "start"]