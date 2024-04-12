import {Post as PrismaPost, Account as PrismaAccount, Cv as PrismaCv} from "@prisma/client";

export type Post = PrismaPost
export type Account = PrismaAccount
export type Cv = PrismaCv
export type AccountWithCvWithoutPassword = Omit<Account & {cv: Cv}, 'passwordHash'>