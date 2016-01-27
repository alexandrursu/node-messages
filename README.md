# Messages API

Welcome to the Messages API. This repository is a RESTful API for managing messages.

### Structure

This repository is split into 3 main sections.

- API : The RESTful API built on Node.js used to list, add, view and remove messages.
- UI : A small UI built on AngularJS to demonstrate the capabilities of the Messages API
- Tests : A Node.js application built with the testosterone package that provides functional testing for the Messages API.


### API Implementation Architecture

The Messages API is a <b>Node.js</b> application that implements the <b>REST</b> architecture to deliver functionality for managing messages. It utilizes the <b>mongoose</b> npm package to connect to a <b>MongoDB</b> database to store the messages. A typical implementation would look like this:

![architecture](https://raw.githubusercontent.com/rjriel/node-messages/master/MessagesAPIArchitecture.png)

### API Documentation

The api documentation can be found at http://rjriel.github.io
