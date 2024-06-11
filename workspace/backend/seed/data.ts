import { Prisma } from '@prisma/client';
import { fakerSK } from '@faker-js/faker';

fakerSK.seed(42);

// example password hash generated from the string "password"
const passwordHash =
  '$argon2id$v=19$m=65536,t=3,p=4$Y3xzwKSSBcAx4aI426P4vA$lJPzVvFd1EAi6/eqUpOMDBWb+zVtoyQ03qFXpwfgxAo';

export const accountsToCreate: Prisma.AccountCreateInput[] = Array.from(
  { length: 10 },
  () => ({
    firstName: fakerSK.person.firstName(),
    surname: fakerSK.person.lastName(),
    email: fakerSK.internet.email(),
    passwordHash,
  })
);

export const cvs = [
  {
    fileName: 'CV01.pdf',
    fileType: 'application/pdf',
    fileSize: 318570,
    fileContent: './seed/examples/CV01.pdf',
  },
  {
    fileName: 'CV02.pdf',
    fileType: 'application/pdf',
    fileSize: 68360,
    fileContent: './seed/examples/CV02.pdf',
  },
  {
    fileName: 'CV03.pdf',
    fileType: 'application/pdf',
    fileSize: 318570,
    fileContent: './seed/examples/CV03.pdf',
  },
  {
    fileName: 'CV04.pdf',
    fileType: 'application/pdf',
    fileSize: 68360,
    fileContent: './seed/examples/CV04.pdf',
  },
  {
    fileName: 'CV05.pdf',
    fileType: 'application/pdf',
    fileSize: 318570,
    fileContent: './seed/examples/CV05.pdf',
  },
  {
    fileName: 'CV06.pdf',
    fileType: 'application/pdf',
    fileSize: 68360,
    fileContent: './seed/examples/CV06.pdf',
  },
  {
    fileName: 'CV07.pdf',
    fileType: 'application/pdf',
    fileSize: 318570,
    fileContent: './seed/examples/CV07.pdf',
  },
  {
    fileName: 'CV08.pdf',
    fileType: 'application/pdf',
    fileSize: 68360,
    fileContent: './seed/examples/CV08.pdf',
  },
  {
    fileName: 'CV09.pdf',
    fileType: 'application/pdf',
    fileSize: 318570,
    fileContent: './seed/examples/CV09.pdf',
  },
  {
    fileName: 'CV10.pdf',
    fileType: 'application/pdf',
    fileSize: 68360,
    fileContent: './seed/examples/CV01.pdf',
  },
];

export const posts = Array.from({ length: 10 }, () => ({
  jobName: fakerSK.person.jobTitle(),
  description: fakerSK.lorem.paragraphs({ min: 3, max: 5 }),
  location: fakerSK.location.city(),
  wage: fakerSK.number.int({ min: 10, max: 50 }),
  expectedHours: fakerSK.number.int({ min: 10, max: 80 }),
}));
