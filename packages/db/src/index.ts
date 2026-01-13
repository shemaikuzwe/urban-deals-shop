import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import "dotenv/config";
export * from "../generated/prisma/client";
export * from "../generated/prisma/internal/prismaNamespace";
export * from "../generated/prisma/enums";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export { db };
