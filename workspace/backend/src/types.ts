import type { Result } from '@badrap/result'
import { Account, Cv } from 'types/src/lib/entities';

export type RepositoryResult<T> = Promise<Result<T>>;

export type AccountRegister = Omit<
    Account,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
>
export type AccountRegisterWithoutPassword = Omit<
    AccountRegister, "passwordHash"
>

export type CvUpdate = Omit<
    Cv,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
>

export type User = {
    id: string;
    email: string;
  };
