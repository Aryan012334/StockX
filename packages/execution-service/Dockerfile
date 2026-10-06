FROM node:22-alpine AS builder
WORKDIR /app
COPY packages/package*.json ./packages/
COPY packages ./packages
WORKDIR /app/packages

# prisma generate doesn't connect to DB — dummy URL is fine at build time
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build

RUN npm ci
RUN npm run db:generate --workspace=execution-service || true
RUN npm run build --workspace=shared            || true
RUN npm run build --workspace=execution-service || true

FROM node:22-alpine AS deps
WORKDIR /app
COPY packages/package*.json ./packages/
COPY packages ./packages
WORKDIR /app/packages
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
RUN npm ci --omit=dev
RUN npm run db:generate --workspace=execution-service || true

FROM node:22-alpine AS runner
WORKDIR /app/packages/execution-service
ENV NODE_ENV=production

COPY --from=deps    /app/packages/node_modules          /app/packages/node_modules
COPY --from=builder /app/packages/shared                /app/packages/shared
COPY --from=builder /app/packages/execution-service     /app/packages/execution-service

# At runtime: DATABASE_URL is injected from .env via docker-compose
# 1. Apply any pending migrations (idempotent — safe to run every startup)
# 2. Start the execution worker (two parallel loops: matches + order_updates)
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && node dist/executionWorker.js"]
