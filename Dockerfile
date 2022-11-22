# pull the base image
FROM node:alpine

ENV PORT 8100

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/
RUN yarn install && yarn cache clean

COPY . /usr/src/app

EXPOSE 8100

# start app
CMD ["yarn", "start"]