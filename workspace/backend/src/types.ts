import type { Result } from '@badrap/result'
import { Account } from 'types/src/lib/entities';

export type DbResult<T> = Promise<Result<T>>;

export type AccountRegister = Omit<
    Account,
    "id" | "paswordHash" | "createdAt" | "updatedAt" | "deletedAt"
>
