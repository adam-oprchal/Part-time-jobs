import express from "express";
import {postController} from "./postController";
import passport from "passport";
import { isAuthenticated } from "../account/middleware";

const postRouter = express.Router();

postRouter.get('/amount', postController.getAmountOfPosts);
postRouter.get('/by-creator/:creatorId', postController.getPostsByCreator);
postRouter.get('/:id', postController.getPost);
postRouter.get('/applied', passport.session(), isAuthenticated, postController.getPostsByApplicant);
postRouter.get('/pages', postController.getPostsPaginated);
postRouter.get('/', postController.getPosts);

postRouter.delete('/:id', passport.session(), isAuthenticated, postController.deletePost);
postRouter.put('/:id', passport.session(), isAuthenticated, postController.updatePost);
postRouter.post('/apply/:postId', passport.session(), isAuthenticated, postController.applyForPost);
postRouter.post('/', passport.session(), isAuthenticated, postController.createPost);

export default postRouter;
