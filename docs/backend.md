# Backend (Go API)

The `api/` directory implements a REST API using the Gin web framework.

Key packages:

- `main.go` – entry point configuring the router and database.
- `router/` – defines all HTTP routes.
- `db/` – handles connection to SQLite or Postgres based on environment variables.
- `candidate/`, `client/`, `hcm/`, `authentication/`, `masterData/` – packages with models and controllers for different resources.
- `models/` – Gorm models shared across packages.

Run the API in development with:

```bash
DB_TYPE=sqlite3 go run ./api
```
