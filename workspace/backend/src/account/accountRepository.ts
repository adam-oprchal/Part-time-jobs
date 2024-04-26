import prisma  from "../db/client";
import { Account } from "types"
import {Result} from "@badrap/result";
import { AccountRegister, DbResult } from "../types";
import argon2 from "argon2"

export const accountRepository = {
    async create(data: AccountRegister): DbResult<Account> {
        try {
            const result = await prisma.account.create({data});

            return Result.ok(result)
        } catch (error) {
            return Result.err(error as Error)
        }
    },

    async getById(id: string): DbResult<Account> {
        try {
            const result = await prisma.account.findUniqueOrThrow({where: {id}});

            return Result.ok(result)
        } catch (error) {
            return Result.err(error as Error)
        }
    },

    async getByEmail(email: string): DbResult<Account> {
        try {
            const result = await prisma.account.findUniqueOrThrow({where: {email}});

            return Result.ok(result)
        } catch (error) {
            return Result.err(error as Error)
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
            return Result.err(error as Error)
        }
    },

    async checkPassword(id: string, password: string): DbResult<boolean> {
        try {
            const account = await prisma.account.findUniqueOrThrow({where: {id}});
            const result = await argon2.verify(account.passwordHash, password)

            return Result.ok(result)
        } catch (error) {
            return Result.err(error as Error)
        }
    }
}
