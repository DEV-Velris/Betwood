import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const prismaClient = new PrismaClient();

export const auth = betterAuth({
  baseURL: 'http://localhost:3001/auth',
  database: prismaAdapter(prismaClient, {
    provider: 'postgresql',
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
