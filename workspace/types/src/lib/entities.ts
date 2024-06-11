import {Post as PrismaPost, Account as PrismaAccount, Cv as PrismaCv} from "@prisma/client";

export type Post = PrismaPost
export type Account = PrismaAccount
export type Cv = PrismaCv
export type AccountWithoutPassword = Omit<Account, 'passwordHash'>
export type AccountWithCvWithoutPassword = Account & {cv: Cv}
export type LoginCredentials = { email: string; password: string; }
export type AccountRegisterWithoutPassword = Omit<AccountWithoutPassword, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type CvUpdate = Omit<Cv, "id" | "createdAt" | "updatedAt" | "deletedAt" | "accountId">
export type CvDown = Omit<Cv, "fileContent"> & { fileContent: string }
export type CvUp = Omit<CvUpdate, "fileContent"> & { fileContent: string }
