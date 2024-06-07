import express from "express";
import {accountController} from "./accountController";
import multer from 'multer';

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
accountRouter.get('/by-id/:id', accountController.getById);
accountRouter.get('/by-email/:email', accountController.getByEmail);
accountRouter.get('/applicants-by-post/:postId', accountController.getApplicantsOfPost);
accountRouter.get('/applicants-by-account/:id', accountController.getApplicantsOfAccountPosts);
accountRouter.delete('/:id', accountController.delete);
accountRouter.post('/cv', upload.single('cv'), accountController.uploadCv);

export default accountRouter;
