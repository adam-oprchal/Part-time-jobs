import express from "express";
import {accountController} from "./accountController";

const accountRouter = express.Router();

accountRouter.post('/register', accountController.register);
accountRouter.get('/by-id/:id', accountController.getById);
accountRouter.get('/by-email/:email', accountController.getByEmail);

export default accountRouter;
