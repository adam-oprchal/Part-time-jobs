import express from "express";
import {accountController} from "./accountController";
import passport from "passport";
import { isAuthenticated } from "./middleware";

const accountRouter = express.Router();

accountRouter.post('/cv', passport.session(), isAuthenticated, accountController.uploadCv);
accountRouter.post('/register', accountController.register);
accountRouter.post("/login", passport.authenticate("local"), accountController.login);
accountRouter.get("/logout", passport.session(), accountController.logout);
accountRouter.get('/applicants-by-post/:postId', passport.session(), isAuthenticated, accountController.getApplicantsOfPost);
accountRouter.get('/applicants-by-account', passport.session(), isAuthenticated, accountController.getApplicantsOfAccountPosts);
accountRouter.get('/cv', passport.session(), isAuthenticated, accountController.getCv);
accountRouter.get('/cv/:accountId', passport.session(), isAuthenticated, accountController.getForeignCv);
accountRouter.get('/', passport.session(), isAuthenticated, accountController.getUserAccount);
accountRouter.put("/update", passport.session(), isAuthenticated, accountController.update);
accountRouter.put('/change-password', passport.session(), isAuthenticated, accountController.changePassword);
accountRouter.delete('/', passport.session(), isAuthenticated, accountController.delete);
accountRouter.delete('/cv', passport.session(), isAuthenticated, accountController.deleteCv);

export default accountRouter;
