import prisma  from "../db/client";
import { AccountWithCvWithoutPassword, Cv } from "types"
import {Result} from "@badrap/result";
import { AccountRegister, CvUpdate, DbResult } from "../types";
import argon2 from "argon2"

export const accountRepository = {
    async create(data: AccountRegister): DbResult<AccountWithCvWithoutPassword> {
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

    async getById(id: string): DbResult<AccountWithCvWithoutPassword> {
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

    async getByEmail(email: string): DbResult<AccountWithCvWithoutPassword> {
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

    async getApplicantsOfPost(postId: string): DbResult<AccountWithCvWithoutPassword[]> {
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

    async getApplicantsOfAccountPosts(id: string): DbResult<Map<string, AccountWithCvWithoutPassword[]>> {
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

    async changePassword(id: string, password: string): DbResult<undefined> {
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

    async checkPassword(id: string, password: string): DbResult<boolean> {
        try {
            const account = await prisma.account.findUniqueOrThrow({where: {id}});
            const result = await argon2.verify(account.passwordHash, password)

            return Result.ok(result)
        } catch (error) {
            return Result.err(new Error(error.code))
        }
    },

    async delete(id: string): DbResult<undefined> {
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

    async updateCv(data: CvUpdate): DbResult<Cv> {
        try {
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
