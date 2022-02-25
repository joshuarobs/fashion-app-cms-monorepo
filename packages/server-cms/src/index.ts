import path from 'path';
import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import express, { Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import hbs from 'hbs';
import bcrypt from 'bcrypt';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';
import { client } from './graphql-client';
import { getStaffUserByPk } from './resolvers/staff_users/getStaffUserByPk';
import { getStaffUserByEmail } from './resolvers/staff_users/getStaffUserByEmail';
import { insertStaffUser } from './resolvers/staff_users/insertStaffUser';

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
  // app.use(express.static(ROOT_PATH));

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
    secret: 'secretsecretsecret',
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

  // @ts-ignore
  app.use(express.urlencoded({ extended: false }));
  // @ts-ignore
  app.use(express.json());

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    // @ts-ignore
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    console.log('deserializeUser');
    // db.findById(id, function (err, user) {
    //   done(err, user);
    // });
    const data = await getStaffUserByPk(id);
    console.log('data:', data);
    done(null, id);
    // if (data) done(null, data);
    // done('Error loading user', false);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      async (email, password, done) => {
        console.log('try to authenticate');
        const userData = await getStaffUserByEmail(email);
        const user = userData[0];
        console.log('user:', user);
        if (!user) return done(null, false);

        bcrypt.compare(password, user.password, (err, res) => {
          if (err) return done(err);
          if (!res) {
            return done(null, false, {
              message: 'Incorrect username or password',
            });
          }
          console.log('done compare');
          return done(null, user);
        });
        // if (!user.verifyPassword(password)) {
        //   return done(null, false);
        // }
        // return done(null, user);
      }
    )
  );

  // Test route to set up a new admin user. It should only be done once, and
  // this code should be removed during production, until a better
  // approach can be mode.
  app.get('/setup', async (req, res, next) => {
    // const exists = await User.exists({ username: "admin" });
    const user = await getStaffUserByEmail('admin');
    console.log('user:', user);

    if (user.length >= 1) {
      console.log('Admin account already exists');
      res.redirect('/login');
      return;
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash('admin', salt, async (err, hash) => {
        if (err) return next(err);

        const newAdmin = await insertStaffUser({
          email: 'admin',
          password: hash,
          name: 'Admin',
          title: 'Admin',
        });

        console.log('Admin account created');
        // newAdmin.save();

        res.redirect('/login');
      });
    });
  });

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

  function isLoggedOut(req: Express.Request, res: any, next: any) {
    if (!req.isAuthenticated()) return next;
    res.redirect('/');
  }

  // app.get('/login', isLoggedOut, (req, res) => {
  //   res.render('login');
  // });

  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.post(
    '/login',
    passport.authenticate('local', {
      session: true,
      successRedirect: '/home',
      failureRedirect: '/login?error=true',
      failureMessage: true,
    })
  );

  // app.post('/login', function (req, res, next) {
  //   passport.authenticate('local', function (err, user, info) {
  //     if (err) {
  //       console.log('err:', err);
  //       return next(err); // will generate a 500 error
  //     }
  //     // Generate a JSON response reflecting authentication status
  //     if (!user) {
  //       return res.status(401).send({
  //         success: false,
  //         message: 'authentication failed',
  //       });
  //     }
  //     req.login(user, function (err) {
  //       if (err) {
  //         return next(err);
  //       }
  //       return res.send({ success: true, message: 'authentication succeeded' });
  //     });
  //   })(req, res, next);
  // });

  // app.post('/login', (req, res) => {
  //   console.log('req.body:', req.body);
  //   console.log('post: /login');
  //   passport.authenticate('local', {
  //     successRedirect: '/home',
  //     failureRedirect: '/login?error=true',
  //   });
  // });

  // Redirect the user to the login page if they aren't logged in.
  // We need to catch the root route, otherwise they can go to this route
  // and access everything without having to log in
  app.get('/', function (req, res) {
    if (!req.isAuthenticated()) res.redirect('/login');
  });

  app.use(express.static(ROOT_PATH));

  // All other GET requests not handled before will return our React app
  app.get('*', isLoggedIn, (req: any, res: any, next: any) => {
    // if (!req.isAuthenticated()) res.redirect('/');
    // if (req.url === '/') res.redirect('/login');
    console.log('req:', req, '| res:', res);
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
