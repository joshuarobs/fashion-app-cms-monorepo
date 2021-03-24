import path from 'path';
import fs from 'fs';
import express, { Response } from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';

console.log('Node environment:', process.env.NODE_ENV);

const app = express();
const PORT = process.env.PORT || 3001;
// const server = require('http').Server(app);

// Add an extra level up if we're in production, since we need to go 3
// levels up to the `packages/` folder if we're in the build folder (production)
const PATH_PREFIX = process.env.NODE_ENV === 'production' ? '../' : '';

// Calculate the root path to the client cms' built html and js files
const ROOT_PATH = path.resolve(
  __dirname,
  PATH_PREFIX,
  '../../client-cms/build'
);

if (process.env.NODE_ENV === 'production') {
  fs.writeFileSync(path.resolve(ROOT_PATH, '.env'), `PORT=${PORT}`);
}

// Have Node serve the files for our built React app
app.use(express.static(ROOT_PATH));

const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));

// Add Apollo Server to our express server
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
server.applyMiddleware({ app, cors: false });

app.get('/api', (req: any, res: any) => {
  res.json({ message: 'Hello from server!' });
});

app.get('/api/hello', (req: any, res: Response) => {
  res.json({ data: 'Hello from server!' });
});

app.use('/health', (req: any, res: any) => {
  res.status(200).json({
    appName: 'API',
    version: process.env.npm_package_version,
    status: 'OK',
  });
});

// All other GET requests not handled before will return our React app
app.get('*', (req: any, res: any) => {
  res.sendFile(path.resolve(ROOT_PATH, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// The `listen` method launches a web server.
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

//
// server.listen(port, (error: any) => {
//   if (error) {
//     console.log(`
//       \n\n
//       ------------------------------
//       ------------------------------
//       API
//
//       Status: Error
//       Log: ${error}
//       ------------------------------
//       ------------------------------
//       \n\n
//       `
//     );
//   } else {
//     console.log(`
//       \n\n
//       ------------------------------
//       ------------------------------
//       API
//
//       Name: Express API
//       Port: ${port}
//       Status: OK
//       ------------------------------
//       ------------------------------
//       \n\n
//       `
//     );
//   }
// });
