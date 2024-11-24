# ベースイメージ
FROM --platform=linux/amd64 oven/bun:latest as base
WORKDIR /app

# 依存関係のインストール
FROM base AS deps
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# ビルド
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# 本番用イメージ
FROM base AS runner
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["bun", "server.js"]