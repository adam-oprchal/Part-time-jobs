import express from "express";
import {accountController} from "./accountController";

const accountRouter = express.Router();

accountRouter.post('/register', accountController.register);

export default accountRouter;
