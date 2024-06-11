import {accountRepository} from "./accountRepository";
import {NextFunction, Request, Response} from "express";
import { getApplicantsOfPostSchema, registerAccountRequestSchema, downloadForeignCvSchema, changePasswordRequestSchema, loginRequestSchema, updateAccountRequestSchema, uploadCvSchema } from "./accountSchema";
import argon2 from "argon2"
import { Account } from "types";
import handleDbErrors from "./error";
import { postRepository } from "../post/postRepository";

export const accountController = {
    register: async (request: Request, response: Response) => {
        const validRequest = await registerAccountRequestSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const {firstName, surname, email, password, passwordConfirm} = validRequest.data.body

        if (password !== passwordConfirm) {
            response.status(400).send("passwords differ")
            return
        }

        const passwordHash = await argon2.hash(password);

        const result = await accountRepository.create({
            firstName, surname, email, passwordHash, avatar: ''
        });

        if (result.isOk) {
            response.status(201).send(result.value)
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    login: async (request: Request, response: Response) => {
        const validRequest = await loginRequestSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return false;
        }
        const {email, password} = validRequest.data.body
        const account = await accountRepository.getUserForAuth(email);
        if (account.isErr) {
            response.status(401).send(account.error);
            return false;
        }
        const result = await accountRepository.checkPassword(account.unwrap().passwordHash, password);
        if (!result) {
            response.status(401).send("unauthorized")
            return false;
        }
        response.status(200).send(result);
        return true;
    },

    logout: (request: Request, response:Response, next: NextFunction) => {
        request.logout(
            {
                keepSessionInfo: false,
            },
            (err: Error) => {
                if (err) {
                    return next(err);
                }
                response.status(200).end();
            }
        );
    },

    update: async (request: Request, response: Response) => {
        const validRequest = await updateAccountRequestSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const {firstName, surname, email, avatar} = validRequest.data.body

        const result = await accountRepository.update(request.session.passport.user.id, { firstName, surname, email, avatar });

        if (result.isOk) {
            response.status(201).send(result.value)
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    getUserAccount: async (request: Request, response: Response) => {
        const result = await accountRepository.getById(request.session.passport.user.id);
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

        const post = await postRepository.getPost(validRequest.data.params.postId);
        if (post.isErr) {
            response.status(400).send("Bad request");
        } else if (post.isOk) {
            if (post.value.creatorId != request.session.passport.user.id) {
                response.status(403).send("unauthorized");
                return
            }
    
            const result = await accountRepository.getApplicantsOfPost(validRequest.data.params.postId);
    
            if (result.isOk) {
                response.send(result.value)
            } else if (result.isErr) {
                handleDbErrors(result.error, response);
            }
        }
    },

    getApplicantsOfAccountPosts: async (request: Request, response: Response) => {
        const result = await accountRepository.getApplicantsOfAccountPosts(request.session.passport.user.id);

        if (result.isOk) {
            const foundUsers = new Map<string, Omit<Account, "passwordHash">[]>();
            result.value.forEach((value, key) => foundUsers.set(key, value))
            response.send(foundUsers)
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    changePassword: async (request: Request, response: Response) => {
        const validRequest = await changePasswordRequestSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return false;
        }

        const {oldPassword, newPassword, newPasswordConfirm} = validRequest.data.body

        const account = await accountRepository.getByIdForAuth(request.session.passport.user.id);
        if (account.isErr) {
            response.status(401).send(account.error);
            return false
        }
        const valid = await accountRepository.checkPassword(account.unwrap().passwordHash, oldPassword);
        if (!valid) {
            response.status(401).send("unauthorized")
            return false
        }

        if (newPassword !== newPasswordConfirm) {
            response.status(400).send("passwords differ")
            return false;
        }

        const result = await accountRepository.changePassword(
            request.session.passport.user.id, newPassword
        );

        if (result.isOk) {
            response.status(204).send()
            return true;
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
            return false;
        }
    },

    delete: async (request: Request, response: Response) => {
        const result = await accountRepository.delete(request.session.passport.user.id);

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

        const {fileName, fileType, fileSize, fileContent} = validRequest.data.body;
        const accountId = request.session.passport.user.id;
        const result = await accountRepository.updateCv({fileName, accountId, fileType, fileSize, fileContent});

        if (result.isOk) {
            response.status(201).send(result);
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    getCv: async (request: Request, response: Response) => {
        const result = await accountRepository.getCv(request.session.passport.user.id);

        if (result.isOk) {
            response.send(result.value);
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },

    getForeignCv: async (request: Request, response: Response) => {
        console.log('downloadForeignCv');

        const validRequest = await downloadForeignCvSchema.safeParseAsync(request);
        if (!validRequest.success) {
            response.status(400).send("invalid request")
            return
        }

        const {accountId} = validRequest.data.body

        const applicantMap = await accountRepository.getApplicantsOfAccountPosts(request.session.passport.user.id);
        if (applicantMap.isErr) {
            handleDbErrors(applicantMap.error, response);
        } else if (applicantMap.isOk) {
            let isApplicant = false;

            applicantMap.value.forEach((applicants) => {
                applicants.forEach((applicant) => {
                    if (applicant.id === accountId) {
                        isApplicant = true;
                    }
                })
            })

            if (!isApplicant) {
                response.status(403).send("unauthorized");
                return
            }

            response.download('../../uploads/cv/', accountId + '.pdf');
        }
    },

    deleteCv: async (request: Request, response: Response) => {
        const result = await accountRepository.deleteCv(request.session.passport.user.id);

        if (result.isOk) {
            response.status(204).send()
        } else if (result.isErr) {
            handleDbErrors(result.error, response);
        }
    },    
}
