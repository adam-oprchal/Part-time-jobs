import express from "express";
import {accountController} from "./accountController";

const accountRouter = express.Router();

accountRouter.post('/register', accountController.register);
accountRouter.get('/by-id/:id', accountController.getById);
accountRouter.get('/by-email/:email', accountController.getByEmail);
accountRouter.get('/applicants-by-post/:postId', accountController.getApplicantsOfPost);
accountRouter.get('/applicants-by-account/:id', accountController.getApplicantsOfAccountPosts);
accountRouter.delete('/:id', accountController.delete);
accountRouter.post('/upload-cv', accountController.uploadCv);

export default accountRouter;
