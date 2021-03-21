# fashion-app-cms-monorepo
A monorepo for the CMS. It contains the client and server.

# Package 1 - Client CMS
# Package 2 - Components (React)
# Package 3 - Server
## `.env` file settings
When cloning the repo, a `.env` file (in the project's root folder) does 
**NOT** come included. Therefore, to avoid any errors with the server 
interacting with the database (during development), you'll need to manually 
create this file.

Simply create a `.env` file in the project root folder with the following 
contents:
````
DB_ENDPOINT=http://localhost:8080/v1/graphql
DB_ENDPOINT_STAGING=https://fashion-app-db.herokuapp.com/graphql
````

**NOTE:** This file shouldn't ever be committed to the repo. It may cause 
some problems with production configurations.
