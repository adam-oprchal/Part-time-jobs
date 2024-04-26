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
    }
}
