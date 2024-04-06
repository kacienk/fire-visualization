# Installation

Install all necessary dependencies by running:
```sh
  npm install
```

# Development mode

## Prerequisites

In order to make the code more consistent we use Prettier code formatter with configuration provided in the `.prettierrc` file.

## Formatting process
In VSCode set:
 - Default Formatter: Prettier *(firstly install necessary VSCode extension)*
 - Format On Save: on
 - Format On Save Mode: modifications *(we don't want to format code of other collaborators)*

## Running app in development mode

To run app in the development mode you just have to use:
```sh
  npm run serve
```
It will run `webpack` in the server mode with watching changes and then open electron app on each file save.

# Production mode

To run app in the production mode you have to firstly build it:
```sh
  npm run build
```
and then start electron app:
```sh
  npm run electron-start
```