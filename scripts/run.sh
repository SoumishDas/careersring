#!/usr/bin/env bash
set -euo pipefail
DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$DIR"
export ENV=Deployment
export DB_TYPE=postgres

"$DIR"/careersring-api &
API_PID=$!

pnpm start &
WEB_PID=$!

trap 'kill $API_PID $WEB_PID' SIGTERM
wait $API_PID $WEB_PID
