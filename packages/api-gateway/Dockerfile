FROM node:22-alpine AS builder
WORKDIR /app
COPY packages/package*.json ./packages/
COPY packages ./packages
WORKDIR /app/packages
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
RUN npm ci
RUN npm run db:generate --workspace=execution-service || true
RUN npm run build --workspace=shared            || true
RUN npm run build --workspace=execution-service || true
RUN npm run build --workspace=api-gateway       || true

FROM node:22-alpine AS deps
WORKDIR /app
COPY packages/package*.json ./packages/
COPY packages ./packages
WORKDIR /app/packages
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
RUN npm ci --omit=dev
RUN npm run db:generate --workspace=execution-service || true

FROM node:22-alpine AS runner
WORKDIR /app/packages/api-gateway
ENV NODE_ENV=production

COPY --from=deps    /app/packages/node_modules          /app/packages/node_modules
COPY --from=builder /app/packages/shared                /app/packages/shared
COPY --from=builder /app/packages/execution-service     /app/packages/execution-service
COPY --from=builder /app/packages/api-gateway           /app/packages/api-gateway

CMD ["node", "dist/index.js"]
