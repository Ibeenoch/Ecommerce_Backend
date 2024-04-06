import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default prisma;
// in the model where they define the relation usin the @relation should be optional