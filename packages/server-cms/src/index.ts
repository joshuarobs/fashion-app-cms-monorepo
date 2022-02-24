import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import express, { Response } from 'express';
// import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import hbs from 'hbs';
import http from 'http';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

console.log('Node environment:', process.env.NODE_ENV);

// const corsOptions = {
//   origin: '*',
//   credentials: true,
// };
//
// app.use(cors(corsOptions));

// Add Apollo Server to our express server
// const server = new ApolloServer({ typeDefs, resolvers });
// server.applyMiddleware({ app });
// server.applyMiddleware({ app, cors: false });

async function startApolloServer(typeDefs: any, resolvers: any) {
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

  // Create an .env file for the client to get the correct (same) port as this
  // server's to connect to
  // if (process.env.NODE_ENV === 'production') {
  //   const url = path.resolve(__dirname, PATH_PREFIX, '../../client-cms/', '.env');
  //   console.log('.env file path:', url);
  //   console.log('to write with PORT=', PORT);
  //   fs.writeFileSync(url, `REACT_APP_PORT=${PORT}`);
  // } else {
  //   fs.writeFileSync(path.resolve('../client-cms', '.env'), `PORT=6969`);
  // }

  // Have Node serve the files for our built React app
  app.use(express.static(ROOT_PATH));

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });

  // Passport
  const sess = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {},
  };

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    // @ts-ignore
    sess.cookie.secure = true; // serve secure cookies
  }

  app.use(session(sess));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(function (username, password, done) {
      // User.findOne({ username: username }, function (err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false);
      //   }
      //   if (!user.verifyPassword(password)) {
      //     return done(null, false);
      //   }
      //   return done(null, user);
      // });
    })
  );

  // app.engine('hbs', hbs({ extname: '.hbs' }));
  app.set('view engine', 'hbs');

  // Other
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

  function isLoggedIn(req: Express.Request, res: any, next: any) {
    if (req.isAuthenticated()) return next;
    res.redirect('/login');
  }

  // app.use(function (req, res, next) {
  //   // Catches access to all other pages
  //   // console.log('req:', req);
  //   console.log('session:', req.session.id);
  //   if (!req.session) {
  //     // requiring a valid access token
  //     res.redirect('/login');
  //   } else {
  //     next();
  //   }
  // });

  app.get('/login', (req, res) => {
    res.render('login');
  });

  // All other GET requests not handled before will return our React app
  app.get('*', isLoggedIn, (req: any, res: any) => {
    res.sendFile(path.resolve(ROOT_PATH, 'index.html'));
  });

  app.listen(PORT, () => {
    // console.log(`Example app listening at http://localhost:${PORT}`);
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });

  // await new Promise<void>((resolve) =>
  //   httpServer.listen({ port: 4000 }, resolve)
  // );
  // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);

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
