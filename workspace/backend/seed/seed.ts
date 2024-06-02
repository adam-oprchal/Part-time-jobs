import { PrismaClient } from '@prisma/client';
import {
    accountsToCreate,
    cvNames, posts,
} from './data';

const prisma = new PrismaClient();


const seed = async () => {
    console.log('Start seeding ...');
  
    await prisma.account.createMany({ data: accountsToCreate });

    const accounts = await prisma.account.findMany();
    cvNames.forEach(async (name, index) => {
      await prisma.cv.create({
        data: {
          accountId: accounts[index].id,
          fileName: name
        }
      })
    })

    for (const post of posts) {
        await prisma.post.create({
            data: {
                ...post,
                creatorId: accounts[Math.floor(Math.random() * accounts.length)].id
            }
        })
    }

    console.log('Seeding finished.');
  };
  
  seed()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  