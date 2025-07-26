# Deployment

Use the helper scripts in the `scripts/` directory to build and run the project.

- `scripts/deploy.sh` – installs dependencies, builds the Next.js app and compiles the Go API into a `careersring-api` binary. Environment variables are set for production usage.
- `scripts/run.sh` – runs the compiled Go binary and the Next.js server together. Used by the systemd service.
- `scripts/register_service.sh` – creates `/etc/systemd/system/careersring.service` pointing to `run.sh` so the application can run as a service.
- `scripts/init_sqlite.go` – seeds a local SQLite database with sample data for development.

Build for production:

```bash
./scripts/deploy.sh
```

Run locally after building:

```bash
./scripts/run.sh
```
