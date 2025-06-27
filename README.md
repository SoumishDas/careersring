This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can seed a local SQLite database with sample data:

```bash
go run scripts/init_sqlite.go
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

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
