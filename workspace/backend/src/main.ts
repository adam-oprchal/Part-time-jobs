/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import postRouter from "./post/postRouter";
import accountRouter from './account/accountRouter';
import passport from "passport";
import { passportStrategy } from './account/passportStrategy';
import session from "express-session";
import RedisStore from "connect-redis";
import { redisClient } from "./redisClient";

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(passportStrategy());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
    store: new RedisStore({ client: redisClient, prefix: "x-session:" }),
  })
);

app.use('/api/v1/account', accountRouter);
app.use('/api/v1/post', postRouter);

app.use(function(err, req, res, next) {
  console.error(err)
  res.status(500);
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
