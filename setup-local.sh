#!/bin/bash
set -x

# purely for LOCAL setup.
# creates databases and seeds it locally with whatever is available. Never run this anywhere else!!

yarn
export ENVIRONMENT_NAME=local

# all application
echo '===Creating database==='
npx sequelize db:drop
npx sequelize db:create 
npx sequelize db:migrate