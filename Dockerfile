# pull the base image
FROM node:alpine

ENV PORT 8100

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/

RUN yarn add webpack
RUN yarn add webpack-dev-server
RUN yarn add babel-loader
RUN yarn add @babel/plugin-transform-runtime

RUN yarn install && yarn cache clean

COPY . /usr/src/app

EXPOSE 8100

# start app
CMD ["yarn", "start"]