# pull the base image
FROM node:18.12.1

ENV PORT 8100

# # set the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /usr/src/app/

# Install the SKAO specific library
RUN npm config set registry https://artefact.skao.int/repository/npm-internal/ &&\
    yarn add @ska-telescope/ska-javascript-components@latest 

# Install standard libraries
RUN npm config set registry https://registry.npmjs.org/ && yarn install && yarn cache clean

COPY . /usr/src/app

EXPOSE 8100

# start app
CMD ["yarn", "start"]