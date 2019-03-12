#!/bin/bash

# Wait for mongo to be up and waiting for connections
./wait-for-it.sh mongo:27017

cd src/

# Install project modules
echo "------------------------------- Install modules ------------------------------- "
npm install

echo "------------------------------- Starting server-------------------------------"
# Start server
if [ "$ENVIRONMENT" == "development" ]
then
    node_modules/nodemon/bin/nodemon.js bin/www
elif [ "$ENVIRONMENT" == "test" ]
then
    npm run test
fi