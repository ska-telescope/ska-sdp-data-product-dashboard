# SKAO SDP Data Product Dashboard

## Description

This repository contains a SKAO modular federated component that is used to list SDP data products (files) and make them available to download.

## Getting Started

## Tooling Pre-requisites

This project requires **Node** and **YARN** to install and run. To install these follow the instructions for your operating system at [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

Alternatively the official Node docker image can be used. Instructions can be found on the [official Node docker image site](https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image).

<!-- - Docker 20.10 or later versions: Install page URL: https://docs.docker.com/engine/install/ -->

## Installation

_All the following notes assume you are at the command prompt for your chosen environment._

1.  Confirm Node and YARN are installed and configured correctly, both the following commands should return the relevant version number.

        > node --version
        > yarn --version

2.  Clone the project from GitHub

3.  Install all the necessary project dependencies by running

        > yarn install

## Usage

Scripts for running, testing, and building the application are provided as part of the standard configuration. These are run using YARN and listed in the scripts section of the package.json file.

From the project directory, you can run any of the following:

- `> yarn start`

  Runs the app in the development mode at default url and port configured in .env file: default url and port configured in .env file: [http://localhost:3000](http://localhost:3000). The app will recompile and restart if you make any edits to the source files. Any linting errors will also be shown in the console.

- `> yarn test`

  Launches the test runner in the interactive watch mode. See the [testing](#testing) section for more information.

- `> yarn build`

  Builds the app for production to the `build` folder. The build is minified and any JSX is transpiled to JavaScript. Your app is ready to be deployed!

## Running the application inside a containder

To run the application using docker, build the docker file in the root directory and run the container exposing port 8100.

```
 docker build -t react-docker .
 docker run -p 8100:8100 react-docker
```

The project will then be accessiable at the url http://localhost:8100/

## Testing

### Running

To run the interactive test runner, execute

    > yarn test

This will also watch the source files and re-run when any changes are detected

To run the tests with coverage, execute

    > yarn test:coverage

**All the tests should pass before merging the code**

## Code Analysis

[ESLint](https://ESLint.org/) and [Prettier](https://prettier.io/) are included as code analysis and formatting tools.
These do not need installing as they're included in `node_modules` by running `yarn init`.

These tools can be run in the command line or integrated into your IDE (recommended).

JavaScript based SKAO projects must comply with the [AirBnB JavaScript Style Guide](https://github.com/airbnb/javascript). These rules are included in this project and ESLint and Prettier are configured to use them.

### Running

To run the analysis tools, execute

    > yarn code-analysis

This will display any errors in the command line. If there are any errors, YARN will exit with a non-zero code, the `-s` argument suppresses this and cleans up the output.

### IDE Integration

#### VS Code

Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-ESLint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions and reload the IDE.

Errors should now show in the editor. `shift + alt + F` will format a file, or you can turn on the format on save setting.

#### JetBrains (WebStorm, IntelliJ IDEA etc.)

ESLint is integrated into the Ultimate versions of all JetBrains IDEs

Prettier can be installed through a [plugin](https://plugins.jetbrains.com/plugin/10456-prettier). Follow the steps [here](https://www.jetbrains.com/help/idea/prettier.html) to configure it.

## Documentation

The documentation generator for this project is available at [SKA SDP Data Product Dashboard’s documentation](https://developer.skao.int/projects/ska-sdp-data-product-dashboard/en/latest/)

### Writing

The documentation can be edited under `./docs/src`. They're written in reStructured text (.rst).

### Building

In order to build the documentation for this specific project, execute the following under ./docs:

    > make html

The documentation can then be consulted by opening the file `./docs/build/html/index.html`

## Roadmap

This project is in very early development, but the following have already been identified to be added:
- Add selection and view of metadata capability
- Add filter based on metadata

## Contributing

Contributions are welcome, please see the SKAO developer portal for guidance. https://developer.skao.int/en/latest/
