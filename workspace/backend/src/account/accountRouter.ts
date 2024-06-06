import express from "express";
import {accountController} from "./accountController";
import multer from 'multer';
import passport from "passport";
import { isAuthenticated } from "./middleware";

const accountRouter = express.Router();

// Configure Multer for single file upload
const upload = multer({
    dest: '../../uploads/cv/', // Change this to your desired upload directory
    limits: { fileSize: 5000000 }, // Limit file size to 5MB (optional)
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
});

accountRouter.post('/registration', accountController.register);
accountRouter.post("/login", passport.authenticate("local"), accountController.login);
accountRouter.get("/logout", passport.session(), accountController.logout);

accountRouter.get('/', passport.session(), isAuthenticated, accountController.getUserAccount);
accountRouter.get('/applicants-by-post/:postId', passport.session(), isAuthenticated, accountController.getApplicantsOfPost);
accountRouter.get('/applicants-by-account/:id', passport.session(), isAuthenticated, accountController.getApplicantsOfAccountPosts);

accountRouter.delete('/:id', accountController.delete);
accountRouter.post('/cv', upload.single('cv'), accountController.uploadCv);
accountRouter.get('/cv', accountController.downloadCv);

export default accountRouter;
