#!/bin/bash
set -e

REPO_URL=${REPO_URL:-"https://github.com/example/careersring.git"}
APP_DIR=${APP_DIR:-"careersring"}
GO_PORT=${GO_PORT:-8080}

if [ ! -d "$APP_DIR" ]; then
  git clone "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"

# Build Go API server
pushd api
go build -o server
popd

# Install frontend dependencies and build
npm install
npm run build

# Start servers
export API_URL="http://localhost:$GO_PORT"
nohup ./api/server &
nohup npm start &

echo "Servers started on Go port $GO_PORT and Next.js port 3000"

