import express from 'express';
import { postController } from './postController';
import passport from 'passport';
import { isAuthenticated } from '../account/middleware';

const postRouter = express.Router();

postRouter.get(
  '/amount',
  passport.session(),
  isAuthenticated,
  postController.getAmountOfPosts
);
postRouter.get('/by-creator/:creatorId', postController.getPostsByCreator);
postRouter.get(
  '/pages',
  passport.session(),
  isAuthenticated,
  postController.getPostsPaginated
);
postRouter.get(
  '/applied',
  passport.session(),
  isAuthenticated,
  postController.getPostsByApplicant
);
postRouter.get(
  '/:id',
  passport.session(),
  isAuthenticated,
  postController.getPost
);
postRouter.get(
  '/',
  passport.session(),
  isAuthenticated,
  postController.getPosts
);

postRouter.delete(
  '/:id',
  passport.session(),
  isAuthenticated,
  postController.deletePost
);
postRouter.put(
  '/:id',
  passport.session(),
  isAuthenticated,
  postController.updatePost
);
postRouter.post(
  '/apply/:postId',
  passport.session(),
  isAuthenticated,
  postController.applyForPost
);
postRouter.post(
  '/unapply/:postId',
  passport.session(),
  isAuthenticated,
  postController.unapplyFromPost
);
postRouter.post(
  '/',
  passport.session(),
  isAuthenticated,
  postController.createPost
);

export default postRouter;
