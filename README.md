# SKA SDP Data Product Dashboard

## Description

This repository contains a SKAO modular federated component that is used to list SDP data products (files) and make them available to download.

## Documentation

Please see the latest project documentation on RTD: https://developer.skao.int/projects/ska-sdp-data-product-dashboard/en/latest/?badge=latest

## Install the SKAO specific library  (TODO : Move this into the standard documentation)

1. npm config set registry https://artefact.skao.int/repository/npm-internal/

2. yarn add @ska-telescope/ska-javascript-components@latest

3. npm config set registry https://registry.npmjs.org/

## Contributing

Contributions are welcome, please see the SKAO developer portal for guidance. https://developer.skao.int/en/latest/

Running and Building the Application
Scripts for running, testing, and building the application are provided as part of the standard configuration. These are run using YARN and listed in the scripts section of the package.json file.
From the project directory, you can run any of the following:


`> yarn start`
Runs the app in the development mode at http://localhost:8100. The app will recompile and restart if you make any edits to the source files. Any linting errors will also be shown in the console.


`> yarn cypress`

Launches Cypress which has been set up to provide component testing.   For further information on the use of Cypress, see https://docs.cypress.io/guides/component-testing/overview


`> yarn test`
Launches the test runner in the interactive watch mode. See the testing section for more information.


`> yarn build`
Builds the app for production to the build folder. The build is minified and any JSX is transpiled to JavaScript. Your app is ready to be deployed!



Running the application inside a container

## Project status

In development.
