#!/usr/bin/env bash
# Register CareersRing as a systemd service
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SERVICE_FILE="/etc/systemd/system/careersring.service"

sudo tee "$SERVICE_FILE" > /dev/null <<SERVICE
[Unit]
Description=CareersRing Next.js and Go API
After=network.target

[Service]
Type=simple
WorkingDirectory=$ROOT
Environment=ENV=Deployment
Environment=DB_TYPE=postgres
ExecStart=$ROOT/scripts/run.sh
Restart=always

[Install]
WantedBy=multi-user.target
SERVICE

sudo systemctl daemon-reload
sudo systemctl enable careersring.service

echo "Service installed. Start with: sudo systemctl start careersring.service"
