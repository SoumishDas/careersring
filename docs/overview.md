# Overview

CareersRing is a full‑stack application that manages recruitment data. It consists of:

1. **Frontend (`src/`)** – A Next.js 15 app providing forms for candidates and an admin UI. It relies heavily on React Hook Form and Material UI components.
2. **Backend (`api/`)** – A Go module built with the Gin framework. It exposes REST endpoints to store candidate information in a database.
3. **Scripts (`scripts/`)** – Shell and Go scripts used for deployment, running locally, and seeding sample data.

The `go.work` file ties multiple Go packages together. Node dependencies are managed via `package.json` and `pnpm-lock.yaml`.

Use `npm run dev` to start the Next.js server and `go run ./api` to launch the API in development mode.
