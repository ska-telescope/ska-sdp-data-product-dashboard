# pull the base image
FROM node:18.17.0

ENV PORT 8100

# # set the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile

COPY . /usr/src/app

EXPOSE 8100

# start app
CMD ["yarn", "start"]