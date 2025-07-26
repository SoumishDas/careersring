# Database

The backend relies on Gorm for ORM mapping. The configuration is controlled by environment variables:

- `DB_TYPE` – `sqlite3` for local development or `postgres` for production.
- `SQLITE_PATH` – optional path to the SQLite file when using SQLite.
- `POSTGRES_DSN` – DSN string for the Postgres driver. If unset, defaults to `user=postgres host=43.205.211.80 dbname=<EnvName> sslmode=disable password=chikoo123`.

Model structs are defined in `api/models` and cover both the original `Candidate` schema and the newer `MasterCandidate` with dictionary tables (skills, locations, etc.). When the API starts `models.MigrateDB` automatically creates or updates tables.

The `scripts/init_sqlite.go` program seeds a local SQLite database with a sample `MasterCandidate` record for quick testing.
