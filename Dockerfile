# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN yarn install && yarn cache clean

# add app
COPY . ./

EXPOSE 8100

# start app
CMD ["yarn", "start"]