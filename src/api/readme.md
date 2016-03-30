# Smart API

## Installation

1. Install grunt-cli `npm install -g grunt-cli`
2. Run `npm install` from this directory.
3. Run `typings install` from this directory


## Running
run: tsc src/rest/main
run: node src/rest/main.js


### Debug
run: node-debug src/rest/main.js

## Deploying on Heroku

Run 

    git push heroku `git subtree split --prefix src/api/ master`:master --force

on top level folder
