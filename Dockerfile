# =========================
#  Dependencies stage
# =========================
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat bash curl
WORKDIR /app
# Enable corepack (pnpm already included in node:18+ images)
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate
# Copy package files
COPY package.json pnpm-lock.yaml* ./
# Install deps (skip frozen lockfile for safety inside container)
RUN pnpm install --no-frozen-lockfile
# =========================
#  Build stage
# =========================
FROM node:18-alpine AS builder
WORKDIR /app
# Enable pnpm via corepack (no duplicate install)
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate
# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
# Copy all project files
COPY . .
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1
# Build the Next.js app
RUN pnpm run build
# =========================
#  Runtime stage
# =========================
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Create non-root user
RUN addgroup -S nodejs -g 1001 && adduser -S nextjs -u 1001
# Public assets
COPY --from=builder /app/public ./public
# Next.js standalone build output
RUN mkdir -p .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
# Expose custom port
EXPOSE 3002
ENV PORT=3002
ENV HOSTNAME=0.0.0.0
# Run the Next.js server
CMD ["node", "server.js"]