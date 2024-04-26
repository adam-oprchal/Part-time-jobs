import prisma  from "../db/client";
import { Account } from "types"
import {Result} from "@badrap/result";
import { AccountRegister, DbResult } from "../types";

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
    }
}
