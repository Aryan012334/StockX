// Prisma 7 requires an explicit driver adapter.
// We use @prisma/adapter-pg which wraps the pg pool.
import { Pool }       from "pg";
import { PrismaPg }  from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/index.js";

function createPrismaClient() {
  const pool    = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { PrismaClient };
export type * from "./generated/index.js";
