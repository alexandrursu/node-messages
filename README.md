# Messages API

Welcome to the Messages API. This repository is a RESTful API for managing messages.

## Structure

This repository is split into 3 main sections.

- API : The RESTful API built on Node.js used to list, add, view and remove messages.
- UI : A small UI built on AngularJS to demonstrate the capabilities of the Messages API
- Tests : A Node.js application built with the testosterone package that provides functional testing for the Messages API.


## API Implementation Architecture

The Messages API is a <b>Node.js</b> application that implements the <b>REST</b> architecture to deliver functionality for managing messages. It utilizes the <b>mongoose</b> npm package to connect to a <b>MongoDB</b> database to store the messages. A typical implementation would look like this:

![architecture image](https://raw.githubusercontent.com/rjriel/node-messages/master/MessagesAPIArchitecture.png)

## Example

An example of the API is available at http://rjriel-api.elasticbeanstalk.com. This implementation is deployed to the AWS Elastic Beanstalk service using a Dockerfile and stores the messages in a MongoDB hosted by MongoLab.

An example of the UI is available at http://rjriel-ui.elasticbeanstalk.com. This implementation is also deployed to the AWS Elastic Beanstalk service using a Dockerfile and utilizes the API mentioned above.

## Use Cases

Here are some sequence diagrams of the different use cases for this API.

![sequence diagram](https://raw.githubusercontent.com/rjriel/node-messages/master/MessagesAPISequence.png)

## Building and Deployment

The process to build and deploy the API and UI projects have been automated as much as possible. There are two methods of quick deployment.

### Dockerfile

The API and UI projects each contain a Dockerfile that can be used to create a Docker container. For example, these Dockerfiles can be used in Amazon ECS or Amazon Elastic Beanstalk for an easy one step deployment. The Dockerfiles are configured to automatically download the latest source from GitHub, install and build the necessary packages and run the app.

> Note: The UI Dockerfile is configured to use the demo API for this repository (http://rjriel-api.elasticbeanstalk.com/messages/). If you wish to point this to your own API you will have to modify the Dockerfile, which has been commented to indicate where the change should be applied.

> Note: The API Dockerfile is configured to use the demo MongoDB for this repository (mongodb://messages-db:demo@ds049935.mongolab.com:49935/messages). If you wish to point this to your own MongoDB you will have to modify the Dockerfile, which has been commented to indicate where the change should be applied.

### Setup scripts

The root of the repository contains several scripts to automate the build and deployment process. Here is an overview of the setup files.

#### setup.sh

This script will build the API, UI and Tests projects. The script can be run with the following syntax:

    `./setup.sh <mongodb uri> <api endpoint uri> [<run in background>]`

    <mongodb uri> - The URI to the MongoDB where the Messages will be store (eg. mongodb://messages-db:demo@ds049935.mongolab.com:49935/messages)
    <api endpoint uri> - The URI of the API to use (eg. http://rjriel-api.elasticbeanstalk.com/messages/). This string must have a trailing '/'  
    <run in background> - If "true" the API and UI will both be run as background processes, listening on ports 8080 and 8090 respectively.

#### setup_api.sh

This script will build the API project. The script can be run with the following syntax:

    `./setup_api.sh <mongodb uri> [<run in background>]`

    <mongodb uri> - The URI to the MongoDB where the Messages will be store (eg. mongodb://messages-db:demo@ds049935.mongolab.com:49935/messages)
    <run in background> - If "true" the API will be run as a background process, listening on port 8080.

#### setup_ui.sh

This script will build the UI project. The script can be run with the following syntax:

    `./setup.sh <api endpoint uri> [<run in background>]`

    <api endpoint uri> - The URI of the API to use (eg. http://rjriel-api.elasticbeanstalk.com/messages/). This string must have a trailing '/'  
    <run in background> - If "true" the UI will be run as a background process, listening on port 8090.

#### setup_tests.sh

This script will build the Tests project. The script can be run with the following syntax:

    `./setup_tests.sh'

#### run.sh

This script will run the API and UI projects in the background, listening on ports 8080 and 8090 respectively. The script can be run with the following syntax:

    `./run.sh'

#### run_api.sh

This script will run the API project in the background, listening on port 8080. The script can be run with the following syntax:

    `run_api.sh'

If you wish to run the API in the foreground you can use the following syntax:

    `node api/server.js`

#### run_ui.sh

This script will run the UI project in the background, listening on port 8090. The script can be run with the following syntax:

    `./run_ui.sh'

If you wish to run the UI in the foreground you can use the following syntax:

    `http-server -p <port> ui'

    <port> - The port you would like the http server to listen on.

## API Documentation

The api documentation can be found at http://rjriel.github.io
