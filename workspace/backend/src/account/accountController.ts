import {accountRepository} from "./accountRepository";
import {Request, Response} from "express";
import { deleteAccountRequestSchema, getAccountByEmailSchema, getAccountByIdSchema, getApplicantsOfAccountPostsSchema, getApplicantsOfPostSchema, registerAccountRequestSchema, uploadCvSchema } from "./accountSchema";
import argon2 from "argon2"
import { Account } from "types";
import handleDbErrors from "./error";
import * as path from "node:path";
import {promises as fs} from "fs";

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

    moveUploadedFile: async (filePath: string, newFilename: string) =>  {
        const fs = require('fs').promises; // Import for file system operations (promises)
        await fs.rename(filePath, path.join(__dirname, '../uploads/', newFilename));
    },

    uploadCv: async (request: Request & {file: any}, response: Response) => {
        console.log('uploadCv');

        // TODO: after authorization is done, replace this with the current logged in user
        const currentUserId = '007144cf-f4f8-479f-864a-fc21ea14a29f'

        if (request.file) {
            const newFilename = currentUserId + '.pdf';
            const fs = require('fs').promises;
            await fs.rename(request.file.path, path.join('../../uploads/cv/', newFilename));

            console.log('File uploaded successfully:', request.file.filename);
        } else {
            console.error('error uploading file');
            response.status(400).send("Bad request")
            return
        }

        const result = await accountRepository.updateCv(currentUserId);
        if (result.isOk) {
            response.status(200).send(result.value)
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    downloadCv: async (request: Request, response: Response) => {
        console.log('downloadCv');

        // TODO: after authorization is done, replace this with the current logged in user
        const currentUserId = '007144cf-f4f8-479f-864a-fc21ea14a29f'

        response.download('../../uploads/cv/', currentUserId + '.pdf');
    }
}
