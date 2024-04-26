import { PrismaClient } from '@prisma/client';
import {
  accountsToCreate,
} from './data';

const prisma = new PrismaClient();


const seed = async () => {
    console.log('Start seeding ...');
  
    await prisma.account.createMany({ data: accountsToCreate });
  
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
  