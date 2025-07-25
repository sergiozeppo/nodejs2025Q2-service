# Home Library Service

## Description

Home Library Service is a RESTful API built with Node.js and NestJS that allows users to manage their personal music collection. It provides functionality to create, retrieve, update, and delete data related to artists, tracks, and albums, as well as mark favorites in a user’s own home library.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

Before starting the app you can change port in the **.env** file.
By default its value defined to 4000.

```
PORT=4000
```

After that you can start the app using:

```
npm start
```

After starting the app you can open in your browser OpenAPI documentation
by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## API Documentation

The API docs is generated with Swagger (OpenAPI) and available at:

```
http://localhost:4000/doc
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
