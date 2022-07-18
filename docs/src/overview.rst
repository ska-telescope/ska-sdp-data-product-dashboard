SDP Data Product Dashboard Overview
=============

This is the documentation for the SKA SDP Data Product Dashboard.

This Dashboard is used to list SDP data products (files) that is hosted at a persistent storage or other orchestrated location and make them available to download.

Usage
-----

This usage will assume that you have the repo and submodules checked out.

Basic Usage
~~~~~~~~~~~

Tooling Pre-requisites
~~~~~~~~~~~~~~~~~~~~~~

This project requires **Node** and **YARN** to install and run. To install these follow the instructions for your operating system at [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

Alternatively the official Node docker image can be used. Instructions can be found on the [official Node docker image site](https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image).


## Installation

All the following notes assume you are at the command prompt for your chosen environment.

1.  Confirm Node and YARN are installed and configured correctly, both the following commands should return the relevant version number.

        > node --version
        > yarn --version

2.  Clone the project from GitHub

3.  Install all the necessary project dependencies by running

        > yarn install

Usage
~~~~~
Scripts for running, testing, and building the application are provided as part of the standard configuration. These are run using YARN and listed in the scripts section of the package.json file.

From the project directory, you can run any of the following:

- `> yarn start`

  Runs the app in the development mode at [http://localhost:3000](http://localhost:3000). The app will recompile and restart if you make any edits to the source files. Any linting errors will also be shown in the console.

- `> yarn test`

  Launches the test runner in the interactive watch mode. See the [testing](#testing) section for more information.

- `> yarn build`

  Builds the app for production to the `build` folder. The build is minified and any JSX is transpiled to JavaScript. Your app is ready to be deployed!
 