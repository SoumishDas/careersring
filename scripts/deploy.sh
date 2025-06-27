#!/usr/bin/env bash
# Install dependencies and build the Next.js frontend and Go API
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export ENV=Deployment
export DB_TYPE=postgres

# Install Node dependencies
pnpm install --frozen-lockfile

# Install Go dependencies
cd "$ROOT/api"
go mod download
cd "$ROOT"

# Build Next.js app
pnpm build

# Build Go API binary
go build -o careersring-api ./api

echo "Build complete. Use scripts/run.sh to start the application."
