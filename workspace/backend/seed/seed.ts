import prisma  from "../src/db/client";
import {
    accountsToCreate,
    cvs, posts,
} from './data';
import * as fs from 'fs';

const seed = async () => {
    console.log('Start seeding ...');
  
    await prisma.account.createMany({ data: accountsToCreate });

    const accounts = await prisma.account.findMany();
    accounts.forEach(async (account, index) => {
      await prisma.cv.create({
        data: {
          accountId: account.id,
          fileName: cvs[index].fileName,
          fileType: cvs[index].fileType,
          fileSize: cvs[index].fileSize,
          fileContent: fs.readFileSync(cvs[index].fileContent)
        }
      })
      await prisma.post.create({
        data: {
          ...posts[index],
            creatorId: account.id
        }
      })
    })
  };
  
  seed()
    .then(async () => {
      console.log('Seeding finished.');
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.log('Seeding failed.');
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  