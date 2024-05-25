import {accountRepository} from "./accountRepository";
import {Request, Response} from "express";
import { deleteAccountRequestSchema, getAccountByEmailSchema, getAccountByIdSchema, getApplicantsOfAccountPostsSchema, getApplicantsOfPostSchema, registerAccountRequestSchema, uploadCvSchema } from "./accountSchema";
import argon2 from "argon2"
import { Account } from "types";
import handleDbErrors from "./error";

export const accountController = {
    register: async (request: Request, response: Response) => {
        const validRequest = await registerAccountRequestSchema.safeParseAsync(request);
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
            response.status(201).send(result.value)
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    getById: async (request: Request, response: Response) => {
        const validRequest = await getAccountByIdSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const result = await accountRepository.getById(validRequest.data.params.id);

        if (result.isOk) {
            response.send(result.value)
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    getByEmail: async (request: Request, response: Response) => {
        const validRequest = await getAccountByEmailSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const result = await accountRepository.getByEmail(request.params.email);

        if (result.isOk) {
            response.send(result.value)
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    getApplicantsOfPost: async (request: Request, response: Response) => {
        const validRequest = await getApplicantsOfPostSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const result = await accountRepository.getApplicantsOfPost(validRequest.data.params.postId);

        if (result.isOk) {
            response.send(result.value)
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    getApplicantsOfAccountPosts: async (request: Request, response: Response) => {
        const validRequest = await getApplicantsOfAccountPostsSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const result = await accountRepository.getApplicantsOfAccountPosts(validRequest.data.params.id);

        if (result.isOk) {
            const foundUsers = new Map<string, Omit<Account, "passwordHash">[]>();
            result.value.forEach((value, key) => foundUsers.set(key, value))
            response.send(foundUsers)
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    delete: async (request: Request, response: Response) => {
        const validRequest = await deleteAccountRequestSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const result = await accountRepository.delete(validRequest.data.params.id);

        if (result.isOk) {
            response.status(204).send()
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    uploadCv: async (request: Request, response: Response) => {
        const validRequest = await uploadCvSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const {fileName, accountId} = validRequest.data.body;

        const result = await accountRepository.updateCv({fileName, accountId});

        if (result.isOk) {
            response.status(201).send(result.value)
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },
}
