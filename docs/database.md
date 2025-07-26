# Database

The API uses Gorm for ORM functionality. The database backend is selected at runtime with the `DB_TYPE` environment variable:

- `sqlite3` – default for local development. The database file path can be overridden with `SQLITE_PATH`.
- `postgres` – used in production. Connection parameters default to a local Postgres instance but can be provided via `POSTGRES_DSN`.

Models are defined in `api/models`. `models.MigrateDB` is called on startup to create tables.
