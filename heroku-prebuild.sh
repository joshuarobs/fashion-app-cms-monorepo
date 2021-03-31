# ----------------------------------------------------------------------
# Heroku prebuild script
# ----------------------------------------------------------------------
# WHAT IS THIS SCRIPT?
#
# This script runs during Heroku deployment prior to the repo
# being built.
# ----------------------------------------------------------------------
# PURPOSE
#
# We are mainly setting up environment variables that are required during
# production. Without these, the app cannot work properly in production,
# even though it may work just fine in development.
# ----------------------------------------------------------------------
# 1. Write the environment variable PACKAGE_TOKEN into the .npmrc file
#    - This is needed to download our private packages from GitHub
#    - The PACKAGE_TOKEN variable is set in the Heroku app for this repo
#    - It should be the same as the one in the GitHub repo
echo //npm.pkg.github.com/:_authToken=${PACKAGE_TOKEN} >> .npmrc && cat .npmrc
# 2. Rewrite the client's .env file to use the database endpoint variable set
# in Heroku
#    - REMEMBER: Update this variable if you ever change the url of the
#    heroku app
echo REACT_APP_DB_ENDPOINT=https://fashion-app-cms.herokuapp.com/graphql >> packages/client-cms/.env
