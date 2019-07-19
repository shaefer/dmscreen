[![Build Status](https://travis-ci.com/shaefer/dmscreen.svg?branch=master)](https://travis-ci.com/shaefer/dmscreen)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
We then added in Redux
Using Redux we created basic usage of
- Action-Creators
  - Example of document level event handling that can dispatch actions.
- Combined Reducers
- react-grid-system layout example

### `npm i //only required first time.`
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

# Getting Started/Setup

## Configure AWS Credentials to make S3 Calls

Create a credentials file at ~/.aws/credentials on Mac/Linux or C:\Users\USERNAME\\.aws\credentials on Windows

```
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```

## Start the app
run `npm start` in terminal


## Scripts
The scripts are independent projects within this one. They have separate package.json files and are designed as command line tools. Look into their package.json files to see which npm scripts you can run for each tool. The main one is a script to update and expand the base monster json file MonsterJsonUpdater.

run `npm start` will look for an allCreatures.json file in the files directory and process through the json and add any new fields it is programmed to add (such as adding integer fields for each stat) It will output a file with a new name with a date appended to the name to keep things unique. 





