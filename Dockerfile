# pull the base image
FROM node:alpine

ENV PORT 8100

RUN npm config set registry https://artefact.skao.int/repository/npm-internal/ &&\
    yarn add @ska-telescope/ska-javascript-components@latest &&\
    npm config set registry https://registry.npmjs.org/

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/
RUN yarn install && yarn cache clean

COPY . /usr/src/app

EXPOSE 8100

# start app
CMD ["yarn", "start"]