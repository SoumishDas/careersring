# Deployment

Automation scripts live in the `scripts/` folder.

- `deploy.sh` – installs Node and Go dependencies, builds the Next.js frontend, then compiles the Go API to `careersring-api`. Sets `ENV=Deployment` and `DB_TYPE=postgres`.
- `run.sh` – starts the compiled API and the Next.js server simultaneously. Used by the systemd unit.
- `register_service.sh` – writes a unit file to `/etc/systemd/system/careersring.service` and enables it so the app can run as a background service.
- `init_sqlite.go` – optional helper that seeds a SQLite database with test data.

Build the project:
```bash
./scripts/deploy.sh
```
After building you can run locally with:
```bash
./scripts/run.sh
```
Use `register_service.sh` if you want the app to run automatically on system boot.
