import { PrismaClient } from "./generated/prisma/client";

export const prismaClient = new PrismaClient();

export type { User } from "./generated/prisma/client";