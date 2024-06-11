import express from 'express';
import * as path from 'path';
import postRouter from './post/postRouter';
import accountRouter from './account/accountRouter';
import passport from 'passport';
import { passportStrategy } from './account/passportStrategy';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { redisClient } from './redisClient';
import { User } from './types';
import cors from 'cors';

const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

passport.use(passportStrategy());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
    store: new RedisStore({ client: redisClient, prefix: 'x-session:' }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((_user, cb) => {
  process.nextTick(() => {
    const user = _user as User;
    return cb(null, {
      id: user.id,
      email: user.email,
    });
  });
});

passport.deserializeUser((_user, cb) => {
  process.nextTick(() => {
    const user = _user as User;
    return cb(null, user);
  });
});

app.use('/api/v1/account', accountRouter);
app.use('/api/v1/post', postRouter);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
