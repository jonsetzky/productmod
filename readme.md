# productmod

A node script which could be used to run mass operations on a MyCashflow web store products.
Hasn't been tested on a live store.

## Configuration

API keys and URLs are configured in the `.env` file. An example file `.env.exmaple` is provided.

## Requirements

- [node](https://nodejs.org/en/download)
- [git](https://git-scm.com/download)
- yarn `npm i -g yarn`

## Installation

```
git clone https://github.com/jonsetzky/productmod
cd productmod
yarn
yarn build
```

## Running tests

First create fixtures from the live store data using `yarn run fixtures`.

```
yarn run fixtures
yarn test
```

## Running

```
yarn build
yarn start
```
