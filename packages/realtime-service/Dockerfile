FROM node:22-alpine AS builder
WORKDIR /app
COPY packages/package*.json ./packages/
COPY packages ./packages
WORKDIR /app/packages
RUN npm ci
RUN npm run build --workspace=shared           || true
RUN npm run build --workspace=realtime-service || true

FROM node:22-alpine AS deps
WORKDIR /app
COPY packages/package*.json ./packages/
COPY packages ./packages
WORKDIR /app/packages
RUN npm ci --omit=dev

FROM node:22-alpine AS runner
WORKDIR /app/packages/realtime-service
ENV NODE_ENV=production

COPY --from=deps    /app/packages/node_modules        /app/packages/node_modules
COPY --from=builder /app/packages/shared              /app/packages/shared
COPY --from=builder /app/packages/realtime-service    /app/packages/realtime-service

CMD ["node", "dist/index.js"]
