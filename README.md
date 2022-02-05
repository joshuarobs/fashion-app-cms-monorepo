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


# Stack and features

Main technologies in this stack included:
* [TypeScript](https://github.com/microsoft/TypeScript)
* [Create React App](https://github.com/facebook/create-react-app)
* [Lerna](https://github.com/lerna/lerna)

Additional technologies include:
* Express
* Eslint
* Jest
* Prettier
* Nodemon

For the server side, we are using Express, but that can be easily swapped out for other frameworks if needed.

Additional CI/CD functionality include:
* Automated testing on commits (via GitHub Actions)
* Config files for easy integration and deployment with Heroku

When deployed to Heroku, the app hosted is the Node.js server, that when
connected to, serves the client and allows usage of the client app on the cloud.

# Usage
Prior to any usage, you should learn the concepts of
[Lerna](https://github.com/lerna/lerna) as the whole monorepo revolves
around this library. Otherwise if you don't, you may not fully understand
the structure of the monorepo and how it operates.

1. Clone the repo or simply paste all the files into an existing or newly created repo
2. Run `yarn install`
3. Run `yarn bootstrap`
4. Run `yarn start`

It should then proceed to open a new window in your browser on
`localhost:3000` where you should see a working page. If the client
successfully connected to the server, you should see a `Hello from server!`
text appear below the title. If it's stuck on `Loading...`, then the client
somehow can't access the server.

## Future usage
After the initial setup, you can run the other commands for additional
functionality.

### `yarn build`
The build script can be called manually to build all the packages and create
output JavaScript files based on the TypeScript files. The output files are
generated in each package, in a `build/` folder.

This is also called automatically when needed during CI/CD.

### `yarn start`
When doing development, you'll be running this as usual. This should run all
the packages together, where you'll have both the client and server deployed
at the same time. The client can then interact with the server.

The client runs on `localhost:3000`. The server runs on `localhost:3001` but
will only work if the project was built at least once before with `yarn
build` (see above). Checking the server gives you an idea of how it will
look/behave during actual deployment. Create React App hot reloading will
only work on port `3000`.

Development UX was considered into this monorepo, so that any changes to the
client or server should automatically build and you can see live changes in
the browser. Client hot reloading is handled by Create React App, whereas
server reloading is handled by Nodemon.

### `yarn test`
Tests for all the packages can be run at any time with this command.

### How to add npm packages?
I hardly use yarn to add npm packages, since it may mess with Lerna.

Typically if I want to add a npm package, it's for a single package.

Definition of npm package versus Lerna package:
1. npm package: A typical npm package that's installed via `npm` or `yarn` in the `node_modules/` folder. If you've worked with node.js before, you already know what this is.
2. Lerna "package": Basically a sub-repo within this monorepo. These are the folders inside the `project/packages/` folder.

The folder structure for your packages would look something like:
````
packages/
  client/
  components/
  server/
````

So in this example, you have 3 Lerna "packages", or 3 sub-repos. You will normally have hundreds of ordinary npm packages sitting in various `node_modules/` folders throughout the monorepo. There's a `node_modules/` folder in each package/sub-repo, and one in the project root, for the monorepo itself.

#### Adding an npm package normally in a typical repo
Normally you'd just run `npm install [package-name]` or `yard add [package-name]`. This isn't a typical repo, since this is a monorepo. First, we are using yarn so might as well use yarn for this monorepo. Second, Lerna likes to do most of the management between various packages and their dependencies. It's very messy. That's why we hardly ever want to use the `npm` or `yarn` commands.

Instead we'll be using `lerna`, as described in more detail below.

#### Adding an npm package in a lerna monorepo
How do we do it? Simply with `lerna add [package-name]`. But that's not good, we want more specific commands:

##### If you want to add a package to a specific sub-repo/package:

`lerna add [package-name] --scope=[@namespace/package]`

The scope is important, as we want to only install a specific npm package into that package/sub-repo.

Where do we get the scope name? It's not the folder name, but instead the `"name"` value inside that package's `package.json` file.

In this monorepo, the name for the client, would be `@namespace/client-cms` or something similar to that.

A full example command would be:

`lerna add lodash --scope=@namespace/client-cms`

You can add the `--dev` flag at the end to add it as a development dependency. It'll get added to the appropriate dev dependency section of the package's `package.json` file.

**Note:** especially with an IDE, you may need to also add the typescript types to the package. But you'll need to run it with the `--dev` flag.

For example:

`lerna add @types/pino --scope=@namespace/server-cms --dev`


##### If you want to add a package to the monorepo itself

You have to run `yarn add [package-name] -W` within the root project directory. If you don't add the `-W` flag, it won't let you do it, and it'll ask you to type in the same command again but with that flag.

Some use cases I used this with are related to configuring `eslint` with the whole repo, such as:
````
yarn add eslint-config-airbnb-typescript --dev -W
yarn add @typescript-eslint/parser --dev -W
````

### How do I fix npm packages in lerna packages?
Sometimes you just tinker around and end up manually updating the versions in a package's `package.json` file and run `yarn install`. This behaviour may break Lerna and make things buggy.

So how do we fix this? After doing any sort of manual fixing/updating of npm packages, we use the `lerna bootstrap` command.

In a package/sub-repo that you made manual changes to the npm packages in, run:

`lerna bootstrap --scope=[package-name]`

Again, ensure that in the scope field, you enter the package name, which is found in the package's `package.json` file, under the `"name"` field.

A working example command would look like:

`lerna bootstrap --scope=@namespace/client-cms`

This basically runs yarn's install functionality, but also manages lerna's records of the different npm packages, their versions and where they are installed.

You can always run `lerna boostrap` itself without a `--scope` flag, that can work too, and it "fixes" all the packages in the monorepo.

#### TODO: What about deleting packages?
I can't fully remember at this time of writing, but I think you can just `yarn remove` the package you want, then just run `lerna bootstrap` afterwards to "fix it". Lerna unfortunately doesn't have a `lerna remove` function at this point of time, idk why. See the issue on the lerna repo here: https://github.com/lerna/lerna/issues/1886

## CI/CD with Heroku
This project can be automatically deployed on a Heroku application. Simply
head to your Heroku app, go to the `Deploy` tab, then enable Automatic
Deploys. Tick the `Wait for CI to pass before deploy` option too.

By default this will deploy the `server/` package on the app.

# Use cases for this boilerplate
This boilerplate was originally intended to be used for a "fullstack" client for a web application. I needed a way to have both the front end code (React) be in the same repo as the server code (middleware GraphQL client, Apollo). My "client server" is a server that primarily handled database interactions on behalf of the database itself, that served the web app (client). Thus I required a monorepo to put the two original repos (client + server) together as they require each other for deployment.

The monorepo is intended to be deployed on Heroku, but is limited to only 1 of the packages that can be deployed. See limitations section below.

Additional packages can be added to the boilerplate, such as:
* [Storybook](https://github.com/storybookjs/storybook) prototyping
* Other side clients and servers
* etc.

# Limitations
## 1. Uses Lerna and yarn for monorepo functionality
I typically used npm entirely for my previous projects, but now I'll have to stick with yarn as this whole setup requires the use of yarn's workspace feature.

[Lerna](https://github.com/lerna/lerna) is required for monorepo functionality in general for Javascript based projects.

You may want to learn how these technologies work.

## 2. Heroku can only deploy 1 package
*Note: This limitation only applies if you're deploying on Heroku normally*

Given how Heroku deploys projects automatically via a `Procfile`, Heroku is only able to deploy 1 package (application) of this monorepo. That is, if you were to have a main client (React) and another sub-client (React), which both would be in their own individual packages, you'd have to pick which of the two you would like to deploy. What gets deployed is what's described in the `Procfile`.

The contents of the `Procfile` are:
````
web: node packages/server/build/src/index.js
````

That means when the Heroku app gets deployed, we are running on the web the node.js application, which is our "main" server. If we were to have another server, it probably wouldn't work, and you'd have to change what `index.js` file should be chosen to be operated. So while you can have multiple packages that have an `index.js` file, only one at a time can be chosen to be operated. One repo = one application, for Heroku. And in this setup, this monorepo is counted as a single repo.

Caveats: It's probably possible to run a database alongside this, but I haven't attempted to do so to add that in this boilerplate as my usecase doesn't require having a database included in the client-server monorepo.

Also on a side note, there may be a way to select a different `index.js` file, or a `Procfile` (assuming multiple of these) in Heroku with this buildpack: https://elements.heroku.com/buildpacks/lstoll/heroku-buildpack-monorepo

I haven't tried to configure Heroku with that buildpack, so I wouldn't know if it works or not, and if it's even viable to do so.

Naturally, if you aren't going to use Heroku, and will deploy this manually with other provides such as aws, then you can obviously choose to deploy whatever packages you wish.

## 3. TypeScript is required
I originally made this with the intention to work with TypeScript. As far as I'm concerned, there isn't any easy way to adjust this monorepo such that it'd work without TypeScript (vanilla JavaScript). I suppose you could just write normal JavaScript in the `.ts` files as TypeScript is a superset of JavaScript. Or you can instead learn TypeScript, which I think is the better option since it comes with more features and makes code completion and refactoring easier.

## 4. The build script for the server may fail if on Windows
The build script of the server is called automatically when the whole
monorepo's build script is called (via `yarn build` in the root directory).
The command `rm -rf build/` is called prior to compiling the TypeScript
files to clean the `build/` folder of old files. This command may not work
on Windows.
