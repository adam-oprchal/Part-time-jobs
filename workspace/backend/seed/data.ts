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

export const cvNames: string[] = Array.from({ length: 7 }, () => (
    faker.string.alphanumeric({length: 8})
));

export const posts = Array.from({ length: 10 }, () => ({
    description: faker.company.name(),
    location: faker.location.city(),
    wage: faker.number.int({min: 100, max: 1000}),
    expectedHours: faker.number.int({min: 10, max: 80}),
}));
  