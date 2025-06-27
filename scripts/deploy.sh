#!/usr/bin/env bash
# Build and prepare the API for deployment
set -euo pipefail

# Ensure deployment environment
export ENV=Deployment
export DB_TYPE=postgres

# Build the API binary
cd "$(dirname "$0")/.."
go build -o careersring-api ./api

echo "Binary built at ./careersring-api"
