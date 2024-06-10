import prisma  from "../db/client";
import { Account, AccountWithCvWithoutPassword, Cv } from "types"
import {Result} from "@badrap/result";
import { AccountRegister, AccountRegisterWithoutPassword, CvUpdate, RepositoryResult } from "../types";
import argon2 from "argon2"

export const accountRepository = {
    async create(data: AccountRegister): RepositoryResult<AccountWithCvWithoutPassword> {
        try {
            const result = await prisma.account.create({
                data,
                include: {
                    cv: true
                }
            });
            delete result.passwordHash

            return Result.ok(result)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async getById(id: string): RepositoryResult<AccountWithCvWithoutPassword> {
        try {
            const result = await prisma.account.findUniqueOrThrow({
                where: {
                    id,
                    deletedAt: null
                },
                include: {
                    cv: true
                },
            });
            delete result.passwordHash

            return Result.ok(result)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async getByIdForAuth(id: string): RepositoryResult<Account> {
        try {
            const result = await prisma.account.findUniqueOrThrow({
                where: {
                    id,
                    deletedAt: null
                },
                include: {
                    cv: true
                },
            });
            return Result.ok(result)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async getByEmail(email: string): RepositoryResult<AccountWithCvWithoutPassword> {
        try {
            const result = await prisma.account.findUniqueOrThrow({
                where: {
                    email,
                    deletedAt: null
                },
                include: {
                    cv: true
                }
            });
            delete result.passwordHash

            return Result.ok(result)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async getUserForAuth(email: string): RepositoryResult<Account> {
        try {
            const result = await prisma.account.findUniqueOrThrow({
                where: {
                    email,
                    deletedAt: null
                },
            });

            return Result.ok(result)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async getApplicantsOfPost(postId: string): RepositoryResult<AccountWithCvWithoutPassword[]> {
        try {
            const post = await prisma.post.findUniqueOrThrow({
                where: {
                    id: postId,
                    deletedAt: null
                },
                include: {
                    applicants: {
                        include: {
                            cv: true
                        }
                    }
                }
            });
            const result = post.applicants;
            result.forEach((applicant) => delete applicant.passwordHash)

            return Result.ok(result)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async getApplicantsOfAccountPosts(id: string): RepositoryResult<Map<string, AccountWithCvWithoutPassword[]>> {
        try {
            const posts = await prisma.post.findMany({
                where: {
                    creatorId: id,
                    deletedAt: null
                },
                include: {
                    applicants: {
                        include: {
                            cv: true
                        }
                    }
                }
            });
            const result = new Map<string, AccountWithCvWithoutPassword[]>();
            posts.forEach((post) => {
                post.applicants.forEach((applicant) => delete applicant.passwordHash)
                result.set(post.id, post.applicants)
            })

            return Result.ok(result)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async changePassword(id: string, password: string): RepositoryResult<undefined> {
        try {
            const passwordHash = await argon2.hash(password);
            const account = await prisma.account.update({
                where: {id},
                data: {passwordHash}
            });
            if (!account) {
                return Result.err(new Error('cannot change password'))
            }
            return Result.ok(undefined)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async checkPassword(passwordHash: string, password: string): Promise<boolean> {
        return await argon2.verify(passwordHash, password);
    },

    async update(id: string, data: AccountRegisterWithoutPassword): RepositoryResult<Account> {
        try {
            const result = await prisma.account.update({
                where: {id},
                data: {
                    firstName: data.firstName,
                    surname: data.surname,
                    email: data.email,
                    avatar: data.avatar,
                    updatedAt: new Date()
                }
            });

            return Result.ok(result)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async delete(id: string): RepositoryResult<undefined> {
        try {
            const result = await prisma.account.update({
                where: {id},
                data: {deletedAt: new Date()}
            });
            delete result.passwordHash

            return Result.ok(undefined)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async getCv(accountId: string): RepositoryResult<Cv> {
        try {
            const cv = await prisma.cv.findUniqueOrThrow({
                where: {
                    accountId,
                    deletedAt: null
                },
            });
            return Result.ok(cv)
        } catch (error) {
            return Result.err(new Error(error.code))
        }     
    },

    async updateCv(data: CvUpdate): RepositoryResult<Cv> {
        try {
            await prisma.account.findUniqueOrThrow({
                where: {
                    id: data.accountId,
                    deletedAt: null
                },
            });

            const cv = await prisma.cv.upsert({
                where: {accountId: data.accountId},
                update: {
                    fileName: data.fileName,
                    fileType: data.fileType,
                    fileSize: data.fileSize,
                    fileContent: data.fileContent,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
                create: data
            })

            return Result.ok(cv)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async deleteCv(accountId: string): RepositoryResult<undefined> {
        try {
            await prisma.cv.update({
                where: {accountId: accountId},
                data: {deletedAt: new Date()}
            });
            return Result.ok(undefined)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

}
