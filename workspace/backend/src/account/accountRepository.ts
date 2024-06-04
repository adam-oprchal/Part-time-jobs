import prisma  from "../db/client";
import { Account, AccountWithCvWithoutPassword, Cv } from "types"
import {Result} from "@badrap/result";
import { AccountRegister, CvUpdate, RepositoryResult } from "../types";
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

            return Result.ok(undefined)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async checkPassword(passwordHash: string, password: string): RepositoryResult<boolean> {
        try {
            const result = await argon2.verify(passwordHash, password)

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

    async updateCv(currentUserId: string): RepositoryResult<Cv> {
        try {
            const data = {
                accountId: currentUserId,
                fileName: currentUserId + ".pdf"
            }

            const cv = await prisma.cv.upsert({
                where: {accountId: data.accountId},
                update: {fileName: data.fileName},
                create: data
            })

            return Result.ok(cv)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    }
}
