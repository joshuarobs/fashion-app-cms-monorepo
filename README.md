# fashion-app-cms-monorepo
A monorepo for the CMS. It contains the client and server.

# Updating packages
If you are changing anything in the monorepo's `package.json`, simply make 
changes to packages in that file, and run `yarn install` when prompted by 
WebStorm.

If you make changes in any of the monorepo's packages, in this case, either 
the client `client-cms`, the server `server-cms` or components `components`, 
then you have to run a modified of the following command, according to the 
package that you just made the change in:

`lerna bootstrap --scope=@namespace/[package-name]`

Commands to run depending on the package (copy and paste these as needed):
* Client: `lerna bootstrap --scope=@namespace/[client-cms]`
* Server: `lerna bootstrap --scope=@namespace/[server-cms]`
* Components: `lerna bootstrap --scope=@namespace/[components]`

What happens if you don't do this? What happens if you click on the prompt 
by WebStorm and run `yarn install` when making changes to a monorepo package,
aka the client or server? Well, bugs happen. And you don't want that, so 
don't click on the prompt on the bottom right of WebStorm when you make 
changes to npm packages for the server or client. You have to manually run 
the commands above. 

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
DB_ENDPOINT=http://localhost:8090/v1/graphql
DB_ENDPOINT_STAGING=https://fashion-app-db.herokuapp.com/graphql
````

**NOTE:** This file shouldn't ever be committed to the repo. It may cause 
some problems with production configurations.

**NOTE-2:** The port in the first line may be either `8090` or `8080`. Just 
play with the values around if it the client doesn't work. Sometimes I get 
an error as seen here: https://github.com/apollographql/apollo-client/issues/5080

