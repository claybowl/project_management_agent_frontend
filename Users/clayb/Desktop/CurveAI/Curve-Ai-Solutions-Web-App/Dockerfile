FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Create app directory
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the app
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Production image
FROM base AS runner
ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 8099

# Command to run the app
CMD ["pnpm", "run", "start"] 