import express from "express";
import {postController} from "./postController";

const postRouter = express.Router();

postRouter.post('/', postController.createPost);

export default postRouter;