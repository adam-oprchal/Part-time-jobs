import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import argon2 from "argon2"

faker.seed(42);

// example password hash generated from the string "password"
const passwordHash = "$argon2id$v=19$m=65536,t=3,p=4$Y3xzwKSSBcAx4aI426P4vA$lJPzVvFd1EAi6/eqUpOMDBWb+zVtoyQ03qFXpwfgxAo"

export const accountsToCreate: Prisma.AccountCreateInput[] = Array.from({ length: 10 }, () => ({
    firstName: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: faker.internet.email(),
    passwordHash
}));
  