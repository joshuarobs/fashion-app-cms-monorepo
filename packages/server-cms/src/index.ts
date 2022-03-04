import path from 'path';
import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import express, { Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import cors from 'cors';
import hbs from 'hbs';
import bcrypt from 'bcrypt';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';
import { getStaffUserByPk } from './resolvers/staff_users/getStaffUserByPk';
import { getStaffUserByEmail } from './resolvers/staff_users/getStaffUserByEmail';
import { insertStaffUser } from './resolvers/staff_users/insertStaffUser';
import { Apollo_Server_Context_Auth_Check_Enabled_For_Development } from './settings';

// const __dirname = dirname(__filename);

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

console.log('Node environment:', process.env.NODE_ENV);

enum Routes {
  Login = '/login',
  Logout = '/logout',
  Home = '/home',
  Api_User = '/api/user',
}

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  const PORT = process.env.PORT || 3001;

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

  app.use(
    cors({
      // origin: 'http://localhost:3001',
      origin: '*',
      credentials: true, // <= Accept credentials (cookies) sent by the client
    })
  );

  // @ts-ignore
  app.use(express.urlencoded({ extended: false }));
  // @ts-ignore
  app.use(express.json());

  app.use(passport.initialize());
  app.use(passport.session());

  /*
   * Initialise the ApolloServer stuff AFTER initialising passport or else
   * we won't be able to access the user data in `req`.
   * https://stackoverflow.com/questions/57047250/passport-user-not-available-from-req-inside-apollo-resolver
   */
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req, res }) => {
      /*
       * Check for a logged-in user to make ANY query
       * Therefore, the MINIMUM requirement to call ANY query is a logged-in
       * user
       * NOTE: This should only be done during production
       */
      if (process.env.NODE_ENV === 'production') {
        console.log('Apollo server context | user:', req.user);
        const { user } = req;
        if (!user) throw new AuthenticationError('No user logged in');
        return { user };
      } else if (Apollo_Server_Context_Auth_Check_Enabled_For_Development) {
        /*
         * For development testing only, we can use a John Doe placeholder
         * user, since we can't log in and have a session token when making
         * queries from localhost:3000.
         */
        return {
          user: {
            id: 4,
            email: 'admin@gmail.com',
            name: 'Admin',
            title: 'Admin',
            last_online: null,
          },
        };
      }
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  passport.serializeUser((user, done) => {
    // console.log('serializeUser');
    // console.log('user:', user);
    // @ts-ignore
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    console.log('deserializeUser');
    // db.findById(id, function (err, user) {
    //   done(err, user);
    // });
    const data = await getStaffUserByPk(id);
    // console.log('data:', data);
    // done(null, data);
    if (data) {
      // console.log('should work?', data);
      // console.log('data.id:', data.id);
      done(null, data);
    } else {
      done('Error loading user', false);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        // console.log('REQ!:', req.body.user);
        // console.log('email:', email, '| password:', password);
        // console.log('try to authenticate');
        const userData = await getStaffUserByEmail(email);
        const user = userData[0];
        // console.log('user:', user);
        if (!user) return done(null, false);

        bcrypt.compare(password, user.password, (err, res) => {
          if (err) return done(err);
          if (!res) {
            return done(null, false, {
              message: 'Incorrect username or password',
            });
          }
          // console.log('done compare');
          return done(null, user);
        });
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
      res.redirect(Routes.Login);
      return;
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash('DJg2j2BuBjHtQ4De', salt, async (err, hash) => {
        if (err) return next(err);

        const newAdmin = await insertStaffUser({
          email: 'admin',
          password: hash,
          name: 'Admin',
          title: 'Admin',
        });

        console.log('Admin account created');
        // newAdmin.save();

        res.redirect(Routes.Login);
      });
    });
  });

  // app.engine('hbs', hbs({ extname: '.hbs' }));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  app.get(Routes.Api_User, (req, res) => {
    if (req.isAuthenticated()) {
      const { user } = req;
      /*
       * Since we can't seem to delete the password field, or even attempt
       * to filter it out via variable spreading, we'll have to manually put
       * in the fields we want in a custom object (everything but the pw)
       * and then send that object instead.
       * NOTE: If you ever add more fields to the user table in the
       * database, be sure to add it here (if not sensitive data).
       */
      const newUser = {
        // @ts-ignore
        id: user.id,
        // @ts-ignore
        email: user.email,
        // @ts-ignore
        name: user.name,
        // @ts-ignore
        title: user.title,
        // @ts-ignore
        last_online: user.last_online,
        // @ts-ignore
        avatar_url: user.avatar_url,
      };
      res.json(newUser);
    } else {
      res.json({ message: 'Not logged in.' });
    }
  });

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
    if (req.isAuthenticated()) {
      return next;
    } else {
      res.redirect(Routes.Login);
    }
  }

  function isLoggedOut(req: Express.Request, res: any, next: any) {
    if (!req.isAuthenticated()) {
      return next;
    } else {
      res.redirect('/home');
    }
  }

  app.get(Routes.Login, (req, res) => {
    res.render('login');
  });

  app.post(
    Routes.Login,
    passport.authenticate('local', {
      session: true,
      successRedirect: '/home',
      // failureRedirect: '/login?error=true',
      failureMessage: true,
    })
  );

  app.get(Routes.Logout, function (req, res) {
    req.logout();
    res.redirect(Routes.Login);
  });

  // Redirect the user to the login page if they aren't logged in.
  // We need to catch the root route, otherwise they can go to this route
  // and access everything without having to log in
  app.get('/', function (req, res) {
    if (!req.isAuthenticated()) {
      res.redirect(Routes.Login);
    }
  });

  app.use(express.static(ROOT_PATH));

  // All other GET requests not handled before will return our React app
  // app.get('*', isLoggedIn, (req: any, res: any, next: any) => {
  app.get('*', (req: any, res: any, next: any) => {
    console.log(
      'all star | isAuthenticated:',
      req.isAuthenticated(),
      '| url:',
      req.url
    );
    // if (!req.isAuthenticated()) res.redirect('/');
    if (req.url === '/') {
      console.log('go to login 1');
      res.redirect(Routes.Login);
    }
    // console.log('req:', req, '| res:', res);
    // res.sendFile(path.resolve(ROOT_PATH, 'index.html'));
    if (!req.isAuthenticated()) {
      if (req.url !== Routes.Login) {
        console.log('go to login 2');
        res.redirect(Routes.Login);
      }
    } else {
      console.log('send file');
      res.sendFile(path.resolve(ROOT_PATH, 'index.html'));
    }
  });

  app.listen(PORT, () => {
    // console.log(`Example app listening at http://localhost:${PORT}`);
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });

  // Apollo server
  // await new Promise<void>((resolve) =>
  //   httpServer.listen({ port: 4000 }, resolve)
  // );
  // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers).then();
