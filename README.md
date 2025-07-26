This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


For a full walkthrough of every folder see [docs](docs/README.md).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Database configuration

The API server reads the `DB_TYPE` environment variable. Use `sqlite3` for local development or `postgres` for production. When using SQLite, the database file defaults to `./test.db` but can be changed via `SQLITE_PATH`.

When connecting to Postgres, the database name is chosen based on the `ENV` variable:

- `Production` or `Deployment` &rarr; `Prod`
- `Development` &rarr; `Dev`
- any other value &rarr; `Test`

You can seed a local SQLite database with sample data:

```bash
go run scripts/init_sqlite.go
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Current Functionality

- **Multi-step candidate form** – collects candidate details through eighteen steps with local persistence.
- **Legacy candidate form** – a single-page version used in tests.
- **Admin screens** – basic pages for listing and updating candidate records.
- **REST API** – Go endpoints handle CRUD for both the old and new candidate schemas.
- **Database models** – Gorm models stored in SQLite or Postgres.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Running Tests

This project uses Jest with React Testing Library.
Execute all tests with:

```bash
npm test
```

Go commands use the `go.work` workspace at the repository root. Run Go tooling from the `api` directory or reference `./api/...` in the package path.


## Deployment

To build the frontend and API for production use Postgres, run:

```bash
./scripts/deploy.sh
```

Start the application after building with:

```bash
./scripts/run.sh
```

### Installing as a service

To register the app as a systemd service run:

```bash
sudo ./scripts/register_service.sh
sudo systemctl start careersring.service
```

The service file will be created at `/etc/systemd/system/careersring.service` and
uses `DB_TYPE=postgres` so the API connects to your Postgres database.


## Camunda Setup

Camunda is not bundled with this repository. See [docs/camunda.md](docs/camunda.md) for a detailed guide. Basic steps:

1. Download the Camunda distribution and start it on port `8080`.
2. Design workflows with Camunda Modeler and deploy them via the REST API.
3. Implement a small client package in Go to trigger processes from your handlers.

Set `CAMUNDA_URL` to the Camunda REST endpoint when running the API.

## Suggested Improvements

- Add unit tests for all Go packages.
- Break large controllers into smaller files for readability.
- Introduce a configuration file instead of many environment variables.
- Consider containerizing the application with Docker for easier deployment.

