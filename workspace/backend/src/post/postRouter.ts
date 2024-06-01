import express from "express";
import {postController} from "./postController";

const postRouter = express.Router();

postRouter.post('/', postController.createPost);
postRouter.delete('/:id', postController.deletePost);
postRouter.put('/:id', postController.updatePost);
postRouter.get('/amount', postController.getAmountOfPosts);
postRouter.get('/by-creator/:creatorId', postController.getPostsByCreator);
postRouter.get('/by-applicant/:applicantId', postController.getPostsByApplicant);
postRouter.post('/apply/:postId/:applicantId', postController.applyForPost);
postRouter.get('/:id', postController.getPost);
postRouter.get('/', postController.getPostsPaginated);

export default postRouter;