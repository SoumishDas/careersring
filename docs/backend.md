# Backend (Go API)

All server logic lives under the `api/` directory. Gin is used as the HTTP router.

**Important files and packages**

- `main.go` – program entry point. Initializes the DB connection and router.
- `router/` – registers all REST endpoints and configures CORS.
- `db/` – opens a SQLite or Postgres connection based on `DB_TYPE`.
- `models/` – Gorm model definitions shared across packages.
- `candidate/`, `client/`, `hcm/`, `authentication/`, `masterData/` – feature packages each with controllers and helper functions.

To run locally with SQLite:
```bash
DB_TYPE=sqlite3 go run ./api
```
The API listens on port `5000`.

### Endpoints

- `/candidate` – CRUD operations for the legacy candidate schema.
- `/masterData/candidates` – new candidate model with dictionary tables.
- `/login` and `/refresh` – simple JWT authentication example.

See `router/router.go` for the complete list.
