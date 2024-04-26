import {accountRepository} from "./accountRepository";
import {Request, Response} from "express";
import { getUserByEmailSchema, getUserByIdSchema, registerUserRequestSchema } from "./accountSchema";
import argon2 from "argon2"

export const accountController = {
    register: async (request: Request, response: Response) => {
        const validRequest = await registerUserRequestSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const {firstName, surname, email, password, passwordAgain} = validRequest.data.body

        if (password !== passwordAgain) {
            response.status(400).send("passwords differ")
            return
        }

        const passwordHash = await argon2.hash(password);

        const result = await accountRepository.create({
            firstName, surname, email, passwordHash
        });

        if (result.isOk) {
            const { passwordHash, ...createdUser } = result.value
            response.send(createdUser)
        } else {
            response.status(400).send("database error")
        }
    },

    getById: async (request: Request, response: Response) => {
        const validRequest = await getUserByIdSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const result = await accountRepository.getById(request.params.id);

        if (result.isOk) {
            const { passwordHash, ...foundUser } = result.value
            response.send(foundUser)
        } else {
            response.status(400).send("database error")
        }
    },

    getByEmail: async (request: Request, response: Response) => {
        const validRequest = await getUserByEmailSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const result = await accountRepository.getByEmail(request.params.email);

        if (result.isOk) {
            const { passwordHash, ...foundUser } = result.value
            response.send(foundUser)
        } else {
            response.status(400).send("database error")
        }
    }
}
