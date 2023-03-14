#!/bin/bash
set -x

# purely for LOCAL setup.

yarn i
export ENVIRONMENT_NAME=local

echo '===Creating database==='
npx sequelize db:drop
npx sequelize db:create 
npx sequelize db:migrate
