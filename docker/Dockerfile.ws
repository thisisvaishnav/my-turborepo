FROM oven/bun:1.3.10

WORKDIR /app

# Copy workspace manifests first (better cache)
COPY package.json bun.lock ./
COPY apps/websocket/package.json apps/websocket/package.json
COPY packages/db/package.json packages/db/package.json

# Install workspace deps
RUN bun install --frozen-lockfile

# Copy source code
COPY apps/websocket apps/websocket
COPY packages/db packages/db

# Run websocket app
WORKDIR /app/apps/websocket

EXPOSE 8081

CMD ["bun", "run", "index.ts"]