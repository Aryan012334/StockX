FROM node:22-alpine AS builder
WORKDIR /app
COPY packages/package*.json ./packages/
COPY packages ./packages
WORKDIR /app/packages

ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

ARG NEXT_PUBLIC_REST_API_URL
ENV NEXT_PUBLIC_REST_API_URL=$NEXT_PUBLIC_REST_API_URL

ARG NEXT_PUBLIC_WS_BASE_URL
ENV NEXT_PUBLIC_WS_BASE_URL=$NEXT_PUBLIC_WS_BASE_URL

# prisma generate needs a dummy DATABASE_URL at build time (no DB connection made)
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build

RUN npm ci
RUN npm run db:generate --workspace=execution-service || true
RUN npm run build --workspace=shared                  || true
RUN npm run build --workspace=web

FROM node:22-alpine AS deps
WORKDIR /app
COPY packages/package*.json ./packages/
COPY packages ./packages
WORKDIR /app/packages
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
RUN npm ci --omit=dev
RUN npm run db:generate --workspace=execution-service || true

FROM node:22-alpine AS runner
WORKDIR /app/packages/web
ENV NODE_ENV=production

COPY --from=deps    /app/packages/node_modules            /app/packages/node_modules
COPY --from=builder /app/packages/shared                  /app/packages/shared
COPY --from=builder /app/packages/execution-service       /app/packages/execution-service
COPY --from=builder /app/packages/web                     /app/packages/web

EXPOSE 3000
CMD ["npm", "start"]
